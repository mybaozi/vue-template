<template>
  <div class="container">
    <canvas class="canvas" ref="canvas" width="600" height="600"></canvas>
  </div>
</template>
<script>
export default {
  data() {
    return {
			ctx: null,
			line: [{x:0,y:0}],
			xAdd:100,
			yAdd:10,
    };
  },
  components: {},
  mounted() {
		this.ctx = this.$refs.canvas.getContext('2d');
		this.animation();
	},
  methods: {
		createLine(){
			let point = {...this.line[this.line.length-1]};
			if([0,600].includes(point.x)||[0,600].includes(point.y)||this.line.length===1) this.line.push(point);
			if([0,600].includes(point.x)&&[0,600].includes(point.y))[this.xAdd,this.yAdd] = [this.yAdd,this.xAdd]
			if((point.x===0 && this.xAdd<0)||(point.x===600 && this.xAdd>0)) this.xAdd = -this.xAdd;
			if((point.y===0 && this.yAdd<0)||(point.y===600 && this.yAdd>0)) this.yAdd = -this.yAdd;
			console.log(point.x,point.y,this.xAdd,this.yAdd)
			point.x += this.xAdd;
			point.y += this.yAdd;
			this.line[this.line.length-1] = point;
			

		},
		draw(){
			let ctx = this.ctx;
			ctx.strokeStyle = '#000';
			ctx.beginPath()
			ctx.moveTo(this.line[0].x,this.line[0].y);
			for (let i = 1; i < this.line.length ; i++){
				ctx.lineTo(this.line[i].x,this.line[i].y);
			}
			ctx.stroke();
		},
		animation(){
			let ctx = this.ctx;
			ctx.clearRect(0,0,this.width,this.height);
			this.createLine();
			this.draw();
			requestAnimationFrame(this.animation)
		}
	},
};
</script>
<style scoped>
	.canvas{
		background:#eee;
		margin: 50px;
	}
</style>