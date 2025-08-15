using FluentValidation;
using HabbitFlow.Dominio.ModuloCategoria;
using HabbitFlow.Dominio.ModuloCompromisso;

namespace HabbitFlow.Aplicacao.ModuloCompromisso;

public class CompromissoValidation : AbstractValidator<Compromisso>
{
    public CompromissoValidation()
    {
        RuleFor(x => x.Conteudo)
            .NotEmpty()
            .WithMessage("O conteudo do compromisso é obrigatório.")
            .MinimumLength(3)
            .WithMessage("O conteudo deve conter ao menos 3 caracteres.")
            .MaximumLength(100)
            .WithMessage("O conteudo deve conter no máximo 100 caracteres.");

        RuleFor(x => x.Data)
            .NotEmpty()
            .WithMessage("A data do compromisso é obrigatória.")
            .Must(data => data >= DateTime.Today)
            .WithMessage("A data do compromisso deve ser futura.");

        RuleFor(x => x.Local)
            .NotEmpty()
            .When(x => x.TipoEnum == TipoCompromissoEnum.Presencial)
            .WithMessage("O local é obrigatório para compromissos presenciais.");

        RuleFor(x => x.Link)
            .NotEmpty()
            .When(x => x.TipoEnum == TipoCompromissoEnum.Remoto)
            .WithMessage("O link é obrigatório para compromissos remotos.");

        When(x => x.TipoEnum == TipoCompromissoEnum.Remoto, () =>
        {
            RuleFor(x => x.Link)
                .Matches(@"[(http(s) ?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)") // Regex para url
               .NotNull()
               .NotEmpty();

        }).Otherwise(() =>
        {

            RuleFor(x => x.Local)
                .NotNull()
                .NotEmpty();
        });

    }
}