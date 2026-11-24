using FactorySimulator.Core.Enum;

namespace FactorySimulator.Infrastructure.Persistence.PostgreSql.Models;

public class DepositModel
{
    public Guid Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    // Какой ресурс добывается
    public Guid ResourceId { get; set; }

    // Запасы месторождения
    public long TotalReserves { get; set; }

    // Оставшиеся запасы
    public long RemainingReserves { get; set; }

    // Удалённость от корпорации
    public Distance Distance { get; set; }

    // Стоимость аренды в месяц
    public decimal RentPrice { get; set; }

    // Стоимость выкупа
    public decimal PurchasePrice { get; set; }

    // Принадлежит ли месторождение корпорации
    public bool IsOwned { get; set; }

    // Используется ли месторождение
    public bool IsLeased { get; set; }

    // Привязанное добывающее предприятие
    public Guid? EnterpriseId { get; set; }
}