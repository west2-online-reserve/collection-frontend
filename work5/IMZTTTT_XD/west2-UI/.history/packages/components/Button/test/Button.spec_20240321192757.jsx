import { ref, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, test, vi } from 'vitest'
import Button from '../Button.vue'

// 描述 Button.vue 组件的测试
describe('Button.vue', () => {
  // 每个测试结束后，恢复所有的模拟函数
  afterEach(() => {
    vi.restoreAllMocks()
  })

  // 测试创建 Button 组件
  test('创建', async () => {
    const input = ref('input') // 创建一个 ref，用于存储输入值
    const handleFocus = vi.fn() // 创建一个模拟的焦点处理函数
    // 挂载 Input 组件
    const wrapper = mount(() => (
      <Input placeholder="请输入内容" onFocus={handleFocus} modelValue={input.value} />
    ))

    const inputElm = wrapper.find('input') // 找到 input 元素
    const nativeInput = inputElm.element // 获取原生的 input 元素

    await inputElm.trigger('focus') // 触发 focus 事件

    // 断言 input 元素存在
    expect(inputElm.exists()).toBe(true)
    // 断言焦点处理函数被调用
    expect(handleFocus).toHaveBeenCalled()
    // 断言 placeholder 属性的值
    expect(nativeInput.placeholder).toMatchInlineSnapshot(`"请输入内容"`)
    // 断言 value 属性的值
    expect(nativeInput.value).toMatchInlineSnapshot(`"input"`)

    input.value = 'text' // 修改 ref 的值
    await nextTick() // 等待下一个 tick
    // 断言 input 元素的值
    expect(inputElm.element.value).toMatchInlineSnapshot(`"text"`)
  })

  // 测试 disabled 属性
  test('测试disabled', () => {
    const wrapper = mount(() => <Input disabled />) // 挂载 Input 组件
    const inputElm = wrapper.find('input') // 找到 input 元素
    // 断言 disabled 属性的值
    expect(inputElm.element.disabled).not.toBeNull()
  })

  // 测试 size 属性
  test('测试size', () => {
    const wrapper = mount(() => <Input size="large" />) // 挂载 Input 组件
    // 断言组件的类名
    expect(wrapper.classes('w-input--large')).toBe(true)
  })

  // 测试 change 事件
  test('测试change事件', async () => {
    const content = ref('a') // 创建一个 ref，用于存储输入值
    const value = ref('') // 创建一个 ref，用于存储 change 事件的值

    // 创建一个处理 change 事件的函数
    const handleChange = (val) => {
      value.value = val
    }

    // 挂载 Input 组件
    const wrapper = mount(() => (
      <Input placeholder="请输入内容" modelValue={content.value} onChange={handleChange} />
    ))

    const el = wrapper.find('input').element // 找到 input 元素
    wrapper.vm
    // 创建一个模拟事件的函数
    const simulateEvent = (text, event) => {
      el.value = text
      el.dispatchEvent(new Event(event))
    }

    simulateEvent('2', 'change') // 模拟 change 事件
    await nextTick() // 等待下一个 tick
    // 断言 change 事件的值
    expect(value.value).toBe('2')
    simulateEvent('1', 'input') // 模拟 input 事件
    await nextTick() // 等待下一个 tick
    // 断言 input 事件的值
    expect(value.value).toBe('2')
  })
})
