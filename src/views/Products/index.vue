<template>
  <div class="flex justify-center w-full h-28 bg-brand-main">
    <header-logged />
  </div>
  <div class="flex flex-col items-center justify-center h-32 bg-brand-gray">
    <h1 class="text-4xl font-black text-gray-800">Produtos</h1>
    <p class="text-lg text-gray-800 font-regular">
      Lista de produtos cadastrados
    </p>
  </div>
</template>

<script>
import HeaderLogged from '../../components/HeaderLogged'

export default {
  components: { HeaderLogged }
}
</script>
