<template>
  <div class="register-product">
    <LogoCard />
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
        <swiper ref="mySwiper" :options="swiperOption">
          <swiper-slide>
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
              <span>
                <i class="font-bold">{{ imagePaths.length }}</i
                >/<i>5</i>
              </span>
            </button>
          </swiper-slide>
          <swiper-slide
            class="register-product__image-wrap"
            v-for="(p, index) in imagePaths"
            :key="`${p}-${index}`"
            style="display: inline-block"
          >
            <img
              class="register-product__image"
              :src="p"
              :alt="p"
              style="width: 200px"
            />
            <button
              class="register-product__remove-btn"
              @click="onRemoveImage(i)"
              type="button"
            ></button>
          </swiper-slide>
        </swiper>
      </div>

      <el-form-item label="제목" prop="title">
        <el-input
          type="title"
          v-model="registerProductRuleForm.title"
          placeholder="제목을 입력해주세요"
        ></el-input>
      </el-form-item>
      <el-form-item label="카테고리" prop="category">
        <el-radio-group v-model="registerProductRuleForm.category">
          <el-radio-button label="1">강아지</el-radio-button>
          <el-radio-button label="2">고양이</el-radio-button>
          <el-radio-button label="3">공통</el-radio-button>
          <el-radio-button label="4">기타</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="장소" prop="places">
        <el-input
          placeholder="예) 서울 강남구, 서울 동작구"
          v-model="registerProductRuleForm.places"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="가격(종이컵 1컵) / 원"
        prop="price"
        class="register-product__price"
      >
        <el-input
          placeholder="예) 3000"
          v-model.number="registerProductRuleForm.price"
        ></el-input>
      </el-form-item>

      <el-form-item label="내용" prop="content">
        <el-input
          class="register-product__content"
          type="textarea"
          :autosize="{ minRows: 10 }"
          maxlength="1000"
          show-word-limit
          v-model="registerProductRuleForm.content"
          placeholder="내용을 입력해주세요"
        ></el-input>
      </el-form-item>

      <el-form-item class="register-product__submit">
        <el-button
          :loading="isLoading"
          type="primary"
          @click="submitForm('registerProductRuleForm')"
          >작성완료</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('product')
import { LogoCard } from '@/components/Cards'

export default {
  components: {
    LogoCard
  },
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
      swiperOption: {
        spaceBetween: 20,
        slidesPerView: 'auto'
      },
      isLoading: false,
      registerProductRuleForm: {
        title: '',
        content: '',
        category: '',
        price: null,
        places: ''
      },
      registerProductRules: {
        title: [
          {
            required: true,
            message: '제목을 입력해주세요.',
            trigger: 'change'
          }
        ],
        content: [
          {
            required: true,
            message: '내용을 입력해주세요.',
            trigger: 'change'
          }
        ],
        category: [
          {
            required: true,
            message: '카테고리를 선택해주세요.',
            trigger: 'change'
          }
        ],
        price: [
          {
            required: true,
            message: '가격을 입력해주세요.',
            trigger: 'change'
          },
          { type: 'number', message: '가격은 숫자만 입력해주세요.' }
        ],
        places: [
          // {
          //   required: true,
          //   message: '장소를 입력해주세요.',
          //   trigger: 'blur'
          // }
          // { validator: validatePass2, trigger: 'blur' }
        ]
      },
      imagesLimitCount: 5
    }
  },
  computed: {
    ...mapState(['imagePaths'])
  },
  methods: {
    ...mapActions(['uploadImages', 'registerProduct', 'removeImagePath']),
    submitForm(formName) {
      const {
        title,
        content,
        category,
        price,
        places
      } = this.registerProductRuleForm
      console.log(price)
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.isLoading = true
          this.registerProduct({
            title,
            content,
            category,
            price,
            places,
            images: this.imagePaths
          }).then(result => {
            console.log(result)
            if (result.status === 200) {
              this.$message({
                message: '상품등록이 완료되었습니다.!',
                duration: 1000,
                showClose: true,
                type: 'success',
                onClose: () => {
                  this.isLoading = false
                  this.$router.replace(`/product/${result.data.product_id}`)
                }
              })
            } else {
              this.$message({
                message: `상품등록이 실패했습니다..! 다시 시도해주세요. ${result.data.message}`,
                duration: 3000,
                showClose: true,
                type: 'error',
                onClose: () => {
                  this.isLoading = false
                }
              })
            }
          })
        } else {
          this.isLoading = false
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
    onChangeImages(e) {
      const imageFormData = new FormData()
      if (
        this.imagesLimitCount <
        this.imagePaths.length + e.target.files.length
      ) {
        this.$message({
          message: '총 이미지 5개이하로만 업로드 가능합니다.',
          duration: 3000,
          showClose: true,
          type: 'warning'
        })
        console.log('총 이미지 길이가 5개 이상입니다.')
        return false
      }
      Array.from(e.target.files).forEach(f => {
        imageFormData.append('filename', f) // { image: [file1, file2] }
      })
      this.uploadImages(imageFormData)
    },
    onClickImageUpload() {
      this.$refs.imageInput.click()
    },
    onRemoveImage(index) {
      console.log(this.imagePaths)
      this.removeImagePath('posts/removeImagePath', index)
    }
  }
}
</script>

