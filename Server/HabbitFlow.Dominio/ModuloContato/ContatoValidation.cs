using FluentValidation;
using HabbitFlow.Dominio.ModuloAuth;

namespace HabbitFlow.Dominio.ModuloContato;

public class ContatoValidation : AbstractValidator<Contato>
{
    public ContatoValidation()
    {
        RuleFor(x => x.Nome)
            .NotEmpty()
            .WithMessage("O nome � obrigat�rio.")
            .MinimumLength(2)
            .WithMessage("Tente n�o utilizar um nome t�o curto")
            .NotNull();


        RuleFor(x => x.Email)
            .EmailAddress()
            .WithMessage("O formato do email � inv�lido.");

    }
}