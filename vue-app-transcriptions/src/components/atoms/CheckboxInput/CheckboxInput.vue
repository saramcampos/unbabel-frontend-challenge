<template>
    <label class="checkbox-label">
      <input
        v-model="mValue"
        data-test="checkbox"
        type="checkbox"
        class="checkbox"
        @change="emitChange()"
      >
      <span class="checkbox-custom"></span>
    </label>
  </template>

  <script setup lang="ts">
  import { ref, watch } from 'vue'
  
  export interface IProps {
    modelValue?: boolean,
  }
  
  const props = withDefaults(defineProps<IProps>(), {
    modelValue: false
  })
  
  const mValue = ref<boolean>(props.modelValue)
  const emit = defineEmits<(event:'update:modelValue', value: any)  => void>()

  watch(() => props.modelValue, (newValue) => {
    mValue.value = newValue
  })
 
 function emitChange() {
    emit('update:modelValue', props.modelValue);
 }
</script>
<style lang="scss" src="./styles/checkbox.scss"></style>