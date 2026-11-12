using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace FactorySimulator.Infrastructure.Persistence.MongoDb.Documents;

public class RecipeDocument
{
    public ObjectId Id { get; set; }

    [BsonElement("code")] public string Code { get; set; } = string.Empty;

    [BsonElement("name")] public string Name { get; set; } = string.Empty;

    [BsonElement("inputs")] public List<RecipeResourceDocument> Inputs { get; set; } = [];

    [BsonElement("outputResourceCode")] public string OutputResourceCode { get; set; } = string.Empty;
}