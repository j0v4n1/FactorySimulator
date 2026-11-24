namespace FactorySimulator.Core.Entities;

public class Enterprise
{
    public Enterprise(string name, string constructionCode, int equipmentCount, int employees,
        decimal totalConstructionCost, Recipe recipe, string equipmentCode, Guid depositId)
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
        DepositId = depositId;
    }

    public Enterprise(Guid id, string name, string constructionCode, int equipmentCount, int employees,
        decimal totalConstructionCost, EnterpriseStatus status, Recipe recipe, string equipmentCode, Guid depositId)
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
        DepositId = depositId;
    }

    public Guid Id { get; private set; }
    public string Name { get; private set; }
    public string ConstructionCode { get; private set; }
    public int EquipmentCount { get; private set; }
    public int Employees { get; private set; }
    public decimal TotalConstructionCost { get; private set; }
    public EnterpriseStatus Status { get; private set; }
    public Recipe Recipe { get; private set; }
    public string EquipmentCode { get; private set; }
    public Guid DepositId { get; set; }
}