<template>

    <div class="devolution container py-5">
        <div class="row">
            <div class="col">
                <h1>Fazer Devolução</h1>
            </div>
        </div>

        <form action="" class="mt-4">
          <div class="row mb-3">
            <div class="col">
              <label for="cpfCliente">CPF</label>

              <input
              @change="selecionarCPF()"
              v-maska
              data-maska="###.###.###-##"
              v-model.lazy.trim="cpfCliente"
              type="text"
              id="cpfCliente"
              class="form-control">

            </div>
          </div>

            <div class="row mb-3">
                <div class="col">
                  <label for="nomeCliente">Nome do cliente</label>

                  <input
                  disabled readonly
                  v-model="nomeClienteInput"
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
                <label for="livrosDevolucao">Livros para devolução</label>

                <select
                v-model="livroSelect"
                id="livrosDevolucao"
                class="form-select"
                aria-label="Default select example">

                  <option selected disabled >Selecione um livro</option>
                  <option
                    v-for="livro in userSelecionado.livrosEmprestimos"
                    :key="livro"
                    :value="livro.titulo">{{livro.titulo}} - Data de Devolução: {{ livro.dataDevolucao }}
                  </option>
              </select>

              </div>
            </div>

            <div class="row">
                <div class="col">
                    <button
                    @click.prevent="fazerDevolucao()"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    class="btn btn-primary">Fazer devolução
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
import { vMaska } from 'maska'
import { salvarHistorico } from '@/funcoes'

export default {
  name: 'DevolutionUser',
  directives: {
    maska: vMaska
  },

  setup () {
    const nomeClienteInput = ref('')
    const userSelecionado = ref([])
    const nomeLivroInput = ref('')
    const cpfCliente = ref('')
    const livroSelect = ref('')
    const tituloModal = ref('')
    const mensagemModal = ref ('')
    const usuarioCliente = ref('')
    const livroSelecionadoDevolucao = ref({})
    let usuarios = JSON.parse(localStorage.getItem('usuarios'))
    let livros = JSON.parse(localStorage.getItem('livros'))

    if (usuarios === null) {
      usuarios = []
    }

    if (livros === null) {
      livros = []
    }
    
    const tituloModalError = 'Livro ou usuário não encontrado'
    const descModalError = 'O livro ou usuário que você digitou não consta ' +
                           'no sistema, verifique novamente os dados digitados'

    function selecionarCPF () {
      const usuarioSelecionado = usuarios.filter((usuario) => {
        return usuario.cpf === cpfCliente.value
      })

      if (usuarioSelecionado.length > 0) {
        userSelecionado.value = usuarioSelecionado[0]
        nomeClienteInput.value = usuarioSelecionado[0].nome
        usuarioCliente.value = usuarioSelecionado[0].usuario
      }
    }

    function fazerDevolucao () {
      const livroDevolucao = livros.filter((livro) => {
        return livro.titulo === livroSelect.value
      })

      if (userSelecionado.length <= 0) {
        tituloModal.value = tituloModalError
        mensagemModal.value = descModalError

      } else if (livroSelect.value === '' || cpfCliente.value === '') {
        tituloModal.value = 'Campos não preenchidos'
        mensagemModal.value = 'Preencha todos os campos para realizar a ' +
                              'devolução'

      } else if (userSelecionado.value.livrosEmprestimos.length <= 0) {
        tituloModal.value = 'Impossível fazer devolução'
        mensagemModal.value = `O cliente ${userSelecionado.value.nome} ` +
                              `não possui livros a serem devolvidos`

      } else {
        tituloModal.value = 'Devolução feita com sucesso'
        mensagemModal.value = `A devolução foi feita com sucesso, o livro ` +
                              `"${livroDevolucao[0].titulo}" foi adicionado` +
                              `ao estoque`

        for (const livro of userSelecionado.value.livrosEmprestimos) {
          if (livro.titulo === livroDevolucao[0].titulo) {
            livroSelecionadoDevolucao.value = livro
        }
      }

        let qnt = parseInt(livroDevolucao[0].quantidade)
        qnt += 1

        const livroAtt = Object.assign(
          {}, livroDevolucao[0], {quantidade: qnt.toString()}
        )

        const indexLivroDevolucao = userSelecionado.value.livrosEmprestimos.indexOf(
          livroSelecionadoDevolucao.value
        )

        userSelecionado.value.livrosEmprestimos.splice(
            indexLivroDevolucao, 1
        )

        livros.splice(
            livros.indexOf(livroDevolucao[0]), 1, livroAtt
        )

        localStorage.setItem('usuarios', JSON.stringify(usuarios))
        localStorage.setItem('livros', JSON.stringify(livros))
        salvarHistorico('Devolução', userSelecionado.value, livroAtt, '', '')
      }
    }

    return {
        userSelecionado,
        nomeClienteInput,
        nomeLivroInput,
        cpfCliente,
        livroSelect,
        usuarioCliente,
        tituloModal,
        mensagemModal,
        livroSelecionadoDevolucao,
        usuarios,
        livros,
        tituloModalError,
        descModalError,
        fazerDevolucao,
        selecionarCPF
    }
  }
}

</script>
