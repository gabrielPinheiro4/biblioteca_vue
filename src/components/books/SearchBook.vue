<template>
    <div class="procurar_livros container">
        <div class="row">
            <div class="col">
                <h1>Buscar livros</h1>
            </div>
        </div>

        <div class="row align-items-center mt-5 flex-wrap">
            <form action="" class=" col-6 form mt-3">
            <div class="row align-items-end">
                <div class="col">
                    <label for="pesquisar" class="form-label">Buscar livro</label>
                    <input ref="livroBuscadoInput" type="text" id="pesquisar" class="form-control">
                </div>

                <div class="col">
                    <button @click.prevent="buscarLivro()" class="btn btn-primary">Buscar</button>
                </div>
            </div>
        </form>

        <form action="" class="col-6 form-2">
            <h4>Filtrar por data de lançamento</h4>
            <div class="row align-items-end">
                <div class="col">
                    <label for="data_minima">Ano Mínimo</label>
                    <input ref="dataMinima" type="number" id="data_minima" class="form-control">
                </div>

                <div class="col">
                    <label for="data_minima">Ano Máximo</label>
                    <input ref="dataMaxima" type="number" id="data_maxima" class="form-control">
                </div>

                <div class="col">
                    <button @click.prevent="filtrarData()" class="btn btn-primary">Filtrar por data</button>
                </div>
            </div>
        </form>
        </div>

        <table class="table mt-5">
            <thead>
                <tr>
                    <th scope="col">Titulo</th>
                    <th scope="col">Autor</th>
                    <th scope="col">Gênero</th>
                    <th scope="col">Data de lançamento</th>
                    <th scope="col">Quantidade</th>
                </tr>
            </thead>

            <tbody v-if="!ehVazio && renderizar">
                <tr>
                    <td>{{ livroBuscado.titulo }}</td>
                    <td>{{ livroBuscado.autor }}</td>
                    <td>{{ livroBuscado.genero }}</td>
                    <td>{{ livroBuscado.data }}</td>
                    <td>{{ livroBuscado.quantidade }}</td>
                </tr>
            </tbody>

            <tbody v-else-if="livroFiltrado.length > 0">
                <tr v-for="livro in livroFiltrado" :key="livro">
                    <td>{{ livro.titulo }}</td>
                    <td>{{ livro.autor }}</td>
                    <td>{{ livro.genero }}</td>
                    <td>{{ livro.data }}</td>
                    <td>{{ livro.quantidade }}</td>
                </tr>
            </tbody>

            <tbody v-else>
                <tr v-for="livro in livros" :key="livro">
                    <td>{{ livro.titulo }}</td>
                    <td>{{ livro.autor }}</td>
                    <td>{{ livro.genero }}</td>
                    <td>{{ livro.data }}</td>
                    <td>{{ livro.quantidade }}</td>
                </tr>
            </tbody>
        </table>

    </div>
</template>

<script>
import { ref } from 'vue'
import { removeAcentos } from '@/funcoes'

export default {
  name: 'SearchBook',

  setup () {
    const livros = JSON.parse(localStorage.getItem('livros'))
    const livroBuscadoInput = ref(null)
    const dataMinima = ref(null)
    const dataMaxima = ref(null)
    const livroBuscado = ref({})
    const livroFiltrado = ref([])
    const renderizar = ref(false)
    const ehVazio = ref(true)

    function buscarLivro () {
      const busca = livroBuscadoInput.value.value
      renderizar.value = true

      if (busca === '') {
        ehVazio.value = true
      } else {
        ehVazio.value = false

        for (const livro of livros) {
          const tituloNormalize = removeAcentos(livro.titulo)
          const buscaNormalize = removeAcentos(busca)

          if (tituloNormalize.toLowerCase().includes(buscaNormalize.toLowerCase()) && busca !== '') {
            livroBuscado.value = livro
          }
        }
      }
    }

    function filtrarData () {
      if (dataMaxima.value.value > 0 && dataMinima.value.value > 0) {
        const livroFiltradoFilter = livros.filter((livro) => {
          return parseInt(livro.data.split('-')[0]) <= dataMaxima.value.value && parseInt(livro.data.split('-')[0]) >= dataMinima.value.value
        })

        livroFiltrado.value = livroFiltradoFilter
      } else if (dataMinima.value.value > 0 && dataMaxima.value.value <= 0) {
        const livroFiltradoFilter = livros.filter((livro) => {
          return parseInt(livro.data.split('-')[0]) >= dataMinima.value.value
        })

        livroFiltrado.value = livroFiltradoFilter
      } else {
        const livroFiltradoFilter = livros.filter((livro) => {
          return parseInt(livro.data.split('-')[0]) <= dataMaxima.value.value
        })

        livroFiltrado.value = livroFiltradoFilter
      }
    }

    return {
      livros,
      livroBuscadoInput,
      dataMinima,
      dataMaxima,
      livroBuscado,
      livroFiltrado,
      renderizar,
      ehVazio,
      buscarLivro,
      filtrarData
    }
  }
}
</script>
