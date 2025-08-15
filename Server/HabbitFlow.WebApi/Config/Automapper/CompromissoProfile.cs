using AutoMapper;
using HabbitFlow.Dominio.ModuloCompromisso;
using static HabbitFlow.WebApi.ViewModels.ModuloCompromisso.CompromissoViewModels;

namespace HabbitFlow.WebApi.Config.Automapper;
public class CompromissoProfile : Profile
{
    public CompromissoProfile()
    {
        CreateMap<Compromisso, ListarCompromissoViewModel>();

        CreateMap<CadastrarCompromissoViewModel, Compromisso>()
            .ForMember(dest => dest.UsuarioId, opt => opt.MapFrom<UsuarioResolver>());

        CreateMap<EditarCompromissoViewModel, Compromisso>();
    }
}