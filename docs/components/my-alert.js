import { createApp } from 'vue'
import Alert from './alert.vue'

export const myAlert = (msg, closeCallback) => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    const app = createApp(Alert, {
        msg,
        modelValue: true,
        onClose() {
            closeCallback && closeCallback()
            app.unmount()
            div.remove()
        }
    })
    app.mount(div)
}