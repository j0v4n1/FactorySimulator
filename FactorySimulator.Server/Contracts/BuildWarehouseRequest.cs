namespace FactorySimulator.Server.Contracts;

public class BuildWarehouseRequest
{
    public string Id { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Code { get; set; } = string.Empty;
    public string Size { get; set; } = string.Empty;
    public string? EnterpriseId { get; set; }
    public decimal? RentPrice { get; set; }
    public decimal? BuildPrice { get; set; }
    public string Distance { get; set; } = string.Empty;
}