<script lang="ts">
import { defineComponent } from "vue";
import { useCounterStore } from "./store";

export default defineComponent({
  data() {
    return {
      url: ""
    }
  },
  setup() {
    const counterStore = useCounterStore();
    return { counterStore };
  },
  mounted() {
    addEventListener("resize", this.onResize)
    window.electron.ipcRenderer.on('update_url', (_, url) => {
      this.url = url
    })
  },
  unmounted() {
    removeEventListener("resize", this.onResize)
  },
  methods: {
    onResize() {
      window.electron.ipcRenderer.send('resize', {
        width: window.innerWidth,
        height: window.innerHeight
      })
    },
    ipcSearch() {
      if (this.url.startsWith("https://") || this.url.startsWith("http://")) {
        window.electron.ipcRenderer.send('search', this.url)
      } else window.electron.ipcRenderer.send('search', "http://" + this.url)
    },
    ipcNavigate(direction: string) {
      window.electron.ipcRenderer.send('navigate', direction)
    },
    ipcReload() {
      window.electron.ipcRenderer.send('reload')
    },
    ipcCreateNewWindow() {
      window.electron.ipcRenderer.send('create-window')
    },
  }
})
</script>

<template>
  <div class="navbar-base">
    <button @click="ipcNavigate('back')">&larr;</button>
    <button @click="ipcNavigate('forward')">&rarr;</button>
    <button @click="ipcReload">&#10227</button>
    <button @click="ipcCreateNewWindow">+</button>
    <button @click="ipcSearch">&#128270</button>
    <input v-model="url" type="text" @keyup.enter="ipcSearch" style="width: 100%;">
  </div>
</template>

<style scoped lang="scss">
.navbar-base {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
}
</style>
