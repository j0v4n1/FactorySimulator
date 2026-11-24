using FactorySimulator.Core;
using FactorySimulator.Core.Entities;
using FactorySimulator.Infrastructure.Persistence.PostgreSql;
using FactorySimulator.Infrastructure.Persistence.PostgreSql.Models;
using FactorySimulator.Server.Contracts;
using FactorySimulator.Server.Hubs;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace FactorySimulator.Server.Endpoints;

public static class ConstructionEndpoints
{
    public static void MapEndpoints(WebApplication app)
    {
        app.MapPost("/api/constructions/build",
            async (AppDbContext db, BuildEnterpriseRequest buildEnterpriseRequest, Game game,
                IHubContext<GameHub> hubContext) =>
            {
                var resultConstruction = await db.Constructions
                    .FirstOrDefaultAsync(x => x.Id == buildEnterpriseRequest.ConstructionId);

                if (resultConstruction is null)
                    return Results.NotFound("Не найден документ на постройку, строка 21 в файле ConstructionEndpoints");

                if (buildEnterpriseRequest.Employees < resultConstruction.MinEmployees ||
                    buildEnterpriseRequest.Employees > resultConstruction.MaxEmployees)
                    return Results.BadRequest(
                        "Ошибка в количестве сотрудников, строка 26 в файле ConstructionEndpoints");

                var resultEquipment = await db.Equipments
                    .FirstOrDefaultAsync(x => x.Code == resultConstruction.AllowedEquipment.EquipmentCode);

                if (resultEquipment is null)
                    return Results.NotFound(
                        "Не найден документ на оборудование, строка 33 в файле ConstructionEndpoints");

                if (buildEnterpriseRequest.EquipmentCount < resultConstruction.AllowedEquipment.MinCount ||
                    buildEnterpriseRequest.EquipmentCount > resultConstruction.AllowedEquipment.MaxCount)
                    return Results.BadRequest(
                        "Ошибка в количестве оборудования, строка 38 в файле ConstructionEndpoints");

                var isAllowedRecipe =
                    resultConstruction.AllowedRecipes.Contains(buildEnterpriseRequest.Recipe.Code);

                if (!isAllowedRecipe)
                    return Results.BadRequest("Ошибка рецепта, строка 43 в файле ConstructionEndpoints");

                var totalCost = resultConstruction.ConstructionCost +
                                resultEquipment.UnitCost * buildEnterpriseRequest.EquipmentCount;

                if (buildEnterpriseRequest.DepositId == Guid.Empty)
                    return Results.BadRequest("Некорректный ID пришёл с клиента");

                var resultDeposit =
                    await db.Deposits.FirstOrDefaultAsync(d => d.Id == buildEnterpriseRequest.DepositId);

                if (resultDeposit is null)
                    return Results.BadRequest("Не прошла сверка ID месторождения с клиента и в БД");

                if (!game.ConstructionSystem.TryBuildEnterprise(buildEnterpriseRequest.EquipmentCount,
                        buildEnterpriseRequest.Employees, totalCost))
                    return Results.BadRequest(
                        "Не удалось создать предприятие, строка 50 в файле ConstructionEndpoints");

                var enterprise = game.ConstructionSystem.BuildEnterprise(resultConstruction.Name,
                    resultConstruction.Code,
                    buildEnterpriseRequest.EquipmentCount,
                    buildEnterpriseRequest.Employees, totalCost, buildEnterpriseRequest.Recipe,
                    buildEnterpriseRequest.Equipment.Code, buildEnterpriseRequest.DepositId);


                if (enterprise is null)
                    return Results.BadRequest(
                        "Не удалось создать предприятие, строка 50 в файле ConstructionEndpoints");

                resultDeposit.EnterpriseId = enterprise.Id;
                await db.SaveChangesAsync();

                var enterpriseModel = new EnterpriseModel
                {
                    Id = enterprise.Id,
                    Name = enterprise.Name,
                    ConstructionCode = enterprise.ConstructionCode,
                    TotalConstructionCost = enterprise.TotalConstructionCost,
                    EquipmentCount = enterprise.EquipmentCount,
                    Employees = enterprise.Employees,
                    Status = enterprise.Status.ToString(),
                    RecipeCode = buildEnterpriseRequest.Recipe.Code,
                    EquipmentCode = buildEnterpriseRequest.Equipment.Code,
                    DepositId = buildEnterpriseRequest.DepositId
                };

                await db.Enterprises.AddAsync(enterpriseModel);
                await db.SaveChangesAsync();

                await hubContext.Clients.All.SendAsync(
                    "BalanceUpdated",
                    game.Corporation.Balance
                );

                var dbResources = await db.Resources.ToListAsync();
                var recipes = await db.Recipes.ToListAsync();
                var equipments = await db.Equipments.ToListAsync();
                var recipeModel = recipes.FirstOrDefault(r => r.Code == enterpriseModel.RecipeCode);
                var equipment = equipments.FirstOrDefault(e => e.Code == enterpriseModel.EquipmentCode);
                var resources = dbResources.Select(resource => new Resource(
                    resource.Id,
                    resource.Code,
                    resource.Name,
                    resource.Description,
                    resource.BasePrice
                )).ToList();
                if (recipeModel is null || equipment is null)
                    return Results.BadRequest(
                        "recipe is null || equipment is null");

                var inputs = recipeModel.Inputs.Select(el => new ResourceAmount(
                    resources.First(resource => resource.Code == el.ResourceCode),
                    el.Amount)).ToList();

                var resource = resources.FirstOrDefault(r => r.Code == recipeModel.OutputResourceCode);

                if (resource is null)
                    throw new InvalidOperationException(
                        "Ресурс не найден)."
                    );

                var recipe = new Recipe(recipeModel.Id, recipeModel.Code, recipeModel.Name, inputs,
                    resource);

                var response = new EnterpriseResponseDto(enterprise.Id.ToString(), enterprise.Name,
                    enterprise.EquipmentCount,
                    enterprise.Employees, enterprise.Status.ToString(), recipe, equipment,
                    buildEnterpriseRequest.DepositId);

                return Results.Ok(response);
            });

        app.MapGet("/api/constructions", async (AppDbContext db) =>
        {
            var constructions = await db.Constructions.ToListAsync();
            var recipes = await db.Recipes.ToListAsync();
            var resources = await db.Resources.ToListAsync();

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