<style lang="scss" scoped>
.register-product {
  padding: 20px;
  max-width: 420px;
  margin: 0 auto;
  &__title {
    text-align: center;
    margin: 12px 0;
  }
  &__content {
    & /deep/ .el-textarea__inner {
      padding-bottom: 30px;
    }
    & /deep/ .el-input__count {
      line-height: 1.4;
    }
  }
  &__form {
    margin: 0 auto;
    max-width: 420px;
    .el-form-item {
      margin-bottom: 10px;
    }
    .el-form-item__label {
      line-height: 30px;
    }
  }
  &__image-upload-btn {
    cursor: pointer;
    width: 200px;
    height: 200px;
    border: 1px solid #c4c4c4;
    border-radius: 8px;
    background: url('~@/assets/images/icons/camera.png') center / 30px no-repeat;
    position: relative;
    &:hover {
      background-color: transparent;
    }
    span {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 60px;
      color: #6c6c6c;
      i {
        font-style: normal;
        font-size: 14px;
      }
      .font-bold {
        color: #000000;
        font-weight: bold;
      }
    }
  }
  &__image-wrap {
    cursor: pointer;
    width: 200px;
    height: 200px;
    border: 1px solid #c4c4c4;
    border-radius: 8px;
    position: relative;
    overflow: hidden;
  }
  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &__remove-btn {
    cursor: pointer;
    position: absolute;
    border: none;
    top: 10px;
    right: 10px;
    width: 20px;
    height: 20px;
    background: url('~@/assets/images/icons/close.png') center / 100% no-repeat;
  }
  &__submit {
    margin-top: 30px;
    .el-button {
      padding: 16px 0;
      display: block;
      width: 100%;
      font-size: 20px;
      color: #ffffff;
      // background-color: #8fb5ff;
      &:hover {
      }
    }
  }

  &__agree {
    margin-top: 30px;
    text-align: left;
    & /deep/ .el-form-item__content {
      line-height: 1;
    }
  }

  .el-radio-group {
    width: 100%;
    text-align: left;
  }

  & /deep/ .el-radio-button__orig-radio:checked + .el-radio-button__inner {
    background-color: #8fb5ff;
    border-color: #8fb5ff;
    box-shadow: -1px 0 0 0 #8fb5ff;
  }

  &__price {
    & /deep/ .el-form-item__content {
      text-align: left;
    }
    .el-input {
      width: 130px;
      display: inline-block;
    }
  }
  .swiper-slide {
    width: 200px !important;
  }
}
</style>
