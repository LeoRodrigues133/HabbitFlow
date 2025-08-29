using HabbitFlow.Dominio.Compartilhado;
using HabbitFlow.Dominio.ModuloTarefa;
using HabbitFlow.Infra.Compartilhado;
using Microsoft.EntityFrameworkCore;

namespace HabbitFlow.Infra.ModuloTarefa;

public class RepositorioTarefa : RepositorioBase<Tarefa>, IRepositorioTarefa
{
    public RepositorioTarefa(IPersistContext context) : base(context)
    {
    }

    public override async Task<Tarefa >SelecionarPorIdAsync(Guid id)
    {
        return  _registros
            .Include(x=> x.Categoria)
            .Include(x => x.Subtarefas)
            .SingleOrDefault(x=>x.Id == id);
    }

    public override async  Task<List<Tarefa>> SelecionarTodosAsync()
    {
        return _registros
            .Include(x=> x.Categoria)
            .Include(x =>x.Subtarefas).ToList();
    }

    public Task<List<Tarefa>> Filtrar(Func<Tarefa, bool> predicate)
    {
        throw new NotImplementedException();
    }
}