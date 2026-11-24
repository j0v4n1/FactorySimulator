using FactorySimulator.Core.Entities;
using FactorySimulator.Infrastructure.Persistence.PostgreSql.Models;

namespace FactorySimulator.Server.Contracts;

public class BuildEnterpriseRequest
{
    public Guid ConstructionId { get; set; }
    public int EquipmentCount { get; set; }
    public int Employees { get; set; }
    public Recipe Recipe { get; set; }
    public EquipmentModel Equipment { get; set; }
    public Guid DepositId { get; set; }
}