<template>
    <div></div>
</template>

<script>
import api from '../axios/api.js'
export default {
    name:'Mock2',
    data(){
        return {
            dataShow:[],
        }
    },
    created () {
        this.getData()
    },
    methods:{
        getData(){
            api.mockData('/data/index').then((res)=>{
                this.dataShow = res.data;
                console.log(this.dataShow);
                console.log(api)
            })
        }
    }
}
</script>

<style>

</style>

