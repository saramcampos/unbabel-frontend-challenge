<template>
    <component :is="type" 
        data-test="button"
        :class="[buttonClass, iconClass]"  
        :disabled="disabled"
        :href="url"
        :to="url"
        :target="target"
    >
        <slot />
    </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface IProps {
    target?: string,
    disabled?: boolean,
    url?: string | object | null
    buttonClass?: string,
    icon?: string
}

const props = withDefaults(defineProps<IProps>(), {
    target: '_self',
    disabled: false,
    url: null 
})

const iconClass = computed(() => {
    return props.icon ? `button-icon-${props.icon}` : ''
})

const isExternalLink = computed<boolean>(() => {
    const protocolRegex = /^\s*(https?|ftp|mailto|tel|file):/
    // Check if one of these values exist in the url
    if (typeof props.url !== 'string') {
        return false
    }

    return protocolRegex.test(props.url)
})

const type = computed<string>(() => {
    if (!props.url) return 'button'
    if (typeof props.url === 'object') return 'router-link'
    if (typeof props.url === 'string')
        return isExternalLink.value || props.target === '_blank' ? 'a' : 'router-link'

    return 'button'
})
</script>
<style lang="scss" src="./styles/button.scss"></style>