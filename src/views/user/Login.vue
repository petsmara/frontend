<template>
  <div class="login">
    <h2 class="register__title">
      로그인
    </h2>
    <el-form
      :model="logInRuleForm"
      :rules="logInRules"
      ref="logInRuleForm"
      class="login__form"
      status-icon
    >
      <el-form-item label="이메일" prop="email">
        <el-input type="email" v-model="logInRuleForm.email"></el-input>
      </el-form-item>
      <el-form-item label="비밀번호" prop="password">
        <el-input
          type="password"
          v-model="logInRuleForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          :loading="isLoading"
          type="primary"
          @click="submitForm('logInRuleForm')"
          >로그인</el-button
        >
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
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('비밀번호를 입력해주세요.'))
      } else {
        console.log('로그인 보내기 성공')
        callback()
      }
    }
    return {
      isLoading: false,
      logInRuleForm: {
        email: '',
        password: ''
      },
      logInRules: {
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
        password: [
          {
            required: true,
            message: '비밀번호를 입력해주세요.',
            trigger: 'blur'
          },
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapActions(['logIn']),
    submitForm(formName) {
      this.isLoading = true
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.logIn({
            ...this.logInRuleForm
          }).then(result => {
            if (result.status === 200) {
              this.$message({
                message: '로그인이 완료되었습니다.!',
                duration: 3000,
                showClose: true,
                type: 'success',
                onClose: () => {
                  alert(
                    '다음 경로는 어디로? 리다이렉트? 리플레이스로 방금전 URL로 가게하기'
                  )
                }
              })
            } else {
              this.$message({
                message: `로그인이 실패했습니다..! 다시 시도해주세요. ${result}`,
                duration: 3000,
                showClose: true,
                type: 'error'
              })
            }
          })
        } else {
          this.$message({
            dangerouslyUseHTMLString: true,
            message: `로그인양식이 올바르지 않습니다. 다시 확인해주세요.`,
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
.login {
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
