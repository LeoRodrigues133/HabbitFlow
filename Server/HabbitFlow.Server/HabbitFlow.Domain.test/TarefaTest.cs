
using HabbitFlow.Dominio.ModuloTarefa;

namespace HabbitFlow.Dominio.Tests.ModuloTarefa
{
    [TestClass]
    public class TarefaTest
    {
        [TestMethod]
        public void Deve_cadastrar_subtarefa()
        {
            // arrange
            var tarefa = new Tarefa("Tarefa teste");

            // act
            tarefa.CadastrarSubTarefa("Sub 1");

            // assert
            Assert.AreEqual(1, tarefa.Subtarefas.Count);
            Assert.AreEqual("Sub 1", tarefa.Subtarefas[0].Titulo);
        }

        [TestMethod]
        public void Deve_selecionar_subtarefa_por_id()
        {
            var tarefa = new Tarefa("Tarefa");
            tarefa.CadastrarSubTarefa("Sub 1");
            tarefa.CadastrarSubTarefa("Sub 2");

            var subId = tarefa.Subtarefas[1].Id;

            var subEncontrada = tarefa.SelecionarSubtarefa(subId);

            Assert.IsNotNull(subEncontrada);
            Assert.AreEqual(subId, subEncontrada.Id);
        }

        [TestMethod]
        public void Deve_remover_subtarefa()
        {
            var tarefa = new Tarefa("Tarefa");
            tarefa.CadastrarSubTarefa("Sub 1");

            var subId = tarefa.Subtarefas[0].Id;

            tarefa.RemoverSubTarefa(subId);

            Assert.AreEqual(0, tarefa.Subtarefas.Count);
        }

        [TestMethod]
        public void Deve_concluir_subtarefa()
        {
            var tarefa = new Tarefa("Tarefa");
            tarefa.CadastrarSubTarefa("Sub 1");

            var sub = tarefa.Subtarefas[0];

            tarefa.ConcluirSubTarefa(sub);

            Assert.IsTrue(sub.Finalizada);
        }

        [TestMethod]
        public void Deve_reabrir_subtarefa()
        {
            var tarefa = new Tarefa("Tarefa");
            tarefa.CadastrarSubTarefa("Sub 1");

            var sub = tarefa.Subtarefas[0];
            sub.Concluir();

            tarefa.ReabrirSubTarefa(sub);

            Assert.IsFalse(sub.Finalizada);
        }

        [TestMethod]
        public void ToString_deve_retornar_titulo_da_tarefa()
        {
            // arrange
            var tarefa = new Tarefa("Minha tarefa");

            // act
            var desc = tarefa.ToString();

            // assert
            Assert.AreEqual("Minha tarefa", desc);
        }
    }
}