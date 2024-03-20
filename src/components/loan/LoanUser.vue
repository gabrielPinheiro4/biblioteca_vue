<template>
    <div class="loanUser container py-5">
        <div class="row">
            <div class="col">
                <h1>Fazer Empréstimo</h1>
            </div>
        </div>

        <form class="mt-4" action="">
          <div class="row mb-3">
            <div class="col">
              <label for="cpfCliente">CPF</label>

              <input
              @change="selecionarCPF()"
              v-maska
              data-maska="###.###.###-##"
              v-model.trim="cpfCliente"
              type="text"
              id="cpfCliente"
              class="form-control">

            </div>
          </div>

            <div class="row mb-3">
              <div class="col">
                <label for="nomeCliente">Nome do cliente</label>

                <input
                disabled
                readonly
                v-model="nomeCliente"
                type="text"
                id="nomeCliente"
                class="form-control">

              </div>
            </div>

            <div class="row mb-3">
              <div class="col">
                <label for="usuarioCliente">Usuário</label>

                <input
                disabled readonly
                v-model="usuarioCliente"
                type="text"
                id="usuarioCliente"
                class="form-control">

              </div>
            </div>

            <div class="row mb-3">
              <div class="col">
                <label for="nomeLivro">Nome do livro</label>

                <input
                v-model.trim="nomeLivro"
                type="text"
                id="nomeLivro"
                class="form-control">

              </div>
            </div>

            <div class="row">
              <div class="col">
                <button
                @click.prevent="fazerEmprestimo()"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                class="btn btn-primary">Fazer Empréstimo
                </button>

                <button
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                @click.prevent="renovarEmprestimo()"
                class="btn btn-primary ms-3">Renovar Empréstimo
                </button>

                  <div
                  class="modal fade"
                  id="exampleModal"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true">

                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">

                          <h1
                          class="modal-title fs-5"
                          id="exampleModalLabel">{{ tituloModal }}
                          </h1>

                          <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close">
                          </button>

                        </div>
                        <div class="modal-body">
                          {{ mensagemModal }}
                        </div>
                        <div class="modal-footer">

                          <button
                          type="button"
                          class="btn btn-primary"
                          data-bs-dismiss="modal">Fechar
                          </button>

                        </div>
                      </div>
                    </div>
                </div>
              </div>
            </div>
        </form>
    </div>
</template>

<script>
/* eslint-disable */
import { ref } from 'vue'
import moment from 'moment'
import { removeAcentos } from '@/funcoes'
import { vMaska } from 'maska'

