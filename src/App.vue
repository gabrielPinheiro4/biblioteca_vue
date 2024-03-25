<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary px-2">
    <div class="container-fluid">
      <router-link class=" fw-bold navbar-brand" to="/">Biblioteca</router-link>

      <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">

            <router-link
              class="nav-link" to="/livros">Livros
            </router-link>

          </li>
          <li class="nav-item">

            <router-link
              class="nav-link" to="/emprestimodevolucao">Empréstimo/Devolução
            </router-link>

          </li>
          <li class="nav-item">

            <router-link
              class="nav-link" to="/usuarios">Usuários
            </router-link>

          </li>

          <li class="nav-item">

          <router-link
            class="nav-link" to="/historico">Histórico
          </router-link>

        </li>
        </ul>
      </div>
    </div>
</nav>
  <router-view/>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.list-group-item{
  cursor: pointer;
  &:hover{
    background: #ddd;
  }
}

.page-link{
  cursor: pointer;
}
</style>
