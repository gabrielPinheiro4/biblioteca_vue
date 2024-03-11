<template>

    <div class="devolution container py-5">
        <div class="row">
            <div class="col">
                <h1>Devolução</h1>
            </div>
        </div>

        <form action="" class="mt-4">
            <div class="row mb-3">
                <div class="col">
                    <label for="nomeCliente">Nome do cliente</label>
                    <input ref="nomeClienteInput" type="text" id="nomeCliente" class="form-control">
                </div>
            </div>

            <div class="row mb-3">
                <div class="col">
                    <label for="nomeLivro">Nome do livro</label>
                    <input ref="nomeLivroInput" type="text" id="nomeLivro" class="form-control">
                </div>
            </div>

            <div class="row">
                <div class="col">
                    <button @click.prevent="fazerDevolucao()" class="btn btn-primary">Fazer devolução</button>

                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">{{ tituloModal }}</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div class="modal-body">
                            {{ mensagemModal }}
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Fechar</button>
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
import { removeAcentos } from '@/funcoes'

export default {
  name: 'DevolutionUser',

  setup () {
    const nomeClienteInput = ref(null)
    const nomeLivroInput = ref(null)
    const tituloModal = ref('')
    const mensagemModal = ref ('')
    const usuarios = JSON.parse(localStorage.getItem('usuarios'))
    const livros = JSON.parse(localStorage.getItem('livros'))
    let livroSelecionadoDevolucao = {}

    const tituloModalError = 'Livro ou usuário não encontrado'
    const descModalError = 'O livro ou usuário que você digitou não consta ' +
                           'no sistema, verifique novamente os dados digitados'

    function fazerDevolucao () {
      const cliente = removeAcentos(nomeClienteInput.value.value).toLowerCase()
      const livroDevolucao = removeAcentos(nomeLivroInput.value.value).toLowerCase()

      const livroSelecionado = livros.filter((livro) => {
        const livroSemAcento = removeAcentos(livro.titulo).toLowerCase()

        return livroSemAcento.includes(livroDevolucao)
      })

      const clienteSelecionado = usuarios.filter((usuario) => {
        const clienteSemAcento = removeAcentos(usuario.nome).toLowerCase()

        return clienteSemAcento.includes(cliente)
      })

      for (const livro of clienteSelecionado[0].livrosEmprestimos) {
        const tituloSemAcento = removeAcentos(livro.titulo).toLowerCase()

        if (tituloSemAcento.includes(livroDevolucao)) {
            livroSelecionadoDevolucao = livro
        }
      }

      if (livroSelecionado.length <= 0 || clienteSelecionado.length <= 0) {
        tituloModal.value = tituloModalError
        mensagemModal.value = descModalError

      } else {
        let qnt = parseInt(livroSelecionado[0].quantidade)
        qnt -= 1

        const livroAtt = Object.assign(
          {}, livroSelecionado[0], {quantidade: qnt.toString()}
        )

        const indexLivroDevolucao = clienteSelecionado[0].livrosEmprestimos.indexOf(
            livroSelecionadoDevolucao
        )

        clienteSelecionado[0].livrosEmprestimos.splice(
            indexLivroDevolucao, 1
        )

        // usuarios.splice(
        //     usuarios.indexOf(clienteSelecionado[0]), novoCliente
        // )

        // console.log(usuarios)
      }


    }

    return {
        nomeClienteInput,
        nomeLivroInput,
        tituloModal,
        mensagemModal,
        livroSelecionadoDevolucao,
        usuarios,
        livros,
        tituloModalError,
        descModalError,
        fazerDevolucao
    }
  }
}

</script>
