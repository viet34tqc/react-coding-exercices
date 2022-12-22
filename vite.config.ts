import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	test: {
		globals: true,
		environment: 'jsdom',
		include: ['**/*.test.{js,tsx,ts}'],
		setupFiles: './src/setupTest.js',
	},
});
