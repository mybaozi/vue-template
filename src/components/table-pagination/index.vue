<template>
  <div class="table-container" :ref="refName">
    <div class="flex-table"  v-show="total > 0">
      <i class="el-icon-arrow-left table-btn" v-if="showBtn" :class="{disabled:position==='left'}" @click="onSrcollClicked('left')"></i>
      <el-table 
        v-loading="showLoading"
        :data="data" 
        :style="{ width: width }" 
        @selection-change="handlerSelect" 
        ref="table" 
        fit
        @sort-change="sortChange"
        @row-click="rowClick">
        <!-- 复选 -->
        <el-table-column type="selection" v-if="checkbox" :fixed="fixCheckbox"></el-table-column>
        <!-- 自定义单选 -->
        <el-table-column v-if="selection" width="50" :fixed="fixRadio">
          <template slot-scope="scope">
            <div>
              <el-radio
                v-if="!scope.row.hiddenRadio"
                v-model="selectIndex"
                :label="scope.$index"
                @change="handlerSelect"
                >&nbsp;</el-radio>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :header-align="headerAlign"
          v-for="(item, index) in columns"
          :key="index"
          :label="item.title"
          :prop="item.key"
          :min-width="item.width"
          
          :align="item.align || 'center'"
          :sortable="item.sortable||false">
          <template slot-scope="scope">
            <slot v-if="item.slot" :name="item.slot"  :row="scope.row" :options="item.options"></slot>
            <span v-else-if="item.options"
              :style="{color:$findOptions(scope.row[item.key],item.options,'color')||'inherit'}"
              >{{scope.row[item.key]|findOptions(item.options)}}</span>
            <span v-else-if="item.toRate">{{scope.row[item.key]|toRate}}</span>
            <span v-else-if="item.toFixed">{{scope.row[item.key]|toFixed}}</span>
            <span v-else>{{scope.row[item.key]}}</span>
          </template>
        </el-table-column>
      </el-table>
      <i class="el-icon-arrow-right table-btn" v-if="showBtn" :class="{disabled:position==='right'}" @click="onSrcollClicked('right')"></i>
    </div>
    <div class="pagination"  v-show="total > 0">
      <div class="left">
        <span>{{$lang('other.total')}}</span>
        <span class="total">{{ total }}</span>
        <span>{{$lang('other.total2')}}</span>
        <el-select :value="pSize" class="select" @change="handlerSize">
          <el-option
            v-for="item in pageOptions"
            :key="item.value"
            :label="item.value"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <span>{{$lang('other.eachPage')}}</span>
      </div>
      <div class="right">
        <el-pagination
          background
          layout="prev, pager, next"
          :current-page="pIndex"
          :total="total"
					:page-size="pSize"
          @current-change="handlerCurrent"
          :prev-text="$lang('other.prev')"
          :next-text="$lang('other.next')"
        >
        </el-pagination>
      </div>
    </div>
    <div class="no-data" v-show="total === 0 && !showLoading">
      <p>{{$lang('other.noRecord')}}</p>
    </div>
    <div class="loading" v-show="total === 0 && showLoading" v-loading="showLoading">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showLoading:false,
      selectIndex: "",
      pageOptions: [
        { value: 10 },
        { value: 20 },
        { value: 50 },
        { value: 100 },
      ],
      position:'left',
      timeout:null
    };
  },
  props: {
    //自定义组件ref 同一个页面引用多个组件时
    refName:{
      type:String,
      default:'table-pagination'
    },
    //复选框固定位置
    fixCheckbox:{
      type:[Boolean,String],
      default:false,
    },
    //是否展示loading
    loading:{
      type:Boolean,
      default:false,
    },
    //是否展示表格左右控制滚动条按钮
    showBtn:{
      type:Boolean,
      default:false,
    },
		//是否使用多选功能
		checkbox:{
			type:Boolean,
			default:false,
		},
    //是否使用单选功能
    selection: {
      type: Boolean,
      default: false,
		},
		//是否固定单选列
		fixRadio:{
			type:Boolean,
			default:false,
		},
    //列表头部文字排列方式
    headerAlign: {
      type: String,
      default: "left",
    },
    //表格宽度
    width: {
      type: String,
      default: "100%",
    },
    /**
     * 列数组中对象的属性值
     * title 列名
     * key 键名
     * width 列宽
     */
    columns: {
      type: Array,
      required:true,
    },
    //列表数据
    data: {
      type: Array,
      required:true,
    },
    //当前页
    pIndex: {
      type: Number,
      default: 1,
    },
    //每页数据条数
    pSize: {
      type: Number,
      default: 10,
    },
    //数据总量
    total: {
      type: Number,
      default: 0,
    },
  
  },
  computed:{
    lang(){
      return this.$store.state.app.language;
    }
  },
  watch:{
    loading(val){
      this.showLoading = val;
    },
    lang(){
      if(this.data.length>0) this.$emit("handlerChange");
    },
    // data(){
    //   this.showLoading = false;
    // }
  },
  mounted(){
      this.addScrollEvent();
  },
  beforeDestroy(){
    clearTimeout(this.timeout);
  },
  methods: {
    sortChange(params){
      let order = '';
      if(params.order==='descending'){
        order = 'desc';
      }else if(params.order==='ascending'){
        order = 'asc';
      }
      this.$emit('sortChange',order?params.prop:'',order);
    },
    addScrollEvent(){
      this.timeout = setTimeout(()=>{
        if(this.showBtn){
          let targets = document.getElementsByClassName('el-table__body-wrapper');
          let scroll;
          for(let i = 0 ; i< targets.length ; i++ ){
            if(!this.$refs[this.refName]){
              this.addScrollEvent();
              return;
            }
            if(this.$refs[this.refName].contains(targets[i]))scroll = targets[i];
          }
          let contents = document.getElementsByClassName('el-table__body');
          let content;
          for(let i = 0 ; i< contents.length ; i++ ){
            if(this.$refs[this.refName].contains(contents[i]))content = contents[i];
          }
          let width = content.getBoundingClientRect().width;
          scroll.addEventListener("scroll",(e)=>{
            if(!width)width =  content.getBoundingClientRect().width;  
            if(scroll.scrollLeft===0){
              this.position = 'left';
            }else if(scroll.scrollLeft+scroll.clientWidth===width){
              this.position = 'right'
            }else{
              this.position = 'middle';
            }
          })
        }
      },1000)
    },
    rowClick(e){
      this.$emit('rowClick',e)
    },
    onSrcollClicked(key){
      if(key===this.position)return;
      let targets = document.getElementsByClassName('el-table__body-wrapper');
      let scroll;
      for(let i = 0 ; i< targets.length ; i++ ){
        if(this.$refs[this.refName].contains(targets[i]))scroll = targets[i];
      }
      if(scroll.scroll){
        scroll.scrollTo(key==='left'?0:100000,0)
      }else{
        //ie 浏览器
        scroll.scrollLeft = key === 'left'? 0 : 100000;
      }
    },
    handlerClear(){
      if(this.checkbox){
        this.$refs.table.clearSelection();
        this.$emit("handlerSelectChange", []);
      }else{
        this.selectIndex = '';
        this.$emit("handlerSelectChange", '');
      }
      this.$refs.table.clearSort();
    },
    handlerSelect(e) {
      this.$emit("handlerSelectChange", e);
		},
		// handlerSelectChange(e){
		// 	console.log(e);
		// },
    handlerSize(e) {
      this.showLoading = true;
      this.handlerClear();
			this.$emit('update:pIndex',1);
      this.$emit("update:pSize", e);
      this.$emit("handlerChange");
    },
    handlerCurrent(e) {
      this.showLoading = true;
      this.handlerClear();
      this.$emit("update:pIndex", e);
      this.$emit("handlerChange");
    },
  },
};
</script>

