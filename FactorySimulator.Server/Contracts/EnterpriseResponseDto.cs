using FactorySimulator.Core.Entities;
using FactorySimulator.Infrastructure.Persistence.PostgreSql.Models;

namespace FactorySimulator.Server.Contracts;

public class EnterpriseResponseDto(
    string id,
    string name,
    int equipmentCount,
    int employees,
    string status,
    Recipe recipe,
    EquipmentModel equipment,
    Guid depositId)
{
    public string Id { get; } = id;
    public string Name { get; } = name;
    public int EquipmentCount { get; } = equipmentCount;
    public int Employees { get; } = employees;
    public string Status { get; } = status;
    public Recipe Recipe { get; } = recipe;
    public EquipmentModel Equipment { get; set; } = equipment;
    public Guid DepositId { get; set; } = depositId;
}