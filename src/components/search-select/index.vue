<template>
  <div class="search-select" :style="{ width: width }" ref="search-select">
    <div :class="{active:show}">
      <div @click="show = !show">
        <span>{{$lang('other.tips2')}}</span>
        <i class="el-icon-arrow-down"></i>
      </div>
      <div v-if="show">
        <div class="search-input">
          <el-input
            :placeholder="$lang('other.tips3')"
            suffix-icon="el-icon-search"
            v-model="keyword">
          </el-input>
        </div>
        <div class="select-box scrollbar-style">
          <div class="select-list" :style="{height:36*options.length+(2*options.length-2)+'px'}">
            <div class="select-item" @click="handlerAll()" v-if="keyword===''">
              <span>{{$lang('pub.all')}}</span>
              <el-checkbox v-model="checkAll" @change="handlerAll('change')"  @click.stop.native>&nbsp;</el-checkbox>
            </div>
            <el-checkbox-group :value="value">
              <div v-for="(item,index) in filterOptions" :key="index" class="select-item" @click="handlerSelect(item.value)">
                <span>{{item.label}}</span>
                <el-checkbox :label="item.value" @click.stop.native @change="handlerSelect(item.value)">&nbsp;</el-checkbox>
              </div>
            </el-checkbox-group>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      keyword:'',
      checkAll:false,
      // checkList:[],
    };
  },
  props: {
    width: {
      type: String,
      default: "200px",
    },
    options:{
      type:Array,
      required:true
    },
    value:{
      type: Array,
      required:true,
    }
  },
  watch:{
    value(val){
      this.checkAll = val.length===this.options.length;
    },
  },
  computed:{
    lang(){
      return this.$store.state.app.language;
    },
    filterOptions(){
      if(this.keyword==='')return this.options;
      return this.options.filter(item=>item.label.includes(this.keyword));
    }
  },
  mounted(){
    document.addEventListener('click',this.bindFn)
  },
  destroyed(){
    document.removeEventListener('click',this.bindFn)
  },
  components: {},
  methods: {
    bindFn(e){
      if(!this.$refs['search-select'].contains(e.target)&&this.show){
        this.show = false;
      }
    },
    handlerAll(key){
      if(!key)this.checkAll = !this.checkAll;
      let arr = this.checkAll ? this.options.map(item=>item.value): [];
      this.$emit('input',arr);
    },
    handlerSelect(val){
      let arr = [...this.value];
      let index = arr.indexOf(val);
      if(index===-1){
        arr.push(val);
      }else{
        arr.splice(index,1)
      }
      this.$emit('input',arr)
    }
  },
};
</script>

<style scoped lang="scss">
.search-select {
  z-index: 0;
  min-width: 180px;
  position: relative;
  height: 38px;
  font-size: 14px;
  color: #333;
  box-sizing: border-box;
  background: #fff;
  & > div {
    z-index: 1000;
    position: absolute;
    width: 100%;
    background:#fff;
    // height: 100%;
    max-height:38px;
    line-height: 38px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    overflow:hidden;
    &:hover {
      border-color: rgb(0, 149, 255);
    }
    &.active{
      max-height:278px;
      border-color:rgb(0,149,255);
    }
    & > div:first-child {
      padding-left: 15px;
      position:relative;
      width:100%;
      height:36px;
      cursor: pointer;
      .el-icon-arrow-down {
        position: absolute;
        right: 10px;
        top: 13px;
        color: #aaa;
      }
    }
    .search-input{
      padding:5px;
    }
    .select-box{
      max-height:190px;
      overflow-y:auto;
      .select-item{
        display:flex;
        width:100%;
        justify-content: space-between;
        padding-left:20px;
        cursor:pointer;
        &>span:first-child{
          font-size:14px;
          color:#333;
        }
        &:hover{
          background: rgba(229,243,255,1);
        }
      }
    }
  }
}
</style>
