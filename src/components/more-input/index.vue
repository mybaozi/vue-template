<template>
  <div class="more-input spec" :class="{active:value2.length>0,'en-style':lang==='en'}">
    <el-input v-model="value1" style="width:266px;">
      <el-popover
        slot="append"
        placement="bottom"
        width="300"
        trigger="click"
        v-model="visible"
      >
        <el-input
          type="textarea"
          :rows="10"
          resize="none"
          v-model="value2"
          :placeholder="tips"
        ></el-input>
        <div class="popover-operation">
          <el-button
            size="mini"
            @click="
              value2 = '';
              visible = false;
            "
            >{{$lang('pub.clear')}}</el-button
          >
          <el-button type="primary" size="mini" @click="visible = false"
            >{{$lang('pub.confirm')}}</el-button
          >
        </div>
        <el-button slot="reference">{{$lang('pub.more')}}</el-button>
      </el-popover>
    </el-input>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible:false,
      value1:'',
      value2:'',
    };
  },
  props:{
    value:{
      type:String,
      default:'',
    }
  },
  components: {},
  computed:{
    lang(){
      return this.$store.state.app.language;
    },
    tips(){
      return this.$lang('other.tips')
    }
  },
  watch:{
    value(val){
      if(!val){
        this.value1 = '';
        this.value2 = '';
      }
    },
    value1(val){
      let arr = [];
      if(val)arr.push(val);
      if(this.value2.length)arr.push(...this.value2.replace(/\n/g,",").split(','));
      this.$emit('input',arr.join(','))
    },
    value2(val){
      let arr = [];
      if(this.value1)arr.push(this.value1);
      if(val.length)arr.push(...val.replace(/\n/g,",").split(','));
      this.$emit('input',arr.join(','))
    }
  },
  methods: {
  },
};
</script>

<style lang="scss">
.more-input {
  width:266px;
  &.spec {
    .el-input__inner {
      width: 195px !important;
    }
    .el-input-group__append {
      background: #fff;
    }
    &.en-style{
      .el-input__inner{
        width:188px !important;
      }
    }
  }
    
  
  .el-textarea__inner{
    &::-webkit-scrollbar{
      background:#fff;
    }
    &::-webkit-scrollbar-thumb{
      background:#ddd;
      border-radius:4px;
    }
  }
  
  &.spec.active{
    .el-input-group__append{
      color:#409EFF;
      background:#ecf5ff;
    }
  } 
}
.popover-operation {
  display: flex;
  margin-top: 10px;
  justify-content: flex-end;
}
</style>
