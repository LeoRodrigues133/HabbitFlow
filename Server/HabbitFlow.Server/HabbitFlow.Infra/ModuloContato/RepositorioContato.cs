using HabbitFlow.Dominio.Compartilhado;
using HabbitFlow.Dominio.ModuloContato;
using HabbitFlow.Infra.Compartilhado;
using Microsoft.EntityFrameworkCore;

namespace HabbitFlow.Infra.ModuloContato;

public class RepositorioContato : RepositorioBase<Contato>
{
    public RepositorioContato(IPersistContext context) : base(context)
    {
    }

    public override Contato SelecionarPorId(Guid id)
    {
        return _registros.Include(x=>x.Compromissos).SingleOrDefault( x=> x.Id == id);
    }

    public override List<Contato> SelecionarTodos()
    {
        return _registros.Include(x => x.Compromissos).ToList();
    }
}