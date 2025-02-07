import { createApp } from 'vue';
import App from './App.vue'; // Import your main Vue component
// ... any other imports (e.g., router, store)

const app = createApp(App);
// ... any other configurations (e.g., app.use(router);)
app.mount('#app'); // Mount the app to the #app element in index.html