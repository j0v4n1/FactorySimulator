using FactorySimulator.Core;
using FactorySimulator.Infrastructure.Persistence.PostgreSql;
using FactorySimulator.Server.Endpoints;
using FactorySimulator.Server.Hubs;
using Microsoft.EntityFrameworkCore;
using FactorySimulator.Server;

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

app.MapHub<GameHub>("/gameHub");

app.UseCors("ReactApp");

EquipmentEndpoints.MapEndpoints(app);

ConstructionEndpoints.MapEndpoints(app);

CorporationEndpoints.MapEndpoints(app);

app.Run();