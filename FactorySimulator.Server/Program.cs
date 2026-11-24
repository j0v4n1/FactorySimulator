using FactorySimulator.Core;
using FactorySimulator.Core.Entities;
using FactorySimulator.Infrastructure.Persistence.PostgreSql;
using FactorySimulator.Server.Endpoints;
using FactorySimulator.Server.Hubs;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString));

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

builder.Services.AddSingleton<Game>();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    var game = scope.ServiceProvider.GetRequiredService<Game>();

    var dbEnterprises = await db.Enterprises.ToListAsync();
    var dbWarehouses = await db.Warehouses.ToListAsync();
    var dbResources = await db.Resources.ToListAsync();
    var dbRecipes = await db.Recipes.ToListAsync();

    var resources = dbResources.Select(resource => new Resource(
        resource.Id,
        resource.Code,
        resource.Name,
        resource.Description,
        resource.BasePrice
    )).ToList();

    var enterprises = dbEnterprises.Select(enterprise =>
    {
        var recipeModel = dbRecipes.FirstOrDefault(r => r.Code == enterprise.RecipeCode);

        if (recipeModel is null)
            throw new InvalidOperationException(
                $"Рецепт с кодом '{enterprise.RecipeCode}' не найден для предприятия '{enterprise.Name}' (ID: {enterprise.Id})."
            );

        var inputs = recipeModel.Inputs.Select(el => new ResourceAmount(
            resources.First(resource => resource.Code == el.ResourceCode),
            el.Amount)).ToList();

        var resource = resources.First(r => r.Code == recipeModel.OutputResourceCode);

        var recipe = new Recipe(recipeModel.Id, recipeModel.Code, recipeModel.Name, inputs,
            resource);

        return new Enterprise(
            enterprise.Id,
            enterprise.Name,
            enterprise.ConstructionCode,
            enterprise.EquipmentCount,
            enterprise.Employees,
            enterprise.TotalConstructionCost,
            Enum.Parse<EnterpriseStatus>(enterprise.Status),
            recipe,
            enterprise.EquipmentCode,
            enterprise.DepositId
        );
    }).ToList();


    var warehouses = dbWarehouses.Select(warehouse => new Warehouse(
        warehouse.Id,
        warehouse.Name,
        warehouse.Code,
        warehouse.Size,
        warehouse.Type,
        warehouse.EnterpriseId,
        warehouse.Capacity,
        warehouse.Distance,
        warehouse.RentPrice,
        warehouse.BuildPrice,
        warehouse.Items.Select(el => new ResourceAmount(
            resources.First(resource => resource.Id == el.ResourceId),
            el.Amount)).ToList()
    )).ToList();


    game.Corporation.LoadEnterprisesFromDb(enterprises);
    game.Corporation.LoadWarehousesFromDb(warehouses);
}

app.MapHub<GameHub>("/gameHub");

app.UseCors("ReactApp");

EquipmentEndpoints.MapEndpoints(app);

ConstructionEndpoints.MapEndpoints(app);

CorporationEndpoints.MapEndpoints(app);

GameEndpoints.MapEndpoints(app);

WarehouseEndpoints.MapEndpoints(app);

DepositsEndpoints.MapEndpoints(app);

app.Run();