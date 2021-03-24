<template>
  <div class="container">
    <div class="modal">
      <div>
        <div class="header" v-drag  @click="fn">
          <button>click</button>
        </div>
        <div class="modal-content">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  components: {},
  mounted() { 
  },
  directives:{
    drag:{
      inserted:(el)=>{
        let parent = el.parentNode;
        let x = 0,y = 0;
        let width = parent.offsetWidth,height = parent.offsetHeight;
        let clientWidth = document.body.clientWidth,clientHeight = window.document.body.offsetHeight;
        el.setAttribute('draggable',"true")
        el.style.cursor = 'move';
        el.dragFn = {
          dragstart : (e)=>{
            x = e.offsetX;
            y = e.offsetY;
          },
          drag : (e)=>{
            let left = (e.x - x) <= 0 ? 0 : ( (e.x - x + width >= clientWidth) ? (clientWidth - width) : (e.x - x) );
            let top = (e.y - y) <= 0 ? 0 : ( (e.y - y + height >= clientHeight) ? (clientHeight - height) : (e.y - y) );
            parent.style.left = left + 'px';
            parent.style.top = top + 'px';
          },
        }
        el.addEventListener('dragstart',el.dragFn.dragstart)
        el.addEventListener('drag',el.dragFn.drag)
        el.addEventListener('dragend',el.dragFn.drag)
      },
    }
  },
  methods: {
    fn(){console.log(1)}
  },
};
</script>
<style scoped lang="scss">
  .container{
    width:100vw;
    height:100vh;
  }
	.modal{
		position:fixed;
		left:0;
		right:0;
		top:0;
		bottom:0;
		background:rgba(0,0,0,0.3);
		&>div{
			position: absolute;
			left:200px;
      top:500px;
      width:500px;
      height:200px;
      background:#ddd;
      .header{
        height:50px;
        border-bottom:1px solid #fff;
      }
		}
	}
</style>