using AutoMapper;
using HabbitFlow.Dominio.ModuloContato;
using static HabbitFlow.WebApi.ViewModels.ModuloContato.ContatoViewModels;

namespace HabbitFlow.WebApi.Config.Automapper;
public class ContatoProfile :  Profile
{
    public ContatoProfile()
    {
        CreateMap<Contato, ListarContatoViewModel>();

        CreateMap<CadastrarContatoViewModel, Contato>()
            .ForMember(dest => dest.UsuarioId, opt => opt.MapFrom<UsuarioResolver>());

        CreateMap<EditarContatoViewModel, Contato>();

    }
}