import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const apiUrl = env.VITE_API_URL || "http://localhost:5000";

  return {
    plugins: [react()],
    server: {
      port: 3000,
      host: true,
      proxy: {
        "/api": {
          target: apiUrl,
          changeOrigin: true,
        },
        "/users": {
          target: apiUrl,
          changeOrigin: true,
        },
        "/address": {
          target: apiUrl,
          changeOrigin: true,
        },
        "/booking": {
          target: apiUrl,
          changeOrigin: true,
        },
        "/notifications": {
          target: apiUrl,
          changeOrigin: true,
        },
      },
    },
    resolve: {
      alias: {
        "@assets": "/src/assets",
        "@store": "/src/store.js",
        "@components": "/src/components",
        "@error": "/src/components/Error",
        "@footer": "/src/components/Footer",
        "@header": "/src/components/Header",
        "@layout": "/src/components/Layout",
        "@providerComponent": "/src/components/ProviderComponents",
        "@userComponent": "/src/components/UserComponents",
        "@Components": "/src/components",
        "@screens": "/src/components/UserComponents/Screens",
        "@address": "/src/components/UserComponents/Screens/Address",
        "@browse": "/src/components/UserComponents/Screens/BrowseServices",
        "@home": "/src/components/UserComponents/Screens/HomeScreen",
        "@login": "/src/components/UserComponents/Screens/Login",
        "@providerScreen":
          "/src/components/UserComponents/Screens/ServiceProvider",
        "@slices": "/src/components/Slice",
        "@utils": "/src/components/Utils",
      },
    },
  };
});
