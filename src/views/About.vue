<template>
  <div class="about">
      <div class = 'display'>
        <div class = 'cmp-result'>{{result}}</div>
        <div class = 'inp-enter'>{{enter=='' ? '0' : enter}}</div>
      </div>
      <div class = 'key'>
        <ul>
          <li  :key='item'
                v-for="item in keys" 
                @click="inp">
            {{item}}
          </li>
        </ul>
      </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data(){
    return {
      keys:[
        'clear','+','-','*',
        '7','8','9','/',
        '4','5','6','0',
        '1','2','3','='
      ],
      key:'',
      enter:'',
      result:''
    } 
  },
  methods:{
    inp(e){
      if(e.toElement.innerText==this.keys[0]){
        this.enter='';
        this.result='';
      }
      else  if(this.result!=''&&e.toElement.innerText!=this.keys[15]){
        this.result='';
        this.enter=e.toElement.innerText;
      }
      else if(e.toElement.innerText==this.keys[15]){
        try  {
          this.result = eval(this.enter).toFixed(2);
          console.log(window.innerHeight)
        }
        catch(exception) {
          this.result = '输入非法'
        }
      }
      else {
        this.enter+=e.toElement.innerText;
      }
    }
  }
}
</script>
<style scoped>
  *{
    padding: 0;
    margin:0;
  }
  .display{
    position: relative;
    height: 150px;
    width:203px;
    background: #b6b6b4;
    border:1px solid #666664;
    user-select: none;
  }
  .cmp-result{
    position:absolute;
    right: 0;
    bottom: 30px;
    font-size: 40px;
    overflow: hidden;
  }
  .inp-enter{
    position: absolute;
    right: 0;
    bottom: 0;
    height: 30px;
    text-align: center;
    line-height: 30px;
    font:white; 
  }
  .key{
    height: 205px;
    width: 205px;
    background: #ccc;  
  } 
  li{
      float: left;
      height: 50px;
      width:50px;
      list-style: none;
      text-align: center;
      line-height: 50px;
      border:1px solid black;
      margin-right: -1px;
      margin-bottom: -1px;
      user-select: none;
  }
</style>


