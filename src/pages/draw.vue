<template>
  <div class="container">
    <div class="scroll">
      <div>
        <p>title</p>
        <p>content</p>
      </div>
      <div>
        <p>title2</p>
        <p>content2</p>
      </div>
      <div>
        <p>title</p>
        <p>content</p>
      </div>
      <div>
        <p>title2</p>
        <p>content2</p>
      </div>
      <div>
        <p>title</p>
        <p>content</p>
      </div>
      <div>
        <p>title2</p>
        <p>content2</p>
      </div>
      <div>
        <p>title</p>
        <p>content</p>
      </div>
      <div>
        <p>title2</p>
        <p>content2</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
        ctx: null,
    }
  },
  components:{},
  created(){
  },
  methods:{

  },
}
</script>
<style scoped lang="scss">
.scroll{
  height:500px;
  overflow:auto;
  border:1px solid;
  &>div{
    display:flex;
    height:200px;
    flex-direction:column;
    &>p{
      position:sticky;
      top:0;
      background:#eee;
      &:not(:first-child){
        flex-grow:1;
        background:#aaa;
        position:static;
        
      }
    }
    
  }
}
</style>