<style  lang="scss" scpoed>
.flex-table{
  display:flex;
  align-items:center;
  .table-btn{
    font-size:50px;
    cursor:pointer;
    &.disabled{
      color:#eee;
      cursor:auto;
    }
  }
}
.pagination {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  .left {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: rgb(102, 102, 102);
    .total {
      color: rgb(0, 149, 255);
      margin: 0 4px;
    }
    .select {
      width: 80px;
      margin: 0 3px;
      .el-input__inner{
        color:rgb(0, 149, 255);
      }
      .el-input .el-select__caret{
        color:rgb(0,149,255);
        font-weight:bold;
      }
    }
  }
}
.no-data {
	p{
		text-align: center;
		padding:40px 0;
		color:#666;
		font-size:14px;
	}
}
.loading{
  margin-top:40px;
}
</style>
<style lang="scss">
  .table-container{
    .btn-prev,.btn-next{
      height:auto;
    }
    .btn-prev>span,.btn-next>span,.el-pager>.number{
      height:40px;
      line-height:40px;
      padding: 0  15px;
      box-shadow: 0px 1px 3px #ececec;
      border: 1px solid rgb(241,241,241);
      background:#fff;
    }
    .el-pagination.is-background .el-pager li{
      background:#fff;
      border-radius:5px;
    }
    .el-table{
      &>.el-table__fixed{
        height:100% !important;
      }
      .el-table__header,.el-table__body{
        width:100% !important;
      }
    }
  }
</style>