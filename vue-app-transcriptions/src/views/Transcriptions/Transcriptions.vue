<template>
  <header-component/>
  <div class="transcript-container">
    <div v-for="(transcript, index) in transcripts" class="transcript-card">
      <transcript-item :transcript="transcript" :index="index"/>
    </div>
    <button-component  v-if="transcripts.length" icon="add" class="mt-1 icon" data-test="add-button"
      @click="transcriptStore.addTranscript()"
    />
  </div>
</template>

<script setup lang="ts">
//#region Imports
// Components
import TranscriptItem from '@/components/molecules/TranscriptItem/TranscriptItem.vue'
import HeaderComponent from '@/components/atoms/HeaderComponent/HeaderComponent.vue'
import ButtonComponent from '@/components/atoms/ButtonComponent/ButtonComponent.vue';

// Stores
import { useTranscriptStore } from '@/stores/transcriptionStore';
import { computed } from 'vue';
//#endregion

const transcriptStore = useTranscriptStore()

// Get data
const transcripts = computed(() => {
 return transcriptStore.transcriptsList
})
</script>
<style src="./styles/transcriptions.scss"></style>
