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
                    <label for="pesquisar" class="form-label">Buscar usuario</label>
                    <input ref="nomeBuscadoInput" type="text" id="pesquisar" class="form-control">
                </div>

                <div class="col">
                    <button @click.prevent="buscarUsuario()" class="btn btn-primary">Buscar</button>
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
                    <th scope="col">Livros emprestados</th>
                </tr>
            </thead>

            <tbody v-if="!ehVazio && renderizar">
                <tr>
                    <td>{{ usuarioBuscadoResult.usuario }}</td>
                    <td>{{ usuarioBuscadoResult.nome }}</td>
                    <td>{{ usuarioBuscadoResult.cpf }}</td>
                    <td>{{ usuarioBuscadoResult.endereco }}</td>
                    <td>{{ usuarioBuscadoResult.livrosEmprestimo }}</td>
                    <td><button @click="deletarLinha($event)" type="button" class="btn btn-danger">Deletar</button></td>
                </tr>
            </tbody>

            <tbody v-else>
                <tr v-for="usuario in usuarios" :key="usuario">
                    <td>{{ usuario.usuario }}</td>
                    <td>{{ usuario.nome }}</td>
                    <td>{{ usuario.cpf }}</td>
                    <td>{{ usuario.endereco }}</td>
                    <td>{{ usuario.livrosEmprestimo }}</td>
                    <td><button @click="deletarLinha($event)" type="button" class="btn btn-danger">Deletar</button></td>
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

    return {
      usuarios,
      nomeBuscadoInput,
      ehVazio,
      renderizar,
      usuarioBuscadoResult,
      buscarUsuario,
      deletarLinha
    }
  }
}

</script>
