namespace HabbitFlow.Dominio.Compartilhado;
public interface IRepositorio<T> where T : EntidadeBase
{
    Task<bool> CadastrarAsync(T entity);
    Task<T> SelecionarPorIdAsync(Guid Id);
    Task<List<T>> SelecionarTodosAsync();

    void Cadastrar(T entity);
    void Editar(T entity);
    void Excluir(T entity);

    T SelecionarPorId(Guid Id);
    List<T> SelecionarTodos();

}
