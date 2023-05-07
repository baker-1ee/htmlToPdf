<template>
  <div ref="targetTemplate" class="sample-component">
    <h1>{{ title }}</h1>
  </div>
</template>

<script>
export default {
  name: 'SampleVueComponent',
  props: {
    title: {
      type: String,
    },
  }
}
</script>

<style scoped>
.sample-component {
  background-color: #f2f2f2;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #b32a2a;
  font-size: 30px;
  margin-bottom: 10px;
}

p {
  font-size: 16px;
  margin-bottom: 20px;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  font-size: 14px;
  margin-bottom: 5px;
}
</style>
