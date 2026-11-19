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
            var dbWarehousesTypes = await db.WarehouseTypes.ToListAsync();

            return Results.Ok(new
            {
                recipes = dbRecipes,
                warehouses = dbWarehousesTypes
            });
        });
    }
}