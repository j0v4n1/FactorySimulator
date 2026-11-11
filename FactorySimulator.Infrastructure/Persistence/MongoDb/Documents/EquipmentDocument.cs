namespace FactorySimulator.Infrastructure.Persistence.MongoDb.Documents;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class EquipmentDocument
{
    public ObjectId Id { get; set; }

    [BsonElement("code")]
    public string Code { get; set; } = string.Empty;

    [BsonElement("name")]
    public string Name { get; set; } = string.Empty;
    
    [BsonElement("description")]
    public string Description { get; set; } = string.Empty;

    [BsonElement("powerConsumption")]
    public int PowerConsumption { get; set; } 

    [BsonElement("unitCost")]
    public decimal UnitCost { get; set; }

    [BsonElement("productionPerSecond")]
    public int ProductionPerSecond { get; set; } 
    
    [BsonElement("reducedProductionPerSecond")]
    public int ReducedProductionPerSecond { get; set; } 
}