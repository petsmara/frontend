<template>
  <div class="login">
    <div class="login__bg">
      <img
        src="@/assets/images/backgrounds/login_bg.png"
        alt="로그인 배경이미지"
      />
    </div>
    <div class="login__content">
      <LogoCard />
      <h2 class="login__title">
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
          <el-input
            placeholder="ID"
            type="email"
            v-model="logInRuleForm.email"
          ></el-input>
        </el-form-item>
        <el-form-item label="비밀번호" prop="password">
          <el-input
            placeholder="PASSWORD"
            type="password"
            v-model="logInRuleForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            class="login__btn"
            :loading="isLoading"
            type="primary"
            @click="submitForm('logInRuleForm')"
            >로그인</el-button
          >
        </el-form-item>
      </el-form>
      <router-link to="/user/register"
        >회원이 아니신가요? 회원가입 하러 가기</router-link
      >
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('user')
const { mapState } = createNamespacedHelpers('path')
import { LogoCard } from '@/components/Cards'

export default {
  components: {
    LogoCard
  },
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('비밀번호를 입력해주세요.'))
      } else {
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
  computed: {
    ...mapState(['redirectPath'])
  },
  methods: {
    ...mapActions(['logIn']),
    async submitForm(formName) {
      await this.$refs[formName].validate(valid => {
        if (valid) {
          this.isLoading = true
          this.logIn({
            ...this.logInRuleForm
          }).then(result => {
            if (result && result.status === 200) {
              this.isLoading = false
              this.$message({
                message: '로그인이 완료되었습니다.!',
                duration: 1000,
                showClose: true,
                type: 'success',
                onClose: () => {
                  this.$router.replace(this.redirectPath)
                }
              })
            } else {
              this.isLoading = false
              this.$message({
                message: `로그인이 실패했습니다..! 다시 시도해주세요. ${result.data.message}`,
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
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  &__bg {
    @include respond-to('tablet-portrait-only') {
      display: none;
    }
    max-width: 650px;
    img {
      width: 100%;
    }
  }
  &__content {
    padding: 20px;
    min-width: 576px;
    flex: 1;
    @include respond-to('tablet-portrait-only') {
      min-width: auto;
      max-width: 480px;
      margin: 0 auto;
      width: 100%;
    }
  }

  &__title {
    text-align: center;
  }
  &__form {
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
  &__btn {
    font-size: 16px;
    padding: 16px;
    width: 100%;
    display: block;
    margin-top: 20px;
  }
}
</style>
