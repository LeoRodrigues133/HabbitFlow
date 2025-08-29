using HabbitFlow.Dominio.Compartilhado;
using HabbitFlow.Dominio.ModuloCategoria;
using HabbitFlow.Dominio.ModuloSubtarefa;

namespace HabbitFlow.Dominio.ModuloTarefa;

public class Tarefa : EntidadeBase<Tarefa>
{

    public Tarefa()
    {
        Subtarefas = new List<SubTarefa>();
    }

    public Tarefa(string titulo, Categoria? categoria) : this()
    {
        Titulo = titulo;
        Categoria = categoria;
    }

    public string Titulo { get; set; }

    public Categoria? Categoria { get; set; }
    public Guid CategoriaId {  get; set; }

    public List<SubTarefa> Subtarefas { get; set; }

    public void CadastrarSubTarefa(string titulo) =>
    Subtarefas.Add(new SubTarefa(titulo, this));

    public SubTarefa SelecionarSubtarefa(Guid id) =>
        Subtarefas.Find(x => x.Id == id)!;

    public void RemoverSubTarefa(Guid id) =>
        Subtarefas.Remove(this.SelecionarSubtarefa(id));

    public void ConcluirSubTarefa(SubTarefa subTarefa) =>
        subTarefa.Concluir();

    public void ReabrirSubTarefa(SubTarefa subTarefa) =>
        subTarefa.Reabrir();

    public override string ToString()
    {
        return Titulo;
    }
}