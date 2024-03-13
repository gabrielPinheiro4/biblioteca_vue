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
                    <label for="nomeCliente">Nome do cliente</label>

                    <input
                    v-model.trim="nomeCliente"
                    type="text"
                    id="nomeCliente"
                    class="form-control">

                </div>
            </div>

            <div class="row mb-3">
              <div class="col">
                <label for="cpfCliente">CPF</label>

                <input
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
                    class="btn btn-primary">Fazer Emprestimo
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
    const cpfCliente = ref('')

    //Variaveis para as mensagens no modal
    const tituloModal = ref('')
    const mensagemModal = ref('')

    const tituloModalError = 'Livro ou usuário não encontrado'
    const descModalError = 'O livro ou usuário que você digitou não consta ' +
                           'no sistema, verifique novamente os dados digitados'

    function fazerEmprestimo () {

      // Removendo acentuação e dexando em lower case o valor do input
      // nomeCliente
      const cliente = removeAcentos(nomeCliente.value).toLowerCase()

      // Removendo acentuação e dexando em lower case o valor do input
      // nomeLivro
      const livroEmprestimo = removeAcentos(nomeLivro.value).toLowerCase()

      const clienteCPF = cpfCliente.value

      // Data da devolução
      const dataD = moment().add(7, 'days').format('YYYY-MM-DD')

      // Retona um array com o livro selecionado
      const livroSelecionado = livros.filter((livro) => {
        const tituloNormalize = removeAcentos(livro.titulo).toLowerCase()
        
        return tituloNormalize.includes(livroEmprestimo)
      })

      // Retorna um array com o usuario selecionado
      const usuarioSelecionado = usuarios.filter((usuario) => {
        const nomeUserNormalize = removeAcentos(usuario.nome).toLowerCase()

        return nomeUserNormalize.includes(cliente) && usuario.cpf === clienteCPF
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

      } else if (cliente === '' || livroEmprestimo === '' || clienteCPF === '') {
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

    return {
      livros,
      usuarios,
      nomeCliente,
      nomeLivro,
      cpfCliente,
      tituloModalError,
      descModalError,
      tituloModal,
      mensagemModal,
      fazerEmprestimo
    }
  }

}
</script>
