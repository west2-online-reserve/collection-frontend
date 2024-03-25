import Button from './Button'
import Dialog from './Dialog'
import Checkbox from './Checkbox'
import CheckboxGroup from './CheckboxGroup'
import Pagination from './Pagination'

const components = [
  Button,
  Dialog,
  Checkbox,
  CheckboxGroup,
  Pagination
]

// 全局动态添加
const install = (app) => {
  components.forEach(component => {
    app.component(component.name, component)
  })
}

export default {
  install
}
