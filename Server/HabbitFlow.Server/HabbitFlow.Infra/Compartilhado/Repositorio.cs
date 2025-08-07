using HabbitFlow.Dominio.Compartilhado;
using Microsoft.EntityFrameworkCore;

namespace HabbitFlow.Infra.Compartilhado;

public class Repositorio<T> where T : EntidadeBase<T>
{
    protected HabbitFlowDbContext _habbitFlowDbContext;
    protected DbSet<T> _dbSet;

    public Repositorio(IPersistContext context)
    {
        this._habbitFlowDbContext = (HabbitFlowDbContext?)context;
        this._dbSet = _habbitFlowDbContext.Set<T>();
    }

    public virtual async Task<bool> CadastrarAsync(T entity)
    {
        await _dbSet.AddAsync(entity);

        await _habbitFlowDbContext.SaveChangesAsync();

        return true;
    }

    public virtual async Task<T> SelecionarPorIdAsync(Guid id)
    {
        return await _dbSet.SingleOrDefaultAsync(x => x.Id == id);
    }

    public virtual async Task<List<T>> SelecionarTodosAsync()
    {
        return await _dbSet.ToListAsync();
    }

    public virtual void Cadastrar(T entity)
    {
        _dbSet.Add(entity);
    }

    public virtual void Editar(T entity)
    {
        _dbSet.Update(entity);

        _habbitFlowDbContext.SaveChanges();
    }

    public virtual void Excluir(T entity)
    {
        _dbSet.Remove(entity);

        _habbitFlowDbContext.SaveChanges();
    }

    public virtual T SelecionarPorId(Guid id)
    {
        return _dbSet.SingleOrDefault(x => x.Id == id)!;
    }

    public virtual List<T> SelecionarTodos()
    {
        return _dbSet.ToList();
    }
}