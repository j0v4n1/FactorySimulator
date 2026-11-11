using FactorySimulator.Core.Enum;

namespace FactorySimulator.Core.Entities;

public class Construction(
    string id,
    string name,
    string description,
    ConstructionCategory category,
    decimal constructionCost)
{
    public string Id { get; private set; } = id;
    public string Name { get; private set; } = name;
    public string Description { get; private set; } = description;
    public ConstructionCategory Category { get; private set; } = category;
    public decimal ConstructionCost { get; private set; } = constructionCost;
}