export default {
  name: 'LoanUser',
  directives: {
    maska: vMaska
  },

  setup () {

    // Variaveis p guardar os valores salvos no local storage
    const livros = JSON.parse(localStorage.getItem('livros'))
    const usuarios = JSON.parse(localStorage.getItem('usuarios'))

    // Variaveis para receber os valores dos campos inputs
    const nomeCliente = ref('')
    const nomeLivro = ref('')
    const usuarioCliente = ref('')
    const userSelecionado = ref([])
    const cpfCliente = ref('')

    //Variaveis para as mensagens no modal
    const tituloModal = ref('')
    const mensagemModal = ref('')

    const tituloModalError = 'Livro ou usuário não encontrado'
    const descModalError = 'O livro ou usuário que você digitou não consta ' +
                           'no sistema, verifique novamente os dados digitados'

    function selecionarCPF () {
      const usuarioSelecionado = usuarios.filter((usuario) => {
        return usuario.cpf === cpfCliente.value
      })

      if (usuarioSelecionado.length > 0) {
        userSelecionado.value = usuarioSelecionado[0]
        nomeCliente.value = usuarioSelecionado[0].nome
        usuarioCliente.value = usuarioSelecionado[0].usuario
      }
    }

    function fazerEmprestimo () {

      // Removendo acentuação e dexando em lower case o valor do input
      // nomeLivro
      const livroEmprestimo = removeAcentos(nomeLivro.value).toLowerCase()

      // Data da devolução
      const dataD = moment().add(7, 'days').format('YYYY-MM-DD')

      // Retona um array com o livro selecionado
      const livroSelecionado = livros.filter((livro) => {
        const tituloNormalize = removeAcentos(livro.titulo).toLowerCase()
        
        return tituloNormalize.includes(livroEmprestimo)
      })

      // Retorna um array com o usuario selecionado
      const usuarioSelecionado = usuarios.filter((usuario) => {

        return usuario.cpf === cpfCliente.value
      })

      // Entra se o array do livro ou usuario for vazio
      if (livroSelecionado.length <= 0 || usuarioSelecionado.length <= 0) {
        tituloModal.value = tituloModalError
        mensagemModal.value = descModalError

      // Entra se a quentidade do livro no estoque for menor ou igual a zero
      } else if (parseInt(livroSelecionado[0].quantidade) <= 0) {
        tituloModal.value = 'Livro indisponível'

        mensagemModal.value = 'O livro não tem quantidade suficiente para '+
                              'realizar um empréstimo'

      } else if (livroEmprestimo === '' || cpfCliente.value === '') {
        tituloModal.value = 'Campos não preenchidos'
        mensagemModal.value = 'Preencha todos os campos para realizar o ' +
                              'empréstimo'

      } else {
        tituloModal.value = 'Empréstimo feito com sucesso'

        mensagemModal.value = `Empréstimo feito com sucesso, o(a) `+
                              `${usuarioSelecionado[0].nome} deve devolver o `+
                              `livro "${livroSelecionado[0].titulo}" até `+
                              `${dataD}`

        // Variavel para guardar a quantidade do livro
        let qnt = parseInt(livroSelecionado[0].quantidade)
        qnt -= 1

        // Cria um novo objeto igual ao livro selecionado, porém adicionando
        // a chave dataDevolucao
        const novoLivro = Object.assign(
          {}, livroSelecionado[0], {dataDevolucao: dataD}
        )

        // Cria um novo objeto igual ao livro selecionado, porém mudando o valor
        // da chave quantidade
        const livroAtt = Object.assign(
          {}, livroSelecionado[0], {quantidade: qnt.toString()}
        )

        // Remove o livro selecionado do array e adiciona o livro com o valor
        // alterado
        livros.splice(livros.indexOf(livroSelecionado[0]), 1, livroAtt)

        // Adiciona o livro alterao no array 'livrosEmprestimos' do usuario
        usuarioSelecionado[0].livrosEmprestimos.push(novoLivro)

        // Salva as alterações no local storage
        localStorage.setItem('usuarios', JSON.stringify(usuarios))
        localStorage.setItem('livros', JSON.stringify(livros))
      }
    }

    function renovarEmprestimo () {

      // Retorna o usuário selecionado
      const usuarioSelecionado = usuarios.filter((usuario) => {

        return usuario.cpf === cpfCliente.value
      })

      const livroSelecionado = livros.filter((livro) => {
        const tituloNormalize = removeAcentos(livro.titulo).toLowerCase()
        
        return tituloNormalize.includes(livroEmprestimo)
      })

      // Entra se o usuario selecionado não tiver nenhum empréstimo
      if (usuarioSelecionado[0].livrosEmprestimos.length <= 0) {
        tituloModal.value = 'Usuário não possui empréstimos'
        mensagemModal.value = 'Até o momento o usuário ainda não realizou ' +
                              'nenhum empréstimo'

      } else {

        // Data de devolução do emprestimo
        const dataAtual = usuarioSelecionado[0].livrosEmprestimos[0].dataDevolucao

        // Adiciona 7 dias na data de devolução
        const renovarData = moment(dataAtual).add(7, 'days').format('YYYY-MM-DD')

        // Substitui a data de devolução antiga pela nova
        usuarioSelecionado[0].livrosEmprestimos[0].dataDevolucao = renovarData

        // Salva a alteração no local storage
        localStorage.setItem('usuarios', JSON.stringify(usuarios))

        // Mensagem para o modal
        tituloModal.value = 'Empréstimo renovado com sucesso'
        mensagemModal.value = `O usuário ${usuarioSelecionado[0].nome} ` +
                              `acaba de ganhar mais 7 dias para realizar ` +
                              `a devolução do livro ${usuarioSelecionado[0].livrosEmprestimos[0].titulo}. ` +
                              `Data de devolução: ${renovarData}`
      }
    }

    return {
      livros,
      usuarios,
      nomeCliente,
      usuarioCliente,
      userSelecionado,
      nomeLivro,
      cpfCliente,
      tituloModalError,
      descModalError,
      tituloModal,
      mensagemModal,
      fazerEmprestimo,
      renovarEmprestimo,
      selecionarCPF
    }
  }

}
</script>
