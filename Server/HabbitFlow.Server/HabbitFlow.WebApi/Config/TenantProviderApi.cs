using HabbitFlow.Dominio.ModuloAuth;
using System.Security.Claims;

namespace HabbitFlow.WebApi.Config;
public class TenantProviderApi : ITenantProvider
{
    readonly IHttpContextAccessor _httpContextAccessor;

    public TenantProviderApi(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public Guid UsuarioId
    {

        get
        {
            var claimId = _httpContextAccessor.HttpContext?.User.FindFirst(ClaimTypes.NameIdentifier);

                if (claimId is null)
                return Guid.Empty;

            return Guid.Parse(claimId.Value);
        }
    }
}