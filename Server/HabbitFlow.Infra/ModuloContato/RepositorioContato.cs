using HabbitFlow.Dominio.Compartilhado;
using HabbitFlow.Dominio.ModuloContato;
using HabbitFlow.Infra.Compartilhado;
using Microsoft.EntityFrameworkCore;

namespace HabbitFlow.Infra.ModuloContato;

public class RepositorioContato : RepositorioBase<Contato>, IRepositorioContato
{
    public RepositorioContato(IPersistContext context) : base(context)
    {
    }

    public override async Task<Contato> SelecionarPorIdAsync(Guid id)
    {
        return _registros.Include(x => x.Compromissos).SingleOrDefault(x => x.Id == id);
    }

    public override async Task<List<Contato>> SelecionarTodosAsync()
    {
        return _registros.Include(x => x.Compromissos).ToList();
    }
}