using MongoDB.Driver;

namespace FactorySimulator.Infrastructure.Persistence.MongoDb;

public class MongoDbContext
{
    public IMongoDatabase Database { get; }

    public MongoDbContext(MongoDbSettings settings)
    {
        var client = new MongoClient(settings.ConnectionString);
        Database = client.GetDatabase(settings.DatabaseName);
    }
    
}