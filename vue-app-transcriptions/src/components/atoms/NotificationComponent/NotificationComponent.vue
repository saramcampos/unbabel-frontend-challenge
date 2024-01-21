<template>
    <div class="notification" data-test="notification">
        <transition-group name="fade" tag="div" class="w-100">
            <div v-for="notification in notificationList" :key="notification.id" :class="notification.type">
                <div class="notification-content" data-test="notification-content">
                    {{ notification.message }}
                </div>
            </div>
        </transition-group>
    </div>
</template>

<script setup lang="ts">
import { watch, onBeforeUnmount } from 'vue'
import type { NotificationDto } from '@/dtos/NotificationDto'

export interface IProps {
    duration?: number,
    notificationList?: Array<NotificationDto>
}

const props = withDefaults(defineProps<IProps>(), {
    duration: 5000,
    notificationList: () => [{
        id: 0,
        type: 'success',
        message: ''
    }]
})

watch(() => props.notificationList, () => {
    if (props.notificationList.length === 0) return 

    props.notificationList.forEach((toast) => {
        setTimeout(() => {
            closeToast(toast.id)
        },  props.duration)
    })
},{deep: true})

const emit = defineEmits<{
    (event:'updateNotifications', item: any) : void
}>()

function closeToast(id: number): void {
    for (let toast of props.notificationList) {
        if (toast.id === id) {  
            emit('updateNotifications', toast)
            break
        }
    }
}

onBeforeUnmount(() => {
    clearTimeout(props.duration)
}) 

</script>
<style lang="scss" src="./styles/notification.scss"></style>