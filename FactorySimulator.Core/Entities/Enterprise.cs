namespace FactorySimulator.Core.Entities;

public class Enterprise
{
    public Guid Id { get; private set; }
    public string Name { get; private set; }
    public string ConstructionCode { get; private set; }
    public int EquipmentCount { get; private set; }
    public int Employees { get; private set; }
    public decimal TotalConstructionCost { get; private set; }
    public EnterpriseStatus Status { get; private set; }
    public string Recipe { get; private set; }
    public string EquipmentCode { get; private set; }


    public Enterprise(string name, string constructionCode, int equipmentCount, int employees, decimal totalConstructionCost, string recipe, string equipmentCode)
    {
        Id = Guid.NewGuid();
        Name = name;
        ConstructionCode = constructionCode;
        EquipmentCount = equipmentCount;
        Employees = employees;
        TotalConstructionCost = totalConstructionCost;
        Status = EnterpriseStatus.UnderConstruction;
        Recipe = recipe;
        EquipmentCode = equipmentCode;
    }

    public Enterprise(Guid id, string name, string constructionCode, int equipmentCount, int employees, decimal totalConstructionCost, EnterpriseStatus status, string recipe, string equipmentCode)
    {
        Id = id;
        Name = name;
        ConstructionCode = constructionCode;
        EquipmentCount = equipmentCount;
        Employees = employees;
        TotalConstructionCost = totalConstructionCost;
        Status = status;
        Recipe = recipe;
        EquipmentCode = equipmentCode;
    }
}
