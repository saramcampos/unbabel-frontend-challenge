import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import myComponent from '../InputComponent.vue';

describe('Input Component', () => {
    let component: any

    beforeEach(() => {
        component = mount(myComponent, {
            props: {
                modelValue: 'Input', 
                placeholderText: 'Placeholder'      
            }
        })
    })

    it('Input: expect to be visible and editable', async () => { 
        const input = component.find('[data-test="input"]')
        expect(input.isVisible()).toBe(true) 
 
        await input.trigger('focus')
        await input.setValue('unit test')
        await input.trigger('change')
       
        expect(input.element.value).toBe('unit test')
    }) 
})
