using FluentValidation;

namespace HabbitFlow.Dominio.ModuloCategoria;

public class CategoriaValidation : AbstractValidator<Categoria>
{
    public CategoriaValidation()
    {
        RuleFor(x => x.Titulo).NotEmpty()
                              .WithMessage("O t�tulo da categoria � obrigat�rio.")
                              .MinimumLength(3)
                              .WithMessage("O t�tulo deve conter ao menos 3 caracteres.");
    }
}