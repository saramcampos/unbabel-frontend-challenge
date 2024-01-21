import { defineStore } from 'pinia'
let notificationId = 1

export const useNotificationStore = defineStore('notification', {
  state: () => {
    return { notificationsList: [] }
  },
  actions: {
    add(notification: {id?: number, type: string, message?: string}) {
        notificationId += 1
        notification.id = notificationId

        const checkErrorMessage = this.notificationsList.filter(currentNotification =>
            currentNotification.type === 'error' && currentNotification.message === notification.message
        )
        
        const checkSuccessMessage = this.notificationsList.filter(currentNotification => 
            currentNotification.type === 'success' && currentNotification.message === notification.message
        ) 

        if(checkErrorMessage && checkErrorMessage.length > 0 || checkSuccessMessage && checkSuccessMessage.length > 0) return

        this.notificationsList.push(notification)
    },
    delete(notificationToRemove: { id: number}) {
        this.notificationsList = this.notificationsList.filter(
            toastNotification => toastNotification.id !== notificationToRemove.id
        )
    },
    getNotification(type: string, message: string): void {
      const notification = {
          type: type,
          message: message
      }
  
      this.add(notification)
    }
  },
})