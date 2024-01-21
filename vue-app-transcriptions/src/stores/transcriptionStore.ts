import type { TranscriptDto } from '@/dtos/TranscriptDto'
import { defineStore } from 'pinia'
import { getItems, postItem } from '@/api/Client'
import { sanitizeToJson } from '@/utils/sanitizeHelper'

export const useTranscriptStore = defineStore('transcript', {
    state: () => {
        return {
          transcriptsList: [] as Array<TranscriptDto>
        } 
    },
    actions: {
      async fetchTranscript() {
        try {
          const response = await getItems(import.meta.env.VITE_APP_TRANSCRIPTIONS_API_URL, false)
          if (!response?.length) return
          const sanitizedResponse = sanitizeToJson(response)
          this.transcriptsList = JSON.parse(sanitizedResponse)
        } catch (error) {
          console.error('Something went wrong while retrieving transcript', error)
        }
      },
      async postTranscript() {
        // If any transcription has an error message return
        const hasErros = this.transcriptsList.some(transcript => {
          this.validateTranscripts(transcript);
          return transcript.errorMessage;
        })

        if(hasErros) return

        // Check if there are new rows to add and map them 
        let transcriptToPost = this.transcriptsList.
          filter(transcript => !transcript.id && !transcript.errorMessage).
          map(transcript => {
            return {
              voice: transcript.voice,
              text: transcript.text
            }
          })

        if(!transcriptToPost?.length) return

        try {
          const response = await postItem(import.meta.env.VITE_APP_TRANSCRIPTIONS_API_URL, transcriptToPost,false)
          if (!response?.length) return
          const sanitizedResponse = sanitizeToJson(response)
          this.transcriptsList = JSON.parse(sanitizedResponse)
        } catch (error) {
          console.error('Something went wrong while posting transcripts', error)
        }
      },
      removeTranscript(index: number) {
        this.transcriptsList.splice(index, 1)
      },
      addTranscript() {
        const emptyRow = {
          voice: '', 
          text: ''
        }
        this.transcriptsList.push(emptyRow)
      },
      validateTranscripts(transcript: TranscriptDto) {
        if (!transcript.voice) {
            transcript.errorMessage = 'Voice is required'
        } else {
            transcript.errorMessage = ''
        }
      }
    }
})