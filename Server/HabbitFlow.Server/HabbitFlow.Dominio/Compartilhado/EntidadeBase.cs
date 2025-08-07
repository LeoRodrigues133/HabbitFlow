using HabbitFlow.Dominio.ModuloAuth;

namespace HabbitFlow.Dominio.Compartilhado;

public abstract class EntidadeBase
{
    public Guid Id { get; set; }

    protected EntidadeBase()
    {
        Id = Guid.NewGuid();
    }

    public Usuario? Usuario { get; set; }
    public Guid usuarioId { get; set; }
}