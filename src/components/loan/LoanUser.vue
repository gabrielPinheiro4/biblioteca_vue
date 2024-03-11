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
                    <input ref="nomeCliente" type="text" id="nomeCliente" class="form-control">
                </div>
            </div>

            <div class="row mb-3">
                <div class="col">
                    <label for="nomeLivro">Nome do livro</label>
                    <input ref="nomeLivro" type="text" id="nomeLivro" class="form-control">
                </div>
            </div>

            <div class="row mb-3">
                <div class="col">
                    <label for="dataDevolucao">Data de devolução</label>
                    <input ref="dataDevolucao" type="date" id="dataDevolucao" class="form-control">
                </div>
            </div>

            <div class="row">
                <div class="col">
                    <button @click.prevent="fazerEmprestimo()" data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-primary">Fazer Emprestimo</button>

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
  name: 'LoanUser',

  setup () {
    const livros = JSON.parse(localStorage.getItem('livros'))
    const usuarios = JSON.parse(localStorage.getItem('usuarios'))

    const nomeCliente = ref(null)
    const nomeLivro = ref(null)
    const dataDevolucao = ref(null)
    const tituloModal = ref('')
    const mensagemModal = ref('')

    function fazerEmprestimo () {
      const cliente = removeAcentos(nomeCliente.value.value).toLowerCase()
      const livroEmprestimo = removeAcentos(nomeLivro.value.value).toLowerCase()
      const dataD = dataDevolucao.value.value
        
      const livroSelecionado = livros.filter((livro) => {
        const tituloNormalize = removeAcentos(livro.titulo).toLowerCase()
        
        return tituloNormalize.includes(livroEmprestimo)
      })

      const usuarioSelecionado = usuarios.filter((usuario) => {
        const nomeUserNormalize = removeAcentos(usuario.nome).toLowerCase()

        return nomeUserNormalize.includes(cliente)
      })

      let qnt = parseInt(livroSelecionado[0].quantidade)

      if (livroSelecionado.length <= 0 || usuarioSelecionado.length <= 0) {
        tituloModal.value = 'Livro ou usuário não encontrado'

        mensagemModal.value = 'O livro ou usuário que você digitou não consta '+
                              'no sistema, verifique novamente os dados digitados'

      } else if (qnt <= 0) {
        tituloModal.value = 'Livro indisponível'

        mensagemModal.value = 'O livro não tem quantidade suficiente para '+
                              'realizar um empréstimo'

      } else {
        tituloModal.value = 'Empréstimo feito com sucesso'

        mensagemModal.value = `Empréstimo feito com sucesso, o(a) `+
                              `${usuarioSelecionado[0].nome} deve devolver o `+
                              `livro ${livroSelecionado[0].titulo} até `+
                              `${dataD}` 

        qnt -= 1

        const novoLivro = Object.assign(
          {}, livroSelecionado[0], {dataDevolucao: dataD}
        )

        const livroAtt = Object.assign(
          {}, livroSelecionado[0], {quantidade: qnt.toString()}
        )

        livros.splice(livros.indexOf(livroSelecionado[0]), 1, livroAtt)

        usuarioSelecionado[0].livrosEmprestimos.push(novoLivro)

        localStorage.setItem('usuarios', JSON.stringify(usuarios))
        localStorage.setItem('livros', JSON.stringify(livros))
      }
    }

    return {
      livros,
      usuarios,
      nomeCliente,
      nomeLivro,
      tituloModal,
      mensagemModal,
      dataDevolucao,
      fazerEmprestimo
    }
  }

}
</script>
