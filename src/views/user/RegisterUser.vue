<template>
  <div class="register-user">
    <LogoCard />
    <h2 class="register-user__title">
      회원가입
    </h2>
    <el-form
      :model="registerUserRuleForm"
      :rules="registerUserRules"
      ref="registerUserRuleForm"
      class="register-user__form"
      status-icon
    >
      <el-form-item
        label="반려동물(중복 선택 가능합니다.)"
        prop="category"
        class="register-user__category"
      >
        <el-checkbox-group v-model="registerUserRuleForm.categoryList">
          <el-checkbox class="register-user__category__dog" label="has_dog"
            >강아지</el-checkbox
          >
          <el-checkbox class="register-user__category__cat" label="has_cat"
            >고양이</el-checkbox
          >
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="아이디" prop="email">
        <el-input
          type="email"
          placeholder="이메일을 입력해주세요."
          v-model="registerUserRuleForm.email"
        ></el-input>
      </el-form-item>
      <el-form-item label="비밀번호" prop="password">
        <el-input
          type="password"
          placeholder="8~20자 이내의 영문과 숫자의 조합해주세요."
          v-model="registerUserRuleForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="비밀번호 확인" prop="checkPassword">
        <el-input
          type="password"
          placeholder="비밀번호 확인을 입력해주세요."
          v-model="registerUserRuleForm.checkPassword"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="핸드폰번호" prop="phone">
        <el-input
          placeholder="- 없이 입력해주세요."
          v-model="registerUserRuleForm.phone"
        ></el-input>
      </el-form-item>
      <el-form-item label="닉네임" prop="nickname">
        <el-input
          placeholder="한글 2자, 영문 4자 이상, 숫자 사용 가능(20자이내)"
          v-model="registerUserRuleForm.nickname"
        ></el-input>
      </el-form-item>

      <el-form-item prop="agree" class="register-user__agree">
        <el-checkbox
          label="만 14세 이상만 가입이 가능합니다."
          v-model="registerUserRuleForm.agree"
        ></el-checkbox>
      </el-form-item>

      <el-form-item class="register-user__submit">
        <el-button
          :loading="isLoading"
          type="primary"
          @click="submitForm('registerUserRuleForm')"
          >가입하기</el-button
        >
        <!-- <el-button @click="resetForm('registerUserRuleForm')">모두 지우기</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('user')
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
      this.registerUserRuleForm.nickname = newValue
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
        if (this.registerUserRuleForm.checkPassword !== '') {
          this.$refs.registerUserRuleForm.validateField('checkPassword')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('한번 더 비밀번호를 입력해주세요.'))
      } else if (value !== this.registerUserRuleForm.password) {
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
      isLoading: false,
      registerUserRuleForm: {
        email: '',
        nickname: '',
        phone: '',
        password: '',
        checkPassword: '',
        agree: '',
        categoryList: []
      },
      registerUserRules: {
        email: [
          {
            required: true,
            message: '이메일을 입력해주세요.',
            trigger: 'blur'
          },
          {
            type: 'email',
            message: '이메일을 양식에 맞춰 입력해주세요.',
            trigger: ['blur', 'change']
          }
        ],
        nickname: [
          {
            validator: validateNickname,
            message: '형식에 맞지 않습니다.',
            trigger: ['blur']
          },
          {
            min: 2,
            max: 20,
            message: '2~20 사이 문자를 입력해주세요',
            trigger: ['blur']
          }
        ],
        phone: [
          {
            required: true,
            message: '핸드폰 번호를 입력해주세요.',
            trigger: 'blur'
          },
          {
            validator: validateMobileNumber,
            trigger: ['blur', 'change']
          }
        ],
        password: [
          {
            required: true,
            message: '비밀번호를 입력해주세요.',
            trigger: 'blur'
          },
          {
            min: 8,
            max: 20,
            trigger: 'blur',
            message: '8~20자로 비밀번호를 입력해주세요.'
          },
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPassword: [
          {
            required: true,
            message: '비밀번호를 입력해주세요.',
            trigger: 'blur'
          },
          { validator: validatePass2, trigger: 'blur' }
        ],
        agree: [
          // {
          //   required: true,
          //   message: '동의를 해주세요.',
          //   trigger: 'blur'
          // },
          {
            validator: validateAgree,
            trigger: 'change'
          }
        ],
        categoryList: [
          {
            required: true,
            message: '반려동물을 선택해주세요.',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    ...mapActions(['registerUser']),
    submitForm(formName) {
      this.isLoading = true
      const {
        email,
        nickname,
        password,
        phone: phone_number,
        categoryList
      } = this.registerUserRuleForm

      const checkCategoryList = ['has_dog', 'has_cat']

      const newObj = checkCategoryList.reduce((acc, cur) => {
        categoryList.includes(cur) ? (acc[cur] = true) : (acc[cur] = false)
        return acc
      }, {})

      this.$refs[formName].validate(valid => {
        if (valid) {
          this.registerUser({
            email,
            nickname,
            password,
            phone_number,
            ...newObj
          }).then(result => {
            // 여기서 결과값을 받아서 다시 분기처리 성공, 실패
            if (result.status === 200 || result.status === 201) {
              this.$message({
                message: '회원가입이 완료되었습니다.!',
                duration: 1000,
                showClose: true,
                type: 'success',
                onClose: () => {
                  this.$router.replace('/user/welcome')
                }
              })
            } else {
              this.$message({
                message: `회원가입이 실패했습니다...! 다시 시도해주세요 ${result.data.message}`,
                duration: 3000,
                showClose: true,
                type: 'error'
              })
            }
          })
        } else {
          this.$message({
            dangerouslyUseHTMLString: true,
            message: `회원가입양식이 올바르지 않습니다. 다시 확인해주세요.`,
            duration: 3000,
            showClose: true,
            type: 'error'
          })
        }
        this.isLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.register-user {
  padding: 20px;
  max-width: 360px;
  margin: 0 auto;
  &__title {
    text-align: center;
  }
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
  &__submit {
    margin-top: 30px;
    & /deep/ .el-button {
      width: 100%;
      display: block;
      padding: 14px 20px;
      // color: #000000;
      font-size: 16px;
    }
  }
  &__category {
    & /deep/ .el-form-item__label {
      float: none;
      text-align: left;
      display: block;
    }
    & /deep/ .el-checkbox__label {
      display: block;
      padding-left: 0;
    }
    & /deep/ .el-checkbox__inner {
      width: 70px;
      height: 70px;
      border: 1px solid #cbcbcb;
      border-radius: 50%;
      background: url('~@/assets/images/icons/dog.png') center / 50px no-repeat;
    }
    &__cat {
      margin-left: 20px;
      & /deep/ .el-checkbox__inner {
        background: url('~@/assets/images/icons/cat.png') center / 50px
          no-repeat;
      }
    }
    & /deep/ .el-checkbox__input.is-checked .el-checkbox__inner {
      background-color: #8fb5ff;
      // border-color: #409EFF;
    }
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
