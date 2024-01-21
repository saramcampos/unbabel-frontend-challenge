import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import myComponent from '../TextAreaInput.vue'
import { nextTick } from 'vue'

describe('Input Component', () => {
    let wrapper: any

    beforeEach(() => {
        wrapper = mount(myComponent, {
            props: {
                modelValue: ''      
            }
        })
    })

    it('renders as expected', () => {
        const textarea = wrapper.find('[data-test="textarea"]')
    
        expect(textarea.exists()).toBe(true)
    })

    it('changes value based on input', async () => {
        const input = wrapper.find('[data-test="textarea"]')
        const value = 'this is a text area'

        await input.trigger('focus')
        await input.setValue(value)
       
        expect(input.element.value).toBe(value)
    })
})
