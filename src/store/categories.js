import { reactive } from 'vue'

const state = reactive({
  currentTable: []
})

export default state

export function setCurrentTable (table) {
  state.currentTable = table
}

export function add (item) {
  state.currentTable.unshift(item)
}

export function update (item, index) {
  Object.assign(state.currentTable[index], item)
}
