using HabbitFlow.Dominio.ModuloAuth;
using HabbitFlow.Dominio.ModuloCategoria;
using HabbitFlow.Infra.Compartilhado;
using HabbitFlow.Infra.ModuloCategoria;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace HabbitFlow.Infra.Tests.CategoriaTest;

[TestClass]
public class RepositorioCategoriaTest
{
    private HabbitFlowDbContext db;
    private Usuario usuario;

    [TestInitialize]
    public void Initialize()
    {
        var builder = new DbContextOptionsBuilder<HabbitFlowDbContext>();

        var config = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json")
            .Build();

        var connectionString = config.GetConnectionString("SqlServer");

        builder.UseSqlServer(connectionString);


        db = new HabbitFlowDbContext(builder.Options);

        db.Database.Migrate();

        db.Set<Categoria>().RemoveRange(db.Set<Categoria>());
        db.Users.RemoveRange(db.Users);
        db.SaveChanges();

        usuario = CriarUsuario();
    }

    [TestMethod]
    public void Deve_Cadastrar_Categoria()
    {
        var repositorio = new RepositorioCategoria(db);


        //arrange
        Categoria novaCategoria = new Categoria("Categoria Test Integração")
        {
            UsuarioId = usuario.Id
        };

        //act
        repositorio.Cadastrar(novaCategoria);

        db.SaveChanges();

        var teste = repositorio.SelecionarTodos();

        //assert
        Categoria categoriaSelecionada = repositorio.SelecionarPorId(novaCategoria.Id);

        Assert.IsNotNull(novaCategoria);
        Assert.AreEqual(novaCategoria, categoriaSelecionada);
    }

    [TestMethod]
    public void Deve_Editar_Categoria()
    {
        var repositorio = new RepositorioCategoria(db);

        //arrange
        Categoria novaCategoria = new Categoria("Categoria teste edição")
        {
            UsuarioId = usuario.Id
        };

        repositorio.Cadastrar(novaCategoria);

        db.SaveChanges();

        Categoria categoriaAtualizada = repositorio.SelecionarPorId(novaCategoria.Id);

        categoriaAtualizada.Titulo = "Categoria Editada";

        //act
        repositorio.Editar(categoriaAtualizada);

        db.SaveChanges();

        //assert
        Categoria categoriaSelecionada = repositorio.SelecionarPorId(novaCategoria.Id);

        Assert.IsNotNull(categoriaSelecionada);
        Assert.AreEqual(categoriaAtualizada.Id, categoriaSelecionada.Id);
        Assert.AreEqual("Categoria Editada", categoriaSelecionada.Titulo);
    }

    [TestMethod]
    public void Deve_Excluir_Categoria()
    {
        var repositorio = new RepositorioCategoria(db);

        //arrange
        Categoria novaCategoria = new Categoria("Categoria teste Exclusão")
        {
            UsuarioId = usuario.Id
        };

        repositorio.Cadastrar(novaCategoria);

        db.SaveChanges();

        Categoria categoriaExcluida = repositorio.SelecionarPorId(novaCategoria.Id);

        //act
        repositorio.Excluir(categoriaExcluida);
        db.SaveChanges();

        //assert
        Categoria categoriaSelecionada = repositorio.SelecionarPorId(categoriaExcluida.Id);

        Assert.IsNull(categoriaSelecionada);
    }

    [TestMethod]
    public void Deve_Selecionar_Todas_As_Categoria()
    {
        var repositorio = new RepositorioCategoria(db);

        var categoriasParaCadastrar = new List<Categoria>();

        //arrange
        Categoria novaCategoria1 = new Categoria("Categoria teste Seleção 1");
        categoriasParaCadastrar.Add(novaCategoria1);
        Categoria novaCategoria2 = new Categoria("Categoria teste Seleção 2");
        categoriasParaCadastrar.Add(novaCategoria2);
        Categoria novaCategoria3 = new Categoria("Categoria teste Seleção 3");
        categoriasParaCadastrar.Add(novaCategoria3);

        foreach (var c in categoriasParaCadastrar)
        {
            c.UsuarioId = usuario.Id;
            repositorio.Cadastrar(c);
        }

        db.SaveChanges();

        //act
        var categorias = repositorio.SelecionarTodos();

        //assert
        Assert.IsTrue(categorias.Count > 0);
        Assert.AreEqual(3, categorias.Count());
    }

    private Usuario CriarUsuario()
    {
        var usuario = new Usuario
        {
            Nome = "teste",
            Email = "teste@teste.com"
        };

        db.Users.Add(usuario);

        db.SaveChanges();

        return usuario;
    }
}
