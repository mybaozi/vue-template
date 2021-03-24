<template>
  <div>
    <el-date-picker
      v-model="startTime"
      style="width: auto"
      type="datetime"
      :clearable="false"
      @change="handlerStart"
      value-format="yyyy-MM-dd HH:mm:ss"
      :picker-options="pickerOptions1"
    >
    </el-date-picker>
    <i class="el-icon-right"></i>
    <el-date-picker
      v-model="endTime"
      style="width: auto"
      type="datetime"
      :clearable="false"
      @change="handlerEnd"
      value-format="yyyy-MM-dd HH:mm:ss"
      :picker-options="pickerOptions2"
    >
    </el-date-picker>
  </div>
</template>

<script>
export default {
  data() {
    return {
      startTime: "",
      endTime: "",
      pickerOptions1: {
        disabledDate: (time) => {
          return time.getTime() > Date.now();
        },
      },
      pickerOptions2: {
        disabledDate: (time) => {
          if (this.startTime === "") return time.getTime() > Date.now();
          let start = new Date(this.startTime.replace(/\-/g,'/')).getTime();
          return (
            time.getTime() > Date.now() ||
            time.getTime() - start > this.limitDay * 24 * 60 * 60 * 1000 - 1000
          );
        },
      },
    };
  },
  props: {
    value: {
      type: Object,
      default() {
        return {};
      },
    },
    start: {
      type: String,
      default: "",
    },
    end: {
      type: String,
      default: "",
    },
    limitDay: {
      type: Number,
      default: 366
    },
    
  },
  watch: {
    value(val) {
      this.startTime = val[this.start];
      this.endTime = val[this.end];
    },
  },
  mounted() {
    this.startTime = this.value[this.start];
    this.endTime = this.value[this.end];
  },
  components: {},
  methods: {
    handlerStart(e) {
      if (
        new Date(e.replace(/\-/g,'/')).getTime() > new Date(this.endTime.replace(/\-/g,'/')).getTime() ||
        this.endTime === ""
      ) {
        this.endTime = this.formatDate(e.replace(/\-/g,'/').split(" ")[0] + " 23:59:59");
      } else {
        let [start, end] = [
          new Date(e.replace(/\-/g,'/').split(" ")[0] + " 00:00:00").getTime(),
          new Date(this.endTime.replace(/\-/g,'/')).getTime(),
        ];
        if (end - start > this.limitDay * 24 * 60 * 60 * 1000) {
          this.endTime = this.formatDate(new Date(start + this.limitDay * 24 * 60 * 60 * 1000 - 1000))
            
        }
      }
      let obj = { ...this.value };
      obj[this.start] = e;
      obj[this.end] = this.endTime;
      this.$emit("input", obj);
    },
    handlerEnd(e) {
      if(new Date(e.replace(/\-/g,'/')).getTime() < new Date(this.startTime.replace(/\-/g,'/')).getTime()){
        this.startTime = this.formatDate(new Date(e.replace(/\-/g,'/')).getTime()- 24*60*60*1000)
      }
      let obj = { ...this.value };
      obj[this.start] = this.startTime;
      obj[this.end] = e;
      this.$emit("input", obj);
    },
  },
};
</script>

<style scoped lang="scss">
</style>
