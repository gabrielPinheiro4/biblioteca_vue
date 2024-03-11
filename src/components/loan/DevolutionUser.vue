<template>

    <div class="devolution container py-5">
        <div class="row">
            <div class="col">
                <h1>Devolução</h1>
            </div>
        </div>

        <form action="" class="mt-4">
            <div class="row mb-3">
                <div class="col">
                    <label for="nomeCliente">Nome do cliente</label>
                    <input ref="nomeClienteInput" type="text" id="nomeCliente" class="form-control">
                </div>
            </div>

            <div class="row mb-3">
                <div class="col">
                    <label for="nomeLivro">Nome do livro</label>
                    <input ref="nomeLivroInput" type="text" id="nomeLivro" class="form-control">
                </div>
            </div>

            <div class="row">
                <div class="col">
                    <button class="btn btn-primary">Fazer devolução</button>
                </div>
            </div>
        </form>
    </div>

</template>

<script>

export default {
  name: 'DevolutionUser'
}

</script>
