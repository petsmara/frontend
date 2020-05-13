<template>
  <div class="find-password">
    <h1 class="primary-title">
      비밀번호 찾기
    </h1>
    <main class="find-password__main">
      <h2 class="find-password__second-title">
        비밀번호를 분실하셨나요?
      </h2>
      <p class="find-password__paragraph">
        아이디를 입력해주세요.
      </p>

      <el-form
        :model="findPasswordRuleForm"
        :rules="findPasswordRules"
        ref="findPasswordRuleForm"
        class="find-password__form"
        status-icon
      >
        <el-form-item label="아이디" prop="email">
          <el-input
            type="email"
            placeholder="이메일을 입력해주세요."
            v-model="findPasswordRuleForm.email"
          ></el-input>
        </el-form-item>
        <el-form-item class="find-password__submit">
          <el-button
            :loading="isLoading"
            type="primary"
            @click="submitForm('findPasswordRuleForm')"
            >확인</el-button
          >
        </el-form-item>
      </el-form>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      findPasswordRuleForm: {
        email: ''
      },
      findPasswordRules: {
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
        ]
      }
    }
  },
  methods: {
    // ...mapActions(['findPassword']),
    submitForm(formName) {
      this.isLoading = true
      const { email } = this.findPasswordRuleForm

      this.$refs[formName].validate(valid => {
        if (valid) {
          this.findPassword({
            email
          }).then(result => {
            // 여기서 결과값을 받아서 다시 분기처리 성공, 실패
            if (result.status === 200) {
              this.$message({
                message: '이메일로 비밀번호 찾기 링크를 보냈습니다.',
                duration: 1000,
                showClose: true,
                type: 'success',
                onClose: () => {
                  // this.$router.replace('/user/welcome')
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
          })
        } else {
          this.$message({
            dangerouslyUseHTMLString: true,
            message: `이메일 양식이 올바르지 않습니다. 다시 확인해주세요.`,
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
.find-password {
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
  &__paragraph {
    margin-top: 6px;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    color: #000000;
  }
  &__form {
    color: red;
    & /deep/ .el-form-item__label {
      margin: 9px 0;
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
