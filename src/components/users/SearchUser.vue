<template>
    <div class="procurar_livros container py-5">
        <div class="row">
            <div class="col">
                <h1>Usuários</h1>
            </div>
        </div>

        <div class="row align-items-center mt-3 flex-wrap">
            <form action="" class=" col-6 form mt-3">
            <div class="row align-items-end">
                <div class="col">

                    <label
                    for="pesquisar"
                    class="form-label">Buscar usuario
                    </label>

                    <input
                    autocomplete="off"
                    v-model.trim="nomeBuscadoInput"
                    type="text"
                    id="pesquisar"
                    class="form-control">

                    <ul v-if="nomeBuscadoInput.length > 0" class="list-group position-absolute">
                      <li
                        v-for="item in elementosBusca"
                        :value="item.valor"
                        @click="buscarUsuarioCategoria($event)"
                        :key="item"
                        class="list-group-item">{{ item.texto }}{{ nomeBuscadoInput }}
                      </li>
                    </ul>
                </div>

                <div class="col">

                    <button
                    @click.prevent="buscarUsuario()"
                    class="btn btn-primary">Buscar
                    </button>

                </div>

                <div class="total_livros mt-5">
                  <p class="fs-5 mb-0">Total de usuários cadastrados: {{ usuarios.length }}</p>
              </div>

            </div>
        </form>
        </div>

        <table class="table mt-5">
            <thead>
                <tr>
                    <th scope="col">Nome Completo</th>
                    <th scope="col">Usuário</th>
                    <th scope="col">CPF</th>
                    <th scope="col">Endereço</th>
                    <th scope="col">Livros emprestados (Data de devolução)</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="usuario in listarUsuarios" :key="usuario">
                    <td>{{ usuario.nome }}</td>
                    <td>{{ usuario.usuario }}</td>
                    <td>{{ usuario.cpf }}</td>
                    <td>{{ usuario.endereco }}</td>

                    <td>
                      <span
                      v-for="livro in usuario.livrosEmprestimos"
                      :key="livro">{{ livro.titulo }}({{ livro.dataDevolucao }}) -
                    </span>
                    </td>

                    <td>
                      <button
                      @click.prevent="editarUsuario($event)"
                      class="btn btn-secondary"
                      ref="editButton"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal">Editar
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
                              id="exampleModalLabel">Editar Usuário
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
                                    <label for="novoNome">Nome Completo</label>

                                    <input
                                    v-model.trim="novoNome"
                                    type="text"
                                    id="novoNome"
                                    class="form-control">

                                  </div>
                                </div>

                                <div class="row mb-3">
                                  <div class="col">
                                    <label for="novoUser">Usuário</label>

                                    <input
                                    v-model.trim="novoUser"
                                    type="text"
                                    id="novoUser"
                                    class="form-control">

                                  </div>
                                </div>

                                <div class="row mb-3">
                                  <div class="col">
                                    <label for="novoCPF">CPF</label>

                                    <input
                                    v-maska="novoCPFSemMascara"
                                    data-maska="###.###.###-##"
                                    v-model.trim="novoCPF"
                                    type="text"
                                    id="novoCPF"
                                    class="form-control">

                                  </div>
                                </div>

                                <div class="row mb-3">
                                  <div class="col">
                                    <label for="novoEndereco">Endereço</label>

                                    <input
                                    v-model.trim="novoEndereco"
                                    type="text"
                                    id="novoEndereco"
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
                              @click="salvarUsuarioEditado()"
                              type="button"
                              class="btn btn-primary">Salvar Alterações
                              </button>

                            </div>
                          </div>
                        </div>
                      </div>

                    </td>

                    <td>
                      <button
                      @click="deletarLinha($event)"
                      type="button"
                      class="btn btn-danger">Deletar
                    </button>
                  </td>

                </tr>
            </tbody>
        </table>

        <div class="row pagination">
          <div class="col">
            <nav aria-label="Page navigation example">
              <ul class="pagination">

                <li
                @click="antecessorPagina()"
                class="page-item"><a class="page-link" href="#">Anterior</a>
                </li>

                <li
                v-for="item in Math.ceil(todosUsuarios.length / qntUsersLista)"
                :key="item" class="page-item" @click="irPagina(item)">
                <a class="page-link">{{ item }}</a>
                </li>

                <li
                @click="proxPagina()" class="page-item">
                <a class="page-link" href="#">Próximo</a>
                </li>

              </ul>
            </nav>
          </div>

          <div class="col-3 mt-3">
              <div>
                <label for="qntLivrosLista">Quantidade de livros mostrados</label>

                <input
                v-model.lazy.trim="qntUsersLista"
                type="number"
                id="qntLivrosLista"
                class="form-control">

              </div>
          </div>
        </div>

    </div>
