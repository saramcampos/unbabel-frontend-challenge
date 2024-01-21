<template>
    <checkbox-input></checkbox-input>
    <img class="ml-1" alt="user" src="../../../assets/person.svg"/>
    <div class="transcript-info">
        <input-component
            :model-value="transcript.voice"
            @update:modelValue="updateVoice"
            input-class="input-invisible input-title"
            placeholder-text="Please insert voice id here..."
            :errorMessage="transcript.errorMessage"
        />

        <text-area-input
            :model-value="transcript.text"
            @update:modelValue="updateText"
            text-area-class="text-area-invisible mt-1"
            placeholder-text="Please insert text here..."
        />
    </div>
    <button-component icon="trash" class="icon transcript-delete-button" @click.prevent="transcriptStore.removeTranscript(index)"/>
</template>
<script setup lang="ts">
//#region Imports
import { useTranscriptStore } from '@/stores/transcriptionStore'

// Dtos
import type { TranscriptDto } from '@/dtos/TranscriptDto'

// Components
import CheckboxInput from '../../atoms/CheckboxInput/CheckboxInput.vue'
import ButtonComponent from '../../atoms/ButtonComponent/ButtonComponent.vue'
import InputComponent from '../../atoms/InputComponent/InputComponent.vue'
import TextAreaInput from '../../atoms/TextAreaInput/TextAreaInput.vue'
//#endregion

const props = defineProps<{
    transcript: TranscriptDto,
    index: number
}>()
  
const transcriptStore = useTranscriptStore()

function updateVoice(newValue: string) {
    transcriptStore.updateTranscript(props.index, newValue, 'voice');
    transcriptStore.validateTranscripts(props.transcript)
}

function updateText(newValue: string) {
    transcriptStore.updateTranscript(props.index, newValue, 'text');
}


</script>
<style src="./styles/transcript-item.scss"></style>