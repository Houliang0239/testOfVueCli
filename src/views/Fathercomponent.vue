<template>
  <div>
    <button>{{fatherMsg}}</button>
    <PersonComponent :fatherMsg="fatherMsg" :fatherNumber="42"></PersonComponent>
  </div>
</template>

<script>
import PersonComponent from "../components/PersonComponent";
import axios from "axios";
export default {
  name: "FatherComponent",
  components: {
    PersonComponent
  },
  data() {
    return {
      fatherMsg: [
          {
              id:1,
              name:"father1"
          },
          {
              id:2,
              name:"father2"
          }
      ],
    
    //prop 传入一个数字：
    fatherNumber:42,

      response: ""
    };
  },
  created() {
    let _this = this;
    axios
      .get("http://yapi.demo.qunar.com/mock/82322/mock0239/test/test")
      .then(function(res) {
        console.log(res);
      });

    axios.post('http://yapi.demo.qunar.com/mock/82322/mock0239/test/test',{
      require:'123456789'
    }).then(function(res){
      console.log(res);
    })
  }
};
</script>

<style>
</style>
