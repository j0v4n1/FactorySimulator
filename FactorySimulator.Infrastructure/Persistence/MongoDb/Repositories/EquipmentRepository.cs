using FactorySimulator.Infrastructure.Persistence.MongoDb.Documents;
using MongoDB.Driver;

namespace FactorySimulator.Infrastructure.Persistence.MongoDb.Repositories;

public class EquipmentRepository(MongoDbContext context)
{
    private readonly IMongoCollection<EquipmentDocument> _collection = context.Database
        .GetCollection<EquipmentDocument>("equipments");

    public async Task<List<EquipmentDocument>> GetAllAsync()
    {
        return await _collection
            .Find(Builders<EquipmentDocument>.Filter.Empty)
            .ToListAsync();
    }

    public async Task<EquipmentDocument?> GetByCodeAsync(string code)
    {
        return await _collection
            .Find(x => x.Code == code)
            .FirstOrDefaultAsync();
    }
}