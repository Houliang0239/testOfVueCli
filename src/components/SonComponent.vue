<template>
  <div>
    <button @click="givePerson(sonMsg)">{{sonMsg}}</button>
    <button @click="change">change</button>
    <component  onent :is="changeIndex">1</component>
  </div>
</template>

<script>
export default {
  name: "SonComponent",
  props: ["personMsg"],
  data() {
    return {
      sonMsg: this.personMsg,
      cmp: [
        { template: `<div>我是主页</div>` },
        { template: `<div>我是提交页</div>` },
        { template: `<div>我是存档页</div>` }
      ],
      index: 0,
    };
  },
  methods: {
    givePerson(val) {
      this.$emit("getSon", val);
    },
    changeIndex() {
      return this.cmp[this.index];
    },
    change() {
      this.index = (this.index + 1) % 3;
    }
  }
};
</script> 

<style>
</style>

