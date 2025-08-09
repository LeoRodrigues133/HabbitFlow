using AutoMapper;
using System.Security.Claims;

namespace HabbitFlow.WebApi.Config.Automapper;

public class UsuarioResolver : IValueResolver<Object, Object, Guid>
{
    readonly IHttpContextAccessor _contextAccessor;
    public UsuarioResolver(IHttpContextAccessor contextAccessor)
    {
        _contextAccessor = contextAccessor;
    }

    public Guid Resolve(Object source, Object destination, Guid destMember, ResolutionContext context)
    {
        return Guid.Parse(_contextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value);
    }


}