import myComponent from '../App.vue'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { VueWrapper, mount  } from '@vue/test-utils'
import axios from "axios"
import MockAdapter from 'axios-mock-adapter'
import { nextTick } from 'vue'
import { useRouter } from 'vue-router'

async function testFunction() {
    try {
      return await axios.get('/test')
    } catch (err) {
      return {}
    }
}

vi.mock('vue-router', () => ({
    useRouter: vi.fn(() => ({
        replace: () => {}
    })),
    RouterView: vi.fn(() => ({}))
}))

describe('App', () => {  
    let mock: MockAdapter 
    let wrapper: VueWrapper
    
    beforeEach(() => {
        mock = new MockAdapter(axios)
    })

    afterEach(() => {
        mock.restore()
    })

    it('Expect loader to be visible', async () => {  
        wrapper = mount(myComponent)      
        wrapper.vm.setLoading(true)

        await nextTick() 

        expect(wrapper.find('[data-test="loader"]').isVisible()).toBe(true)
    })

    it('Expect to call ErrorPage page on error', async () => {  
        const replace = vi.fn()
        useRouter.mockImplementationOnce(() => ({
            replace
        }))

        wrapper = mount(myComponent)
        mock.onGet('/test').reply(400);

        await testFunction()
    
        expect(replace).toHaveBeenCalledTimes(1)
        expect(replace).toHaveBeenCalledWith({
            "name": "ErrorPage",
            "params": {
              "responseCode": 400,
            },
            "query": {}
        })
    })
})    
