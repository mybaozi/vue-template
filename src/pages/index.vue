<template>
  <div class="container">
    <canvas ref="canvas" width="300" height="300"></canvas>


  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      width:300,
      height:200,
      stars:[],
      ctx:null,
      starAmount:100,
      moves:[],
      maxR:1000,
    };
  },
  components: {},
  created(){
    this.width = document.documentElement.clientWidth;
    this.height = document.documentElement.clientHeight;
  },
  mounted(){
    let canvas = this.$refs.canvas;
    this.ctx = canvas.getContext('2d');
    // // this.init();
    this.animation2();
    // axios('/api/haha').then(res=>{console.log(res)})
  },
  methods: {
    createStar(){
      let star = {}
      star.x = Math.random()*this.width;
      star.y = Math.random()*this.height;
      star.r = Math.random()*2+1;
      let opacity = (Math.random()*0.8+0.2).toFixed(1);
      let color = {
        r:Math.floor(Math.random()*255),
        g:Math.floor(Math.random()*255),
        b:Math.floor(Math.random()*255)
      }
      star.color = `rgba(${color.r},${color.g},${color.b},${opacity})`
      // star.color = `rgba(255,255,255,${opacity})`
      return star;  
    },
    draw(star){
      let ctx = this.ctx;
      ctx.strokeStyle = star.color;
      ctx.lineWidth = 50;
      ctx.shadowBlur = star.r * 2;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI, false);
      ctx.closePath();
      ctx.stroke();
    },
    init(){
      for(let i = 0; i<this.starAmount; i++){
        this.stars.push(this.createStar())
        this.draw(this.stars[i])
      }
      this.animation();
    },
    move(star){
      star.y += 0.5;
      if(star.y > this.height+10)star.y = -10;
    },
    animation(){
      let ctx = this.ctx;
      ctx.clearRect(0,0,this.width,this.height);
      this.stars.forEach(item=>{
        this.move(item);
        this.draw(item);
      })
      requestAnimationFrame(this.animation)
    },
    handleMove(e){
      this.moves.push({
        x: e.clientX,
        y: e.clientY,
        r: 0,
        color: `rgba(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},0.1)`
        // color: '#fff'
      });
    },
    animation2(){
      let ctx = this.ctx;
      ctx.clearRect(0,0,this.width,this.height);
      this.moves.forEach((item,index)=>{
        if(item.r>this.maxR) {
          this.moves.splice(index,1);
          return;
        }else{
          item.r += 1;
          item.color = `rgba(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},0.5)`
        }
        this.draw(item);
      })
      requestAnimationFrame(this.animation2)
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  // display:flex;
  // height: 100vh;
  // align-items:flex-end;
  // .canvas{
  //   background:#eee;
  // }
}
</style>
