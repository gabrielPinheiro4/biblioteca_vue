<template>
<div class="container book">
  <div class="decisao mt-3 d-flex justify-content-center gap-2">
    <button @click="render = 'RegisterBook'" class="btn btn-dark">Cadastrar Livro</button>
    <button @click="render = 'SearchBook'" class="btn btn-dark">Consultar Livros</button>
  </div>

  <component :is="render"></component>
</div>
</template>

<script>
import { ref } from 'vue'
import RegisterBook from '@/components/books/RegisterBook.vue'
import SearchBook from '@/components/books/SearchBook.vue'

export default {
  name: 'TheBook',
  components: {
    RegisterBook,
    SearchBook
  },

  setup () {
    const render = ref('SearchBook')

    return {
      render
    }
  }

}

</script>
