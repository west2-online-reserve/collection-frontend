import { ref, nextTick } from 'vue'
import { mount } from "@vue/test-utils"
import { afterEach, describe, expect, test, vi } from 'vitest'
import Dialog from '../Dialog.vue'

describe('Dialog.vue', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  // 创建
  test('创建', async () => {
    const showDialog = ref(true)
    const wrapper = mount(() => {
      return (
        <Dialog v-model={showDialog.value} />
      )
    })
    await nextTick()  //  等一个tick
    const mask = document.getElementById('mask')  //  获取遮罩层
    expect(mask).toBeTruthy() //  断言遮罩层存在
    showDialog.value = false  //  修改showDialog的值
    await nextTick()  //  等一个tick
    const afterMask = document.getElementById('mask')  //  重新获取遮罩层
    expect(afterMask).toBeNull()//  断言遮罩层不存在
    wrapper.unmount() //卸载组件
  })

  // 测试title属性
  test('测试title', async () => {
    const showDialog = ref(true)
    const wrapper = mount(() => {
      return (
        <Dialog v-model={showDialog.value} title="测试Title" />
      )
    })
    await nextTick()
    const header = document.querySelector('#mask .x-dialog-container header')
    expect(header.textContent).toBe("测试Title")
    wrapper.unmount() //  卸载组件
  })

  // 测试before-close属性
  test('测试before-close', async () => {
    const showDialog = ref(true)
    let flag = false
    async function beforeClose(done) {
      flag = true
      expect(showDialog.value).toBe(true) //  Dialog仍然展示着
      await done()
      expect(showDialog.value).toBe(false)//  调用了done就不展示了
    }
    const wrapper = mount(() => {
      return (
        <Dialog v-model={showDialog.value} before-close={ beforeClose } />
      )
    })
    await nextTick()
    const mask = document.getElementById('mask')
    mask.click()
    await nextTick()
    expect(flag).toBe(true) //  断言 beforeClose被调用了
    // 卸载wrapper
    wrapper.unmount()
  })

  // 测试插槽
  test('测试插槽', async () => {
    const showDialog = ref(true)
    const wrapper = mount(Dialog, {
      props: {
        modelValue: showDialog.value,
        title: 'Title'
      },
      slots: {
        header: <span>header</span>,
        default: <span>content</span>,
        footer: <span>footer</span>
      }
    })
    await nextTick()
    const header = document.querySelector('.x-dialog-header span')    //  获取header
    expect(header.textContent).toBe('header')   //  断言插槽是否插入成功  插入的是 header 而不是 title
    const content = document.querySelector('.x-dialog-content span')  //  获取content
    expect(content.textContent).toBe('content') //  断言插槽是否插入成功
    const footer = document.querySelector('.x-dialog-footer span')    //  获取footer
    expect(footer.textContent).toBe('footer')   //  断言插槽是否插入成功

    // 卸载组件
    wrapper.unmount()
  })

  //  测试open和close
  test('测试open与close', async () => {
    const isShowDialog = ref(true)
    let flagOpen = false
    let flagClose = false
    function handleOpen() {
      flagOpen = true
    }
    function handleClose() {
      flagClose = true
    }
    function simulateEvent() {
      isShowDialog.value = !isShowDialog.value
    }
    const wrapper = mount(() => {
      return (
        <Dialog v-model={isShowDialog.value} onOpen={handleOpen} onClose={handleClose} />
      )
    })
    await nextTick()
    simulateEvent()
    await nextTick()
    expect(flagClose).toBe(true)  // 断言Close有没有被调用
    simulateEvent()
    await nextTick()
    expect(flagOpen).toBe(true)   // 断言Open有没有被调用
    // 卸载wrapper
    wrapper.unmount()
  })
})
