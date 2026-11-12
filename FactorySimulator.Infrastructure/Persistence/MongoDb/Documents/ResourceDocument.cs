using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace FactorySimulator.Infrastructure.Persistence.MongoDb.Documents;

public class ResourceDocument
{
    public ObjectId Id { get; set; }

    [BsonElement("code")] public string Code { get; set; } = string.Empty;

    [BsonElement("name")] public string Name { get; set; } = string.Empty;

    [BsonElement("description")] public string Description { get; set; } = string.Empty;

    [BsonElement("basePrice")] public decimal BasePrice { get; set; }
}