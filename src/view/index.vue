<template>
  <div>
    index page
    <h3 @click="$store.commit('add')">{{$store.state.count}}</h3>
  </div>
</template>

<script>
export default {
  asyncData({ store}) { // { store, route } route传参使用
    // 约定预取逻辑编写在预取钩⼦asyncData中
    // 触发 action 后，返回 Promise 以便确定请求结果
    // console.log(route)
    return store.dispatch("getCount");
  }
};
</script>

<style lang="scss" scoped>
</style>