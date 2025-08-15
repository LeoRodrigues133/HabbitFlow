using AutoMapper;
using HabbitFlow.Dominio.ModuloSubtarefa;
using HabbitFlow.WebApi.ViewModels.ModuloTarefa;
using static HabbitFlow.WebApi.ViewModels.ModuloTarefa.SubtarefasViewModels;

namespace HabbitFlow.WebApi.Config.Automapper;
public class SubtarefaProfile : Profile
{
    public SubtarefaProfile()
    {
        CreateMap<SubTarefa, ListarSubtarefaViewModel>();

        CreateMap<CadastrarSubtarefaViewModel, SubTarefa>()
            .ForMember(dest => dest.TarefaId, opt => opt.MapFrom(x => x.tarefaId));

        CreateMap<EditarSubtarefaViewModel, SubTarefa>()
            .ForMember(dest => dest.TarefaId, opt => opt.MapFrom(x => x.tarefaId));

    }
}