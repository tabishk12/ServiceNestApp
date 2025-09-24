import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  resolve: {
     alias: {
    '@assets': '/src/assets',
    '@store' :'/src/store.js',
    '@components': '/src/components',
    '@error': '/src/components/Error',
    '@footer': '/src/components/Footer',
    '@header': '/src/components/Header',
    '@layout': '/src/components/Layout',
    '@providerComponent': '/src/components/ProviderComponents',
    '@userComponent': '/src/components/UserComponents',
    '@Components': '/src/components',
    '@screens': '/src/components/UserComponents/Screens',
    '@address': '/src/components/UserComponents/Screens/Address',
    '@browse': '/src/components/UserComponents/Screens/BrowseServices',
    '@home': '/src/components/UserComponents/Screens/HomeScreen',
    '@login': '/src/components/UserComponents/Screens/Login',
    '@providerScreen': '/src/components/UserComponents/Screens/ServiceProvider',
    '@slices': '/src/components/Slice',
    '@utils' : '/src/components/Utils',
  },
  },
});
