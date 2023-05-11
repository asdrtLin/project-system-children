import "./public-path";
import { createApp, App as typeApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import routes from "./router";
import store from "./store";

import type { microProps } from "./type";

let router = null;
let instance: typeApp;
function render(props: microProps = { container: "" }) {
  const { container } = props;
  router = createRouter({
    // base: window.__POWERED_BY_QIANKUN__ ? '/vue3/' : '/',
    history: createWebHistory(window.__POWERED_BY_QIANKUN__ ? "/vue3/" : "/"),
    routes,
  });

  instance = createApp(App);
  instance
    .use(store)
    .use(router)
    .mount(container ? container.querySelector("#app") : "#app");
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  // console.log("[vue] vue app bootstraped");
}
export async function mount(props: microProps) {
  // console.log("[vue] props from main framework", props);
  render(props);
}
export async function unmount() {
  instance.unmount();
  // instance.$el.innerHTML = "";
  instance = null as any;
  console.log(instance);
  router = null;
}
