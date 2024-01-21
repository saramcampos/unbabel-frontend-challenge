<template> 
    <div data-test="error" class="error-container mt-2">
        <div class="error-title">Oops!</div>
        <div data-test="response-code" class="error-code">{{ getStatusCode }} {{ statusMessage }}</div>
        <div data-test="response-text" class="error-message">{{  displayErrorTitle }}</div>
    </div>
</template>
 

<script setup lang="ts"> 
//#region Imports
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
//#endregion

let route = useRoute()
let statusMessage = ref('Page not found')

let getStatusCode = computed(() => {
    return route.params.responseCode || route.query.responseCode
})

const displayErrorTitle = computed(() => {
    let errorMessage: string

    switch (getStatusCode.value) {
        case '400':
            errorMessage = "We couldn't process your request. Please check your input and try again."
            statusMessage.value = "Bad Request"
            break;
        case '401':
            errorMessage = "You don't have permission to access this page. Please contact support."
            statusMessage.value = 'Unauthorized'
            break;
        case '403':
            errorMessage = "You don't have permission to access this page. Please contact admin for assistance."
            statusMessage.value = 'Forbidden'
            break;
        case '404':
            errorMessage = "The page you are looking for doesn't exist anymore."
            statusMessage.value = "Page Not Found"
            break;
        case '500':
            errorMessage = "Something went wrong on our end. Please try again later."
            statusMessage.value = 'Internal Server Error'
            break;
        default:
            errorMessage = "Something unexpected happened. Please try again later or contact support."
 }

    return errorMessage
})
</script>
<style scoped lang="scss" src="./styles/error.scss"></style>