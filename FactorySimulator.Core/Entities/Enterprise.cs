namespace FactorySimulator.Core.Entities;

public class Enterprise(
    string name,
    string constructionCode,
    int equipmentCount,
    int employees,
    decimal totalConstructionCost,
    string recipe)
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public string Name { get; } = name;

    public string ConstructionCode { get; } = constructionCode;

    public int EquipmentCount { get; } = equipmentCount;

    public int Employees { get; } = employees;

    public decimal TotalConstructionCost { get; } = totalConstructionCost;

    public EnterpriseStatus Status { get; private set; } = EnterpriseStatus.UnderConstruction;
    public string Recipe { get; } = recipe;
}