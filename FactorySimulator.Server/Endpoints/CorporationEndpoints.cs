using FactorySimulator.Core;

namespace FactorySimulator.Server.Endpoints;

public static class CorporationEndpoints
{
    public static void MapEndpoints(WebApplication app)
    {
        app.MapGet("/api/corporation", (Game game) => { return Results.Ok(game.Corporation.Balance); });
    }
}