
import { readonly } from 'vue'
import UserModule from './user'
import CategoriesModule from './categories'
import ProductsModule from './products'
import GlobalModule from './global'

// funcao leitura sem alteracao
// se quiser alterar usar as funcoes do modulo
export default readonly({
  User: UserModule,
  Global: GlobalModule,
  Categories: CategoriesModule,
  Products: ProductsModule
})
