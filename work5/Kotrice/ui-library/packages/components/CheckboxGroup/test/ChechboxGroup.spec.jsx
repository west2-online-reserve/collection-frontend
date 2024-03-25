import { ref, nextTick } from 'vue'
import { mount } from "@vue/test-utils"
import { afterEach, describe, expect, test, vi } from 'vitest'
import Checkbox from '../../Checkbox/Checkbox.vue'
import CheckboxGroup from '../CheckboxGroup.vue'

describe('CheckboxGroup.vue', () => {
  // 每个测试结束后，回复所有的模拟函数
  afterEach(()=>{
    vi.restoreAllMocks()
  })

  // 测试modelValue
  test('测试modelValue', async () => {
    // 设置测试数据
    const modelValue = ref(['checkbox01', 'checkbox02'])
    // 挂载组件
    const wrapper = mount(()=>{
      return (
        <CheckboxGroup v-model={modelValue.value}>
          <Checkbox label="checkbox01"/>
          <Checkbox label="checkbox02"/>
          <Checkbox label="checkbox03"/>
        </CheckboxGroup>
      )
    })
    
    await nextTick()  //  等待下一个tick

    // 断言个数是不是为3
    expect(wrapper.findAll('input[type="checkbox"]').length).toBe(3)
    // 找到 checkbox01 和 checkbox02 断言是不是checked
    expect(wrapper.findAll('input[type="checkbox"]')[0].element.checked).toBe(true)
    expect(wrapper.findAll('input[type="checkbox"]')[1].element.checked).toBe(true)
    // checkbox03的
    expect(wrapper.findAll('input[type="checkbox"]')[2].element.checked).toBe(false)

    // 更改modelValue的值
    modelValue.value.push('checkbox03')
    nextTick()
    expect(wrapper.findAll('input[type="checkbox"]')[1].element.checked).toBe(true)
  })

  // 测试disabled
  test('测试disabled', async () => {
    const wrapper = mount(()=>{
      return (
        <CheckboxGroup disabled>
          <Checkbox label="checkbox01"/>
          <Checkbox label="checkbox02"/>
          <Checkbox label="checkbox03"/>
        </CheckboxGroup>
      )
    })
    await nextTick()
    const checkboxs = wrapper.findAll('input[type="checkbox"]')
    checkboxs.forEach(c => {  //  断言checkbox是否disabled
      expect(c.element.disabled).toBe(true)
    })
  })

  // 测试min
  test('测试min', async () => {
    const modelValue = ref(['checkbox01'])
    const wrapper = mount(()=>{
      return (
        <CheckboxGroup v-model={modelValue.value} min="2" >
          <Checkbox label="checkbox01" />
          <Checkbox label="checkbox02" />
        </CheckboxGroup> 
      )
    })
    await nextTick()
    expect(wrapper.findAll('input[type="checkbox"]')[0].element.disabled).toBe(true)  //  因为最小2个，但是modelValue中只有1个，所以断言第一个是不是disabled
  })

  // 测试max
  test('测试max', async () => {
    const modelValue = ref(['checkbox01'])
    const wrapper = mount(()=>{
      return (
        <CheckboxGroup v-model={modelValue.value} max="1" >
          <Checkbox label="checkbox01" />
          <Checkbox label="checkbox02" />
        </CheckboxGroup> 
      )
    })
    const checkboxs = wrapper.findAll('input[type="checkbox"]')
    await nextTick()
    await nextTick()  //  等2个tick 一个是这里面的 一个是组件里面的?
    expect(checkboxs[0].element.checked).toBe(true) //  断言第一个被勾选上
    expect(checkboxs[1].element.disabled).toBe(true)//  断言第二个disabled
  })

  // 测试change事件
  test('测试change事件', async () => {
    const modelValue = ref(['checkbox01'])
    const simulateEvent = () => {
      modelValue.value.push('checkbox02')
    }
    const afterValue = ref([])
    function handleChange(value) {
      value.forEach(v => {
        afterValue.value.push(v)
      })
    }
    const wrapper = mount(()=>{
      return (
        <CheckboxGroup v-model={modelValue.value} onChange={ handleChange }>
          <Checkbox label="checkbox01" />
          <Checkbox label="checkbox02" />
        </CheckboxGroup> 
      )
    })
    simulateEvent() //  调用模拟函数
    await nextTick()
    expect(modelValue.value[1]).toBe('checkbox02')  //  断言 checkbox02 加进去了
    let i = 0;
    modelValue.value.forEach(mV => {
      expect(afterValue.value[i]).toBe(mV)          //  断言 afterValue 是不是和 modelValue 对应
      i++;
    })
  })
})
