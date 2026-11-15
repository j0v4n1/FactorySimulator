using FactorySimulator.Core;
using FactorySimulator.Server.debug;

namespace FactorySimulator.Server.Endpoints;

public static class CorporationEndpoints
{
    public static void MapEndpoints(WebApplication app)
    {
        app.MapGet("/api/corporation", (Game game) =>
        {
            var enterprises = new
            {
                Enterprises = game.Corporation.Enterprises.Select(enterprise => new
                {
                    enterprise.Id,
                    enterprise.Name,
                    enterprise.ConstructionCode,
                    enterprise.EquipmentCount,
                    enterprise.Employees,
                    enterprise.TotalConstructionCost,
                    enterprise.Status,
                    enterprise.Recipe
                })
            };

            DebugHelper.PrintJson(enterprises);

            return Results.Ok(new
            {
                game.Corporation.Balance,
                Enterprises = enterprises
            });
        });
    }
}