import { describe, it, expect, beforeEach } from 'vitest';
import { VueWrapper, mount } from '@vue/test-utils';
import myComponent from '../ButtonComponent.vue';

describe('Recess Button', () => {
    let wrapper: VueWrapper

    beforeEach(() => {
        wrapper = mount(myComponent, { 
            slots: {
                default: {
                    template: 'click me'
                },
            }
        })
    })

    it('renders button correctly', () => {
        const checkbox = wrapper.find('[data-test="button"]');
    
        expect(checkbox.exists()).toBe(true);
    })

    it('expect button to be a button', async () => {
        expect(wrapper.find('button'))
    })
 
    it('expect button to be an anchor', async () => {
        await wrapper.setProps({
            url: 'test',
            target: '_blank'
        })

        expect(wrapper.find('a'))
    })

    it('expect button to be a router-link', async () => {
        await wrapper.setProps({
            url: {},
        })

        expect(wrapper.find('router-link'))
    })
})