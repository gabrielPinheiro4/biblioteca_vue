<template>
  <div class="historico container py-5">
    <table class="table">
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
        <tr v-for="historico in historicos" :key="historico">
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
export default {
  name: 'HistoricView',

  setup () {
    let historicos = JSON.parse(localStorage.getItem('historico'))

    if (historicos === null) {
      historicos = []
    }

    return {
      historicos
    }
  }
}
</script>
