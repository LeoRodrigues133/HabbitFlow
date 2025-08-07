using FluentValidation;

namespace HabbitFlow.Dominio.ModuloCategoria;

public class CategoriaValidation : AbstractValidator<Categoria>
{
    public CategoriaValidation()
    {
        RuleFor(x => x.Titulo).NotEmpty()
                              .WithMessage("O título da categoria é obrigatório.")
                              .MinimumLength(3)
                              .WithMessage("O título deve conter ao menos 3 caracteres.");
    }
}