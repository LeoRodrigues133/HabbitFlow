using AutoMapper;
using HabbitFlow.Dominio.ModuloCategoria;
using static HabbitFlow.WebApi.ViewModels.ModuloCategoria.CategoriaViewModels;

namespace HabbitFlow.WebApi.Config.Automapper;
public class CategoriaProfile : Profile
{
    public CategoriaProfile()
    {
        CreateMap<Categoria, ListarCategoriaViewModel>();

        CreateMap<CadastrarCategoriaViewModel, Categoria>()
            .ForMember(dest => dest.UsuarioId, opt => opt.MapFrom<UsuarioResolver>());

        CreateMap<EditarCategoriaViewModel, Categoria>();
    }
}