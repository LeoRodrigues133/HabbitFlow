using FluentValidation;
using HabbitFlow.Dominio.ModuloSubtarefa;

namespace HabbitFlow.Dominio.ModuloTarefa;

public class SubtarefaValidation : AbstractValidator<SubTarefa>
{
    public SubtarefaValidation()
    {
        RuleFor(x => x.Titulo)
            .NotEmpty()
            .WithMessage("O titulo é obrigatório.")
            .NotNull();
    }
}