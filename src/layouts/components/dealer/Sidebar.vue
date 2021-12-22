<template>
  <div
  class="side-bar-container">
    <div class="lang" @click="langUp('uz')" v-if="$i18n.locale === 'ru'" >
      <img src="@/assets/dealer/img/icons/uz.svg" alt="" />
    Перейти на  {{ $t('lang.uz') }}
    </div>
    <div class="lang" style="width: 140px" @click="langUp('ru')" v-else >
          <img src="@/assets/dealer/img/icons/ru.svg" alt="" />
          {{ $t('lang.ru') }}ga o'tish
      </div>
    <img class="logo" src="@/assets/dealer/img/svg/login/logo.png" alt="" />
    <div class="block">
      <div class="col" style="margin-left: 0px">
             <feather-icon @click="toggleDataSidebar(true)" class="user" svgClasses="cursor-pointer text-danger w-6 h-6" :badge="notisfy.length">
          </feather-icon>
        <div class="id" style="text-align: center" >ID: {{ info.id }}</div>
      </div>
      <div class="col display-none">
        <p class="name">{{ info.full_name }}</p>
        <p class="email">{{ info.phone_number }}</p>
        <p class="email">{{ info.email }}</p>
      </div>
      <!-- <div class="col">
<svg width="13" class="burced" height="18" viewBox="0 0 13 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M-3.93402e-07 8.875L12.9053 0.322997L12.9053 17.427L-3.93402e-07 8.875Z" fill="white"/>
</svg>

        <div class="notify">

        </div>
      </div> -->
    </div>
          <div class="log">
          <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer w-full">
            <div class="logout">
              <h2>
                Выйти из профиля
              </h2>
            </div>
          <vs-dropdown-menu >
            <vs-dropdown-item style="width: 200px;" >
              <h4 style="font-weight: 500; font-size: 12px; line-height: 29px; text-align: center" >
              Profildan chiqasmi?
              </h4>
              <div class="com flex mt-1 mb-1 justify-center">
                <button class="ok" @click="LogOut()" >
                  Ha
                </button>
                <button class="no ml-3" >
                    Yo'q
                </button>
              </div>
            </vs-dropdown-item>
          </vs-dropdown-menu>
        </vs-dropdown>
          </div>
       <div class="link">
             <router-link
      class="route"
      :to="'/dealer/main'"
    >
      {{ $t('cart.title') }}
    </router-link>
    <router-link
      class="route"
      :to="'/dealer/journal'"
    >
      {{ $t('journal.title') }}
    </router-link>
    <router-link
      class="route"
      :to="'/dealer/templates'"
    >
      {{ $t('templates.title') }}
    </router-link>
      <router-link
      class="route"
      :to="'/dealer/settings'"
    >
      {{ $t('profile.title') }}
    </router-link>
                 <router-link
      class="route"
      :to="'/dealer/settings'"
    >
      WHS остатки
    </router-link>
       </div>
    <div
      class="flex"
      style="align-items: flex-end; margin-bottom: 5px; align-items: center;"
    >
      <feather-icon
        style="color: #cfcfcf; border-radius: 2px"
        icon="InfoIcon"
        class="cursor-pointer mt-1 sm:mr-2 mr-2"
      />
      <span class="end">
       {{ $t('xato') }} - <a style="color: #cfcfcf !important;" href="tel:71 000 00 00">71 000 00 00</a>
      </span>
    </div>
    <Notisfications       :isPopUpNotis="PopUpNotis" @closeSidebarNotis="toggleDataSidebar" />
  </div>
</template>

