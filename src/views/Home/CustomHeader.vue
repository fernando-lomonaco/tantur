<template>
  <header class="header">
    <div class="header-group">
      <div class="flex items-center justify-between py-10">
        <div class="w-28 lg:w-36">
          <img class="w-full" src="../../assets/images/logo.png" alt="logo" />
        </div>

        <div class="flex">
          <button
            @click="() => emit('create-account')"
            class="px-6 py-2 font-bold text-white focus:outline-none">
            Crie uma conta
          </button>
          <button
            @click="() => emit('login')"
            class="px-6 py-2 font-bold bg-white rounded-full text-brand-main focus:outline-none"
          >
            Entrar
          </button>
        </div>
      </div>

      <div class="flex flex-col mt-28">
        <h1 class="text-4xl font-black text-white">
          Portal Monaco's <br />
          Todas as informações estão <br class="hidden lg:inline-block" />
          aqui!
        </h1>
        <p class="text-lg mt-10 font-medium text-white">
          Receba ideias, reclamações e feedbacks com um
          <br class="hidden lg:inline-block" />
          simples widget na página.
        </p>
        <div></div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  setup (_, { emit }) {
    return {
      emit
    }
  }
}
</script>

<style lang="postcss" scoped>
.header {
  /* classes to tailwind */
  @apply bg-brand-main w-full flex justify-center;
  height: 700px;
}

.header-group {
  @apply flex flex-col w-4/5 max-w-6xl;
}

@media (min-width: 640px) {
  .header-group {
    background-image: url(../../assets/images/blue_balloons.png);
    background-size: 628px;
    background-position: 90% 100%;
    background-repeat: no-repeat;
  }
}
</style>
