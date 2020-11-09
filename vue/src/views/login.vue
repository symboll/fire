<template>
  <div class="login">
    <Card class="login_card">
      <p slot="title">Admin System Login</p>
      <Form ref="form" :model="formData" :rules="rules" >
        <FormItem prop="username">
          <i-input type="text" v-model="formData.username" placeholder="Username">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </i-input>
        </FormItem>
        <FormItem prop="password">
          <i-input type="password" v-model="formData.password" placeholder="Password">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </i-input>
        </FormItem>
        <FormItem>
          <Button type="primary" style="width:100%" @click="handleSubmit">登录</Button>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      formData: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: 'Please fill in the user name', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Please fill in the password.', trigger: 'blur' },
          { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapActions([
      'loginAction'
    ]),
    handleSubmit () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loginAction(this.formData).then(() => {
            this.$router.push({ name: 'home' })
          }).catch(err => {
            this.$Message.error(`Fail!: ${err.message}`)
          })
        } else {
          this.$Message.error('Fail!')
        }
      })
    }
  }
}

</script>
<style lang="less" scoped>
.login{
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background: url(../assets/image/login-bg.png) no-repeat;
  &_card {
    width: 300px;
    margin-right: 160px;
    p {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
