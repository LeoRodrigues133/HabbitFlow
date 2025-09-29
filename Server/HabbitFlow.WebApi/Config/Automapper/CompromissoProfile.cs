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

        CreateMap<Compromisso, ListarCompromissoViewModel>()
                          .ForMember(destino => destino.Data, opt => opt.MapFrom(origem => origem.Data.ToShortDateString()))
                          .ForMember(destino => destino.Hora, opt => opt.MapFrom(origem => origem.Hora.ToString()));

        CreateMap<EditarCompromissoViewModel, Compromisso>();
    }
}