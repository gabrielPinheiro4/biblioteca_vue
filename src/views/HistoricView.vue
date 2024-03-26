<template>
  <div class="historico container py-5">
    <form action="">
      <div class="row align-items-end">
        <div class="col">
          <label for="pesquisaHistorico">Pesquisar</label>

          <input
          autocomplete="off"
          v-model.trim="pesquisaInputHistorico"
          type="text"
          id="pesquisaHistorico"
          class="form-control">

          <ul v-if="pesquisaInputHistorico.length > 0" class="list-group position-absolute">
            <li
              v-for="item in elementosBusca"
              :value="item.valor"
              @click="pesquisarHistorico($event)"
              :key="item"
              class="list-group-item">{{ item.texto }}{{ pesquisaInputHistorico }}
            </li>
          </ul>
        </div>
      </div>
    </form>

    <table class="table mt-5">
      <thead>
        <tr>
          <th scope="col">Função Realizada</th>
          <th scope="col">Usuário/Livro</th>
          <th scope="col">Empréstimo/Devolução</th>
          <th scope="col">Valor Antigo</th>
          <th scope="col">Valor Novo</th>
          <th scope="col">Data Realizada</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="historico in todosHistoricos" :key="historico">
          <td>{{historico.metodo}}</td>

          <td v-if="historico.usuarioLivro.hasOwnProperty('nome')">
            <p>Nome: {{ historico.usuarioLivro.nome }}</p>
            <p class="mb-0">CPF: {{ historico.usuarioLivro.cpf }}</p>
          </td>

          <td v-else-if="historico.usuarioLivro.hasOwnProperty('titulo')">
            <p>Titulo: {{ historico.usuarioLivro.titulo }}</p>
            <p class="mb-0">Autor: {{ historico.usuarioLivro.autor }}</p>
          </td>

          <td v-else></td>

          <td v-if="historico.emprestimoDevolucao.hasOwnProperty('titulo')">
            <p>Título: {{ historico.emprestimoDevolucao.titulo }}</p>
            <p>Autor: {{ historico.emprestimoDevolucao.autor }}</p>
            <p>Gênero: {{ historico.emprestimoDevolucao.genero }}</p>
            <p>Data de lançamento: {{ historico.emprestimoDevolucao.data }}</p>
            <p>Quantidade: {{ historico.emprestimoDevolucao.quantidade }}</p>
          </td>

          <td v-else></td>

          <td v-if="historico.valorAntigo.hasOwnProperty('titulo')">
            <p>Título: {{ historico.valorAntigo.titulo }}</p>
            <p>Autor: {{ historico.valorAntigo.autor }}</p>
            <p>Gênero: {{ historico.valorAntigo.genero }}</p>
            <p>Data de lançamento: {{ historico.valorAntigo.data }}</p>
            <p class="mb-0">Quantidade: {{ historico.valorAntigo.quantidade }}</p>
          </td>

          <td v-else-if="historico.valorAntigo.hasOwnProperty('nome')">
            <p>Nome: {{ historico.valorAntigo.nome }}</p>
            <p>Usuario: {{ historico.valorAntigo.usuario }}</p>
            <p>CPF: {{ historico.valorAntigo.cpf }}</p>
            <p class="mb-0">Endereço: {{ historico.valorAntigo.endereco }}</p>
          </td>

          <td v-else></td>

          <td v-if="historico.valorNovo.hasOwnProperty('titulo')">
            <p>Título: {{ historico.valorNovo.titulo }}</p>
            <p>Autor: {{ historico.valorNovo.autor }}</p>
            <p>Gênero: {{ historico.valorNovo.genero }}</p>
            <p>Data de lançamento: {{ historico.valorNovo.data }}</p>
            <p class="mb-0">Quantidade: {{ historico.valorNovo.quantidade }}</p>
          </td>

          <td v-else-if="historico.valorNovo.hasOwnProperty('nome')">
            <p>Nome: {{ historico.valorNovo.nome }}</p>
            <p>Usuario: {{ historico.valorNovo.usuario }}</p>
            <p>CPF: {{ historico.valorNovo.cpf }}</p>
            <p class="mb-0">Endereço: {{ historico.valorNovo.endereco }}</p>
          </td>

          <td v-else></td>

          <td>{{ historico.dataRealizada }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
/* eslint-disable */
import { removeAcentos } from '@/funcoes'
import { ref } from 'vue'

export default {
  name: 'HistoricView',
  
  setup () {
    let historicos = JSON.parse(localStorage.getItem('historico'))
    const todosHistoricos = ref(historicos)
    const pesquisaInputHistorico = ref('')

    const elementosBusca = ref(
      [
        {valor: 'usuario', texto: 'Procurar usuário por: '},
        {valor: 'livro', texto: 'Procurar livro por: '}
      ]
    )
    
    if (historicos === null) {
      historicos = []
    }

    function pesquisarHistorico (event) {
      const busca = removeAcentos(pesquisaInputHistorico.value).toLowerCase()
      const historicoBuscado = []

      if (busca === '') {
        todosHistoricos.value = historicos

      } else {
        for (const historico of historicos) {

          switch (event.target._value) {

            case 'usuario':

              if (historico.usuarioLivro.hasOwnProperty('usuario')) {
                const userNormalize = removeAcentos(historico.usuarioLivro.usuario).toLowerCase()

                if (userNormalize.includes(busca) && busca !== '') {
                  historicoBuscado.push(historico)
                  todosHistoricos.value = historicoBuscado
                }
              }

              break
          }
        }
      }

    }

    return {
      historicos,
      pesquisaInputHistorico,
      todosHistoricos,
      elementosBusca,
      pesquisarHistorico
    }
  }
}
</script>
