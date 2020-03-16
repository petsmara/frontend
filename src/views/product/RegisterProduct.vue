<template>
  <div class="register-product">
    <h2 class="register-product__title">
      상품등록
    </h2>
    <el-form
      :model="registerProductRuleForm"
      :rules="registerProductRules"
      ref="registerProductRuleForm"
      class="register-product__form"
      status-icon
    >
      <div>
        <input
          ref="imageInput"
          type="file"
          multiple
          hidden
          @change="onChangeImages"
        />
        <button
          class="register-product__image-upload-btn"
          type="button"
          @click="onClickImageUpload"
        >
          이미지 업로드
        </button>
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

      <el-form-item label="제목" prop="title">
        <el-input
          type="title"
          v-model="registerProductRuleForm.title"
          placeholder="제목을 입력해주세요"
        ></el-input>
      </el-form-item>
      <el-form-item label="내용" prop="content">
        <el-input
          type="textarea"
          :autosize="{ minRows: 5 }"
          maxlength="600"
          show-word-limit
          v-model="registerProductRuleForm.content"
          placeholder="내용을 입력해주세요"
        ></el-input>
      </el-form-item>
      <el-form-item label="카테고리" prop="category">
        <el-checkbox-group v-model="registerProductRuleForm.category">
          <el-checkbox label="강아지"></el-checkbox>
          <el-checkbox label="고양이"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="100g당 가격" prop="price">
        <el-input
          placeholder="예) 3000원"
          v-model="registerProductRuleForm.price"
        ></el-input>
      </el-form-item>

      <el-form-item label="장소" prop="places">
        <el-input
          placeholder="예) 서울 강남구, 서울 동작구"
          v-model="registerProductRuleForm.places"
        ></el-input>
      </el-form-item>

      <el-form-item class="register-product__submit">
        <el-button
          :loading="isLoading"
          type="primary"
          @click="submitForm('registerProductRuleForm')"
          >등록하기</el-button
        >
        <!-- <el-button @click="resetForm('registerProductRuleForm')">모두 지우기</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('product')

export default {
  data() {
    const validateNickname = (rule, value, callback) => {
      const checkNickname = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]/
      const newValue = value.replace(/\s/gi, '')
      this.nickname = newValue
      this.registerProductRuleForm.nickname = newValue
      if (newValue === '') {
        callback()
      }
      if (!checkNickname.test(newValue) || newValue.length < 2) {
        callback(new Error('형식에 맞지 않습니다.'))
      } else {
        callback()
      }
    }
    const validateMobileNumber = (rule, value, callback) => {
      const checkMobileNumber = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/
      if (!checkMobileNumber.test(value)) {
        callback(new Error('형식에 맞지 않는 번호입니다.'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('비밀번호를 입력해주세요.'))
      } else {
        if (this.registerProductRuleForm.checkPassword !== '') {
          this.$refs.registerProductRuleForm.validateField('checkPassword')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('한번 더 비밀번호를 입력해주세요.'))
      } else if (value !== this.registerProductRuleForm.password) {
        callback(new Error('비밀번호가 일치하지 않습니다.'))
      } else {
        callback()
      }
    }
    const validateAgree = (rule, value, callback) => {
      if (value !== true) {
        callback(new Error('동의를 해주십시오.'))
      } else {
        callback()
      }
    }
    return {
      // dialogImageUrl: '',
      // dialogVisible: false,
      isLoading: false,
      registerProductRuleForm: {
        title: '',
        content: '',
        category: [],
        price: '',
        places: ''
      },
      registerProductRules: {
        title: [
          {
            required: true,
            message: '제목을 입력해주세요.',
            trigger: 'blur'
          }
        ],
        content: [
          {
            required: true,
            message: '내용을 입력해주세요.',
            trigger: 'blur'
          }
        ],
        price: [
          {
            required: true,
            message: '가격을 입력해주세요.',
            trigger: 'blur'
          }
        ],
        places: [
          // {
          //   required: true,
          //   message: '장소를 입력해주세요.',
          //   trigger: 'blur'
          // }
          // { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState(['imagePaths'])
  },
  methods: {
    ...mapActions(['uploadImages', 'registerProduct']),
    submitForm(formName) {
      this.isLoading = true
      const {
        title,
        content,
        category,
        price,
        places
      } = this.registerProductRuleForm
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.registerProduct({
            title,
            content,
            category,
            price,
            places
          })
          // 여기서 결과값을 받아서 다시 분기처리 성공, 실패
          this.$message({
            message: '상품등록이 완료되었습니다.!',
            duration: 3000,
            showClose: true,
            type: 'success',
            onClose: () => {
              alert('다음 경로는 어디로?')
            }
          })
        } else {
          this.$message({
            dangerouslyUseHTMLString: true,
            message: `상품등록양식이 올바르지 않습니다. 다시 확인해주세요.`,
            duration: 3000,
            showClose: true,
            type: 'error'
          })
        }
        this.isLoading = false
      })
    },
    // handleSucess(res, file, fileList) {
    //   console.log('suc')
    //   console.log(res)
    //   console.log(file)
    //   console.log(fileList)
    // },
    onChangeImages(e) {
      const imageFormData = new FormData()
      Array.from(e.target.files).forEach(f => {
        imageFormData.append('image', f) // { image: [file1, file2] }
      })
      console.log(imageFormData)
      this.uploadImages(imageFormData)
      // this.imagePaths.concat(imageFormData)
    },
    onClickImageUpload() {
      this.$refs.imageInput.click()
    },
    onRemoveImage(index) {
      // this.imagePaths.splice(index, 1)
      this.$store.commit('posts/removeImagePath', index)
    }
  }
}
</script>

<style lang="scss" scoped>
.register-product {
  padding: 20px;
  &__form {
    margin: 0 auto;
    max-width: 360px;
    .el-form-item {
      margin-bottom: 10px;
    }
    .el-form-item__label {
      line-height: 30px;
    }
  }
  &__image-upload-btn {
    cursor: pointer;
    padding: 10px 20px;
    background-color: gray;
    color: white;
  }
  &__image {
    // color: black;
    // & /deep/ .el-upload--picture-card {
    //   width: 100px;
    //   height: 100px;
    // }
  }
  &__submit {
    margin-top: 30px;
  }

  &__agree {
    margin-top: 30px;
    text-align: left;
    & /deep/ .el-form-item__content {
      line-height: 1;
    }
  }
}
</style>
