using HabbitFlow.Dominio.Compartilhado;
using HabbitFlow.Dominio.ModuloCompromisso;
using HabbitFlow.Infra.Compartilhado;
using Microsoft.EntityFrameworkCore;

namespace HabbitFlow.Infra.ModuloCompromisso;

public class RepositorioCompromisso : RepositorioBase<Compromisso>, IRepositorioCompromisso
{
    public RepositorioCompromisso(IPersistContext context) : base(context)
    {}
    public override async Task<Compromisso> SelecionarPorIdAsync(Guid id)
    {
        return _registros
            .Include(x => x.Contato)
            .SingleOrDefault(x => x.Id == id);
    }

    public override async Task<List<Compromisso>> SelecionarTodosAsync()
    {
        return _registros
            .Include(x => x.Contato)
            .ToList();
    }

    public List<Compromisso> SelecionarCompromissosFuturo(DateTime dataInicial, DateTime dataFinal)
    {
        return _registros
            .Include(x => x.Contato)
            .Where(x => x.Data >= dataInicial)
            .Where(x => x.Data <= dataFinal)
            .ToList();
    }

    public List<Compromisso> SelecionarCompromissosPasados(DateTime hoje)
    {
        return _registros
            .Include(x => x.Contato)
            .Where(x => x.Data < hoje)
            .ToList();
    }
}