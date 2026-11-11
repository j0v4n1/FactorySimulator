using MongoDB.Bson.Serialization.Attributes;

namespace FactorySimulator.Infrastructure.Persistence.MongoDb.Documents;

public class AllowedEquipmentDocument
{
    [BsonElement("equipmentCode")]
    public string EquipmentCode { get; set; } = string.Empty;

    [BsonElement("minCount")]
    public int MinCount { get; set; }

    [BsonElement("maxCount")]
    public int MaxCount { get; set; }
}