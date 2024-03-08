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
                    <input ref="livroBuscadoInput" type="text" id="pesquisar" class="form-control">
                </div>

                <div class="col">
                    <button @click.prevent="buscarLivro()" class="btn btn-primary">Buscar</button>
                </div>
            </div>
        </form>
        </div>

        <table class="table mt-5">
            <thead>
                <tr>
                    <th scope="col">Usuário</th>
                    <th scope="col">Nome Completo</th>
                    <th scope="col">CPF</th>
                    <th scope="col">Endereço</th>
                </tr>
            </thead>
        </table>

    </div>
</template>

<script>

export default {
  name: 'SearchUser'
}

</script>
