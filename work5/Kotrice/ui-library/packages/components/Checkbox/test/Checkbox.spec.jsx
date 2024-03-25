import { ref, nextTick } from 'vue'
import { mount } from "@vue/test-utils"
import { afterEach, describe, expect, test, vi } from 'vitest'
import Checkbox from "../Checkbox.vue"

describe('Checkbox.vue', () => {
  // 每个测试结束后，回复所有的模拟函数
  afterEach(()=>{
    vi.restoreAllMocks()
  })

  // 测试创建
  test('创建', () => {
    const wrapper = mount(() => <Checkbox />) //  挂载 Checkbox
    const checkboxElm = wrapper.find('input[type="checkbox"]') //  找到 Checkbox 元素
    expect(checkboxElm.exists()).toBe(true) //  断言是否存在
  })

  // 测试modelValue绑定
  test('测试modelValue', () => {
    const isChecked = ref(true)
    const wrapper = mount(() => <Checkbox v-model={isChecked.value} />) //  挂载 Checkbox
    const checkboxElm = wrapper.find('input[type="checkbox"]')  //  找到 checkbox 元素
    expect(checkboxElm.element.checked).toBe(true)
  })

  // 测试label属性
  test('测试label', () => {
    const wrapper = mount(() => <Checkbox label="测试label" />) //  挂载 Checkbox
    const labelElm = wrapper.find('.x-checkbox-label')  //  找到包裹 label 的元素
    expect(labelElm.text()).toBe('测试label')
  })

  // 测试checked属性
  test('测试checked', () => {
    const wrapper = mount(() => <Checkbox checked />) //  挂载 Checkbox
    const checkboxElm = wrapper.find('input[type="checkbox"]')  //  找到 checkbox 元素
    expect(checkboxElm.element.checked).toBe(true)
  })

  // 测试disabled属性
  test('测试disabled', () => {
    const wrapper = mount(() => <Checkbox disabled />)
    const checkboxElm = wrapper.find('input[type=checkbox]')
    expect(checkboxElm.element.disabled).toBe(true)
  })

  // 测试change事件
  test('测试change事件', async () => {
    const isChecked = ref(false)
    const afterValue = ref()        //  change后的值
    function handleChange(value) {  //  change事件触发后调用的函数
      afterValue.value = value
    }
    const wrapper = mount(() => <Checkbox v-model={isChecked.value} onChange={handleChange} />)
    function simulateEvent() {
      isChecked.value = !isChecked.value
    }
    simulateEvent()   //  调用模拟change事件
    await nextTick()  //  等待下一个tick
    expect(afterValue.value).toBe(isChecked.value)
  })

  // 测试插槽
  test('测试插槽', () => {
    const wrapper = mount(()=>{
      return <Checkbox>测试插槽</Checkbox>
    })
    const labelSpan = wrapper.find('.x-checkbox-label')
    expect(labelSpan.text()).toBe('测试插槽')
  })
})
