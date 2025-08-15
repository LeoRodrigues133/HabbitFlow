using HabbitFlow.Dominio.Compartilhado;

namespace HabbitFlow.Dominio.ModuloCompromisso;
public interface IRepositorioCompromisso :  IRepositorio<Compromisso>
{
    List<Compromisso> SelecionarCompromissosFuturo(DateTime dataInicial, DateTime dataFinal);
    List<Compromisso> SelecionarCompromissosPasados(DateTime hoje);
}
