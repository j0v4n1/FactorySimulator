using FactorySimulator.Core;
using FactorySimulator.Infrastructure.Persistence.PostgreSql;
using FactorySimulator.Infrastructure.Persistence.PostgreSql.Models;
using FactorySimulator.Server.Contracts;
using FactorySimulator.Server.Hubs;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace FactorySimulator.Server.Endpoints;

public static class WarehouseEndpoints
{
    public static void MapEndpoints(WebApplication app)
    {
        app.MapPost("api/warehouses/build", async (AppDbContext db, BuildWarehouseRequest buildWarehouseRequest,
            Game game,
            IHubContext<GameHub> hubContext) =>
        {
            Console.WriteLine($"ID: [{buildWarehouseRequest.Id}]");
            Console.WriteLine($"Length: {buildWarehouseRequest.Id.Length}");
            if (!Guid.TryParse(buildWarehouseRequest.Id, out var warehouseGuid))
                return Results.BadRequest("Некорректный ID");
            var result =
                await db.WarehouseTypes.FirstOrDefaultAsync(warehouse =>
                    warehouse.Id == warehouseGuid);

            if (result == null) return Results.BadRequest("Не найден склад по ID");

            if (buildWarehouseRequest.Name != result.Name)
                return Results.BadRequest("Не прошла проверка имени с UI и БД");

            var multiplier = buildWarehouseRequest.Distance switch
            {
                "near" => 1m,
                "medium" => 0.7m,
                "far" => 0.5m,
                _ => 1m
            };

            switch (buildWarehouseRequest.Type)
            {
                case "rent" when result.RentPrice * multiplier != buildWarehouseRequest.RentPrice:
                    return Results.BadRequest("Не прошла проверка стоимости аренды с UI и БД");
                case "owned" when buildWarehouseRequest.BuildPrice != result.BuildPrice:
                    return Results.BadRequest("Не прошла проверка стоимости склада с UI и БД");
            }

            Guid? enterpriseGuid = buildWarehouseRequest.EnterpriseId == null
                ? null
                : Guid.Parse(buildWarehouseRequest.EnterpriseId);

            var warehouse = game.WarehouseSystem.TryBuildWarehouse(buildWarehouseRequest.Name,
                buildWarehouseRequest.Code,
                buildWarehouseRequest.Type,
                buildWarehouseRequest.Size,
                enterpriseGuid, result.Capacity, buildWarehouseRequest.Distance,
                buildWarehouseRequest.RentPrice,
                buildWarehouseRequest.BuildPrice);

            if (warehouse is null)
                return Results.BadRequest(
                    "Не удалось создать склад");

            var warehouseModel = new WarehousesModel
            {
                Id = warehouse.Id,
                Name = warehouse.Name,
                Type = warehouse.Type,
                Code = warehouse.Code,
                Size = warehouse.Size,
                EnterpriseId = warehouse.EnterpriseId,
                Capacity = warehouse.Capacity,
                RentPrice = warehouse.RentPrice,
                BuildPrice = warehouse.BuildPrice,
                Distance = warehouse.Distance
            };

            await db.Warehouses.AddAsync(warehouseModel);
            await db.SaveChangesAsync();

            await hubContext.Clients.All.SendAsync(
                "BalanceUpdated",
                game.Corporation.Balance
            );

            return Results.Ok(warehouse);
        });

        app.MapGet("/api/warehouses", async (AppDbContext db) => { });
    }
}