<template>
    <div class="procurar_livros container">
        <div class="row">
            <div class="col">
                <h1>Buscar livros</h1>
            </div>
        </div>

        <form action="" class="form mt-3">
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

        <form action="" class="form-2 mt-5">
            <h2>Filtrar por data</h2>
            <div class="row">
                <div class="col">
                    <label for="data_minima">Data Mínima</label>
                    <input type="date" id="data_minima" class="form-control">
                </div>

                <div class="col">
                    <label for="data_minima">Data Máxima</label>
                    <input type="date" id="data_maxima" class="form-control">
                </div>
            </div>
        </form>

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

export default {
  name: 'SearchBook',

  setup () {
    const livros = JSON.parse(localStorage.getItem('livros'))
    const livroBuscadoInput = ref(null)
    const livroBuscado = ref({})
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
          const tituloNormalize = livro.titulo.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

          if (tituloNormalize.toLowerCase().includes(busca.toLowerCase()) && busca !== '') {
            livroBuscado.value = livro
          }
        }
      }
    }

    return {
      livros,
      livroBuscadoInput,
      livroBuscado,
      renderizar,
      ehVazio,
      buscarLivro
    }
  }
}
</script>
