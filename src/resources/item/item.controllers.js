import { crudControllers } from '../../utils/crud'
import { Item } from './item.model'

export default crudControllers(Item)

// can overwrite crud controller if needed
// export default {...crudControllers(Item),getOne(){}}
