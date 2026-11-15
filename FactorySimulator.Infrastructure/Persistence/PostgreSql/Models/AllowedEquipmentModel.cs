namespace FactorySimulator.Infrastructure.Persistence.PostgreSql.Models;

public class AllowedEquipmentModel
{
    public string EquipmentCode { get; set; } = string.Empty;
    public int MinCount { get; set; }
    public int MaxCount { get; set; }
}