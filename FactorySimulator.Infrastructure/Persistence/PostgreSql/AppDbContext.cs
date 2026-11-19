using FactorySimulator.Infrastructure.Persistence.PostgreSql.Models;
using Microsoft.EntityFrameworkCore;

namespace FactorySimulator.Infrastructure.Persistence.PostgreSql;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<ConstructionModel> Constructions { get; set; }
    public DbSet<EnterpriseModel> Enterprises { get; set; }
    public DbSet<EquipmentModel> Equipments { get; set; }
    public DbSet<RecipeModel> Recipes { get; set; }
    public DbSet<ResourceModel> Resources { get; set; }
    public DbSet<WarehouseTypesModel> WarehouseTypes { get; set; }
    public DbSet<WarehousesModel> Warehouses { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<ConstructionModel>(entity =>
        {
            entity.HasKey(x => x.Id);
            entity.OwnsOne(x => x.AllowedEquipment, builder => builder.ToJson());
        });
        modelBuilder.Entity<EnterpriseModel>(entity => { entity.HasKey(x => x.Id); });
        modelBuilder.Entity<EquipmentModel>(entity => { entity.HasKey(x => x.Id); });
        modelBuilder.Entity<RecipeModel>(entity =>
        {
            entity.HasKey(x => x.Id);
            entity.Property(x => x.Id).HasDefaultValueSql("gen_random_uuid()");
            entity.OwnsMany(x => x.Inputs, builder => builder.ToJson());
        });
        modelBuilder.Entity<ResourceModel>(entity =>
        {
            entity.HasKey(x => x.Id);
            entity.Property(x => x.Id).HasDefaultValueSql("gen_random_uuid()");
        });
        modelBuilder.Entity<WarehouseTypesModel>(entity =>
        {
            entity.HasKey(x => x.Id);
            entity.Property(x => x.Id).HasDefaultValueSql("gen_random_uuid()");
        });
        modelBuilder.Entity<WarehousesModel>(entity =>
        {
            entity.HasKey(x => x.Id);
            entity.OwnsMany(x => x.Items, builder => builder.ToJson());
        });
    }
}