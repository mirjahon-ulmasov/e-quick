<template>
  <div class="flex mt-1">
    <div class="w-3/5">
      <h1 class="heading ml-6">Stats & Analytics</h1>
      <div class="flex mt-4">
        <div class="item mr-6">
          <div class="icon1">
            <div class="iconn">
              <svg
                width="20"
                height="23"
                viewBox="0 0 20 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.5 13C3.83333 10.1667 8.9 4 10.5 2L9.5 10L18 9L8.5 20.5L9.5 13.5L1.5 13Z"
                  stroke="white"
                />
              </svg>
            </div>
            <span class="data"> This Week </span>
            <div class="flex">
              <span class="value"> 3.45k </span>
              <svg
                style="width: 19px"
                class="inc"
                width="9"
                height="9"
                viewBox="0 0 9 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4.5 9V1M4.5 1L1 4.5M4.5 1L8.5 4.5" stroke="#27AE60" />
              </svg>
            </div>
            <span class="percentage"> + 6.4% </span>
          </div>
        </div>
        <div class="item mr-6">
          <div class="icon1" style="background: #51459e">
            <div class="iconn">
              <svg
                width="17"
                height="13"
                class="mt-2"
                viewBox="0 0 17 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.5 7C15.7 7.4 13.1667 10.1667 12 11.5L1 1M1 1V8.5M1 1H8.5"
                  stroke="white"
                />
              </svg>
            </div>
            <span class="data"> This Month </span>
            <div class="flex">
              <span class="value"> $12.9k </span>
              <svg
                class="inc"
                style="width: 33px"
                width="9"
                height="9"
                viewBox="0 0 9 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4.5 0V8M4.5 8L1 4.5M4.5 8L8.5 4.5" stroke="#E63956" />
              </svg>
            </div>
            <span class="percentage"> -3.1% </span>
          </div>
        </div>
        <div class="item">
          <div class="icon1" style="background: #f9896b">
            <div class="iconn">
              <feather-icon
                icon="ClockIcon"
                style="color: white"
                class="cursor-pointer"
              />
            </div>
            <span class="data"> Upcoming </span>
            <div class="flex">
              <span class="value"> $14.4k </span>
              <svg
                class="inc"
                style="width: 33px"
                width="9"
                height="9"
                viewBox="0 0 9 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4.5 0V8M4.5 8L1 4.5M4.5 8L8.5 4.5" stroke="#E63956" />
              </svg>
            </div>
            <span class="percentage"> + 10.3% </span>
          </div>
        </div>
      </div>
      <h1 style="margin-top: 50px" class="heading">Stats & Analytics</h1>
      <div class="flex" style="flex-wrap: wrap">
        <div class="stat">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M15.59 0H17C17.5523 0 18 0.447715 18 1V3.5C18 3.77614 17.7761 4 17.5 4H15.63C15.4864 4.01056 15.3548 4.08369 15.27 4.2H15.22C15.0793 4.34052 15.0002 4.53115 15 4.73V6.49C15 6.76614 14.7761 6.99 14.5 6.99H12.72C12.5212 6.99017 12.3305 7.06931 12.19 7.21L11.93 7.47C11.7893 7.61052 11.7102 7.80115 11.71 8V8.72C11.7089 8.98234 11.6047 9.23374 11.42 9.42L10.54 10.3C10.8418 10.9943 10.9983 11.743 11 12.5C11 15.5376 8.53757 18 5.5 18C2.46243 18 0 15.5376 0 12.5C0 9.46243 2.46243 7 5.5 7C6.26157 6.99907 7.01472 7.15925 7.71 7.47L14.89 0.29C15.0763 0.105256 15.3277 0.00110462 15.59 0ZM2.44 13.56C2.44 14.6646 3.33543 15.56 4.44 15.56C4.97043 15.56 5.47914 15.3493 5.85421 14.9742C6.22929 14.5991 6.44 14.0904 6.44 13.56C6.44 12.4554 5.54457 11.56 4.44 11.56C3.33543 11.56 2.44 12.4554 2.44 13.56Z"
              fill="#1B1C31"
            />
          </svg>

          <span class="likes"> Likes </span>
          <span class="nums"> 16 </span>
        </div>
        <div class="stat">
          <svg
            width="18"
            height="21"
            viewBox="0 0 18 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.3043 18.24C7.94126 20.592 4.11937 20.592 1.75635 18.24C-0.58545 15.8975 -0.58545 12.1025 1.75635 9.76001L10.2542 1.32001C12.0299 -0.440491 14.8945 -0.440491 16.6702 1.32001C17.5211 2.15981 18 3.30503 18 4.50001C18 5.69498 17.5211 6.84021 16.6702 7.68001L8.87295 15.42C8.30874 15.991 7.53909 16.3125 6.73597 16.3125C5.93285 16.3125 5.16319 15.991 4.59899 15.42C4.0336 14.8571 3.7158 14.0925 3.7158 13.295C3.7158 12.4976 4.0336 11.7329 4.59899 11.17L9.54357 6.27001C9.63754 6.17535 9.76546 6.12211 9.8989 6.12211C10.0323 6.12211 10.1603 6.17535 10.2542 6.27001L10.7947 6.80001C10.8895 6.89389 10.9428 7.02169 10.9428 7.15501C10.9428 7.28833 10.8895 7.41613 10.7947 7.51001L5.85015 12.41C5.43186 12.9117 5.46647 13.6495 5.9299 14.1099C6.39333 14.5703 7.13201 14.6007 7.6318 14.18L15.429 6.45001C15.948 5.93556 16.2399 5.2354 16.2399 4.50501C16.2399 3.77462 15.948 3.07446 15.429 2.56001C14.3437 1.48201 12.5907 1.48201 11.5054 2.56001L2.98749 11C1.33316 12.6585 1.33316 15.3415 2.98749 17C4.6691 18.6479 7.3615 18.6479 9.04311 17L14.6984 11.39C14.8976 11.1917 15.2198 11.1917 15.419 11.39L15.9495 11.92C16.0463 12.0107 16.1012 12.1374 16.1012 12.27C16.1012 12.4026 16.0463 12.5293 15.9495 12.62L10.3043 18.24Z"
              fill="#1B1C31"
            />
          </svg>
          <span class="likes"> Likes </span>
          <span class="nums"> 16 </span>
        </div>
        <div class="stat">
          <svg
            width="17"
            height="16"
            viewBox="0 0 17 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8.00302 0C5.79305 0 4.00151 1.79086 4.00151 4C4.00151 5.06087 4.42309 6.07828 5.17352 6.82843C5.92395 7.57857 6.94175 8 8.00302 8C10.213 8 12.0045 6.20914 12.0045 4C12.0045 1.79086 10.213 0 8.00302 0ZM14.4555 11.66L15.896 14.55C16.052 14.8595 16.0366 15.2277 15.8552 15.5231C15.6739 15.8185 15.3524 15.999 15.0057 16H1.00037C0.653649 15.999 0.332192 15.8185 0.150815 15.5231C-0.030562 15.2277 -0.0459919 14.8595 0.110036 14.55L1.55058 11.66C2.05957 10.6408 3.10207 9.99776 4.2416 10H11.7644C12.904 9.99776 13.9465 10.6408 14.4555 11.66Z"
              fill="#1B1C31"
            />
          </svg>

          <span class="likes"> Likes </span>
          <span class="nums"> 16 </span>
        </div>
        <div class="stat">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M15.59 0H17C17.5523 0 18 0.447715 18 1V3.5C18 3.77614 17.7761 4 17.5 4H15.63C15.4864 4.01056 15.3548 4.08369 15.27 4.2H15.22C15.0793 4.34052 15.0002 4.53115 15 4.73V6.49C15 6.76614 14.7761 6.99 14.5 6.99H12.72C12.5212 6.99017 12.3305 7.06931 12.19 7.21L11.93 7.47C11.7893 7.61052 11.7102 7.80115 11.71 8V8.72C11.7089 8.98234 11.6047 9.23374 11.42 9.42L10.54 10.3C10.8418 10.9943 10.9983 11.743 11 12.5C11 15.5376 8.53757 18 5.5 18C2.46243 18 0 15.5376 0 12.5C0 9.46243 2.46243 7 5.5 7C6.26157 6.99907 7.01472 7.15925 7.71 7.47L14.89 0.29C15.0763 0.105256 15.3277 0.00110462 15.59 0ZM2.44 13.56C2.44 14.6646 3.33543 15.56 4.44 15.56C4.97043 15.56 5.47914 15.3493 5.85421 14.9742C6.22929 14.5991 6.44 14.0904 6.44 13.56C6.44 12.4554 5.54457 11.56 4.44 11.56C3.33543 11.56 2.44 12.4554 2.44 13.56Z"
              fill="#1B1C31"
            />
          </svg>

          <span class="likes"> Likes </span>
          <span class="nums"> 16 </span>
        </div>
      </div>
      <div class="flex" style="margin-top: 40px">
        <div class="w-5/12">
          <div class="flex" style="align-items: center">
            <div class="w-1/2">
              <vue-easy-pie-chart
                :size="95"
                bar-color=" #687BFE"
                scale-color="transparent"
                :line-width="7"
                :percent="70"
              >
                       <div class="resize" >
                  <img src="~@/assets/dealer/img/icons/DownIcon.svg" alt="icon">
               </div>  
              </vue-easy-pie-chart>
            </div>
            <div class="w-1/2 flex" style="flex-direction: column">
              <span class="bills"> Bills Paid </span>
              <span class="bills-num"> 10/15 </span>
            </div>
          </div>
        </div>
        <div class="w-5/12">
          <div class="flex" style="align-items: center">
            <div class="w-1/2">
              <vue-easy-pie-chart
                :size="95"
                bar-color="#FE7F5C"
                scale-color="transparent"
                :line-width="7"
                :percent="70"
              >
                         <div class="resize" >
                  <img src="~@/assets/dealer/img/icons/DownIcon.svg" alt="icon">
               </div>  
              </vue-easy-pie-chart>
            </div>
            <div class="w-1/2 flex" style="flex-direction: column">
              <span class="bills"> Taxes Paid </span>
              <span class="bills-num"> 10/15 </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-1/2" style="padding-right: 55px">
      <div class="flex items-center justify-between">
        <h1 class="heading">Details</h1>
                    <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
                      <feather-icon
                        icon="MoreVerticalIcon"
                        svgClasses="w-6 h-6 hover:text-primary stroke-current"
                      />
                        <vs-dropdown-menu>
                            <vs-dropdown-item @click.stop="editData(activeUser)">
                              <span class="flex items-center">
                                <feather-icon icon="Edit2Icon" svgClasses="h-4 w-4" class="mr-2" />
                                <span>Edit</span>
                              </span>
                            </vs-dropdown-item>
                            <vs-dropdown-item @click.stop="deleteData(activeUser.id)">
                              <span class="flex items-center">
                                <feather-icon icon="TrashIcon" svgClasses="h-4 w-4" class="mr-2" />
                                <span>Delete</span>
                              </span>
                            </vs-dropdown-item>
                        </vs-dropdown-menu>
                    </vs-dropdown>
      </div>
    <div class="elctro mt-6 flex" style="justify-content: space-between">
        <div class="con-img flex">
          <img
            key="onlineImg"
            src="https://i.imgur.com/jcDqb3U.jpg"
            alt="user-img"
            width="65"
            height="65"
            class="rounded-full shadow-md cursor-pointer block"
          />
          <div style="flex-direction: column" class="flex ml-5">
            <h4
              style="
                height: 29px;
                left: 114px;
                top: 60px;
                font-family: Product Sans;
                font-style: normal;
                font-weight: normal;
                font-size: 24px;
                line-height: 29px;

                color: #000000;
              "
            >
              {{ activeUser.full_name }}
            </h4>
            <p
              style="
                margin-top: 10px;
                height: 34px;
                left: 114px;
                top: 99px;

                font-family: Product Sans;
                font-style: normal;
                font-weight: normal;
                font-size: 14px;
                line-height: 17px;

                color: #000000;
              "
            >
              {{ activeUser.username }}
            </p>
          </div>
        </div>
        <div class="flex" style="align-items: end">
          <span style="font-family: Almarai; font-size: 24px; color: #000000">
            {{ activeUser.role }}
          </span>
        </div>
      </div>
      <div class="mt-8">
        <h1 class="heading">Payment Includes</h1>
        <div class="mt-4">
          <div style="display: flex; align-items: center">
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.25 7.5L7.03571 9.82143L13.1333 2.90381M7.5 1C6.64641 1 5.80117 1.16813 5.01256 1.49478C4.22394 1.82144 3.50739 2.30022 2.90381 2.90381C2.30022 3.50739 1.82144 4.22394 1.49478 5.01256C1.16813 5.80117 1 6.64641 1 7.5C1 8.35359 1.16813 9.19883 1.49478 9.98744C1.82144 10.7761 2.30022 11.4926 2.90381 12.0962C3.50739 12.6998 4.22394 13.1786 5.01256 13.5052C5.80117 13.8319 6.64641 14 7.5 14C9.22391 14 10.8772 13.3152 12.0962 12.0962C13.3152 10.8772 14 9.22391 14 7.5"
                stroke="black"
              />
            </svg>
            <span
              class="ml-4"
              style="font-family: Product Sans; font-size: 14px; color: #000000"
              >Fine from Last month</span
            >
          </div>
          <div class="mt-2" style="display: flex; align-items: center">
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.25 7.5L7.03571 9.82143L13.1333 2.90381M7.5 1C6.64641 1 5.80117 1.16813 5.01256 1.49478C4.22394 1.82144 3.50739 2.30022 2.90381 2.90381C2.30022 3.50739 1.82144 4.22394 1.49478 5.01256C1.16813 5.80117 1 6.64641 1 7.5C1 8.35359 1.16813 9.19883 1.49478 9.98744C1.82144 10.7761 2.30022 11.4926 2.90381 12.0962C3.50739 12.6998 4.22394 13.1786 5.01256 13.5052C5.80117 13.8319 6.64641 14 7.5 14C9.22391 14 10.8772 13.3152 12.0962 12.0962C13.3152 10.8772 14 9.22391 14 7.5"
                stroke="black"
              />
            </svg>
            <span
              class="ml-4"
              style="font-family: Product Sans; font-size: 14px; color: #000000"
              >This month`s bill</span
            >
          </div>
        </div>
        <div
          class="flex"
          style="
          margin-bottom: 30px;
            align-items: end;
            justify-content: space-between;
            margin-top: 70px;
          "
        >
          <span
            style="
              font-family: Almarai;
              font-size: 26px;
              line-height: 29px;
              color: #000000;
            "
          >
            Admins
          </span>
          <vs-button
            @click="addNewData()"
            style="
              font-family: Almarai;
              font-size: 13px;
              line-height: 15px;
              color: #ffffff;
              background: #ff7f5c !important;
              backdrop-filter: blur(4px);
              border-radius: 5px;
            "
          >
            Add Admin
          </vs-button>
        </div>
          <div class="scroll-area" style="height: 300px" :is="scrollbarTag" :settings="settings" >
        <div class="itm w-full mt-6" v-for="(admin, i) in admins" :key="i">
          <div class="con-img flex" @click.stop="getUser(admin.id)" >
            <img
              key="onlineImg"
              src="https://i.imgur.com/jcDqb3U.jpg"
              alt="user-img"
              width="50"
              height="50"
              class="rounded-full shadow-md cursor-pointer block"
            />
            <div style="flex-direction: column" class="flex ml-5">
              <h4
                style="
                  font-family: Gilroy;
                  font-weight: 300;
                  font-size: 26px;
                  color: #000000;
                "
              >
                {{ admin.full_name }}
              </h4>
              <p style="font-size: 13px; color: #1f396f; opacity: 0.5">
                {{ admin.role }}
              </p>
            </div>
          </div>
        </div>
          </div>
      </div>
    </div>
    <pop-up-list :isPopUp="PopUp" @closeSidebar="toggleDataSidebar" :data="PopUpData" ></pop-up-list>
  </div>
</template>
<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import PopUpList from './components/AddAdmin.vue'
import VueEasyPieChart from 'vue-easy-pie-chart'
import 'vue-easy-pie-chart/dist/vue-easy-pie-chart.css'
export default {
  name: '',
  components: { VueEasyPieChart, PopUpList, VuePerfectScrollbar },
  data () {
    return {
      PopUp: false,
      activeUser: null,
      PopUpData: {},
      haveValue: false,
      settings: {
        maxScrollbarLength: 60
      }
    }
  },
  computed: {
    scrollbarTag () { return this.$store.getters.scrollbarTag },
    currentPage () {
      if (this.isMounted) {
        return this.$refs.table.currentx
      }
      return 0
    },
    admins () {
      return this.$store.state.addUser.admins.reverse()
    },
    queriedItems () {
      return this.$refs.table ? this.$refs.table.queriedResults.length : this.products.length
    }
  },
  methods:{
    getUser (id) {
      this.activeUser = this.admins.find(x => x.id === id)
    },
    addNewData () {
      this.PopUpData = {}
      this.toggleDataSidebar(true)
    },
    deleteData (id) {
      this.$store.dispatch('addUser/removeItem', id)
      this.$store.dispatch('addUser/fetchDataListItems').then(
        response => {
          this.$vs.notify({
            title: 'Deleted',
            text: 'Ok',
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'success'
          })
          this.activeUser = response.data[0]
        }
      )
    },
    editData (data) {
      // this.sidebarData = JSON.parse(JSON.stringify(this.blankData))
      this.PopUpData = data
      this.toggleDataSidebar(true)
    },
    toggleDataSidebar (val = false) {
      this.PopUp = val
      this.$store.dispatch('addUser/fetchDataListItems')
      this.$store.dispatch('addUser/fetchDataListItems').then(
        response => {
          this.activeUser = response.data[0]
        }
      )
    },
    scrollHandle (evt) {
      return evt
    }
  },
  created () {
    this.$store.dispatch('addUser/fetchDataListItems').then(
      response => {
        this.activeUser = response.data[0]
      }
    )
  },
  mounted () {
    this.$store.dispatch('addUser/fetchDataListItems')
  }
}
</script>
<style scoped>
.heading {
  font-family: Google Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 31px;
  /* identical to box height */

  color: #000000;
}

.item {
  width: 141px;
  height: 229px;

  background: #ffffff;
  box-shadow: 0px 100px 80px rgba(229, 229, 245, 0.25),
    0px 64.8148px 46.8519px rgba(229, 229, 245, 0.189815),
    0px 38.5185px 25.4815px rgba(229, 229, 245, 0.151852),
    0px 20px 13px rgba(229, 229, 245, 0.125),
    0px 8.14815px 6.51852px rgba(229, 229, 245, 0.0981481),
    0px 1.85185px 3.14815px rgba(229, 229, 245, 0.0601852);
  border-radius: 12px;
}

.icon1 {
  position: relative;
  width: 50px;
  height: 50px;
  left: 21px;
  top: 28px;

  background: #9e3ebf;
  border-radius: 16px;
}

.iconn {
  position: relative;
  display: flex;
  justify-content: center;
  top: 13px !important;
  border: none !important;
  border: 1px solid #ffffff;
}

.data {
  position: absolute;
  width: 100px;
  height: 17px;
  left: 22px;
  top: 80px;

  font-family: Google Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 140.3%;
  /* identical to box height, or 17px */

  letter-spacing: 0.01em;

  /* blue dark */

  color: #110f48;
}

.value {
  position: absolute;
  width: 52px;
  height: 27px;
  left: 21px;
  top: 114px;

  font-family: Tomorrow;
  font-style: normal;
  font-weight: normal;
  font-size: 19px;
  line-height: 140.3%;
  /* identical to box height, or 27px */

  letter-spacing: 0.01em;

  /* blue dark */

  color: #110f48;
}

.inc {
  position: absolute;
  width: 7.5px;
  height: 10px;
  left: 73px;
  top: 123px;
  border: none !important;
}

.percentage {
  position: relative;
  height: 17px;
  left: 20px;
  top: 135px;
  font-family: Tomorrow;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 140.3%;
  letter-spacing: 0.01em;
  color: #110f48;
}

.stat {
  width: 40%;
  margin-right: 25px;
  padding: 20px;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-between;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;
  margin-top: 24px;
  /* cards bg */
  height: 62px;
  background: #fefeff;
  box-shadow: 0px 100px 80px rgba(41, 72, 152, 0.05),
    0px 64.8148px 46.8519px rgba(41, 72, 152, 0.037963),
    0px 38.5185px 25.4815px rgba(41, 72, 152, 0.0303704),
    0px 20px 13px rgba(41, 72, 152, 0.025),
    0px 8.14815px 6.51852px rgba(41, 72, 152, 0.0196296),
    0px 1.85185px 3.14815px rgba(41, 72, 152, 0.012037);
  border-radius: 18px;
}

.likes {
  /* position: absolute; */
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;

  /* cards bg */

  background: #fefeff;
  box-shadow: 0px 100px 80px rgba(41, 72, 152, 0.05),
    0px 64.8148px 46.8519px rgba(41, 72, 152, 0.037963),
    0px 38.5185px 25.4815px rgba(41, 72, 152, 0.0303704),
    0px 20px 13px rgba(41, 72, 152, 0.025),
    0px 8.14815px 6.51852px rgba(41, 72, 152, 0.0196296),
    0px 1.85185px 3.14815px rgba(41, 72, 152, 0.012037);
  border-radius: 18px;
}

.nums {
  left: 82.59%;
  right: 10.33%;
  top: 33.87%;
  bottom: 37.1%;

  font-family: Tomorrow;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
  /* identical to box height */

  float: right;
  /* text color */

  color: #7c8db5;
}
.bills {
  font-family: Gilroy;
  font-style: normal;
  font-weight: 300;
  font-size: 17px;
  line-height: 15px;
  /* identical to box height */

  color: #000000;
}
.bills-num {
  margin-top: 13px;
  /* font-family: Gugi; */
  font-style: normal;
  font-weight: normal;
  font-size: 30px;
  line-height: 30px;
  /* identical to box height */
  font-weight: 600;

  color: #000000;
}
.itm {
  background: #fefeff;
  box-shadow: 0px 100px 80px rgba(41, 72, 152, 0.05),
    0px 64.8148px 46.8519px rgba(41, 72, 152, 0.037963),
    0px 38.5185px 25.4815px rgba(41, 72, 152, 0.0303704),
    0px 20px 13px rgba(41, 72, 152, 0.025),
    0px 8.14815px 6.51852px rgba(41, 72, 152, 0.0196296),
    0px 1.85185px 3.14815px rgba(41, 72, 152, 0.012037);
  border-radius: 18px;
  padding: 14px;
  cursor: pointer;
}
.itm:hover {
  background: #fefeff;
  box-shadow: 0px 100px 80px rgba(41, 72, 152, 0.05),
    0px 64.8148px 46.8519px rgba(41, 72, 152, 0.037963),
    0px 38.5185px 25.4815px rgba(41, 72, 152, 0.0303704),
    0px 20px 13px rgba(41, 72, 152, 0.025),
    0px 8.14815px 6.51852px rgba(41, 72, 152, 0.0196296),
    0px 1.85185px 3.14815px rgba(41, 72, 152, 0.012037);
  border-radius: 18px;
  padding: 18px;
}
.resize{
  padding-left: 2px;
    padding-top: 3px;
}
</style>
