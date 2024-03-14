<template>
    <div class="procurar_livros container py-5">
        <div class="row">
            <div class="col">
                <h1>Buscar livros</h1>
            </div>
        </div>

        <div class="row align-items-center mt-3 flex-wrap">
            <form action="" class=" col-6 form mt-3">
            <div class="row align-items-end">
                <div class="col">
                    <label for="pesquisar" class="form-label">Buscar livro</label>

                    <input
                    v-model.trim="livroBuscadoInput"
                    type="text"
                    id="pesquisar"
                    class="form-control">

                  </div>

                <div class="col">

                    <button
                    @click.prevent="buscarLivro()"
                    class="btn btn-primary">Buscar
                    </button>

                </div>
            </div>
        </form>

        <form action="" class="col-6 form-2">
            <h4>Filtrar por data de lançamento</h4>
            <div class="row align-items-end">
                <div class="col">
                    <label for="data_minima">Ano Mínimo</label>

                    <input
                    v-model.trim="dataMinima"
                    type="number"
                    id="data_minima"
                    class="form-control">

                </div>

                <div class="col">
                    <label for="data_minima">Ano Máximo</label>

                    <input
                    v-model.trim="dataMaxima"
                    type="number"
                    id="data_maxima"
                    class="form-control">

                </div>

                <div class="col">

                    <button
                    @click.prevent="filtrarData()"
                    class="btn btn-primary">Filtrar por data
                    </button>

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

                    <td>
                      <button
                      @click="deletarLinha($event)"
                      type="button"
                      class="btn btn-danger">Deletar
                      </button>
                    </td>

                </tr>
            </tbody>

            <tbody v-else-if="livroFiltrado.length > 0">
                <tr v-for="livro in livroFiltrado" :key="livro">
                    <td>{{ livro.titulo }}</td>
                    <td>{{ livro.autor }}</td>
                    <td>{{ livro.genero }}</td>
                    <td>{{ livro.data }}</td>
                    <td>{{ livro.quantidade }}</td>

                    <td>
                      <button
                      @click="deletarLinha($event)"
                      type="button"
                      class="btn btn-danger">Deletar
                      </button>
                    </td>

                </tr>
            </tbody>

            <tbody v-else>
                <tr v-for="livro in livros" :key="livro">
                    <td>{{ livro.titulo }}</td>
                    <td>{{ livro.autor }}</td>
                    <td>{{ livro.genero }}</td>
                    <td>{{ livro.data }}</td>
                    <td>{{ livro.quantidade }}</td>

                    <td>
                      <button
                      @click="deletarLinha($event)"
                      type="button"
                      class="btn btn-danger">Deletar
                      </button>
                    </td>

                    <td>
                      <button
                      @click.prevent="editarLivro($event)"
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      class="btn btn-secondary">Editar
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
                              id="exampleModalLabel">Editar Livro
                              </h1>

                              <button
                              type="button"
                              class="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close">
                              </button>

                            </div>
                            <div class="modal-body">

                              <form action="">
                                <div class="row mb-3">
                                  <div class="col">
                                    <label for="novoTitulo">Título do livro</label>

                                    <input
                                    v-model.trim="novoTitulo"
                                    type="text"
                                    id="novoTitulo"
                                    class="form-control">

                                  </div>
                                </div>

                                <div class="row mb-3">
                                  <div class="col">
                                    <label for="novoAutor">Autor</label>

                                    <input
                                    v-model.trim="novoAutor"
                                    type="text"
                                    id="novoAutor"
                                    class="form-control">

                                  </div>
                                </div>

                                <div class="row mb-3">
                                  <div class="col">
                                    <label for="novoGenero">Gênero</label>

                                    <input
                                    v-model.trim="novoGenero"
                                    type="text"
                                    id="novoGenero"
                                    class="form-control">

                                  </div>
                                </div>

                                <div class="row mb-3">
                                  <div class="col">
                                    <label for="novaData">Data de Lançameto</label>

                                    <input
                                    v-model.trim="novaData"
                                    type="date"
                                    id="novaData"
                                    class="form-control">

                                  </div>
                                </div>

                                <div class="row mb-3">
                                  <div class="col">
                                    <label for="novaQnt">Quantidade</label>

                                    <input
                                    v-model.trim="novaQnt"
                                    type="number"
                                    id="novaQnt"
                                    class="form-control">
                                  </div>

                                </div>

                                <div v-if="exibirAlerta" class="row">
                                  <div class="col">
                                    <div class="alert alert-danger" role="alert">
                                      {{ mensagemAlerta }}
                                    </div>

                                  </div>
                                </div>

                              </form>

                            </div>
                            <div class="modal-footer">

                              <button
                              type="button"
                              class="btn btn-secondary"
                              data-bs-dismiss="modal">Cancelar
                              </button>

                              <button
                              @click="salvarLivroEditado()"
                              type="button"
                              class="btn btn-primary">Salvar Alterações
                              </button>

                            </div>
                          </div>
                        </div>
                      </div>
                    </td>

                </tr>
            </tbody>
        </table>

    </div>
</template>

<script>
/* eslint-disable */
import { ref } from 'vue'
import { removeAcentos } from '@/funcoes'

