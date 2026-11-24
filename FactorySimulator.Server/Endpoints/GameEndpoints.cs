using FactorySimulator.Infrastructure.Persistence.PostgreSql;
using Microsoft.EntityFrameworkCore;

namespace FactorySimulator.Server.Endpoints;

public class GameEndpoints
{
    public static void MapEndpoints(WebApplication app)
    {
        app.MapGet("/api/game", async (AppDbContext db) =>
        {
            var dbRecipes = await db.Recipes.ToListAsync();
            var dbResources = await db.Resources.ToListAsync();
            var dbWarehousesTypes = await db.WarehouseTypes.ToListAsync();
            var dbDeposits = await db.Deposits.ToListAsync();

            return Results.Ok(new
            {
                recipes = dbRecipes,
                warehouses = dbWarehousesTypes,
                deposits = dbDeposits.Select(d => new
                {
                    id = d.Id,
                    name = d.Name,
                    description = d.Description,
                    resource = dbResources.FirstOrDefault(resource => d.ResourceId == resource.Id),
                    totalReserves = d.TotalReserves,
                    remainingReserves = d.RemainingReserves,
                    distance = d.Distance.ToString().ToLower(),
                    rentPrice = d.RentPrice,
                    purchasePrice = d.PurchasePrice,
                    isOwned = d.IsOwned,
                    isLeased = d.IsLeased,
                    enterpriseId = d.EnterpriseId
                }).ToList()
            });
        });
    }
}