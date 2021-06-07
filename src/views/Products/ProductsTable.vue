<template>
  <div>
    <div class="shadow overflow-hidden rounded border-b border-gray-200">
      <div>
        <p class="text-sm text-gray-700">
          Showing
          <span class="font-medium">1</span>
          to
          <span class="font-medium">{{ pagination.totalPages }}</span>
          of
          <span class="font-medium">{{ pagination.totalElements }}</span>
          results
        </p>
      </div>
      <table class="min-w-full bg-white">
        <thead class="bg-gray-800 text-white">
          <tr>
            <th
              class="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm"
            >
              Nome
            </th>
            <th
              class="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm"
            >
              Último update
            </th>
            <th class="text-left py-3 px-4 uppercase font-semibold text-sm">
              Status
            </th>
            <th class="text-left py-3 px-4">#</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(product, index) in products"
            :key="product.code"
            :class="index % 2 == 0 ? 'bg-gray-lightest' : 'hover:bg-gray-50'"
          >
            <td class="w-1/3 text-left py-3 px-4">{{ product.name }}</td>
            <td class="w-1/3 text-left py-3 px-4">
              {{
                product.updatedDate
                  ? compareDate(product.createdDate, product.updatedDate)
                  : formatBrlDate(product.createdDate)
              }}
            </td>
            <td class="text-left py-3 px-4">
              {{ product.status == "A" ? "Ativo" : "Inativo" }}
            </td>
            <td>
              <img
                @click="() => handleEditItem(product)"
                src="../../assets/images/edit.png"
                alt="edit"
                class="cursor-pointer"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="flex justify-end py-2">
      <nav class="block">
        <ul class="flex pl-0 rounded list-none flex-wrap">
          <li v-for="pageNumber in pagination.totalPages" :key="pageNumber">
            <a
              href="#pablo"
              class="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-pink-500 text-white bg-pink-500"
            >
              {{ pageNumber }}
            </a>
          </li>
          <!-- <li>
            <a
              href="#pablo"
              class="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-pink-500 bg-white text-pink-500"
            >
              2
            </a>
          </li> -->
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import { formatBrlDate, compareDate } from '../../utils/date'

export default {
  props: {
    products: { type: Array, required: true },
    pagination: { type: Object, required: true }
  },

  setup (_, { emit }) {
    function handleEditItem (item) {
      emit('handle', item)
    }

    return {
      formatBrlDate,
      compareDate,
      handleEditItem
    }
  }
}
</script>
