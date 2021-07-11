<template>
  <div id="app">
    <div class="router-container">
      <div class="router-menu">
        <div
          class="menu-item"
          v-for="(item, index) in routes"
          :key="index"
          @click="navigate(item)"
        >
          {{item.name}}
        </div>
      </div>
      <div class="router-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { routes } from '@/router/routes'

export default {
  name: 'App',

  data () {
    return {
      routes
    }
  },

  methods: {
    navigate (item) {
      const { fullPath } = this.$route
      if (fullPath.includes(item.path)) return
      this.$router.push(item.path)
    }
  }
}
</script>

<style lang="less">
html, body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  width: 100%;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.router-container {
  width: 100%;
  height: 100%;
}

.router-menu {
  width: 200px;
  float: left;
  height: 100%;
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.16);
  padding: 16px 0;
  box-sizing: border-box;
  .menu-item {
    font-size: 16px;
    color: #333;
    padding: 0 16px;
    height: 40px;
    line-height: 40px;
    text-align: left;
    &:hover {
      color: #296ef0;
      cursor: pointer;
      background-color: #f5f5f5;
    }
  }
}

.router-content {
  overflow: hidden;
  height: 100%;
}

</style>
