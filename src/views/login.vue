<template>
  <Form ref="form" :model="formData" :rules="rules" inline>
    <FormItem prop="user">
      <Input type="text" v-model="formData.username" placeholder="Username">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" v-model="formData.password" placeholder="Password">
        <Icon type="ios-lock-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="handleSubmit">登录</Button>
    </FormItem>
  </Form>
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
<style scoped>
</style>