<script>
import FeatherIcon from '../../../components/FeatherIcon.vue'
import Notisfications from '@/components/dealers/Notisfications.vue'
export default {
  components: { FeatherIcon, Notisfications },
  props: {
    to: { type: [String, Object, null], default: null }
  },
  data () {
    return {
      PopUpNotis: false,
      settings: {
        maxScrollbarLength: 5
      }
    }
  },
  computed: {
    info () {
      return  this.$store.state.auth.info
    },
    notisfy(){
      return this.$store.state.addUser.notisfy
    },
    activeLink () {
      return !!(this.to === this.$route.path && this.to)
    }
  },
  methods: {
    LogOut () {
      localStorage.removeItem('access')
      localStorage.removeItem('UserInfo')
      this.$acl.change('editor')
      console.log('okkk')
      this.$router.push('/login')
      window.location.reload()
    },
    toggleDataSidebar(val = false){
      this.PopUpNotis = val
    },
      langUp(loc){
    this.$i18n.locale = loc
    console.log(loc, 'mana')
    localStorage.setItem("lang", loc);
    const payload = {
      role: "dealer",
      user_lang: loc,
        site_notifications: this.info.site_notifications,
        email_notifications: this.info.email_notifications,
        password: '',
        id: localStorage.getItem("Id"),
        username: this.info.username,
        full_name: this.info.full_name,
        email: this.info.email,
        savdo_id: this.info.savdo_id,
        phone_number: this.info.phone_number,
    }
    this.$store.dispatch("auth/updateItem", payload)
    console.log(this.$i18n.locale, 'boldi3')
  }
  },
  created () {
    this.$store.dispatch('auth/DealerInfo')
    this.$store.dispatch('addUser/NotisfyGet')
    console.log(this.$i18n.locale, 'boldi')
  },
  mounted(){
    console.log(this.notisfy)
    console.log(this.$i18n.locale, 'boldi2')
  },
}
</script>
<style scoped>
  a.active{
    color: #ffffff !important;
    opacity: 3 !important;
  }
  .ok{
    width: 57.29px;
background: linear-gradient(99.52deg, #3F4F61 -14.96%, #3A9FD1 156.83%);
border-radius: 1,68px;
font-family: Lato;
font-style: normal;
font-weight: bold;
font-size: 9px;
padding: 3px 0px;
border: none;
text-align: center;
color: #FFFFFF;
cursor: pointer;
  }
    .no{
      cursor: pointer;
    width: 57.29px;
background: #F2F2F2;
border-radius: 1.74193px;
font-family: Lato;
font-style: normal;
font-weight: bold;
font-size: 9px;
border: none;
padding: 3px 0px;
text-align: center;
color: #000000;
  }
  .notify{
    position: absolute;
width: 208.4px;
height: 79px;
background: #FFFFFF;
z-index: 111;
border-radius: 6.21277px;
  }
  .burced{
    width: 19.75px;
height: 17.21px;
left: 108px;
top: 272.75px;

background: #FFFFFF;
transform: rotate(-90deg);
  }
</style>
<style lang="scss" scoped>
div.side-bar-container {
  width: 15% !important;
  height: 100%;
  margin: 0px 20px;
  display: flex;
  flex-direction: column;
  .link{
    display: flex;
    flex-direction: column;
    overflow: auto;
    height: 100%;
  }
  .end {
    font-family: Montserrat;
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    line-height: 14px;
    /* or 175% */
    // display: flex;
    align-items: center;
    color: #cfcfcf !important;
  }
  .lang {
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: start;
    width: 165px;
    height: 57px;
    padding: 5px;
    margin-top: 25px;
    // margin-left: 35px;
    background: linear-gradient(81.75deg, #3c4a5a 99.96%, #3a9fd1 183.61%);
    border-radius: 8px;
    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    font-size: 10px;
    line-height: 14px;
    display: flex;
    align-items: center;
    text-align: center;
    cursor: pointer;
    color: #ffffff;
  }
  .logo {
    width: 170px;
    margin: 50px 0px 15px 0px;
    z-index: 999;
  }
  .block {
    margin: 20px 0px;
    // margin-bottom: 50px;
    display: flex !important;
    flex-direction: row;
    .user {
      cursor: pointer;
      background-image: url("https://eros.mingle2.com/main/resources/assets/no_photo_male-69f72765b4837e51717fb0a56e2aaa3c.png");
      width: 49px;
      height: 49px;
      background-position: center;
      background-color: white;
      background-size: contain;
      border-radius: 8.84722px;
      position: relative;
    }
    
  }
 .log{
   margin-bottom: 50px;
   width: 221px;
   z-index: 999;
         .logout {
// height: 25px;
width: 100%;
background: linear-gradient(81.75deg, #3C4A5A 99.96%, #3A9FD1 183.61%);
border-radius: 8px;
display: flex;
justify-content: center;
align-items: center;
padding: 6px;
h2{
  font-family: Montserrat;
font-style: normal;
font-weight: normal;
font-size: 10px;
line-height: 14px;
/* identical to box height, or 140% */

display: flex;
align-items: center;
text-align: center;

color: #FFFFFF;
}
    }
 }
  .col {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    .name {
font-family: Poppins;
font-style: normal;
font-weight: 600;
font-size: 21.4008px;
line-height: 30px;
/* identical to box height, or 140% */


color: #FFFFFF;
    }
    .email {
      font-family: Poppins;
      font-style: normal;
      font-weight: 400 !important;
      font-size: 12px;
      line-height: 23px;
      /* identical to box height, or 225% */

      color: #ffffff;

      mix-blend-mode: normal;
      opacity: 0.6;
    }
    .id {
      margin-top: 5px;
      font-family: Poppins;
      font-style: normal;
      font-weight: 600;
      font-size: 10px;
      padding: 0px 5px;
      line-height: 17px;
      /* identical to box height, or 200% */

      color: #ffffff;
      border: 0.493401px solid #ffffff;
      box-sizing: border-box;
      border-radius: 2.09756px;
    }
  }
}
  .link::-webkit-scrollbar {
  width: 3px;
  // margin-right: 6px;
}
.link::-webkit-scrollbar-thumb {
  background: white;
  border-radius: 7px;
}
 .link::-webkit-scrollbar-track {
//  background: linear-gradient(90deg, #5E585C 0%, #000000 100%);
border-radius: 0px 0px 7.41868px 7.41868px;
  }
.route {
  margin: 14px 0px;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: #ffffff;
  mix-blend-mode: normal;
  opacity: 0.5;
  text-align: start;
  &:hover {
    opacity: 1;
  }
}
</style>