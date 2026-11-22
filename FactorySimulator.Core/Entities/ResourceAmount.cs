namespace FactorySimulator.Core.Entities;

public class ResourceAmount
{
    public ResourceAmount(Resource resource, int amount)
    {
        Resource = resource;
        Amount = amount;
    }

    public Resource Resource { get; set; }
    public int Amount { get; set; }
}