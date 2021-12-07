<template>
    <div class="wrapper">
        <div class="container">
            <img style="margin-bottom: 40px" src="@/assets/dealer/img/svg/login/logo.png" alt="">
            <h2 class="text" >Сброс пароля</h2>
            <input 
         v-validate="'required|min:3'"
        data-vv-validate-on="blur"
        name="username"
        icon-no-border
        icon="icon icon-user"
        icon-pack="feather"
        placeholder="Email"
        v-model="email"
            class="custom-input1" 
            type="text">
            <!-- <span class="text-danger text-sm flex justify-content-flex-end mt-2 ml-2">{{ errors.first('username') }} </span> -->
          <input      
          @keypress.enter="loginJWT"   
          data-vv-validate-on="blur"
        v-validate="'required|min:6|max:10'"
        type="password"
        name="password"
        placeholder="Введите полученный код"
        v-model="code"
        class="custom-input2"  />
        <!-- <span class="text-danger flex justify-content-flex-end text-sm mt-2 ml-2">
          {{ errors.first('password') }}
        </span> -->
                    <input 
         v-validate="'required|min:3'"
        data-vv-validate-on="blur"
        name="username"
        icon-no-border
        icon="icon icon-user"
        icon-pack="feather"
        placeholder="Новый пароль"
        v-model="password"
            class="custom-input3" 
            type="text">
            <!-- <span class="text-danger text-sm flex justify-content-flex-end mt-2 ml-2">{{ errors.first('username') }} </span> -->
          <input      
          @keypress.enter="loginJWT"   
          data-vv-validate-on="blur"
        v-validate="'required|min:6|max:10'"
        type="password"
        name="password"
        icon-no-border
        icon="icon icon-lock"
        icon-pack="feather"
        placeholder="подтвердите пароль"
        v-model="confirm_password"
        class="custom-input4"  />
        <!-- <span class="text-danger flex justify-content-flex-end text-sm mt-2 ml-2">
          {{ errors.first('password') }}
        </span> -->
            <vs-button 
            @click="loginJWT" 
            class="submit-btn"
            >Войти</vs-button>
                        <!-- <div class="row">
                <router-link :to="'/login'" >Login</router-link>

            </div> -->
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      code: '',
      confirm_password: '',
      checkbox_remember_me: false,
      progress: 0
    }
  },
  computed: {
    validateForm() {
      return !this.errors.any() && this.username !== '' && this.password !== ''
    }
  },
  methods: {
    loginJWT () {
      if(this.validateForm){
      // Loading
      this.$vs.loading()
      const payload = {
        checkbox_remember_me: this.checkbox_remember_me,
        userDetails: {
          username: this.username,
          password: this.password
        }
      }
      this.$store.dispatch('auth/loginJWT', payload)
        .then(() => {
          this.$acl.change(localStorage.getItem('UserInfo'))
          this.$vs.loading.close()
        if(localStorage.getItem('UserInfo') == 'dealer'){
          this.$router.push('/')
        }
        else if(localStorage.getItem('UserInfo') == 'super_admin'){
          this.$router.push('/attechments')
        }
        else if(localStorage.getItem('UserInfo') == 'admin'){
          this.$router.push('/user')
        }
        })
        .catch(error => {
          this.$vs.loading.close()
          this.$vs.notify({
            title: 'Error',
            text: error.message,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger'
          })
        })
    }
    }
  }
}
</script>
<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&family=Poppins:wght@100;200;400;500;600;700;800;900&display=swap');
div.wrapper{
    width: 100%;
    height: 100vh;
    margin: 0;
    padding: 0;
    background-image: url("../../assets/dealer/img/svg/login/login-background.svg"), linear-gradient(99.52deg, #3F4F61 -14.96%, #3A9FD1 156.83%) ;
    display: flex;
    justify-content: center;
    align-items: center;
    background-repeat:  no-repeat;
    background-size: cover;
    div.container{
         width: 412px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        img{
            margin: 15px;
        }
        .text{
          font-family: Montserrat;
font-style: normal;
font-weight: bold;
font-size: 25px;
line-height: 30px;
text-align: center;
margin-bottom: 30px !important;
color: #FFFFFF;
        }
        input.custom-input1{
            font-family: 'Montserrat' sans-serif;
            width: 100%;
            height: 61px;
            margin: 13px;
            padding-top: 6px;
            color: #FFFFFF;
            background: none;
            border: 1.37581px solid #FFFFFF;
            box-sizing: border-box;
            border-radius: 5.50326px;
            padding-left: 60px;
            &::placeholder{
                font-style: normal;
                font-weight: bold;
                font-size: 19.2614px;
                line-height: 27px;
                color: #FFFFFF;
            }
            &:nth-child(3){
                background-image: url("../../assets/dealer/img/icons/email.svg");
                background-repeat: no-repeat;
                background-position: 5%;
                background-size: 7%;
            }        }
                input.custom-input2{
            font-family: 'Montserrat' sans-serif;
            width: 100%;
            height: 61px;
            margin: 13px;
            padding-top: 6px;
            color: #FFFFFF;
            background: none;
            border: 1.37581px solid #FFFFFF;
            box-sizing: border-box;
            border-radius: 5.50326px;
            padding-left: 60px;
            &::placeholder{
                font-style: normal;
                font-weight: bold;
                font-size: 19.2614px;
                line-height: 27px;
                color: #FFFFFF;
            }
             &:nth-child(4){
                background-image: url("../../assets/dealer/img/icons/code.svg");
                background-repeat: no-repeat;
                background-position: 5%;
                 background-size: 7%;
            }
        }
          input.custom-input3{
            font-family: 'Montserrat' sans-serif;
            width: 100%;
            height: 61px;
            margin: 13px;
            padding-top: 6px;
            color: #FFFFFF;
            background: none;
            border: 1.37581px solid #FFFFFF;
            box-sizing: border-box;
            border-radius: 5.50326px;
            padding-left: 60px;
            &::placeholder{
                font-style: normal;
                font-weight: bold;
                font-size: 19.2614px;
                line-height: 27px;
                color: #FFFFFF;
            }
             &:nth-child(5){
                background-image: url("../../assets/dealer/img/icons/lock.svg");
                background-repeat: no-repeat;
                background-position: 5%;
                 background-size: 7%;
            }
        }
          input.custom-input4{
            font-family: 'Montserrat' sans-serif;
            width: 100%;
            height: 61px;
            margin: 13px;
            padding-top: 6px;
            color: #FFFFFF;
            background: none;
            border: 1.37581px solid #FFFFFF;
            box-sizing: border-box;
            border-radius: 5.50326px;
            padding-left: 60px;
            &::placeholder{
                font-style: normal;
                font-weight: bold;
                font-size: 19.2614px;
                line-height: 27px;
                color: #FFFFFF;
            }
             &:nth-child(6){
                background-image: url("../../assets/dealer/img/icons/lock.svg");
                background-repeat: no-repeat;
                background-position: 5%;
                 background-size: 7%;
            }
        }
        button.submit-btn{
            margin: 15px;
            width: 100%;
            border: none;
            outline: none;
            cursor: pointer;
            height: 57px;
            background: #FFFFFF !important;
            box-shadow: 0px 5.50326px 5.50326px rgba(0, 0, 0, 0.3);
            border-radius: 5.50326px;
            font-style: normal;
            font-weight: bold;
            font-size: 22px;
            line-height: 18px;
            text-align: center;
            text-transform: uppercase;
            color: #3A9FD1;
        }
        .row{
             width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
             a{
                border: none;
                cursor: pointer;
                background: none;
                font-style: normal;
                font-weight: 500;
                font-size: 13.013px;
                line-height: 17px;
                text-align: center;
                color: #FFFFFF;
            }
        }
    }
}
</style>
