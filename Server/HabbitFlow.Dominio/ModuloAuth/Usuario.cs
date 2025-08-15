using Microsoft.AspNetCore.Identity;
using Taikandi;

namespace HabbitFlow.Dominio.ModuloAuth;

public class Usuario : IdentityUser<Guid>
{
    public Usuario()
    {
        Id = SequentialGuid.NewGuid();
        EmailConfirmed = true;
    }

    public string Nome { get; set; }
}