import { describe, it, expect, beforeEach, vi } from 'vitest'
import { VueWrapper, mount } from '@vue/test-utils'
import myComponent from '../TranscriptItem.vue'
import { createTestingPinia } from '@pinia/testing'
import { useTranscriptStore } from '@/stores/transcriptionStore'

describe('Transcription Item', () => {
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
                                }]
                            }
                        },
                        stubActions: false, 
                        createSpy: vi.fn,
                    })
                ]
            },
            props: {
                transcript: {
                    id: '1',
                    voice: 'This is voice text',
                    text: 'This is text'      
                },
                index: 0
            }
        })
    })

    it('renders as expected', () => {
        const transcriptVoice = wrapper.find('[data-test="input"]')
        const transcriptText = wrapper.find('[data-test="textarea"]')

        expect(transcriptVoice.element.value).toContain('This is voice text')
        expect(transcriptText.element.value).toContain('This is text')
    })

    it('expect to update value on user input', async () => { 
        const store = useTranscriptStore()

        const voice = 'I am a different voice'
        const text = 'I am a different text'
        
        let transcriptVoice = wrapper.find('[data-test="input"]')
        let transcriptText = wrapper.find('[data-test="textarea"]')

        await transcriptVoice.setValue(voice)
        await transcriptText.setValue(text)

        expect(store.transcriptsList[0].voice).toBe(voice)
        expect(store.transcriptsList[0].text).toBe(text)
    }) 

    it('Removes item from row on click', async () => {
        const store = useTranscriptStore()
        
        expect(store.transcriptsList.length).toBe(1)
        const deleteButton = wrapper.find('[data-test="button"]')
        await deleteButton.trigger('click')

        const transcriptExists = store.transcriptsList.find(transcript => transcript.id === '1')

        expect(transcriptExists).toBe(undefined)
        expect(store.transcriptsList.length).toBe(0)
    })
})
