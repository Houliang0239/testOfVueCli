<template>
  <div>
    <button>{{sonMsg}}</button>
  </div>
</template>

<script>
export default {
  name: "SonComponent",
  props: ["personMsg"],
  data() {
    return {
      sonMsg: this.personMsg
    };
  }
};
</script> 

<style>
</style>

