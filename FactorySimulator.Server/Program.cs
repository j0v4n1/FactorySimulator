using FactorySimulator.Core;
using FactorySimulator.Infrastructure.Persistence.PostgreSql;
using FactorySimulator.Server.Endpoints;
using FactorySimulator.Server.Hubs;
using Microsoft.EntityFrameworkCore;
using FactorySimulator.Core.Entities;

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

    var enterprises = dbEnterprises.Select(enterprise => new Enterprise(
        enterprise.Id,
        enterprise.Name,
        enterprise.ConstructionCode,
        enterprise.EquipmentCount,
        enterprise.Employees,
        enterprise.TotalConstructionCost,
        Enum.Parse<EnterpriseStatus>(enterprise.Status),
        enterprise.RecipeCode
    )).ToList();

    game.Corporation.LoadEnterprisesFromDb(enterprises);

}

app.MapHub<GameHub>("/gameHub");

app.UseCors("ReactApp");

EquipmentEndpoints.MapEndpoints(app);

ConstructionEndpoints.MapEndpoints(app);

CorporationEndpoints.MapEndpoints(app);

GameEndpoints.MapEndpoints(app);

app.Run();


