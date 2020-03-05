<template>
  <div class="signin">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="120px"
      class="demo-ruleForm"
      status-icon
    >
      <el-form-item label="이메일" prop="email">
        <el-input type="email" v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item label="비밀번호" prop="password">
        <el-input
          type="password"
          v-model="ruleForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
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
        console.log('로그인 보내기')
        callback()
      }
    }
    return {
      ruleForm: {
        email: '',
        password: ''
      },
      rules: {
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
    ...mapActions(['signinUser']),
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('회원가입이 완료되었습니다.!')
          this.signinUser({
            ...this.ruleForm,
            id: Math.floor(Math.random() * 100000) // dummy json-server 때문에
          })
        } else {
          console.log('회원가입이 실패하였습니다.!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.signin {
  padding: 20px;
}
</style>
