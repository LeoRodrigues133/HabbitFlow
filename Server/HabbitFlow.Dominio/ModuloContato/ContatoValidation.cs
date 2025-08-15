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
            .Matches
            (@"/ ^ [a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/")
            .WithMessage("O formato do email � inv�lido.");
        // Retirado de https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address
        // regex para email
        // Formatos aceitos
        // usuario @dominio.com
        // usuario.silva @empresa.com.br
        // joao123@provedor.net
        // user @sub.dominio.com
        // user@sub1.sub2.dominio.com
        // user@localhost
        // user@intranet
    }
}