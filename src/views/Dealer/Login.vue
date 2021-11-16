<template>
    <div class="wrapper">
        <div class="container">
            <img src="@/assets/dealer/img/svg/login/logo.png" alt="">
            <input 
         v-validate="'required|min:3'"
        data-vv-validate-on="blur"
        name="username"
        icon-no-border
        icon="icon icon-user"
        icon-pack="feather"
        label-placeholder="Username"
        v-model="username"
            class="custom-input" 
            type="text">
            <span class="text-danger text-sm flex justify-content-flex-end mt-2 ml-2">{{ errors.first('username') }} </span>
          <input      
          @keypress.enter="loginJWT"   
          data-vv-validate-on="blur"
        v-validate="'required|min:6|max:10'"
        type="password"
        name="password"
        icon-no-border
        icon="icon icon-lock"
        icon-pack="feather"
        label-placeholder="Password"
        v-model="password"
        class="custom-input"  />
        <span class="text-danger flex justify-content-flex-end text-sm mt-2 ml-2">
          {{ errors.first('password') }}
        </span>
            <vs-button 
            @click="loginJWT" 
            class="submit-btn"
            >Войти</vs-button>
            <div class="row">
                <button>Забыли пароль?</button>

            </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      username: 'admin@admin.com',
      password: 'adminadmin',
      checkbox_remember_me: false,
      progress: 0
    }
  },
  computed: {
    validateForm () {
      return !this.errors.any() && this.email !== '' && this.password !== ''
    }
  },
  methods: {
       loginJWT () {
         const loading = this.$vs.loading({
            progress: 0
          })
          const interval = setInterval(() => {
            if (this.progress <= 100) {
              loading.changeProgress(this.progress++)
            }
          }, 40)
          setTimeout(() => {
            loading.close()
            clearInterval(interval)
            this.progress = 0
          }, 4100)

      const payload = {
        checkbox_remember_me: this.checkbox_remember_me,
        userDetails: {
          username: this.username,
          password: this.password
        }
      }

      this.$store.dispatch('auth/loginJWT', payload)
        .then(() => { this.$vs.loading.close() })
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
    },
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
         width: 280.74px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        img{
            margin: 15px;
        }
        input.custom-input{
            font-family: 'Montserrat' sans-serif;
            width: 100%;
            height: 40px;
            margin: 13px;
            color: #FFFFFF;
            background: none;
            border: 1.37581px solid #FFFFFF;
            box-sizing: border-box;
            border-radius: 5.50326px;
            padding-left: 40px;
            &::placeholder{
                font-style: normal;
                font-weight: bold;
                font-size: 19.2614px;
                line-height: 28px;
                color: #FFFFFF;
            }
            &:nth-child(2){
                background-image: url("../../assets/dealer/img/icons/user.svg");
                background-repeat: no-repeat;
                background-position: 5%;
                background-size: 7%;
            }
             &:nth-child(3){
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
            height: 40px;
            background: #FFFFFF !important;
            box-shadow: 0px 5.50326px 5.50326px rgba(0, 0, 0, 0.3);
            border-radius: 5.50326px;
            font-style: normal;
            font-weight: bold;
            font-size: 15.013px;
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
             button{
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
