import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {viteSingleFile} from "vite-plugin-singlefile";

// https://vite.dev/config/
// export default defineConfig({
//     plugins: [vue()],
// })

export default defineConfig({
    plugins: [viteSingleFile(),vue()],
    build: {
        assetsInlineLimit: 4096 * 1024 * 1024
    }
})