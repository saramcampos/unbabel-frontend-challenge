import { describe, it, expect, beforeEach } from 'vitest'
import { useNotificationStore } from '@/stores/notificationStore'
import { createPinia, setActivePinia } from 'pinia'

describe('Use toast store', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    const newMessage = {
        type: 'success',
        message: 'arbitrary message'
    }

    it('adds', () => {
        const store = useNotificationStore()
        expect(store.notificationsList).toStrictEqual([])
        
        store.add(newMessage)
        expect(store.notificationsList).toStrictEqual([newMessage])
    })

    it('deletes', async () => {
        const store = useNotificationStore()
        store.add(newMessage)
        expect(store.notificationsList.length).toBe(1)

        const getToastId = store.notificationsList.find(toast => toast.message = newMessage.message)

        store.delete(getToastId)

        expect(store.notificationsList.length).toBe(0)
        expect(store.notificationsList).toStrictEqual([])
    })
})