using System.Text.Json.Serialization;
using Taikandi;
using HabbitFlow.Dominio.ModuloTarefa;

namespace HabbitFlow.Dominio.ModuloSubtarefa;

public class SubTarefa
{
    public SubTarefa()
    {
        Id = SequentialGuid.NewGuid();
    }

    public SubTarefa(
        string titulo,
        Tarefa tarefa,
        bool finalizada = false) 
        : this()
    {
        Titulo = titulo;
        Tarefa = tarefa;
        Finalizada = finalizada;
    }

    public Guid Id { get; set; }
    public string Titulo { get; set; }
    public bool Finalizada { get; set; } 

    private Tarefa? _tarefa;

    [JsonIgnore]
    public Tarefa? Tarefa
    {
        get => _tarefa;
        set
        {
            _tarefa = value;
            TarefaId = _tarefa?.Id;
        }
    }
    public Guid? TarefaId { get; set; }

    // Talvez eu use esse aqui
    public void MudarStatusTarefa() =>
        Finalizada = !Finalizada;

    public void Concluir() =>
        Finalizada = true;

    public void Reabrir() =>
        Finalizada = false;

    public override string ToString()
    {
        return Titulo;
    }
}
