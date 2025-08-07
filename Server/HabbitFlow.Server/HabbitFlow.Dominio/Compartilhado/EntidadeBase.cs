using HabbitFlow.Dominio.ModuloAuth;
using Taikandi;

namespace HabbitFlow.Dominio.Compartilhado;

public abstract class EntidadeBase<T>
{
    public Guid Id { get; set; }

    protected EntidadeBase()
    {
        Id = SequentialGuid.NewGuid();
    }

    public Usuario? Usuario { get; set; }
    public Guid usuarioId { get; set; }
}