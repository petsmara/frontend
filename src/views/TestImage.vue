<template>
  <div class="product">
    <div>
      <!-- <p>{{ $route.parmas.id }}번째 상품</p> -->
      <el-upload
        action="http://localhost:3000/posts/"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success="handleSucess"
        :on-progress="handleProgress"
        multiple
        ref="upload"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog>
      <el-button
        style="margin-left: 10px;"
        size="small"
        type="success"
        @click="submitUpload"
        >upload to server</el-button
      >
    </div>
    <div>
      Input vue node bird
      <input
        ref="imageInput"
        type="file"
        multiple
        hidden
        @change="onChangeImages"
      />
      <button @click="onClickImageUpload">이미지 업로드</button>
      asdfasdf
      <div
        class="list"
        v-for="(p, i) in imagePaths"
        :key="p"
        style="display: inline-block"
      >
        <img :src="p" :alt="p" style="width: 200px" />
        <div>
          <button @click="onRemoveImage(i)" type="button">제거</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      imagePaths: []
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      console.log(file)
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleSucess(res, file, fileList) {
      console.log('suc')
      console.log(res)
      console.log(file)
      console.log(fileList)
    },
    handleProgress(res, file, fileList) {
      console.log('pro')
      console.log(res)
      console.log(file)
      console.log(fileList)
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    onChangeImages(e) {
      const imageFormData = new FormData()
      Array.from(e.target.files).forEach(f => {
        imageFormData.append('image', f) // { image: [file1, file2] }
      })
      this.imagePaths.concat(imageFormData)
    },
    onClickImageUpload() {
      this.$refs.imageInput.click()
    },
    onRemoveImage(index) {
      this.imagePaths.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped></style>
