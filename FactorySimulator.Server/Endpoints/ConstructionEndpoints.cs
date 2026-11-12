using FactorySimulator.Core;
using FactorySimulator.Infrastructure.Persistence.MongoDb.Repositories;
using FactorySimulator.Server.Contracts;
using FactorySimulator.Server.Hubs;
using Microsoft.AspNetCore.SignalR;

namespace FactorySimulator.Server.Endpoints;

public static class ConstructionEndpoints
{
    public static void MapEndpoints(WebApplication app)
    {
        app.MapPost("/api/constructions/build",
            async (ConstructionRepository constructionRepository, EquipmentRepository equipmentRepository,
                BuildEnterpriseRequest buildEnterpriseRequest, Game game, IHubContext<GameHub> hubContext) =>
            {
                var resultConstructionDocument =
                    await constructionRepository.GetByCodeAsync(buildEnterpriseRequest.ConstructionCode);

                if (resultConstructionDocument is null)
                    return Results.NotFound("Не найден документ на постройку");

                if (buildEnterpriseRequest.Employees < resultConstructionDocument.MinEmployees ||
                    buildEnterpriseRequest.Employees > resultConstructionDocument.MaxEmployees)
                    return Results.BadRequest("Ошибка в количестве сотрудников");

                var resultEquipmentDocument =
                    await equipmentRepository.GetByCodeAsync(resultConstructionDocument.AllowedEquipment.EquipmentCode);

                if (resultEquipmentDocument is null)
                    return Results.NotFound("Не найден документ на оборудование");

                if (buildEnterpriseRequest.EquipmentCount < resultConstructionDocument.AllowedEquipment.MinCount ||
                    buildEnterpriseRequest.EquipmentCount > resultConstructionDocument.AllowedEquipment.MaxCount)
                    return Results.BadRequest("Ошибка в количестве оборудования");

                var isAllowedRecipe = resultConstructionDocument.AllowedRecipes.Contains(buildEnterpriseRequest.Recipe);

                if (!isAllowedRecipe) return Results.BadRequest("Ошибка рецепта");

                var totalCost = resultConstructionDocument.ConstructionCost +
                                resultEquipmentDocument.UnitCost * buildEnterpriseRequest.EquipmentCount;

                var enterprise = game.TryBuildEnterprise(resultConstructionDocument.Name,
                    resultConstructionDocument.Code,
                    buildEnterpriseRequest.EquipmentCount,
                    buildEnterpriseRequest.Employees, totalCost, buildEnterpriseRequest.Recipe);

                if (enterprise is null)
                    return Results.BadRequest("Не удалось создать предприятие");

                await hubContext.Clients.All.SendAsync(
                    "BalanceUpdated",
                    game.Corporation.Balance
                );

                var response = new EnterpriseResponseDto(enterprise.Id.ToString(), enterprise.Name,
                    enterprise.EquipmentCount,
                    enterprise.Employees, enterprise.Status.ToString(), enterprise.Recipe);

                return Results.Ok(response);
            });

        app.MapGet("/api/constructions",
            async (ConstructionRepository constructionRepository, RecipeRepository recipeRepository,
                ResourceRepository resourceRepository) =>
            {
                var constructions = await constructionRepository.GetAllAsync();
                var recipes = await recipeRepository.GetAllAsync();
                var resources = await resourceRepository.GetAllAsync();
                var result = constructions.Select(construction => new
                {
                    Id = construction.Id.ToString(),
                    construction.Code,
                    construction.Name,
                    construction.Description,
                    construction.ConstructionCost,
                    construction.ImageKey,
                    construction.AllowedEquipment,
                    construction.MinEmployees,
                    construction.MaxEmployees,
                    AllowedRecipes = recipes.Where(recipe => construction.AllowedRecipes.Contains(recipe.Code))
                        .Select(recipe => new
                        {
                            recipe.Code,
                            recipe.Name,

                            Inputs = recipe.Inputs.Select(input => new
                            {
                                Resourse = resources.FirstOrDefault(r => r.Code == input.ResourceCode),
                                input.Amount
                            }),

                            OutputResourceCode = resources.FirstOrDefault(r => r.Code == recipe.OutputResourceCode)
                        }).ToList()
                });

                return Results.Ok(result);
            });
    }
}