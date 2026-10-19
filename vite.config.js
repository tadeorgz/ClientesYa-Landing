import { defineConfig, loadEnv } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { devApi } from './server/dev-api.mjs'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  build: { copyPublicDir: false },
  server: { watch: { ignored: ['**/.ssr/**', '**/dist/**', '**/.superdesign/**', '**/public/*.mp4'] } },
  plugins: [
    devApi({ ...loadEnv(mode, process.cwd(), ''), ...process.env }),
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
}))
