using FluentValidation;

namespace HabbitFlow.Dominio.ModuloTarefa;

public class TarefaValidation : AbstractValidator<Tarefa>
{
    public TarefaValidation()
    {
        RuleFor(x => x.Titulo)
            .NotEmpty()
            .WithMessage("O titulo é obrigatório.")
            .NotNull();
    }
}