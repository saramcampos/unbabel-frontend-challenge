import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import axios from 'axios'
import myComponent from '../HeaderComponent.vue'
import MockAdapter from 'axios-mock-adapter'
import { createTestingPinia } from '@pinia/testing'

describe('Header Component - initial state', () => {
    let mock: MockAdapter
    let wrapper: any
    import.meta.env.VITE_APP_TRANSCRIPTIONS_API_URL = "/"

    beforeEach(() => {
      mock = new MockAdapter(axios)
      wrapper = mount(myComponent, {
        global: {
            plugins: [
                createTestingPinia({
                    initialState: {
                      useTranscriptStore: {
                        transcriptList: []
                      }
                    }, 
                    stubActions: false, 
                    createSpy: vi.fn,
                })
            ]
        }
      })
    })

    afterEach(() => {
      mock.reset()
    })
    
  it('renders as expected', () => {
    const header = wrapper.find('[data-test="header"]')

    expect(header.exists()).toBe(true)
  })

  it('expect to trigger GET enpoint call on button click', async () => {
    mock.onGet("/").reply(200, [])

    const getButton = wrapper.find('[data-test="get-button"]')
    await getButton.trigger('click')

    expect(mock.history.get.length).toBe(1)
  })

  it('expect to NOT trigger POST enpoint call if no rows were added', async () => {
    const uploadButton = wrapper.find('[data-test="upload-button"]')
    await uploadButton.trigger('click')

    expect(mock.history.post.length).toBe(0)
  })
})