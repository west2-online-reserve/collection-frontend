import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, test, vi } from 'vitest'
import Button from '../Button.vue'

// 描述 Button.vue 组件的测试
describe('Button.vue', ()=>{
  // 每个测试结束后，回复所有的模拟函数
  afterEach(()=>{
    vi.restoreAllMocks()
  })

  // 测试创建 Button 组件
  test('创建', () => {
    //  挂载 Button 组件
    const wrapper = mount(() => <Button/> )
    const btnElm = wrapper.find('button') //  找到 button 元素
    // 断言 btn 元素存在
    expect(btnElm.exists()).toBe(true)
  })

  // 测试 size 属性
  test('测试size', () => {
    // 挂载 Button 组件
    const wrapper = mount(() => <Button size="large"/>)
    const btnElm = wrapper.find('button') //  找到 button 元素
    expect(btnElm.classes('x-button--large')).toBe(true) // 断言 button 的类名
  })

  // 测试 type 属性
  test('测试type', () => {
    // 挂载 Button 组件
    const wrapper = mount(() => <Button type="success"/>)
    const btnElm = wrapper.find('button') //  找到 button 元素
    expect(btnElm.classes('x-button--success')).toBe(true)
  })

  // 测试 round 属性
  test('测试round', () => {
    // 挂载 Button 组件
    const wrapper = mount(() => <Button round/>)
    const btnElm = wrapper.find('button') //  找到 button 元素
    expect(btnElm.classes('x-button--round')).toBe(true)
  })

  // 测试 disabled 属性
  test('测试disabled', () => {
    // 挂载 Button 组件
    const wrapper = mount(() => <Button disabled/>)
    const btnElm = wrapper.find('button') //  找到 button 元素
    expect(btnElm.element.disabled).toBe(true)
  })

  // 测试插槽
  test('插槽测试', () => {
    // 挂载 Button 组件
    const wrapper = mount(() => {
      return <Button>插槽测试</Button>
    })
    const btnElm = wrapper.find('button') //  找到 button 元素
    expect(btnElm.text()).toBe('插槽测试')
  })
})
