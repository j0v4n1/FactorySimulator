using FactorySimulator.Infrastructure.Persistence.MongoDb.Repositories;

namespace FactorySimulator.Server.Endpoints;

public static class EquipmentEndpoints
{
    public static void MapEndpoints(WebApplication app)
    {
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
    }
}