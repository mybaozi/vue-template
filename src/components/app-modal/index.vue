<template>
  <div class="app-modal">
    <el-dialog
      :title="title"
      :visible="value"
      :width="width"
      @close="handlerClose"
      :top="top"
			:append-to-body="true"
    >
      <slot></slot>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {

		};
  },
  props: {
    //对话框标题
    title: {
      type: String,
      default: "",
    },
    //是否展示
    value: {
      type: Boolean,
      default: false,
    },
    //对话框宽度
    width: {
      type: String,
      defualt: "50%",
    },
    top: {
      type: String,
      default: "15vh",
    },
	},
  methods: {
    handlerClose() {
      this.$emit("input", false);
    },
    // beforeClose(done){
    // 	this.$emit('before-close',done);
    // }
  },
};
</script>

<style scoped lang="scss">
.modal-container {
}
</style>
<style lang="scss">
.app-modal {
}
</style>