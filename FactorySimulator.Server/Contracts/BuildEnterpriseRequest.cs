namespace FactorySimulator.Server.Contracts;

public abstract class BuildEnterpriseRequest
{
    public string ConstructionCode { get; set; } = string.Empty;
    public int EquipmentCount { get; set; }
    public int Employees { get; set; }
    public string Recipe { get; }
}