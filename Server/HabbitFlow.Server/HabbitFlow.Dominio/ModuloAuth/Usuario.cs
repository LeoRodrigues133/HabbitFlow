using Microsoft.AspNetCore.Identity;

namespace HabbitFlow.Dominio.ModuloAuth;

public class Usuario : IdentityUser<Guid>
{
    public Usuario()
    {
        EmailConfirmed = true;
    }
}