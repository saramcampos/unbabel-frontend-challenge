import { describe, it, expect, beforeEach, vi } from 'vitest'
import { VueWrapper, mount } from '@vue/test-utils'
import myComponent from '../Transcriptions.vue'
import { createTestingPinia } from '@pinia/testing'
import { useTranscriptStore } from '@/stores/transcriptionStore'

describe('Transcriptions', () => {
    let wrapper: VueWrapper

    beforeEach(() => {
        wrapper = mount(myComponent, {
            global: {
                plugins: [
                    createTestingPinia({
                        initialState: {
                            transcript: {
                                transcriptsList: [{
                                    id: '1',
                                    voice: 'This is voice text',
                                    text: 'This is text' 
                                },
                                {
                                    id: '2',
                                    voice: 'This is voice text 2',
                                    text: 'This is text 2' 
                                }]
                            }
                        },
                        stubActions: false, 
                        createSpy: vi.fn,
                    })
                ]
            }
        })
    })

    it('renders as expected', () => {
        const header = wrapper.find('[data-test="header"]')
        const addButton = wrapper.find('[data-test="add-button"]')
        const transcriptItems = wrapper.findAll('[data-test="input"]')

        expect(header.exists()).toBe(true)
        expect(addButton.exists()).toBe(true)
        expect(transcriptItems.length).toBe(2)
        
    })

    it('expect to add new row on button click', async () => { 
        const store = useTranscriptStore()
        
        const addButton = wrapper.find('[data-test="add-button"]')
        await addButton.trigger('click')

        expect(store.transcriptsList.length).toBe(3)

        const emptyRow = store.transcriptsList.find(transcript => transcript.voice === '' && transcript.text === '')
        expect(emptyRow).toBeTruthy()
    }) 
})
