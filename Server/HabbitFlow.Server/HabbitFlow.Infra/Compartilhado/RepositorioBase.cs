using HabbitFlow.Dominio.Compartilhado;
using Microsoft.EntityFrameworkCore;

namespace HabbitFlow.Infra.Compartilhado;

public class RepositorioBase<T> where T : EntidadeBase<T>
{
    protected DbSet<T> _registros;
    private readonly HabbitFlowDbContext _habbitFlowDbContext;

    public RepositorioBase(IPersistContext context)
    {
        _habbitFlowDbContext = (HabbitFlowDbContext)context;
        _registros = _habbitFlowDbContext.Set<T>();
    }

    public virtual async Task<bool> CadastrarAsync(T entity)
    {
        await _registros.AddAsync(entity);
        return true;
    }

    public virtual async Task<T> SelecionarPorIdAsync(Guid id)
    {
        return await _registros.SingleOrDefaultAsync(x => x.Id == id);
    }

    public virtual async Task<List<T>> SelecionarTodosAsync()
    {
        return await _registros.ToListAsync();
    }

    public virtual void Cadastrar(T entity)
    {
        _registros.Add(entity);
    }

    public virtual void Editar(T entity)
    {
        _registros.Update(entity);

        _habbitFlowDbContext.SaveChanges();
    }

    public virtual void Excluir(T entity)
    {
        _registros.Remove(entity);

        _habbitFlowDbContext.SaveChanges();
    }

    public virtual T SelecionarPorId(Guid id)
    {
        return _registros.SingleOrDefault(x => x.Id == id)!;
    }

    public virtual List<T> SelecionarTodos()
    {
        return _registros.ToList();
    }
}