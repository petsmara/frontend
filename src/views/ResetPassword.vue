<template>
  <div class="reset-password">
    <h1 class="primary-title">
      비밀번호 재설정
    </h1>
    <main class="reset-password__main">
      <h2 class="reset-password__second-title">
        새로운 비밀번호를 설정해주세요.
      </h2>
      <el-form
        :model="resetPasswordRuleForm"
        :rules="resetPasswordRules"
        ref="resetPasswordRuleForm"
        class="reset-password__form"
        status-icon
      >
        <el-form-item label="새로운 비밀번호" prop="password">
          <el-input
            type="password"
            placeholder="8~20자 이내의 영문과 숫자의 조합해주세요."
            v-model="resetPasswordRuleForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="비밀번호 확인" prop="checkPassword">
          <el-input
            type="password"
            placeholder="비밀번호 확인을 입력해주세요."
            v-model="resetPasswordRuleForm.checkPassword"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item class="reset-password__submit">
          <el-button
            :loading="isLoading"
            type="primary"
            @click="submitForm('resetPasswordRuleForm')"
            >확인</el-button
          >
        </el-form-item>
      </el-form>
    </main>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('user')
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('비밀번호를 입력해주세요.'))
      } else {
        if (this.resetPasswordRuleForm.checkPassword !== '') {
          this.$refs.resetPasswordRuleForm.validateField('checkPassword')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('한번 더 비밀번호를 입력해주세요.'))
      } else if (value !== this.resetPasswordRuleForm.password) {
        callback(new Error('비밀번호가 일치하지 않습니다.'))
      } else {
        callback()
      }
    }
    return {
      isLoading: false,
      resetPasswordRuleForm: {
        password: '',
        checkPassword: ''
      },
      resetPasswordRules: {
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
        ]
      }
    }
  },
  methods: {
    ...mapActions(['resetPassword']),
    submitForm(formName) {
      this.isLoading = true
      const { password } = this.resetPasswordRuleForm

      this.$refs[formName].validate(valid => {
        if (valid) {
          const { uid, token } = this.$route.query
          this.resetPassword({
            password,
            uid,
            token
          }).then(result => {
            // 여기서 결과값을 받아서 다시 분기처리 성공, 실패
            if (result.status === 200 || result.status === 201) {
              this.$message({
                message: '비밀번호 변경이 완료되었습니다.',
                duration: 1000,
                showClose: true,
                type: 'success',
                onClose: () => {
                  this.$router.replace('/user/login')
                }
              })
            } else {
              this.$message({
                message: `에러가 발생했습니다. 다시 시도해주세요 ${result.data.message}`,
                duration: 3000,
                showClose: true,
                type: 'error'
              })
            }
            this.isLoading = false
          })
        } else {
          this.$message({
            dangerouslyUseHTMLString: true,
            message: `비밀번호 양식이 올바르지 않습니다. 다시 확인해주세요.`,
            duration: 3000,
            showClose: true,
            type: 'error'
          })
          this.isLoading = false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.reset-password {
  &__main {
    max-width: 640px;
    width: 100%;
    margin: 0 auto;
    text-align: left;
    padding: 12px 16px;
  }

  &__second-title {
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    color: #000000;
  }
  &__form {
    color: red;
    & /deep/ .el-form-item__label {
      margin: 24px 0 4px;
      font-style: normal;
      font-weight: bold;
      font-size: 14px;
      line-height: 16px;
      color: #000000;
    }
  }
  &__submit {
    margin-top: 28px;
    & /deep/ button {
      width: 100%;
      background: #e9e9e9;
      border-radius: 8px;
      font-family: Roboto;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 19px;
      color: #000000;
    }
  }
}
</style>
