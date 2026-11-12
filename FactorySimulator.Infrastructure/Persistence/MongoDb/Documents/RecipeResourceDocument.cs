using MongoDB.Bson.Serialization.Attributes;

namespace FactorySimulator.Infrastructure.Persistence.MongoDb.Documents;

public class RecipeResourceDocument
{
    [BsonElement("resourceCode")] public string ResourceCode { get; set; } = string.Empty;

    [BsonElement("amount")] public int Amount { get; set; }
}