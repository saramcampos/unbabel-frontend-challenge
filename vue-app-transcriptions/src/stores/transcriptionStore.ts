import type { TranscriptDto } from '@/dtos/TranscriptDto'
import { defineStore } from 'pinia'
import { getItems, postItem } from '@/api/Client'
import { sanitizeToJson } from '@/utils/sanitizeHelper'
import { useNotificationStore } from './notificationStore'

export const useTranscriptStore = defineStore('transcript', {
    state: () => {
        return {
          transcriptsList: [] as Array<TranscriptDto>
        } 
    },
    getters: {
      getTranscripts: (state) => state.transcriptsList
    },
    actions: {
      async fetchTranscript() {
        const notificationStore = useNotificationStore()
        if (this.transcriptsList.some(transcript => !transcript.id)) {
          notificationStore.getNotification('error', 'Please save or delete new data first')
          return
        }

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
        const notificationStore = useNotificationStore()
        // If any transcription has an error message return
        this.transcriptsList.forEach(transcript => {
          this.validateTranscripts(transcript)
        })

        if (this.transcriptsList.some(transcript => transcript.errorMessage)) {
          notificationStore.getNotification('error', 'Please fill in all required fields')
          return;
        }

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

          notificationStore.getNotification('success', 'You have successfully posted the transcriptions')
        } catch (error) {
          console.error('Something went wrong while posting transcripts', error)
        }
      },
      removeTranscript(indexToRemove: number) {
        this.transcriptsList = this.transcriptsList.filter((_, index) => index !== indexToRemove);
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
      },
      updateTranscript(index: number, value: string, property: string) {
        this.transcriptsList[index][property] = value
      }
    }
})