</template>

<script>
/* eslint-disable */
import { ref, computed } from 'vue'
import { vMaska } from 'maska'
import { removeAcentos, arrayComputado, validaCPF, salvarHistorico } from '@/funcoes'

export default {
  name: 'SearchUser',
  directives: {
    maska: vMaska
  },

  setup () {
    let usuarios = JSON.parse(localStorage.getItem('usuarios'))
    const nomeBuscadoInput = ref('')
    const editButton = ref(null)

    if (usuarios === null) {
      usuarios = []
    }

    const novoNome = ref('')
    const novoUser = ref('')
    const novoCPF = ref('')
    const novoEndereco = ref('')
    const novoCPFSemMascara = ref({})

    const elementosBusca = ref(
      [
        {valor: 'nome', texto: 'Procurar nome por: '},
        {valor: 'usuario', texto: 'Procurar usuário por: '},
        {valor: 'cpf', texto: 'Procurar cpf por: '},
        {valor: 'endereco', texto: 'Procurar endereço por: '},
      ]
    )

    const mensagemAlerta = ref('')

    const usuarioAntigo = ref({})

    const exibirAlerta = ref(false)

    const todosUsuarios = ref(usuarios)

    const pagina = ref (1)
    const qntUsersLista = ref(10)

    const listarUsuarios = computed(() => arrayComputado(
      todosUsuarios.value, pagina.value, qntUsersLista.value
    ))

    function proxPagina () {
      if (pagina.value !== Math.ceil(todosUsuarios.value.length / qntUsersLista.value)) {
        pagina.value += 1
      }
    }

    function antecessorPagina () {
      if (pagina.value !== 1) {
        pagina.value -= 1
      }
    }

    function irPagina (numeroPagina) {
      pagina.value = numeroPagina
    }

    function buscarUsuarioCategoria (event) {
      const busca = removeAcentos(nomeBuscadoInput.value).toLowerCase()
      const usuariosListados = []
      nomeBuscadoInput.value = ''

      if (busca === '') {
        todosUsuarios.value = usuarios

      } else {

        for (const usuario of usuarios) {

          switch (event.target._value) {

            case 'nome':
              const nomeNormalize = removeAcentos(usuario.nome).toLowerCase()

              if (nomeNormalize.includes(busca) && busca !== '') {
                usuariosListados.push(usuario)
                todosUsuarios.value = usuariosListados
              }

              break

            case 'usuario':
              const usuarioNormalize = removeAcentos(usuario.usuario).toLowerCase()

              if (usuarioNormalize.includes(busca) && busca !== '') {
                usuariosListados.push(usuario)
                todosUsuarios.value = usuariosListados
              }

              break

            case 'cpf':
              const cpfNormalize = usuario.cpf.replaceAll('.', '').replaceAll('-', '')
              const buscaSemPonto = busca.replaceAll('.', '').replaceAll('-', '')

              if (cpfNormalize === buscaSemPonto) {
                todosUsuarios.value = [usuario]
              }

              break

            case 'endereco':
              const enderecoNormalize = removeAcentos(usuario.endereco).toLowerCase()

              if (enderecoNormalize.includes(busca) && busca !== '') {
                usuariosListados.push(usuario)
                todosUsuarios.value = usuariosListados
              }

              break
          }
        }
      }
    }

    function buscarUsuario () {
      const nomeBuscado = nomeBuscadoInput.value

      if (nomeBuscado === '') {
        todosUsuarios.value = usuarios

      } else {

        for (const usuario of usuarios) {
          const nomeNormalize = removeAcentos(usuario.nome).toLowerCase()
          const buscaNormalize = removeAcentos(nomeBuscado).toLowerCase()

          if (nomeNormalize.includes(buscaNormalize) && nomeBuscado !== '') {
            todosUsuarios.value = [usuario]
          }
        }
      }
    }

    function deletarLinha (event) {

      // Pega o texto da coluna Nome Completo
      const textElement = event.target.parentElement.parentElement.childNodes[0].outerText

      // Retorna o livro selecionado no local storage
      // const livroSelecionado = filtrarNome(usuarios, textElement)
      const usuarioSelecionado = usuarios.filter((usuario) => {
        return usuario.nome === textElement
      })
      
      // Pega o index do livro no array
      const indexUsuarioRemove = usuarios.indexOf(usuarioSelecionado[0])

      // Remove o objeto
      usuarios.splice(indexUsuarioRemove, 1)

      // Salva a alteração no local storage
      localStorage.setItem('usuarios', JSON.stringify(usuarios))

      // Recarrega a pagina
      window.location.reload()

      salvarHistorico('Deletar usuário', usuarioSelecionado[0], '', usuarioSelecionado[0], '')
    }

    function editarUsuario(event) {

      // Pega a linha da tabela 
      const linha = event.target.parentElement.parentElement.childNodes

      // Pega os dados das colunas
      const nomeAntigo = linha[0].innerText
      const userAntigo = linha[1].innerText
      const cpfAntigo = linha[2].innerText
      const enderecoAntigo = linha[3].innerText

      // Atribui os valores do input com os valores do usuario
      novoNome.value = nomeAntigo
      novoCPF.value = cpfAntigo
      novoUser.value = userAntigo
      novoEndereco.value = enderecoAntigo

      // Cria um objeto com os dados atuais do usuario
      usuarioAntigo.value = {
        usuario: userAntigo,
        nome: nomeAntigo,
        endereco: enderecoAntigo,
        cpf: cpfAntigo
      }
    }

    function salvarUsuarioEditado () {

      // Entra se os valores dos inputs forem vazios
      if (novoNome.value === '' ||
          novoUser.value === '' ||
          novoCPF.value === '' ||
          novoEndereco.value === '') {
        exibirAlerta.value = true
        mensagemAlerta.value = 'Preencha todos os campos !!'
        setTimeout(() => {exibirAlerta.value = false}, 4000)

      // Entra se o valor do CPF estiver incompleto
      } else if (novoCPF.value.length < 14) {
        mensagemAlerta.value = 'O CPF está incompleto !!'
        exibirAlerta.value = true
        setTimeout(() => {exibirAlerta.value = false}, 4000)

      } else if (!validaCPF(novoCPFSemMascara.value.unmasked)) {
        mensagemAlerta.value = 'CPF inválido'
        exibirAlerta.value = true
        setTimeout(() => {exibirAlerta.value = false}, 4000)
        
      } else {

        // Retorna o usuario selecionado no local storage
        const usuarioSelecionado = usuarios.filter((usuario) => {
          return usuario.cpf === usuarioAntigo.value.cpf
        })

        // Atribui novos valores valores para o usuario
        usuarioSelecionado[0].nome = novoNome.value
        usuarioSelecionado[0].cpf = novoCPF.value
        usuarioSelecionado[0].usuario = novoUser.value
        usuarioSelecionado[0].endereco = novoEndereco.value

        // Salva as alterações no local storage
        localStorage.setItem('usuarios', JSON.stringify(usuarios))

        // Recarrega a tela 
        window.location.reload()

        salvarHistorico('Editar usuário', usuarioAntigo.value, '', usuarioAntigo.value, usuarioSelecionado[0])
      }
    }

    return {
      usuarios,
      nomeBuscadoInput,
      elementosBusca,
      editButton,
      novoNome,
      novoUser,
      novoCPF,
      novoCPFSemMascara,
      novoEndereco,
      exibirAlerta,
      usuarioAntigo,
      mensagemAlerta,
      listarUsuarios,
      pagina,
      qntUsersLista,
      todosUsuarios,
      deletarLinha,
      editarUsuario,
      buscarUsuario,
      proxPagina,
      antecessorPagina,
      irPagina,
      salvarUsuarioEditado,
      buscarUsuarioCategoria
    }
  }
}

</script>
