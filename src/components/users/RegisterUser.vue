<template>

    <div class="register container py-5">
        <div class="row">
            <div class="col">
                <h1>Cadastrar Usuário</h1>
            </div>
        </div>

        <div class="row mt-5">
            <div class="col mb-3">
                <label for="nomeCompleto">Nome Completo</label>

                <input
                v-model.trim="nomeCompleto"
                type="text"
                id="nomeCompleto"
                class="form-control">

            </div>

            <div class="col mb-3">
                <label for="usuario">Usuário</label>

                <input
                v-model.trim="usuarioInput"
                type="text"
                id="usuario"
                class="form-control">

            </div>
        </div>

        <div class="row mb-3">
            <div class="col mb-3">
                <label for="cpf">CPF</label>

                <input
                v-maska
                data-maska="###.###.###-##"
                v-model.trim="cpfInput"
                type="text" id="cpf"
                class="form-control">

            </div>

            <div class="col">
                <label for="endereco">Endereço</label>

                <input
                v-model.trim="enderecoInput"
                type="text"
                id="endereco"
                class="form-control">

            </div>
        </div>

        <div class="row">
            <div class="col">

                <button
                @click.prevent="cadastarUsuario()"
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
                        id="exampleModalLabel">{{ tituloModal }}
                        </h1>

                        <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close">
                        </button>

                      </div>
                      <div class="modal-body">
                        {{ mensagemModal }}
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
    </div>

    </template>

<script>
/* eslint-disable */
import { ref } from 'vue'
import { vMaska, } from 'maska'

export default {
  name: 'RegisterView',
  directives :{
    maska: vMaska
  },

  setup () {
    const nomeCompleto = ref('')
    const usuarioInput = ref('')
    const enderecoInput = ref('')
    const cpfInput = ref('')
    const tituloModal = ref('')
    const mensagemModal = ref('')

    let usuarios = JSON.parse(localStorage.getItem('usuarios'))

    if (usuarios === null) {
      usuarios = []
    }

    function cadastarUsuario () {
      if (nomeCompleto.value === '' || usuarioInput.value === '' || enderecoInput.value === '' || cpfInput.value === '' || cpfInput.value.length < 14) {
        tituloModal.value = 'Campos não preenchidos'
        mensagemModal.value = 'Preencha todos os campos para cadastrar o usuario'

      } else {
        tituloModal.value = 'Usuário cadastrado com sucesso'
        mensagemModal.value = 'O usuário foi cadastrado com sucesso, você pode verifica-lo na página "Consultar Usuários"'

        const novoUsuario = {
          usuario: usuarioInput.value,
          nome: nomeCompleto.value,
          endereco: enderecoInput.value,
          cpf: cpfInput.value,
          livrosEmprestimos: []
        }

        usuarios.push(novoUsuario)

        localStorage.setItem('usuarios', JSON.stringify(usuarios))
      }
    }

    return {
      nomeCompleto,
      usuarioInput,
      enderecoInput,
      cpfInput,
      tituloModal,
      mensagemModal,
      cadastarUsuario
    }
  }
}

</script>
