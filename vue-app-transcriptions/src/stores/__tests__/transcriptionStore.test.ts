import { useTranscriptStore } from '@/stores/transcriptionStore'
import MockAdapter from 'axios-mock-adapter'
import { createPinia, setActivePinia } from 'pinia'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import axios from 'axios' 

describe('Use transcript store', () => {
    let mock: MockAdapter
    import.meta.env.VITE_APP_TRANSCRIPTIONS_API_URL = "/"

    beforeEach(() => {
        mock = new MockAdapter(axios);
        setActivePinia(createPinia())
    })

    afterEach(() => {
        mock.reset()
    })

    const emptyRow = { 
       voice: '',
       text: ''
    }

    it('Adds a new row', async ()  => {
        const store = useTranscriptStore();
        store.addTranscript()
   
        expect(store.transcriptsList).toStrictEqual([emptyRow])        
    })

    it('Posts a new row', async ()  => {
        const store = useTranscriptStore()
        const newRow = {
            voice: 'new voice',
            text: 'new text'
        }
        store.transcriptsList = [newRow]

        mock.onPost('/', [{"voice":"new voice","text":"new text"}]).reply(200, [])
        store.postTranscript()
   
        expect(mock.history.post.length).toBe(1)       
    })
})