<template>
  <div class="flex justify-center w-full h-28 bg-brand-main">
    <header-logged />
  </div>

  <div class="flex flex-col items-center justify-center h-32 bg-brand-gray">
    <h1 class="text-4xl font-black text-gray-800">Categorias</h1>
    <p class="text-lg text-gray-800 font-regular">
      Lista de categorias cadastradas
    </p>
  </div>

  <div class="flex justify-center w-full">
    <div class="flex flex-col w-4/5 max-w-6xl py-10">
      <p
        v-if="state.hasError"
        class="text-lg text-center text-gray-800 fonte-regular">
        Aconteceu uma coisa chata 🥺
      </p>
      <p
        v-else-if="!state.categories.length && !state.isLoading && !state.hasError"
        class="text-lg text-center text-gray-800 fonte-regular">
          Nenhuma categoria cadastrada 🤓
      </p>
      <div class="flex justify-end mb-5" v-if="!state.hasError">
        <button
          @click="handleCategory"
          class="text-xl bg-brand-main hover:bg-gray-500 text-gray-200 rounded-md p-3"
        >
          Adicionar Categoria
        </button>
      </div>
      <categories-search-picker />
      <table-loading v-if="state.isLoading" />
      <categories-table
        v-else
        :categories="state.categories"
        :pagination="state.pagination"
        @handle="handleCategory"
        class="animate__animated animate__fadeIn animate__faster"
      />
    </div>
  </div>
</template>

<script>
import { onErrorCaptured, onMounted, reactive, watch } from 'vue'
import HeaderLogged from '../../components/HeaderLogged'
import CategoriesTable from './CategoriesTable'
import CategoriesSearchPicker from './CategoriesSearchPicker'
import TableLoading from '../../components/TableFactory/Loading'
import useModal from '../../hooks/useModal'
import useStore from '../../hooks/useStore'
import services from '../../services'
import { setCurrentTable } from '../../store/categories'

export default {
  components: { HeaderLogged, CategoriesTable, CategoriesSearchPicker, TableLoading },
  setup () {
    const modal = useModal()
    const store = useStore()

    const state = reactive({
      isLoading: false,
      categories: [],
      pagination: {
        size: 5,
        page: 1,
        total: 0
      },
      hasError: false
    })

    watch(() => store.Categories.currentTable, () => {})

    onErrorCaptured(handleErrors)

    onMounted(() => {
      fetchCategories()
    })

    function handleErrors (error) {
      state.isLoading = false
      state.hasError = !!error
    }

    async function fetchCategories () {
      try {
        state.isLoading = true

        const { data } = await services.categories.getAll({ ...state.pagination })
        console.log('data', data)
        state.categories = data._embedded.categories
        state.pagination = data.page

        setCurrentTable(data._embedded.categories)
        state.isLoading = false
      } catch (error) {
        handleErrors(error)
      }
    }

    async function handleCategory (select) {
      let data = {}
      if (select.code) {
        data = {
          code: select.code,
          name: select.name,
          description: select.description,
          status: select.status,
          editedIndex: state.categories.indexOf(select)
        }
      }
      modal.open({
        component: 'ModalCategory',
        props: data
      })
    }

    return {
      state,
      handleCategory
    }
  }
}
</script>
