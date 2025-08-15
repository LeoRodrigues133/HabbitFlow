using FluentValidation;

namespace HabbitFlow.Dominio.ModuloAuth;

public class UsuarioValidation : AbstractValidator<Usuario>
{
    public UsuarioValidation()
    {
        RuleFor(x => x.Nome)
            .NotEmpty()
            .WithMessage("O usuário deve conter nome.")
            .NotNull();
    }
}