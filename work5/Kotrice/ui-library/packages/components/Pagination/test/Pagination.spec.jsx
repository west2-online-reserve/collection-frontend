import { ref, nextTick } from 'vue'
import { mount } from "@vue/test-utils"
import { afterEach, describe, expect, test, vi } from 'vitest'
import Pagination from '../Pagination.vue'
import Prev from '../Prev.vue'
import Pager from '../Pager.vue'
import Next from '../Next.vue'
import Total from '../Total.vue'
import Jumper from '../Jumper.vue'

describe('Pagination.vue', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  // 测试创建
  test('创建', async () => {
    const wrapper = mount(() => {
      return (
        <Pagination total="20" />
      )
    })
    await nextTick()
    const pagination = wrapper.find('.x-pagination')
    expect(pagination).toBeTruthy //  断言挂载成功
    const pagers = wrapper.findAll('.x-pager li')
    expect(pagers.length).toBe(2) //  因为default-page-size = 10 所以会有 2个 page
    const activePager = wrapper.find('.x-pager .active')
    expect(activePager.text()).toBe('1')  //  也是断言default-page-count = 1
  })

  // 测试current-page
  test('测试current-page', async () => {
    const currentPage = ref(2)
    const wrapper = mount(() => {
      return (
        <Pagination total="40"  v-model:current-page={currentPage.value} />
      )
    })
    await nextTick()
    const activePager = wrapper.find('.x-pager .active')
    expect(activePager.text()).toBe('2')  //  断言初始值是不是2
    currentPage.value = 3 //  更改初始值
    await nextTick()
    const afterActivePage = wrapper.find('.x-pager .active')
    expect(afterActivePage.text()).toBe('3')  //  断言初始值是不是3
  })

  // 测试 page-size
  test('测试page-size', async () => {
    const pageSize = ref(2)
    const wrapper = mount(() => {
      return (
        <Pagination total="20" v-model:page-size={pageSize.value} />
      )
    })
    await nextTick()
    const pagers = wrapper.findAll('.x-pagination li')
    const lastPager = pagers[pagers.length - 1]
    expect(lastPager.text()).toBe('10')   //  最后一个页码为 20 / 2 = 10
    // 改变pageSize
    pageSize.value = 4
    await nextTick()
    expect(lastPager.text()).toBe('5')   //  最后一个页码为 20 / 4 = 5
  })

  // 测试pager-count
  test('测试pager-count', async () => {
    const pageSize = ref(2)
    const pagerCount = ref(7)
    const wrapper = mount(() => {
      return (
        <Pagination total="20" v-model:page-size={pageSize.value} pager-count={pagerCount.value} />
      )
    })
    await nextTick()
    const pagers = wrapper.findAll('.x-pagination li')
    expect(pagers.length).toBe(8) //  总共 10 个 7个折叠 所以初始就8个
    const fifthPager = pagers[4]  //  点击切换到第五页
    fifthPager.trigger('click')
    await nextTick()
    const afterPagers = wrapper.findAll('.x-pagination li')
    expect(afterPagers.length).toBe(9)  //  1 ... 3 4 5 6 7 ... 10
  })

})
