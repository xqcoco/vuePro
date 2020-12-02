<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
  },
  provide() {
        return {
            reload: this.reload,
            demo:"haha"
        };
    },
  methods: {
        reload() {
            this.isRouterAlive = false;
            this.$nextTick(() => {
                this.isRouterAlive = true;
            });
        },
    },
}
</script>

<style>
</style>
