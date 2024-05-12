import { createPinia } from "pinia";
import { ObjectPlugin } from "vue";

const initPinia: ObjectPlugin = {
  install(app) {
    const pinia = createPinia();
    app.use(pinia);
  },
};

export default initPinia;
