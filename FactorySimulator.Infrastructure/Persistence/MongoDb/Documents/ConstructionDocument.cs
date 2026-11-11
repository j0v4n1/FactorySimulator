using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace FactorySimulator.Infrastructure.Persistence.MongoDb.Documents;

public class ConstructionDocument
{
    [BsonId] public ObjectId Id { get; set; }

    [BsonElement("code")] public string Code { get; set; } = string.Empty;

    [BsonElement("name")] public string Name { get; set; } = string.Empty;

    [BsonElement("description")] public string Description { get; set; } = string.Empty;

    [BsonElement("constructionCost")] public decimal ConstructionCost { get; set; }

    [BsonElement("imageKey")] public string ImageKey { get; set; } = string.Empty;

    [BsonElement("allowedEquipment")] public AllowedEquipmentDocument AllowedEquipment { get; set; } = new();

    [BsonElement("minEmployees")] public int MinEmployees { get; set; }

    [BsonElement("maxEmployees")] public int MaxEmployees { get; set; }

    [BsonElement("allowedRecipes")] public List<string> AllowedRecipes { get; set; } = [];
}