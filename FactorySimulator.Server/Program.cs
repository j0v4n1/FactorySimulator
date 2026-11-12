using FactorySimulator.Core;
using FactorySimulator.Infrastructure.Persistence.MongoDb;
using FactorySimulator.Infrastructure.Persistence.MongoDb.Repositories;
using FactorySimulator.Server.Endpoints;
using FactorySimulator.Server.Hubs;

var builder = WebApplication.CreateBuilder(args);

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

var mongoDbSettings = builder.Configuration
                          .GetSection("MongoDb")
                          .Get<MongoDbSettings>()
                      ?? throw new InvalidOperationException("MongoDB settings not found.");

builder.Services.AddSingleton(mongoDbSettings);
builder.Services.AddSingleton<MongoDbContext>();
builder.Services.AddSingleton<ConstructionRepository>();
builder.Services.AddSingleton<RecipeRepository>();
builder.Services.AddSingleton<EquipmentRepository>();
builder.Services.AddSingleton<ResourceRepository>();
builder.Services.AddSingleton<Game>();

var app = builder.Build();

app.MapHub<GameHub>("/gameHub");

app.UseCors("ReactApp");

EquipmentEndpoints.MapEndpoints(app);

ConstructionEndpoints.MapEndpoints(app);

CorporationEndpoints.MapEndpoints(app);

app.Run();