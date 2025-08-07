namespace HabbitFlow.Dominio.Compartilhado;
public interface IPersistContext
{
    void UndoContextChanges();
    void SaveContextChanges();
    Task<bool> SaveContextAsync();
}
