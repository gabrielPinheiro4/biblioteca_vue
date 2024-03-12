<template>
  <div class="users container">
    <div class="decisao mt-3 d-flex justify-content-center gap-2">
      <button @click="render = 'RegisterUser'" class="btn btn-dark">Cadastrar Usuários</button>
      <button @click="render = 'SearchUser'" class="btn btn-dark">Consultar Usuários</button>
    </div>

  <component :is="render"></component>
  </div>
</template>

<script>

import { ref } from 'vue'
import RegisterUser from '@/components/users/RegisterUser.vue'
import SearchUser from '@/components/users/SearchUser.vue'

export default {
  name: 'TheBook',
  components: {
    RegisterUser,
    SearchUser
  },

  setup () {
    const render = ref('SearchUser')

    return {
      render
    }
  }

}

</script>
