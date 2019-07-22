<template>
  <div>
    <!-- <button v-for="(person,index) in personMsg" :key="index">
            {{person.id}}+{{person.name}}
    </button>-->
    <SonComponent :personMsg="personMsg"></SonComponent>
  </div>
</template>

<script>
import SonComponent from "../components/SonComponent";
export default {
  name: "PersonComponent",
  props:{
      fatherNumber:Number,   
      fatherMsg:null,
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
    console.log('fatherNumber的类型是'+typeof this.fatherNumber);
  }
};
</script>

<style>
</style>
