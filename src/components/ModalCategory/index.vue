<template>
  <div class="flex justify-between">
    <h1 class="text-4xl font-black text-gray-800">
      {{ titleModal }} Categoria
    </h1>

    <button @click="close" class="text-4xl text-gray-600 focus:outline-none">
      &times;
    </button>
  </div>

  <div class="mt-16">
    <form @submit.prevent="handleSubmit">
      <label class="block">
        <span class="text-lg font-medium text-gray-800"> Nome </span>
        <input
          type="text"
          v-model="state.name.value"
          :class="{
            'border-brand-danger': !!state.name.errorMessage,
          }"
          name="name"
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
          placeholder="xpto"
        />
        <span
          v-if="!!state.name.errorMessage"
          class="block font-medium text-brand-danger"
        >
          {{ state.name.errorMessage }}
        </span>
      </label>

      <label class="block mt-9">
        <span class="text-lg font-medium text-gray-800"> Descrição </span>
        <textarea
          v-model="state.description.value"
          :class="{
            'border-brand-danger': !!state.description.errorMessage,
          }"
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
          rows="3"
          placeholder="Enter some long form content."
        />
        <span
          v-if="!!state.description.errorMessage"
          class="block font-medium text-brand-danger"
        >
          {{ state.description.errorMessage }}
        </span>
      </label>

      <label class="block mt-9">
        <span class="text-lg font-medium text-gray-800"> Status </span>
        <div class="mt-2">
          <label class="inline-flex items-center">
            <input
              type="radio"
              v-model="state.status.value"
              class="form-radio"
              name="status"
              value="A"
            />
            <span class="ml-2 text-lg">Ativo</span>
          </label>
          <label class="inline-flex items-center ml-6">
            <input
              type="radio"
              v-model="state.status.value"
              class="form-radio"
              name="status"
              value="I"
            />
            <span class="ml-2 text-lg">Inativo</span>
          </label>
        </div>
        <span
          v-if="!!state.status.errorMessage"
          class="block font-medium text-brand-danger"
        >
          {{ state.status.errorMessage }}
        </span>
      </label>

      <div class="flex justify-end">
        <button
          :disabled="state.isLoading"
          type="submit"
          :class="{
            'opacity-50': state.isLoading,
          }"
          class="px-8 py-3 mt-8 text-2xl font-bold text-white rounded-md bg-brand-main hover:bg-gray-500 focus:outline-none transition-all duration-150"
        >
          <icon v-if="state.isLoading" name="loading" class="animate-spin" />
          <span v-else>Salvar</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { useField } from 'vee-validate'
import { useToast } from 'vue-toastification'
import Icon from '../Icon'
import {
  validateEmptyAndLength3,
  validateIsRequired
} from '../../utils/validators'
import useModal from '../../hooks/useModal'
import services from '../../services'
import { add, update } from '../../store/categories'

export default {
  components: { Icon },
  props: {
    code: { type: String, required: false },
    name: { type: String, required: false },
    description: { type: String, required: false },
    status: { type: String, required: false },
    editedIndex: { type: Number, required: false }
  },
  setup (props) {
    const modal = useModal()
    const toast = useToast()

    const { value: nameValue, errorMessage: nameErrorMessage } = useField(
      'name',
      validateEmptyAndLength3
    )

    const {
      value: descriptionValue,
      errorMessage: descriptionErrorMessage
    } = useField('description', validateEmptyAndLength3)

    const { value: statusValue, errorMessage: statusErrorMessage } = useField(
      'status',
      validateIsRequired
    )

    const titleModal = computed(() => {
      return props.code ? 'Editar' : 'Adicionar'
    })

    const state = reactive({
      hasErrors: false,
      isLoading: false,
      name: {
        value: props.name || nameValue,
        errorMessage: nameErrorMessage
      },
      description: {
        value: props.description || descriptionValue,
        errorMessage: descriptionErrorMessage
      },
      status: {
        value: props.status || statusValue,
        errorMessage: statusErrorMessage
      }
    })

    async function handleSubmit () {
      try {
        toast.clear()
        state.isLoading = true
        let message = ''
        if (props.code) {
          const { data, errors } = await services.categories.put({
            code: props.code,
            name: state.name.value,
            description: state.description.value,
            status: state.status.value
          })

          update(data, props.editedIndex)
          message = `Categoria ${data.name} editada com sucesso`

          validateHasErrors(errors)
        } else {
          const { data, errors } = await services.categories.post({
            name: state.name.value,
            description: state.description.value,
            status: state.status.value
          })

          add(data)
          message = `Categoria ${data.name} cadastrada com sucesso`

          validateHasErrors(errors)
        }

        toast.success(message)
      } catch (error) {
        state.isLoading = false
        state.hasErrors = !!error
        toast.error('Ocorreu um erro')
      }
    }

    function validateHasErrors (errors) {
      if (!errors) {
        state.isLoading = false
        modal.close()
      } else {
        state.isLoading = false
        toast.error('Ocorreu um erro')
      }
    }

    return {
      state,
      titleModal,
      close: modal.close,
      handleSubmit
    }
  }
}
</script>
