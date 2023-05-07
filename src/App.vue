<template>
  <div>
    <HtmlToPdfUser msg="Welcome to HTML to PDF App"/>
  </div>
</template>

<script>
import HtmlToPdfUser from "@/components/HtmlToPdfUser.vue";

export default {
  name: 'App',
  components: {
    HtmlToPdfUser,
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
