using AutoMapper;
using HabbitFlow.Dominio.ModuloTarefa;
using static HabbitFlow.WebApi.ViewModels.ModuloTarefa.TarefaViewModels;

namespace HabbitFlow.WebApi.Config.Automapper;
public class TarefaProfile : Profile
{
    public TarefaProfile()
    {
        CreateMap<Tarefa, ListarTarefaViewModel>()
            .ForMember(dest => dest.qtSubtarefas, opt => opt.MapFrom(src => src.Subtarefas.Count));

        CreateMap<CadastrarTarefaViewModel, Tarefa>()
            .ForMember(dest => dest.UsuarioId, opt => opt.MapFrom<UsuarioResolver>());

        CreateMap<EditarTarefaViewModel, Tarefa>();
    }
}