export default {
  name: 'SearchBook',

  setup () {
    
    // Variavel que recebe os dados do local storage
    const livros = JSON.parse(localStorage.getItem('livros'))

    // Variavel para o input de pequisa
    const livroBuscadoInput = ref('')

    // Variavel para o input da data minima
    const dataMinima = ref('')

    // Variavel para o input da data maxima
    const dataMaxima = ref('')

    // Variavel para guardar os dados do livro buscado
    const livroBuscado = ref({})

    // Variavel para guardar os dados do livro filtrado pela data
    const livroFiltrado = ref([])

    const novoTitulo = ref('')
    const novoAutor = ref('')
    const novoGenero = ref('')
    const novaData = ref('')
    const novaQnt = ref('')
    const exibirAlerta = ref(false)
    const mensagemAlerta = ref('')

    const livroAntigo = ref({})

    const renderizar = ref(false)
    const ehVazio = ref(true)

    function buscarLivro () {
      const busca = livroBuscadoInput.value
      renderizar.value = true

      // Entra se o valor do input da busca for vazio
      if (busca === '') {
        ehVazio.value = true

      } else {
        ehVazio.value = false

        for (const livro of livros) {

          // Remove o acento dos titulos dos livros
          const tituloNormalize = removeAcentos(livro.titulo).toLowerCase()

          // Remove o acento do valor do input da busca
          const buscaNormalize = removeAcentos(busca).toLowerCase()

          // Entra se o valor da busca estiver no titulo do livro e se o valor
          // da busca não for vazio
          if (tituloNormalize.includes(buscaNormalize) && busca !== '') {

            // Variavel livroBuscado rece o livro que o usuario digitou 
            livroBuscado.value = livro
          }
        }
      }
    }

    function filtrarData () {

      // Entra se o valor do input da data maxima e data minima for maior que
      // zero
      if (dataMaxima.value > 0 && dataMinima.value > 0) {

        const livroFiltradoFilter = livros.filter((livro) => {
          const anoLivro = parseInt(livro.data.split('-')[0])

          // Retorna os livros que estiverem entra as datas selecionadas
          return anoLivro <= dataMaxima.value && anoLivro >= dataMinima.value
        })

        livroFiltrado.value = livroFiltradoFilter
      
      // Entra se o valor do inputa da data minima for maior que zero e o da
      // data maxima for menor ou igual a zero
      } else if (dataMinima.value > 0 && dataMaxima.value <= 0) {
        const livroFiltradoFilter = livros.filter((livro) => {
          const anoLivro = parseInt(livro.data.split('-')[0])

          // Retorna os livros que forem maiores ou iguais a data minima
          return anoLivro >= dataMinima.value
        })

        livroFiltrado.value = livroFiltradoFilter

      } else {
        const livroFiltradoFilter = livros.filter((livro) => {
          const anoLivro = parseInt(livro.data.split('-')[0])

          // Retorna os livros que forem menores ou iguais a data maxima
          return anoLivro <= dataMaxima.value
        })

        livroFiltrado.value = livroFiltradoFilter

      }
    }

    function deletarLinha (event) {

      // Pega o texto da coluna Título
      const textElement = event.target.parentElement.parentElement.childNodes[0].outerText

      const livroSelecionado = livros.filter((livro) => {

        // Retorna o livro armazenado no local storage que tiver o titulo igual
        // ao titulo da linha que o usuario deseja deletar
        return livro.titulo === textElement
      })

      // Pega o index do livro que o usuario deseja deletar
      const indexRemove = livros.indexOf(livroSelecionado[0])

      // Remove o livro do array
      livros.splice(indexRemove, 1)

      // Atualiza o local storage
      localStorage.setItem('livros', JSON.stringify(livros))

      // Atualiza a pagina para ver as mudanças
      window.location.reload()
    }

    function editarLivro (event) {
      const linha = event.target.parentElement.parentElement.childNodes

      const tituloAntigo = linha[0].innerText
      const autorAntigo = linha[1].innerText
      const generoAntigo = linha[2].innerText
      const dataAntiga = linha[3].innerText
      const qntAntiga = linha[4].innerText

      novoTitulo.value = tituloAntigo
      novoAutor.value = autorAntigo
      novoGenero.value = generoAntigo
      novaData.value = dataAntiga
      novaQnt.value = qntAntiga

      livroAntigo.value = {
        titulo: tituloAntigo,
        autor: autorAntigo,
        genero: generoAntigo,
        data: dataAntiga,
        quantidade: qntAntiga
      }
    }

    function salvarLivroEditado () {
      if (novoTitulo.value === ''||
          novoAutor.value === '' ||
          novoGenero.value === '' ||
          novaData.value === '' ||
          novaQnt.value === '') {

        exibirAlerta.value = true
        mensagemAlerta.value = 'Preencha todos os campos !!'

        setTimeout(() => {exibirAlerta.value = false}, 4000)
      } else {

        const livroSelecionado = livros.filter((livro) => {
          return livro.titulo === livroAntigo.value.titulo && 
                 livro.autor === livroAntigo.value.autor
        })

        livroSelecionado[0].titulo = novoTitulo.value
        livroSelecionado[0].autor = novoAutor.value
        livroSelecionado[0].genero = novoGenero.value
        livroSelecionado[0].data = novaData.value
        livroSelecionado[0].quantidade = novaQnt.value

        localStorage.setItem('livros', JSON.stringify(livros))

        window.location.reload()
      }
    }

    return {
      livros,
      livroBuscadoInput,
      dataMinima,
      dataMaxima,
      livroBuscado,
      livroFiltrado,
      novoTitulo,
      novoAutor,
      novoGenero,
      novaData,
      novaQnt,
      livroAntigo,
      renderizar,
      exibirAlerta,
      mensagemAlerta,
      ehVazio,
      buscarLivro,
      filtrarData,
      deletarLinha,
      editarLivro,
      salvarLivroEditado
    }
  }
}
</script>
