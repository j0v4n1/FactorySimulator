using FactorySimulator.Core;
using FactorySimulator.Infrastructure.Persistence.MongoDb;
using FactorySimulator.Infrastructure.Persistence.MongoDb.Repositories;
using FactorySimulator.Server.Contracts;
using FactorySimulator.Server.Hubs;
using Microsoft.AspNetCore.SignalR;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

builder.Services.AddSignalR();

var mongoDbSettings = builder.Configuration
                          .GetSection("MongoDb")
                          .Get<MongoDbSettings>()
                      ?? throw new InvalidOperationException("MongoDB settings not found.");

builder.Services.AddSingleton(mongoDbSettings);
builder.Services.AddSingleton<MongoDbContext>();
builder.Services.AddSingleton<ConstructionRepository>();
builder.Services.AddSingleton<EquipmentRepository>();
builder.Services.AddSingleton<Game>();

var app = builder.Build();

app.MapHub<GameHub>("/gameHub");

app.UseCors("ReactApp");

app.MapGet("/api/equipments", async (EquipmentRepository repository) =>
{
    var equipments = await repository.GetAllAsync();

    var result = equipments.Select(x => new
    {
        Id = x.Id.ToString(),
        x.Code,
        x.Name,
        x.Description,
        x.PowerConsumption,
        x.UnitCost,
        x.ProductionPerSecond,
        x.ReducedProductionPerSecond
    });

    return Results.Ok(result);
});

app.MapGet("/api/constructions", async (ConstructionRepository repository) =>
{
    var constructions = await repository.GetAllAsync();

    var result = constructions.Select(x => new
    {
        Id = x.Id.ToString(),
        x.Code,
        x.Name,
        x.Description,
        x.ConstructionCost,
        x.ImageKey,
        x.AllowedEquipment,
        x.MinEmployees,
        x.MaxEmployees
    });

    return Results.Ok(result);
});

app.MapGet("/api/corporation", (Game game) => { return Results.Ok(game.Corporation.Balance); });

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

        var enterprise = game.TryBuildEnterprise(resultConstructionDocument.Name, resultConstructionDocument.Code,
            buildEnterpriseRequest.EquipmentCount,
            buildEnterpriseRequest.Employees, totalCost, buildEnterpriseRequest.Recipe);

        if (enterprise is null)
            return Results.BadRequest("Не удалось создать предприятие");

        await hubContext.Clients.All.SendAsync(
            "BalanceUpdated",
            game.Corporation.Balance
        );

        var response = new EnterpriseResponseDto(enterprise.Id.ToString(), enterprise.Name, enterprise.EquipmentCount,
            enterprise.Employees, enterprise.Status.ToString(), enterprise.Recipe);

        return Results.Ok(response);
    });

app.Run();