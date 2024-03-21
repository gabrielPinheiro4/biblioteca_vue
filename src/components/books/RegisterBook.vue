<template>
<div class="container resgitrar_livro py-5">
  <div class="row">
    <div class="col">
      <h1 class="mb-4">Cadastrar livro</h1>
    </div>
  </div>
  <form action="" class="form">
    <div class="row mb-3">
        <div class="col">
          <label class="form-label" for="nome_livro">Título do livro</label>

          <input
          v-model.trim="nomeLivro"
          type="text"
          class="form-control"
          id="nome_livro">

        </div>

        <div class="col">
          <label for="autor" class="form-label">Autor</label>

          <input
          v-model.trim="autorLivro"
          type="text"
          class="form-control"
          id="autor">

        </div>
    </div>

    <div class="row mb-3">
        <div class="col">
          <label for="genero" class="form-label">Gênero</label>

          <input
          v-model.trim="generoLivro"
          type="text"
          class="form-control"
          id="genero">

        </div>

        <div class="col">
          <label for="data" class="form-label">Data de lançamento</label>

          <input
          v-model.trim="dataLivro"
          type="date"
          class="form-control"
          id="data">

        </div>
    </div>

    <div class="row mb-3">
        <div class="col-3">
          <label for="quantidade" class="form-label">Quantidade</label>

          <input
          v-model.trim="quantidadeLivro"
          type="number"
          class="form-control"
          id="quantidade">

        </div>
    </div>

    <div class="row">
      <div class="col">

        <button
        @click.prevent="cadastrarLivro()"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        class="btn btn-primary">Cadastrar
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
                id="exampleModalLabel">Livro cadastrado com sucesso
                </h1>

                <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close">
                </button>

              </div>
              <div class="modal-body">
                Seu livro foi cadastrado com sucesso, você pode verifica-lo na página "Consultar Livros"
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

<div class="row mt-5">
  <div class="row">
    <div class="col">
      <h4>Cadastrar em Lote</h4>
    </div>
  </div>

  <div class="col">
        <div class="alert alert-danger" role="alert">
          Para cadastrar em lote você deve enviar um arquivo csv contendo as colunas: titulo, autor, genero, data(Y-m-d) e quantidade
        </div>

      </div>

    <form action="" class="row form-2 mt-2 align-items-end">
      <div class="col">
        <label for="arquivo">Selecione o arquivo</label>
        <input ref="arquivo" type="file" class="form-control" id="arquivo">
      </div>

      <div class="col">

        <button
        @click.prevent="cadastrarLote()"
        data-bs-toggle="modal"
        data-bs-target="#modalLote"
        class="btn btn-primary">Cadastrar em Lote
        </button>

        <div
        class="modal fade"
        id="modalLote"
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
                aria-label="Close"></button>

              </div>
              <div class="modal-body">{{ descModal }}</div>
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
  </form>
</div>
</div>
</template>

<script>
/* eslint-disable */
import { ref } from 'vue'
import * as d3 from 'd3'
import { salvarHistorico } from '@/funcoes'

export default {
  name: 'RegisterBook',

  setup () {

    // Variaveis para guardar uma mensagem no modal
    const tituloModal = ref('')
    const descModal = ref('')

    // Variavel para os inputs formulario
    const autorLivro = ref('')
    const generoLivro = ref('')
    const dataLivro = ref('')
    const quantidadeLivro = ref('')
    const nomeLivro = ref('')
    const arquivo = ref(null)

    // Variavel para os dados do arquivo enviado
    const dadosCsv = ref([])

    // Armazena os dados do local storage numa variavel
    let storage = JSON.parse(localStorage.getItem('livros'))

    // Se o valor de local storage for nulo, storage recebe um array vazio
    if (storage === null) {
      storage = []
    }

    function cadastrarLivro () {
      if (nomeLivro.value === '' ||
          autorLivro.value === '' ||
          generoLivro.value === '' ||
          quantidadeLivro.value === '' ||
          dataLivro.value === '') {
        tituloModal.value = 'Campos não preenchidos'
        descModal.value = 'Preencha todos os campos para cadastrar o livro'

      } else {
        tituloModal.value = 'Livros cadastrados com sucesso'
        descModal.value = 'Seus livros foram cadastrados, você pode verifica-los na página "Consultar Livros"'

        // Cria um objeto a partir dos dados digitados nos inputs
        const novosDados = {
          titulo: nomeLivro.value,
          autor: autorLivro.value,
          genero: generoLivro.value,
          data: dataLivro.value,
          quantidade: quantidadeLivro.value
        }

        // Adiciona os objetos no array
        storage.push(novosDados)

        // Atualiza o local storage
        localStorage.setItem('livros', JSON.stringify(storage))
        salvarHistorico('Cadastro de livro', '', novosDados, '', '')
      }
    }

    function cadastrarLote () {
      const arquivoEnviado = arquivo.value.files[0]
      const reader = new FileReader()

      // Entra se a extensão do arquivo for diferente de .csv
      if (arquivoEnviado.name.split('.')[1] !== 'csv') {

        // Adiciona uma mensagem de erro no modal
        tituloModal.value = 'Arquivo não permitido'
        descModal.value = 'O arquivo que você está tentando enviar não é suportado pelo sistema, tente enviar um arquivo csv'

      } else {

        // Adiciona uma mensagem de sucesso no modal
        tituloModal.value = 'Livros cadastrados com sucesso'
        descModal.value = 'Seus livros foram cadastrados, você pode verifica-los na página "Consultar Livros"'

        reader.onload = function (elemento) {
          const csv = d3.csvParse(elemento.target.result)

          // Converte o csv enviado em string, depois converte para objeto
          const csvArray = JSON.parse(JSON.stringify(csv))

          // Cria um objeto para cada livro enviado e adiciona no array
          for (const livro of csvArray) {
            dadosCsv.value.push({
              titulo: livro.titulo,
              autor: livro.autor,
              genero: livro.genero,
              data: livro.data,
              quantidade: livro.quantidade
            })
          }

          // Adicione os novos livros no array storage
          for (const livro of dadosCsv.value) {
            storage.push(livro)
          }

          // Adiciona os novos itens no local storage
          localStorage.setItem('livros', JSON.stringify(storage))
        }
        reader.readAsText(arquivoEnviado)
        salvarHistorico('Cadastro de livro em lote', '', '', '', '')
      }
    }

    return {
      nomeLivro,
      autorLivro,
      generoLivro,
      dataLivro,
      quantidadeLivro,
      arquivo,
      dadosCsv,
      tituloModal,
      descModal,
      cadastrarLivro,
      cadastrarLote
    }
  }
}
</script>

<style lang="scss">

</style>
