namespace HabbitFlow.WebApi.ViewModels.ModuloAuth;
public abstract class AuthViewModels
{
    public class RegistrarUsuarioViewModel
    {
        public string Nome { get; set; }

        public string Login { get; set; }

        public string Email { get; set; }

        public string Senha { get; set; }
    }

    public class AutenticarUsuarioViewModel
    {
        public string Login { get; set; }

        public string Senha { get; set; }
    }

    public class TokenViewModel
    {
        public string Chave { get; set; }

        public DateTime DataExpiracao { get; set; }

        public UsuarioTokenViewModel Usuario { get; set; }
    }

    public class UsuarioTokenViewModel
    {
        public Guid Id { get; set; }

        public string Login { get; set; }

        public string Nome { get; set; }

        public string Email { get; set; }
    }
}
