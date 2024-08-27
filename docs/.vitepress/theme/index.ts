import type { Theme } from 'vitepress'
import BlogTheme from '@sugarat/theme'
import vClickable from 'v-clickable'

// 自定义样式重载
import './style.scss'

// 自定义主题色
// import './user-theme.css'

const theme: Theme = {
    ...BlogTheme,
    enhanceApp(ctx) {
        if (BlogTheme.enhanceApp) {
            BlogTheme.enhanceApp(ctx)
        }
        ctx.app.use(vClickable)
    }
}

export default theme
