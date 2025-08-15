using AutoMapper;
using HabbitFlow.Dominio.ModuloAuth;
using static HabbitFlow.WebApi.ViewModels.ModuloAuth.AuthViewModels;

namespace HabbitFlow.WebApi.Config.Automapper;

internal class UsuarioProfile : Profile
{
    public UsuarioProfile()
    {
        CreateMap<RegistrarUsuarioViewModel, Usuario>()
            .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.Login));
    }
}