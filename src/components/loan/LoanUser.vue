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
                    <button @click.prevent="fazerEmprestimo()" class="btn btn-primary">Fazer Emprestimo</button>
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
    const mesagemModal = ref('')

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

      if (livroSelecionado.length === 0) {
        tituloModal.value = 'Livro não encontrao'
        mesagemModal.value = 'O livro que você digitou não consta no sistema, verifique o nome ou cadastre um novo livro'
      }

      
    }

    return {
      livros,
      usuarios,
      nomeCliente,
      nomeLivro,
      tituloModal,
      mesagemModal,
      dataDevolucao,
      fazerEmprestimo
    }
  }

}
</script>
