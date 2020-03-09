<template>
  <div class="register">
    <h2 class="register__title">
      회원가입
    </h2>
    <el-form
      :model="registerRuleForm"
      :rules="registerRules"
      ref="registerRuleForm"
      class="register__form"
      status-icon
    >
      <el-form-item label="이메일" prop="email">
        <el-input type="email" v-model="registerRuleForm.email"></el-input>
      </el-form-item>
      <el-form-item label="닉네임" prop="nickname">
        <el-input v-model="registerRuleForm.nickname"></el-input>
      </el-form-item>
      <el-form-item label="핸드폰번호" prop="phone">
        <el-input v-model="registerRuleForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="비밀번호" prop="password">
        <el-input
          type="password"
          v-model="registerRuleForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item label="비밀번호 확인" prop="checkPassword">
        <el-input
          type="password"
          v-model="registerRuleForm.checkPassword"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item prop="agree" class="register__agree">
        <el-checkbox
          label="만 14세 이상만 가입이 가능합니다."
          v-model="registerRuleForm.agree"
        ></el-checkbox>
      </el-form-item>

      <el-form-item class="register__submit">
        <el-button
          :loading="isLoading"
          type="primary"
          @click="submitForm('registerRuleForm')"
          >가입하기</el-button
        >
        <!-- <el-button @click="resetForm('registerRuleForm')">모두 지우기</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('user')

export default {
  data() {
    const validateNickname = (rule, value, callback) => {
      const checkNickname = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]/
      const newValue = value.replace(/\s/gi, '')
      this.nickname = newValue
      this.registerRuleForm.nickname = newValue
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
        if (this.registerRuleForm.checkPassword !== '') {
          this.$refs.registerRuleForm.validateField('checkPassword')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('한번 더 비밀번호를 입력해주세요.'))
      } else if (value !== this.registerRuleForm.password) {
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
      registerRuleForm: {
        email: '',
        nickname: '',
        phone: '',
        password: '',
        checkPassword: '',
        agree: ''
      },
      registerRules: {
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
        ]
      }
    }
  },
  mounted() {},
  methods: {
    ...mapActions(['registerUser']),
    submitForm(formName) {
      this.isLoading = true
      const {
        email,
        nickname,
        password,
        phone: phone_number
      } = this.registerRuleForm
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.registerUser({
            email,
            nickname,
            password,
            phone_number
          })
          // 여기서 결과값을 받아서 다시 분기처리 성공, 실패
          this.$message({
            message: '회원가입이 완료되었습니다.!',
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
.register {
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
