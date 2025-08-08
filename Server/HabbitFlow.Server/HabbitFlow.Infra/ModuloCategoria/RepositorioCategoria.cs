using HabbitFlow.Dominio.Compartilhado;
using HabbitFlow.Dominio.ModuloCategoria;
using HabbitFlow.Infra.Compartilhado;
using Microsoft.EntityFrameworkCore;

namespace HabbitFlow.Infra.ModuloCategoria;

public class RepositorioCategoria : RepositorioBase<Categoria>, IRepositorioCategoria
{
    public RepositorioCategoria(IPersistContext context) : base(context)
    {}

    public override Categoria SelecionarPorId(Guid id)
    {
        return _registros.Include(x => x.Compromissos).SingleOrDefault(x => x.Id == id)!;
    }

    public override List<Categoria> SelecionarTodos()
    {
        return _registros.Include(x => x.Compromissos).ToList();
    }
}