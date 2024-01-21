import { describe, it, expect, beforeEach, vi } from 'vitest'
import { VueWrapper, mount } from '@vue/test-utils'
import myComponent from '../ErrorPage.vue'

vi.mock('vue-router', () => ({
    useRoute: vi.fn(() => ({
       params: {
            responseCode: '500'
       }
    })),
    useRouter: vi.fn(() => ({
        push: () => {}
    })),
}))

describe('Error Page', () => {
    let wrapper: VueWrapper
    
    beforeEach(() => {
        wrapper = mount(myComponent)
    })

    it('renders as expected', () => { 
        const errorPage = wrapper.find('[data-test="error"]')
        const responseCode = wrapper.find('[data-test="response-code"]')
        const responseText = wrapper.find('[data-test="response-text"]')

        expect(errorPage.exists()).toBe(true)
        expect(responseCode.text()).toContain('500')
        expect(responseText.text()).toBe('Something went wrong on our end. Please try again later.')
    })
})