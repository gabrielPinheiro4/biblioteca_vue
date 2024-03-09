<template>
    <div class="loan container">
        <div class="decisao mt-3 d-flex justify-content-center gap-2">
            <button @click="render = 'RegisterBook'" class="btn btn-dark">Devolução</button>
            <button @click="render = 'LoanUser'" class="btn btn-dark">Empréstimo</button>
        </div>

        <component :is="render"></component>
    </div>
</template>

<script>
import { ref } from 'vue'
import LoanUser from '@/components/loan/LoanUser.vue'

export default {
  name: 'LoanDevolutionView',
  components: {
    LoanUser
  },

  setup () {
    const render = ref('LoanUser')

    return {
      render
    }
  }
}
</script>
