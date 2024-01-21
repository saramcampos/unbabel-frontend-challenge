<template>
    <label class="d-block"> 
        <input 
            type="text" 
            data-test="input"
            :value="props.modelValue" 
            :placeholder="placeholderText"
            :class="inputClass"
            :maxlength="inputMaxLength"
            @input="emitChange"
        />

        <div v-if="errorMessage.length" class="error-message">{{ errorMessage }}</div>
    </label>
</template>

<script setup lang="ts">
export interface IProps {
    modelValue?: string,
    placeholderText?: string,
    inputClass?: string,
    inputMaxLength?: number,
    errorMessage?: string
}

const props = withDefaults(defineProps<IProps>(), {
    modelValue: '',
    placeholderText: '',
    inputClass: '',
    inputMaxLength: 200,
    errorMessage: ''
})

const emit = defineEmits<(event:'update:modelValue', value: any)  => void>()

function emitChange(event: Event) {
    emit('update:modelValue', (<HTMLInputElement>event.target).value)
}
</script>

<style lang="scss" src="./styles/input.scss"></style>