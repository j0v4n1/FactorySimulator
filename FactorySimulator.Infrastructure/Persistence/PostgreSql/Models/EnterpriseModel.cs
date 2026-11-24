namespace FactorySimulator.Infrastructure.Persistence.PostgreSql.Models;

public class EnterpriseModel
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public decimal TotalConstructionCost { get; set; }
    public string ConstructionCode { get; set; } = string.Empty;
    public int EquipmentCount { get; set; }
    public int Employees { get; set; }
    public string Status { get; set; } = string.Empty;
    public string RecipeCode { get; set; } = string.Empty;
    public string EquipmentCode { get; set; } = string.Empty;
    public Guid DepositId { get; set; }
}