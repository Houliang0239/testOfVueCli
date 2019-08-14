<template>
  <div>
    <button>{{fatherMsg}}</button>
    <!-- <PersonComponent :fatherMsg="fatherMsg" :fatherNumber="42" v-model="ifShow">
      <template v-slot:header><p>Something good happened.</p></template>
    <template v-slot:footer><span>we are always better</span></template>-->

    <input type="file" @change="fileChange(this)" id="inpfile" />
    <div ref="fileContent" class="fileContenr"></div>
    <!-- </PersonComponent> -->
  </div>
</template>

<script>
import PersonComponent from "../components/PersonComponent";
import axios from "axios";
import mammoth from "mammoth";
export default {
  name: "FatherComponent",
  components: {
    PersonComponent
  },
  data() {
    return {
      fatherMsg: [
        {
          id: 1,
          name: "father1"
        },
        {
          id: 2,
          name: "father2"
        }
      ],

      //prop 传入一个数字：
      fatherNumber: 42,
      ifShow: false,
      response: ""
    };
  },
  methods: {
    fileChange(input) {
      var inpfile = document.getElementById("inpfile");
      var Odiv = this.$refs.fileContent
      console.log(Odiv)
      var reader = new FileReader();
      var blob = new Blob();
      var file = inpfile.files[0]; //已经拿到的文件      
      var a = reader.readAsArrayBuffer(file);
      reader.onload = function(e) {
        mammoth.convertToHtml({ arrayBuffer: e.target.result }).then(
          v => {
            Odiv.innerHTML= v.value;
            console.log(v.value);
          },
          e => {
            console.error(e);
          }
        );
      };
    }
  },
  created() {
    let _this = this;
    // axios
    //   .get("http://yapi.demo.qunar.com/mock/82322/mock0239/test/test")
    //   .then(function(res) {
    //     console.log(res);
    //   });

    // axios.post('http://yapi.demo.qunar.com/mock/82322/mock0239/test/test',{
    //   require:'123456789'
    // }).then(function(res){
    //   console.log(res);
    // })
  }
};
</script>

<style>

.fileContenr{
  width: 1000px;
  height: 100%;
  border: 1px solid black;
}
</style>
