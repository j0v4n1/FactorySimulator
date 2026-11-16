using FactorySimulator.Core;
using FactorySimulator.Infrastructure.Persistence.PostgreSql;
using Microsoft.EntityFrameworkCore;

namespace FactorySimulator.Server.Endpoints
{
    public class GameEndpoints
    {
        public static void MapEndpoints(WebApplication app)
        {
            app.MapGet("/api/game", async (AppDbContext db) =>
            {
                var result = await db.Recipes.ToListAsync();

                var recipes = result.Select(recipe => new
                {
                    recipe.Id,
                    recipe.Code,
                    recipe.Name,
                    recipe.OutputResourceCode,
                    recipe.Inputs
                });

                return Results.Ok(new
                {
                    recipes
                });
            });
        }
    }
}