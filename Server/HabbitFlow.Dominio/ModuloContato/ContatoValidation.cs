using FluentValidation;
using HabbitFlow.Dominio.ModuloAuth;

namespace HabbitFlow.Dominio.ModuloContato;

public class ContatoValidation : AbstractValidator<Contato>
{
    public ContatoValidation()
    {
        RuleFor(x => x.Nome)
            .NotEmpty()
            .WithMessage("O nome é obrigatório.")
            .MinimumLength(2)
            .WithMessage("Tente não utilizar um nome tão curto")
            .NotNull();


        RuleFor(x => x.Email)
            .EmailAddress()
            .WithMessage("O formato do email é inválido.");

    }
}