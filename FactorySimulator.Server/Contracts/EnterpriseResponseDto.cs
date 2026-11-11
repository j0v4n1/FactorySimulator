namespace FactorySimulator.Server.Contracts;

public class EnterpriseResponseDto(
    string id,
    string name,
    int equipmentCount,
    int employees,
    string status,
    string recipe)
{
    public string Id { get; } = id;
    public string Name { get; } = name;
    public int EquipmentCount { get; } = equipmentCount;
    public int Employees { get; } = employees;
    public string Status { get; } = status;
    public string Recipe { get; } = recipe;
}