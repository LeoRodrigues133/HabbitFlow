using FluentValidation;

namespace HabbitFlow.Dominio.ModuloAuth;

public class UsuarioValidation : AbstractValidator<Usuario>
{
    public UsuarioValidation()
    {
        RuleFor(x => x.Nome)
            .NotEmpty()
            .WithMessage("O usu�rio deve conter nome.")
            .NotNull();
    }
}