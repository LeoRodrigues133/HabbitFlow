using HabbitFlow.Dominio.Compartilhado;

namespace HabbitFlow.Dominio.ModuloTarefa;

public interface IRepositorioTarefa : IRepositorio<Tarefa>
{
    Task<List<Tarefa>> Filtrar(Func<Tarefa, bool> predicate);
}