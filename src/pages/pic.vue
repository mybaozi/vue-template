<template>
  <div class="container">
      <div style="width:30vw;padding-left:50px;">
          <p>x:<el-slider v-model="x"></el-slider></p>
          <p>y:<el-slider v-model="y"></el-slider></p>
          <p>z:<el-slider v-model="z"></el-slider></p>
          <p>deg:<el-slider v-model="deg"></el-slider></p>
      </div>
      <div class="block" :style="{transform}">
          <div v-for="item in 6" :key="item" :class="'div'+item">{{item}}</div>
      </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
        x:0,
        y:0,
        z:0,
        deg:0,
    }
  },
  computed:{
      transform(){
          return `rotate3d(${this.x/100}, ${this.y/100}, ${this.z/100}, ${this.deg*3.6}deg)`
      }
  },
  components:{},
  created(){},
  methods:{},
}
</script>
<style scoped lang="scss">
.container{
    width:100vw;
    height:100vh;
    position:relative;
    .block{
        position:absolute;
        left:50%;
        top:500px;
        width:200px;
        height:200px;
        transform-style: preserve-3d;
        perspective: 10000px;
        transition:transform 5s linear;
        &>div{
            display:flex;
            justify-content: center;
            align-items:center;
            position:absolute;
            width:100%;
            height:100%;
            font-size:40px;
            color:#fff;
            &.div1{
                background:rgba(255,0,255,0.3);
                transform: translate3d(0,0,100px)
            }
            &.div2{
                background:rgba(255,0,0,0.3);
                transform: translate3d(0,0,-100px)
            }
            &.div3{
                background:rgba(0,255,0,0.3);
                transform: translate3d(-100px,0,0) rotate3d(0,1,0,-90deg);
            }
            &.div4{
                background:rgba(0,0,255,0.3);
                transform: translate3d(100px,0,0) rotate3d(0,1,0,90deg);
            }
            &.div5{
                background:rgba(0,255,255,0.3);
                transform: translate3d(0,-100px,0) rotate3d(1,0,0,90deg);
            }
            &.div6{
                background:rgba(255,0,255,0.3);
                transform: translate3d(0,100px,0) rotate3d(1,0,0,-90deg);
            }
            &:hover{
                background:rgba(0,149,255,0.3);
            }
        }
    }
}
</style>