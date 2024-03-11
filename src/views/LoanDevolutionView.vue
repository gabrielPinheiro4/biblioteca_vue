<template>
    <div class="loan container">
        <div class="decisao mt-3 d-flex justify-content-center gap-2">
            <button @click="render = 'DevolutionUser'" class="btn btn-dark">Devolução</button>
            <button @click="render = 'LoanUser'" class="btn btn-dark">Empréstimo</button>
        </div>

        <component :is="render"></component>
    </div>
</template>

<script>
import { ref } from 'vue'
import LoanUser from '@/components/loan/LoanUser.vue'
import DevolutionUser from '@/components/loan/DevolutionUser.vue'

export default {
  name: 'LoanDevolutionView',
  components: {
    LoanUser,
    DevolutionUser
  },

  setup () {
    const render = ref('LoanUser')

    return {
      render
    }
  }
}
</script>
