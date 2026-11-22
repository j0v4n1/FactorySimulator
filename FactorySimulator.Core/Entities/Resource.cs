namespace FactorySimulator.Core.Entities;

public class Resource
{
    public Resource(Guid id, string code, string name, string description, decimal basePrice)
    {
        Id = id;
        Code = code;
        Name = name;
        Description = description;
        BasePrice = basePrice;
    }

    public Guid Id { get; set; }
    public string Code { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public decimal BasePrice { get; set; }
}