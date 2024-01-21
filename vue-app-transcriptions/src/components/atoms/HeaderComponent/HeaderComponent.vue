<template>
    <header class="header" data-test="header">
    <div class="header-container">
      <h1>Transcriptions</h1>
      <div>
        <button-component icon="upload" class="mr-2 icon"
          data-test="upload-button"
          :disabled="!hasNewTranscripts"
          @click.prevent="transcriptStore.postTranscript()"
        />
        <button-component icon="get" class="icon"
          data-test="get-button"
          @click.prevent="transcriptStore.fetchTranscript()"
        />
      </div>
    </div>
  </header>
</template>
<script setup lang="ts">
//#region Imports
import { computed } from 'vue'
// Stores
import { useTranscriptStore } from '@/stores/transcriptionStore'

// Components
import ButtonComponent from '@/components/atoms/ButtonComponent/ButtonComponent.vue'
//#endregion

const transcriptStore = useTranscriptStore()

const hasNewTranscripts = computed(() => {
 return transcriptStore.transcriptsList.some(transcript => !transcript.id)
})
</script>
<style src="./styles/header.scss"></style>