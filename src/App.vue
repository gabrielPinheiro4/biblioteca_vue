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
              class="nav-link" to="/book">Livros
            </router-link>

          </li>
          <li class="nav-item">

            <router-link
              class="nav-link" to="/loan">Empréstimo/Devolução
            </router-link>

          </li>
          <li class="nav-item">

            <router-link
              class="nav-link" to="/users">Usuários
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
</style>
