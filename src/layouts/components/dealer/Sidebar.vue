<template>
  <div class="side-bar-container">
    <div class="lang">
      <img src="@/assets/dealer/img/icons/uz.svg" alt="" />
      Узбек тилига утиш
    </div>
    <!-- <div class="lang">
          <img src="@/assets/dealer/img/icons/ru.svg" alt="" />
          Перейти на русский язык
      </div> -->
    <img class="logo" src="@/assets/dealer/img/svg/login/logo.png" alt="" />
    <div class="block">
      <div class="col" style="margin-left: 0px">
        <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
          <div class="user">
            <div class="logout">
              <feather-icon
                style="color: #cfcfcf; border-radius: 2px"
                icon="LogOutIcon"
                svgClasses="h-10 w-10"
                class="cursor-pointer text-white mt-2 ml-2"
              />
            </div>
          </div>
          <vs-dropdown-menu>
            <vs-dropdown-item style="width: 140px;" >
              <h4
                style="
                  font-family: Poppins;
                  font-weight: 600;
                  font-size: 11px;
                  color: #000000;
                "
              >
              Profildan chiqasmi?
              </h4>
              <div class="com flex mt-4 mb-1">
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
        <div class="id">ID: 4333</div>
      </div>
      <div class="col">
        <p class="name">Ойбек T.</p>
        <p class="email">(90) 008-08-08</p>
        <p class="email">oybek.tursunov@akfagroup.com</p>
      </div>
    </div>
    <router-link
      v-for="(routes, i) in route"
      :key="i"
      class="route"
      :to="routes.to"
    >
      {{ routes.title }}
    </router-link>
    <div
      class="flex"
      style="height: 100%; align-items: flex-end; margin-bottom: 25px"
    >
      <feather-icon
        style="color: #cfcfcf; border-radius: 2px"
        icon="InfoIcon"
        class="cursor-pointer mt-1 sm:mr-6 mr-2"
      />
      <span class="end">
        Xatolar bo'lsa, qo'ng'iroq markaziga murojaat qiling - 71 000 00 00
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    to: { type: [String, Object, null], default: null },
  },
  data() {
    return {
      route: [
        { to: "/dealer/main", title: "Создать заказ" },
        { to: "/dealer/journal", title: "Журнал" },
        { to: "/dealer/templates", title: "Шаблоны" },
        { to: "/dealer/settings", title: "Настройки" },
        { to: "/dealer/settings", title: "WHS остатки" },
      ],
    };
  },
  computed: {
    activeLink() {
      return !!(this.to === this.$route.path && this.to);
    },
  },
  methods: {
    LogOut(){
      localStorage.removeItem('access')
      localStorage.removeItem('UserInfo')
      this.$acl.change('editor')
      console.log('okkk')
      this.$router.push('/login')
    }
  }
};
</script>
<style scoped>
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
</style>
<style lang="scss" scoped>
div.side-bar-container {
  width: 20% !important;
  height: 100%;
  margin: 0px 20px;
  display: flex;
  flex-direction: column;
  .end {
    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    font-size: 10px;
    line-height: 14px;
    /* or 175% */

    display: flex;
    align-items: center;

    color: #cfcfcf;
  }
  .lang {
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    width: 170px;
    height: 57px;
    padding: 5px;
    margin-top: 15px;
    margin-left: 35px;
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
    width: 220px;
    margin: 50px 0px 20px 0px;
  }
  .block {
    margin: 20px 0px;
    margin-bottom: 60px;
    display: flex !important;
    flex-direction: row;
    .vs-con-dropdown {
      cursor: pointer;
      background-image: url("https://guaranteedremovals.com/wp-content/uploads/2020/05/business-man-quote-1024x1024.png");
      width: 49px;
      height: 49px;
      background-position: center;
      background-color: white;
      background-size: contain;
      border-radius: 8.84722px;
      position: relative;
    }
    .logout {
      display: none;
      height: 100%;
    }
    
  }
  .vs-con-dropdown:hover .logout {
    cursor: pointer;
    display: block;
  }
  .vs-con-dropdown:hover {
    cursor: pointer;
    display: block;
    background-color: #3c4a5a;
    opacity: 0.8;
  }
  .col {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    .name {
      font-family: "Poppins", sans-serif;
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
      line-height: 30px;
      color: #ffffff;
    }
    .email {
      font-family: Poppins;
      font-style: normal;
      font-weight: normal;
      font-size: 11px;
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
.route {
  margin: 15px 0px;
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