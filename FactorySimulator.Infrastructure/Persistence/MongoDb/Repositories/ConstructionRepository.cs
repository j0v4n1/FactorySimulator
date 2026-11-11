using FactorySimulator.Infrastructure.Persistence.MongoDb.Documents;
using MongoDB.Driver;

namespace FactorySimulator.Infrastructure.Persistence.MongoDb.Repositories;

public class ConstructionRepository(MongoDbContext context)
{
    private readonly IMongoCollection<ConstructionDocument> _collection = context.Database
        .GetCollection<ConstructionDocument>("constructions");

    public async Task<List<ConstructionDocument>> GetAllAsync()
    {
        return await _collection
            .Find(Builders<ConstructionDocument>.Filter.Empty)
            .ToListAsync();
    }

    public async Task<ConstructionDocument?> GetByCodeAsync(string code)
    {
        return await _collection
            .Find(x => x.Code == code)
            .FirstOrDefaultAsync();
    }
}