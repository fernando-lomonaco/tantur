<template>
  <div class="flex flex-col">
    <form>
      <div class="flex items-center justify-between w-full mb-8">
        <div class="mt-4">
          <span class="text-gray-700">Nome: </span>
          <div class="mt-2">
            <label class="inline-flex items-center">
              <input
                type="text"
                name="accountType"
                value="oi"
                class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded focus:outline-none"
              />
            </label>
          </div>
        </div>

        <div class="mt-4">
          <span class="text-gray-700">Account Type</span>
          <div class="mt-2">
            <label class="inline-flex items-center">
              <input
                type="radio"
                class="form-radio"
                name="accountType"
                value="personal"
              />
              <span class="ml-2">Personal</span>
            </label>
            <label class="inline-flex items-center ml-6">
              <input
                type="radio"
                class="form-radio"
                name="accountType"
                value="busines"
              />
              <span class="ml-2">Business</span>
            </label>
          </div>
        </div>

        <div class="flex justify-end">

          <button
            type="submit"
            class="px-8 py-3 mt-8 text-xl font-bold text-white rounded-md inline-flex items-center bg-brand-main hover:bg-gray-500 focus:outline-none transition-all duration-150"
          >
            <svg
              class="fill-current w-4 h-4 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
            </svg>

            <span>Buscar</span>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {}
</script>
