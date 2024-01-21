import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import myComponent from '../CheckboxInput.vue'

describe('Checkbox Input Component', () => {
    let wrapper: any

    beforeEach(() => {
        wrapper = mount(myComponent, {
            props: {
                modelValue: false     
            }
        })
    })

  it('renders checkbox correctly', () => {
    const checkbox = wrapper.find('[data-test="checkbox"]');

    expect(checkbox.exists()).toBe(true)
  })

  it('reflects prop changes to the checkbox state', async () => {
    await wrapper.setProps({ modelValue: true })

    const checkbox = wrapper.find('[data-test="checkbox"]')
    expect(checkbox.element.checked).toBe(true)

    await wrapper.setProps({ modelValue: false })

    expect(checkbox.element.checked).toBe(false)
  });
});