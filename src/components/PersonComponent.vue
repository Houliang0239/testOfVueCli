<template>
  <div>
    <!-- <button v-for="(person,index) in personMsg" :key="index">
            {{person.id}}+{{person.name}}
    </button>-->
    <slot name="header"></slot>
    <slot name="footer"></slot>
    <SonComponent :personMsg="personMsg" noprops="false" @getSon="getSon"></SonComponent>
  </div>
</template>

<script>
import SonComponent from "../components/SonComponent";
export default {
  name: "PersonComponent",
  props: {
    fatherNumber: Number,
    fatherMsg: null
  },
  components: {
    SonComponent
  },
  data() {
    return {
      personMsg: this.fatherNumber
    };
  },
  mounted() {
    // console.log("fatherNumber的类型是" + typeof this.fatherNumber);
  },
  methods: {
    getSon(val) {
      console.log(val);
    }
  }
};
</script>

<style>
</style>
