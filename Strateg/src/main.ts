import { createApp, h } from "vue";
import App from "./App.vue";
import router from "./router/router";

const app = createApp({
  render: () => h(App),
});

// createApp(App).mount("#app");
app.use(router).mount("#app");
