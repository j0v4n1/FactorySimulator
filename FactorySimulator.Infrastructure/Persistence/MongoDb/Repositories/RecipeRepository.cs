using FactorySimulator.Infrastructure.Persistence.MongoDb.Documents;
using MongoDB.Driver;

namespace FactorySimulator.Infrastructure.Persistence.MongoDb.Repositories;

public class RecipeRepository(MongoDbContext context)
{
    private readonly IMongoCollection<RecipeDocument> _collection = context.Database
        .GetCollection<RecipeDocument>("recipes");

    public async Task<List<RecipeDocument>> GetAllAsync()
    {
        return await _collection
            .Find(Builders<RecipeDocument>.Filter.Empty)
            .ToListAsync();
    }

    public async Task<RecipeDocument> GetByCodeAsync(string code)
    {
        return await _collection
            .Find(recipeDocument => recipeDocument.Code == code)
            .FirstOrDefaultAsync();
    }
}