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
          <label class="form-label" for="nome_livro">Nome do livro</label>
          <input v-model="nomeLivro" type="text" class="form-control" id="nome_livro">
        </div>

        <div class="col">
          <label for="autor" class="form-label">Autor</label>
          <input v-model="autorLivro" type="text" class="form-control" id="autor">
        </div>
    </div>

    <div class="row mb-3">
        <div class="col">
          <label for="genero" class="form-label">Gênero</label>
          <input v-model="generoLivro" type="text" class="form-control" id="genero">
        </div>

        <div class="col">
          <label for="data" class="form-label">Data de lançamento</label>
          <input v-model="dataLivro" type="date" class="form-control" id="data">
        </div>
    </div>

    <div class="row mb-3">
        <div class="col-3">
          <label for="quantidade" class="form-label">Quantidade</label>
          <input v-model="quantidadeLivro" type="number" class="form-control" id="quantidade">
        </div>
    </div>

    <div class="row">
      <div class="col">
        <button @click.prevent="cadastrarLivro()" data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-primary">Cadastrar</button>

        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Livro cadastrado com sucesso</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                Seu livro foi cadastrado com sucesso, você pode verifica-lo na página "Consultar Livros"
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

<div class="row mt-5">
  <div class="row">
    <div class="col">
      <h4>Cadastrar em Lote</h4>
    </div>
  </div>
    <form action="" class="row form-2 mt-2 align-items-end">
      <div class="col">
        <label for="arquivo">Selecione o arquivo</label>
        <input ref="arquivo" type="file" class="form-control" id="arquivo">
      </div>

      <div class="col">
        <button @click.prevent="cadastrarLote()"  data-bs-toggle="modal" data-bs-target="#modalLote" class="btn btn-primary">Cadastrar em Lote</button>

        <div class="modal fade" id="modalLote" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Livros cadastrados com sucesso</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                Seus livros foram cadastrados, você pode verifica-los na página "Consultar Livros"
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Fechar</button>
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
import { ref } from 'vue'
import * as d3 from 'd3'

export default {
  name: 'RegisterBook',

  setup () {
    const nomeLivro = ref('')
    const autorLivro = ref('')
    const generoLivro = ref('')
    const dataLivro = ref('')
    const quantidadeLivro = ref('')
    const arquivo = ref(null)
    const dadosCsv = ref([])

    let storage = JSON.parse(localStorage.getItem('livros'))

    if (storage === null) {
      storage = []
    }

    function cadastrarLivro () {
      const novosDados = {
        titulo: nomeLivro.value,
        autor: autorLivro.value,
        genero: generoLivro.value,
        data: dataLivro.value,
        quantidade: quantidadeLivro.value
      }

      storage.push(novosDados)
      localStorage.setItem('livros', JSON.stringify(storage))
    }

    function cadastrarLote () {
      const arquivoEnviado = arquivo.value.files[0]
      const reader = new FileReader()

      reader.onload = function (elemento) {
        const csv = d3.csvParse(elemento.target.result)
        const csvArray = JSON.parse(JSON.stringify(csv))

        for (const livro of csvArray) {
          dadosCsv.value.push({
            titulo: livro.titulo,
            autor: livro.autor,
            genero: livro.genero,
            data: livro.data,
            quantidade: livro.quantidade
          })
        }

        for (const livro of dadosCsv.value) {
          storage.push(livro)
        }

        localStorage.setItem('livros', JSON.stringify(storage))
      }
      reader.readAsText(arquivoEnviado)
    }

    return {
      cadastrarLivro,
      cadastrarLote,
      nomeLivro,
      autorLivro,
      generoLivro,
      dataLivro,
      quantidadeLivro,
      arquivo,
      dadosCsv
    }
  }
}
</script>

<style lang="scss">

</style>
