<template>
  <RouterView />

  <transition name="loader-fade" mode="out-in">
    <div data-test="loader" class="loader" v-if="isLoadingEnabled">
      <img alt="spinner loader" class="loader-image" src="../assets/loader.gif" />
    </div>
  </transition> 

  <notification-component :notification-list="notificationStore.notificationsList" @updateNotifications="notificationStore.delete" />
  
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import { useNotificationStore } from '@/stores/notificationStore'
import NotificationComponent from '@/components/atoms/NotificationComponent/NotificationComponent.vue'
import axios from 'axios'

let loadingCount = ref<number>(0)
let isLoadingEnabled = ref(false)
const notificationStore = useNotificationStore()
let router = useRouter()

function setLoading(isLoading: boolean) {
  if (isLoading) {
    loadingCount.value += 1
    isLoadingEnabled.value = true 
  } 
  
  else if (loadingCount.value > 0) {
    loadingCount.value -= 1
    isLoadingEnabled.value = loadingCount.value > 0 
  }      
}

onMounted(() => {
  axios.interceptors.request.use(async (config) => {
    setLoading(true) 

    return config
  },
  (error) => {
      setLoading(false) 

      return Promise.reject(error)
    }
  )

  axios.interceptors.response.use((response) => { 
      setLoading(false)
      return response
    },
    (error) => { 
      setLoading(false)

      if (error?.response?.status) {
        router.replace({
            name: 'ErrorPage',
            params: { responseCode: error.response.status },
            query: {}
        })
      }

      return Promise.reject(error)
    }
  )
}) 
</script>