using FactorySimulator.Infrastructure.Persistence.PostgreSql;
using Microsoft.EntityFrameworkCore;

namespace FactorySimulator.Server.Endpoints;

public static class EquipmentEndpoints
{
    public static void MapEndpoints(WebApplication app)
    {
        app.MapGet("/api/equipments", async (AppDbContext db) =>
        {
            var equipments = await db.Equipments.ToListAsync();

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
    }
}