using FactorySimulator.Infrastructure.Persistence.MongoDb.Documents;
using MongoDB.Driver;

namespace FactorySimulator.Infrastructure.Persistence.MongoDb.Repositories;

public class ResourceRepository(MongoDbContext context)
{
    private readonly IMongoCollection<ResourceDocument> _resourceCollection =
        context.Database.GetCollection<ResourceDocument>("resources");

    public async Task<List<ResourceDocument>> GetAllAsync()
    {
        return await _resourceCollection.Find(Builders<ResourceDocument>.Filter.Empty).ToListAsync();
    }

    public async Task<ResourceDocument?> GetByCodeAsync(string code)
    {
        return await _resourceCollection.Find(resourceDocument => resourceDocument.Code == code).FirstOrDefaultAsync();
    }
}