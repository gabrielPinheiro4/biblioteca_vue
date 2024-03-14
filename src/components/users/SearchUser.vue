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
                    ref="nomeBuscadoInput"
                    type="text"
                    id="pesquisar"
                    class="form-control">

                </div>

                <div class="col">

                    <button
                    @click.prevent="buscarUsuario()"
                    class="btn btn-primary">Buscar
                    </button>

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

            <tbody v-if="!ehVazio && renderizar">
                <tr>
                    <td>{{ usuarioBuscadoResult.nome }}</td>
                    <td>{{ usuarioBuscadoResult.usuario }}</td>
                    <td>{{ usuarioBuscadoResult.cpf }}</td>
                    <td>{{ usuarioBuscadoResult.endereco }}</td>

                    <td>
                      <span
                      v-for="livro in usuarioBuscadoResult.livrosEmprestimos"
                      :key="livro">{{ livro.titulo }}({{ livro.dataDevolucao }}) -
                      </span>

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

            <tbody v-else>
                <tr v-for="usuario in usuarios" :key="usuario">
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
                      @click="deletarLinha($event)"
                      type="button"
                      class="btn btn-danger">Deletar
                    </button>
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
                                    <input v-model.trim="novoNome" type="text" id="novoNome" class="form-control">
                                  </div>
                                </div>

                                <div class="row mb-3">
                                  <div class="col">
                                    <label for="novoUser">Usuário</label>
                                    <input v-model.trim="novoUser" type="text" id="novoUser" class="form-control">
                                  </div>
                                </div>

                                <div class="row mb-3">
                                  <div class="col">
                                    <label for="novoCPF">CPF</label>
                                    <input v-model.trim="novoCPF" type="text" id="novoCPF" class="form-control">
                                  </div>
                                </div>

                                <div class="row mb-3">
                                  <div class="col">
                                    <label for="novoEndereco">Endereço</label>
                                    <input v-model.trim="novoEndereco" type="text" id="novoEndereco" class="form-control">
                                  </div>
                                </div>

                                <div v-if="editarUsuarioVazio" class="row">
                                  <div class="col">
                                    <div class="alert alert-danger" role="alert">
                                      Preencha todos os campos !!!
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
  name: 'SearchUser',

  setup () {
    const usuarios = JSON.parse(localStorage.getItem('usuarios'))
    const nomeBuscadoInput = ref(null)
    const ehVazio = ref(false)
    const renderizar = ref(false)
    const usuarioBuscadoResult = ref({})
    const editButton = ref(null)

    const novoNome = ref('')
    const novoUser = ref('')
    const novoCPF = ref('')
    const novoEndereco = ref('')

    const usuarioAntigo = ref({})

    const editarUsuarioVazio = ref(false)

    function buscarUsuario () {
      const nomeBuscado = nomeBuscadoInput.value.value
      renderizar.value = true

      if (nomeBuscado === '') {
        ehVazio.value = true

      } else {
        ehVazio.value = false

        for (const usuario of usuarios) {
          const nomeNormalize = removeAcentos(usuario.nome).toLowerCase()
          const buscaNormalize = removeAcentos(nomeBuscado).toLowerCase()

          if (nomeNormalize.includes(buscaNormalize) && nomeBuscado !== '') {
            usuarioBuscadoResult.value = usuario
          }
        }
      }
    }

    function deletarLinha (event) {
      const textElement = event.target.parentElement.parentElement.childNodes[0].outerText
      const livroSelecionado = usuarios.filter((usuario) => {
        return usuario.nome === textElement
      })
      
      const indexUsuarioRemove = usuarios.indexOf(livroSelecionado[0])

      usuarios.splice(indexUsuarioRemove, 1)
      
      localStorage.setItem('usuarios', JSON.stringify(usuarios))

      window.location.reload()
    }

    function editarUsuario(event) {
      const linha = event.target.parentElement.parentElement.childNodes

      const nomeAntigo = linha[0].innerText
      const userAntigo = linha[1].innerText
      const cpfAntigo = linha[2].innerText
      const enderecoAntigo = linha[3].innerText

      novoNome.value = nomeAntigo
      novoCPF.value = cpfAntigo
      novoUser.value = userAntigo
      novoEndereco.value = enderecoAntigo

      usuarioAntigo.value = {
        usuario: userAntigo,
        nome: nomeAntigo,
        endereco: enderecoAntigo,
        cpf: cpfAntigo
      }
    }

    function salvarUsuarioEditado () {
      if (novoNome.value === '' || novoUser.value === '' || novoCPF.value === '' || novoEndereco === '') {
        editarUsuarioVazio.value = true

        setTimeout(() => {editarUsuarioVazio.value = false}, 4000)

      } else {
        const usuarioSelecionado = usuarios.filter((usuario) => {
          return usuario.cpf === usuarioAntigo.value.cpf
        })

        // console.log(usuarioAntigo.value)
        // console.log(usuarioSelecionado)
        usuarioSelecionado[0].nome = novoNome.value
        usuarioSelecionado[0].cpf = novoCPF.value
        usuarioSelecionado[0].usuario = novoUser.value
        usuarioSelecionado[0].endereco = novoEndereco.value
        
        localStorage.setItem('usuarios', JSON.stringify(usuarios))

        window.location.reload()
      }
    }

    return {
      usuarios,
      nomeBuscadoInput,
      ehVazio,
      renderizar,
      editButton,
      novoNome,
      novoUser,
      novoCPF,
      novoEndereco,
      usuarioBuscadoResult,
      editarUsuarioVazio,
      usuarioAntigo,
      buscarUsuario,
      deletarLinha,
      editarUsuario,
      salvarUsuarioEditado
    }
  }
}

</script>
