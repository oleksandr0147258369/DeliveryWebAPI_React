using System.ComponentModel.DataAnnotations;

namespace Domain.Entities;

public interface IEntity<T>
{
    T Id { get; set; }
    bool IsDeleted { get; set; }
    DateTime CreatedOn { get; set; }
}

public abstract class BaseEntity<T> : IEntity<T>
{
    [Key]
    public T Id { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime CreatedOn { get; set; } = DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Utc);
}