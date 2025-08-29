using HabbitFlow.Dominio.Compartilhado;
using HabbitFlow.Dominio.ModuloCategoria;
using HabbitFlow.Infra.Compartilhado;
using Microsoft.EntityFrameworkCore;

namespace HabbitFlow.Infra.ModuloCategoria;

public class RepositorioCategoria : RepositorioBase<Categoria>, IRepositorioCategoria
{
    public RepositorioCategoria(IPersistContext context) : base(context)
    {}

    public override async Task<Categoria> SelecionarPorIdAsync(Guid id)
    {
        return _registros
        .Include(x => x.Tarefas)
        .Include(x => x.Compromissos)
        .SingleOrDefault(x => x.Id == id)!;
    }

    public override async Task<List<Categoria>> SelecionarTodosAsync()
    {
        return _registros
        .Include(x => x.Tarefas)
        .Include(x => x.Compromissos)
        .ToList();
    }
}