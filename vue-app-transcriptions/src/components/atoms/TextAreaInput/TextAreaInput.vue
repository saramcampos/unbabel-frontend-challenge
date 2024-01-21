<!-- TextAreaComponent.vue -->
<template>
    <div>
        <textarea 
            ref="textAreaRef"
            data-test="textarea" 
            :value="modelValue" 
            @input="handleInput" 
            :placeholder="placeholderText"
            :class="textAreaClass">
        </textarea>
    
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

export interface IProps {
    modelValue?: string,
    textAreaClass?: string,
    placeholderText?: string,
    errorMessage?: string | null
}

withDefaults(defineProps<IProps>(), {
    modelValue: '',
    textAreaClass: '',
    placeholderText: '',
    errorMessage: null
})

let textAreaRef = ref<null | HTMLElement>(null)
onMounted(() => {
    autoResize((<HTMLTextAreaElement>textAreaRef.value))
})

const emit = defineEmits<(event:'update:modelValue', value: any)  => void>()

function handleInput(event: Event) {
    if(!event.target) return

    autoResize((<HTMLTextAreaElement>event.target))
    emit('update:modelValue', (<HTMLTextAreaElement>event.target).value)
}

function autoResize(textarea: HTMLTextAreaElement) {
  textarea.style.height = 'auto'
  textarea.style.height = (textarea.scrollHeight) + 'px'
}
</script>

<style src="./styles/text-area.scss"></style>

