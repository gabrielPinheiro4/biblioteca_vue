<template>
  <div class="historico container py-5">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Função Realizada</th>
          <th scope="col">Usuário</th>
          <th scope="col">Livro</th>
          <th scope="col">Valor Antigo</th>
          <th scope="col">Valor Novo</th>
          <th scope="col">Data Realizada</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="historico in historicos" :key="historico">
          <td>{{historico.metodo}}</td>

          <td>
            <p>Nome: {{ historico.usuarioFuncao.nome }}</p>
            <p class="mb-0">CPF: {{ historico.usuarioFuncao.cpf }}</p>
          </td>

          <td>
            <p>Titulo: {{ historico.livroFuncao.titulo }}</p>
            <p class="mb-0">Autor: {{ historico.livroFuncao.autor }}</p>
          </td>

          <td>{{ historico.valorAntigo }}</td>
          <td>{{ historico.valorNovo }}</td>
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
