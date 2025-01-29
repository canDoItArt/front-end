import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  base: '/front-end/', // GitHub Pages의 서브 경로와 일치하도록 설정
});
