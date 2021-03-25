<template>
  <div class="app-progress" :style="{width:size+'px',height:size+'px'}">
    <canvas ref="canvas"></canvas>
    <span class="text">{{end}}</span>
    <span class="sub-text">{{subText||'同比昨日'}}</span>
  </div>
</template>
<script>
export default {
  data(){
    return {
      ctx:null,
      end:0
    }
  },
  props:{
    size:{
      type: String|Number,
      default: 126
    },
    lineWidth:{
      type: String|Number,
      default: 6
    },
    precentage:{
      type: Number,
      default:0,
    },
    subText:{
      type: String,
      default: ''
    }
  },
  components:{},
  mounted(){
    console.log('mounted')
    let canvas = this.$refs.canvas;
    this.ctx = canvas.getContext('2d');
    this.initSize();
    this.drawBackGround();
    this.animation();
  },
  methods:{
    initSize(){
      //修复锯齿
      let scale = 2;
      let canvas = this.$refs.canvas;
      canvas.style.width = this.size + 'px'
      canvas.style.height = this.size + 'px'
      canvas.height = this.size * scale
      canvas.width = this.size * scale
      this.ctx.scale(scale, scale)

    },
    drawBackGround(){
      let x = this.size/2;
      let y = this.size/2;
      let radius = this.size/2 - this.lineWidth/2;
      let ctx = this.ctx;
      ctx.beginPath();
      ctx.strokeStyle = 'rgb(229, 233, 242)';
      ctx.lineWidth = this.lineWidth;
      ctx.arc( x, y, radius, -0.5 * Math.PI, 1.5 * Math.PI, false);
      // ctx.closePath();
      ctx.stroke();
    },
    drawContent(end){
      let x = this.size/2;
      let y = this.size/2;
      let radius = this.size/2 - this.lineWidth/2;
      let ctx = this.ctx;
      ctx.beginPath();
      ctx.strokeStyle = 'rgb(119, 156, 245)';
      ctx.lineWidth = this.lineWidth;
      ctx.arc( x, y, radius, -0.5 * Math.PI, ( end/100 * 2 - 0.5) * Math.PI, false);

      // ctx.closePath();
      ctx.stroke();
    },
    animation(){
      if(this.end === this.precentage)return;
      this.end += 1;
      this.drawContent(this.end)
      requestAnimationFrame(this.animation)
      
    }
  },
}
</script>
<style scoped lang="scss">
  .app-progress{
    display:inline-block;
    position:relative;
    .text{
      position:absolute;
      font-size:30px;
      color:#333;
      font-weight:bold;
      left:50%;
      top:50%;
      transform:translate(-50%,-50%);
      &:after{
        position:absolute;
        content:'%';
        font-size:16px;
        bottom:5px;
        right:-16px;
      }
    }
    .sub-text{
      position:absolute;
      font-size:12px;
      color:#ccc;
      left:50%;
      top:75%;
      transform:translate(-50%,-50%);
      
    }
  }
</style>