using FactorySimulator.Core;
using FactorySimulator.Infrastructure.Persistence.PostgreSql;
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
            Console.WriteLine($"Length: {buildWarehouseRequest.Id?.Length}");
            if (!Guid.TryParse(buildWarehouseRequest.Id, out var warehouseGuid))
                return Results.BadRequest("Некорректный ID");
            var result =
                await db.WarehouseTypes.FirstOrDefaultAsync(warehouse =>
                    warehouse.Id == warehouseGuid);

            if (result == null) return Results.BadRequest("Не найден склад по ID");

            if (buildWarehouseRequest.Name != result.Name)
                return Results.BadRequest("Не прошла проверка имени с UI и БД");

            var multiplier = buildWarehouseRequest.DistanceFromEnterprise switch
            {
                "near" => 1m,
                "medium" => 0.7m,
                "far" => 0.5m,
                _ => 1m
            };

            Console.WriteLine(result.RentPrice * multiplier);
            Console.WriteLine(buildWarehouseRequest.RentPrice);

            switch (buildWarehouseRequest.WarehouseTypeCode)
            {
                case "rent" when result.RentPrice * multiplier != buildWarehouseRequest.RentPrice:
                    return Results.BadRequest("Не прошла проверка стоимости аренды с UI и БД");
                case "owned" when buildWarehouseRequest.WarehouseConstructionPrice != result.ConstructionCost:
                    return Results.BadRequest("Не прошла проверка стоимости склада с UI и БД");
            }

            Guid? enterpriseGuid = buildWarehouseRequest.EnterpriseId == null
                ? null
                : Guid.Parse(buildWarehouseRequest.EnterpriseId);

            var warehouse = game.WarehouseSystem.TryBuildWarehouse(buildWarehouseRequest.Name,
                buildWarehouseRequest.WarehouseTypeCode,
                enterpriseGuid, result.Capacity, buildWarehouseRequest.DistanceFromEnterprise,
                buildWarehouseRequest.RentPrice,
                buildWarehouseRequest.WarehouseConstructionPrice);

            return Results.Ok(warehouse);
        });
    }
}