<template>
    <div class="side-bar-container">
        <img class="logo" src="@/assets/dealer/img/svg/login/logo.png" alt="">
        <div class="block">
            <img src="@/assets/dealer/img/icons/no-image.jpg" alt="">
            <div class="col">
                <p class="name">Ойбек T.</p>
                <p class="email">oybek.tursunov@akfagroup.com</p>
            </div>
        </div>
        <router-link v-for="(routes, i) in route" :key="i" class="route"
            :to="routes.to"
        >
            {{ routes.title }}
        </router-link>   
         </div>
</template>

<script>
export default {
    props:{
        to : { type: [String, Object, null], default: null             },
    },
    data(){
      return{
          route: [
              {to: '/dealer/main', title: 'Создать заказ'},
              {to: '/dealer/journal', title: 'Журнал'},
              {to: '/dealer/templates', title: 'Шаблоны'},
              {to: '/dealer/settings', title: 'Настройки'},
              {to: '/v/login', title: 'Выйти из профиля'}
          ]
    }
    },
    computed:{
    activeLink () {
      return !!((this.to === this.$route.path) && this.to)
    }
    }
}
</script>

<style lang="scss" scoped>
    div.side-bar-container{
        width: 25%;
        height: 100%;
        margin: 0px 20px ;
        display: flex;
        flex-direction: column;
        .logo{
            width: 220px;
            margin: 20px 0px 20px 0px;
        }
        .block{
            margin: 20px 0px;
            display: flex !important;
            flex-direction: row;
            img{
                width: 49px;
                height: 49px;
                background: #FFFFFF;
                border-radius: 8.84722px;
                position: relative; 
            }
            .col{
                margin-left: 10px;
                display: flex;
                flex-direction: column;
                .name{
                    font-family: "Poppins", sans-serif;
                    font-style: normal;
                    font-weight: 600;
                    font-size: 20px;
                    line-height: 30px;
                    color: #FFFFFF;
                }
                .email{
                    font-family: "Poppins", sans-serif;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 12px;
                    line-height: 15px;
                    color: #FFFFFF;
                    mix-blend-mode: normal;
                    opacity: 0.6;
                }
            }
        }
        .route{
        margin: 15px 0px;
        font-style: normal;
        font-weight: 600;
        font-size: 17px;
        line-height: 24px;
        color: #FFFFFF;
        mix-blend-mode: normal;
        opacity: 0.5;
        text-align: start;
        &:hover{
            opacity: 1;
        }
    }
}
</style>