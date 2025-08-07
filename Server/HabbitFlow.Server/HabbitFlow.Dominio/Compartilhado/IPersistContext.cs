namespace HabbitFlow.Dominio.Compartilhado;
public interface IPersistContext
{
    Task<bool> SaveContextAsync();
}
