<template>
  <div>
    <div class="flex" style="justify-content: space-between">
      <div class="w-3/5">
        <h1 class="heading">Account Summary</h1>
        <div class="flex" style="margin-top: 40px">
          <div class="w-1/2">
            <div class="flex" style="align-items: center">
              <div class="w-1/2">
                <vue-easy-pie-chart
                  :size="95"
                  bar-color=" #687BFE"
                  scale-color="transparent"
                  :line-width="7"
                  :percent="70"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 17 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M2.43946 16.5823C2.1712 16.8502 1.80751 17.0005 1.42841 17.0002C1.0493 17 0.685833 16.8491 0.417954 16.5809C0.150074 16.3127 -0.000266937 15.949 1.25042e-07 15.5699C0.000269094 15.1909 0.151119 14.8274 0.419377 14.5596L12.1227 2.85725L4.21381 2.85725C3.83491 2.85725 3.47154 2.70675 3.20362 2.43885C2.9357 2.17096 2.78518 1.80761 2.78518 1.42875C2.78518 1.04989 2.9357 0.686539 3.20362 0.418643C3.47154 0.150746 3.83491 0.00024299 4.21381 0.000243023L15.5714 0.000244016C15.9503 0.000244049 16.3136 0.150747 16.5816 0.418644C16.8495 0.686541 17 1.04989 17 1.42875L17 12.7854C17 13.1642 16.8495 13.5276 16.5816 13.7955C16.3136 14.0634 15.9503 14.2139 15.5714 14.2139C15.1925 14.2139 14.8291 14.0634 14.5612 13.7955C14.2933 13.5276 14.1428 13.1642 14.1428 12.7854L14.1428 4.87716L2.43946 16.5823Z"
                      fill="black"
                    />
                  </svg>
                </vue-easy-pie-chart>
              </div>
              <div class="w-1/2" style="display: flex; flex-direction: column">
                <span class="bills"> Bills Paid </span>
                <span class="bills-num"> 10/15 </span>
              </div>
            </div>
          </div>
          <div class="w-1/2">
            <div class="flex" style="align-items: center">
              <div class="w-1/2">
                <vue-easy-pie-chart
                  :size="95"
                  bar-color="#FE7F5C"
                  scale-color="transparent"
                  :line-width="7"
                  :percent="70"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 17 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M14.5605 0.418161C14.8288 0.150305 15.1925 -2.33985e-05 15.5716 0.000244498C15.9507 0.000512395 16.3142 0.151356 16.582 0.419591C16.8499 0.687826 17.0003 1.05148 17 1.43055C16.9997 1.80963 16.8489 2.17307 16.5806 2.44093L4.87732 14.1432H12.7862C13.1651 14.1432 13.5285 14.2937 13.7964 14.5616C14.0643 14.8295 14.2148 15.1929 14.2148 15.5717C14.2148 15.9506 14.0643 16.3139 13.7964 16.5818C13.5285 16.8497 13.1651 17.0002 12.7862 17.0002H1.42862C1.04973 17.0002 0.686354 16.8497 0.418435 16.5818C0.150516 16.3139 0 15.9506 0 15.5717V4.21513C0 3.83626 0.150516 3.47292 0.418435 3.20502C0.686354 2.93713 1.04973 2.78662 1.42862 2.78662C1.80752 2.78662 2.1709 2.93713 2.43881 3.20502C2.70673 3.47292 2.85725 3.83626 2.85725 4.21513V12.1233L14.5605 0.418161Z"
                      fill="black"
                    />
                  </svg>
                </vue-easy-pie-chart>
              </div>
              <div class="w-1/2" style="display: flex; flex-direction: column">
                <span class="bills"> Bills Paid </span>
                <span class="bills-num"> 10/15 </span>
              </div>
            </div>
          </div>
          <div class="w-1/2">
            <div class="flex" style="align-items: center">
              <div class="w-1/2">
                <vue-easy-pie-chart
                  :size="95"
                  bar-color="#FE7F5C"
                  scale-color="transparent"
                  :line-width="7"
                  :percent="70"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 17 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M14.5605 0.418161C14.8288 0.150305 15.1925 -2.33985e-05 15.5716 0.000244498C15.9507 0.000512395 16.3142 0.151356 16.582 0.419591C16.8499 0.687826 17.0003 1.05148 17 1.43055C16.9997 1.80963 16.8489 2.17307 16.5806 2.44093L4.87732 14.1432H12.7862C13.1651 14.1432 13.5285 14.2937 13.7964 14.5616C14.0643 14.8295 14.2148 15.1929 14.2148 15.5717C14.2148 15.9506 14.0643 16.3139 13.7964 16.5818C13.5285 16.8497 13.1651 17.0002 12.7862 17.0002H1.42862C1.04973 17.0002 0.686354 16.8497 0.418435 16.5818C0.150516 16.3139 0 15.9506 0 15.5717V4.21513C0 3.83626 0.150516 3.47292 0.418435 3.20502C0.686354 2.93713 1.04973 2.78662 1.42862 2.78662C1.80752 2.78662 2.1709 2.93713 2.43881 3.20502C2.70673 3.47292 2.85725 3.83626 2.85725 4.21513V12.1233L14.5605 0.418161Z"
                      fill="black"
                    />
                  </svg>
                </vue-easy-pie-chart>
              </div>
              <div class="w-1/2" style="display: flex; flex-direction: column">
                <span class="bills"> Bills Paid </span>
                <span class="bills-num"> 10/15 </span>
              </div>
            </div>
          </div>
        </div>
        <div
          class="flex"
          style="flex-wrap: wrap; margin-top: 60px; align-items: center"
        >
          <div class="w-full mt-6 data-list-container" id="data-list-list-view"  >
            <vs-table
              ref="table"
              maxHeight="300px"
              pagination
              :max-items="itemsPerPage"
              search
              :data="company"
            >
              <div
                slot="header"
                class="
                  flex flex-wrap-reverse
                  items-center
                  flex-grow
                  justify-between
                "
              >
                <div class="w-1/2">
                  <h3 class="heading m-0">Transactions History</h3>
                </div>
                <div class="w-1/2">
                  <vs-button @click="addNewData()" class="widget">
                    <span class="widget-text">Add User</span>
                  </vs-button>
                </div>
              </div>
              <template slot="thead">
                <vs-th sort-key="full_name">Full Name</vs-th>
                <vs-th sort-key="role">Role</vs-th>
                <vs-th sort-key="username">Username</vs-th>
                <vs-th sort-key="phone_number">Email</vs-th>
                <vs-th sort-key="active">Status</vs-th>
                <vs-th sort-key="Категория">Actions</vs-th>
              </template>

              <template slot-scope="{ data }" class="scr">
                <tbody>
                  <vs-tr
                    :data="tr"
                    :key="indextr"
                    v-for="(tr, indextr) in data"
                  >
                    <vs-td>
                      <div @click.stop="getUser(tr.id)" class="flex" style="align-items: center">
                        <!-- <div class="color"></div> -->
                        <p class="product-category ml-3">{{ tr.full_name }}</p>
                      </div>
                    </vs-td>

                    <vs-td>
                      <p>{{ tr.role }}</p>
                    </vs-td>

                    <vs-td>
                      <p>
                        {{ tr.username }}
                      </p>
                    </vs-td>
                    <vs-td>
                        {{ tr.phone_number }}
                    </vs-td>
                    <vs-td>
                       <vs-chip  v-if="tr.active == -1" class="status" style="background: red">
                          <span style="font-size: 11px; color: #ffffff">
                            Inactive
                        </span>
                        </vs-chip>
                        <vs-chip v-else class="status">
                          <span style="font-size: 11px; color: #ffffff">
                            Active
                        </span>
                        </vs-chip>
                    </vs-td>
                    <vs-td>
                    <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
                      <feather-icon
                        icon="MoreVerticalIcon"
                        svgClasses="w-6 h-6 hover:text-primary stroke-current"
                      />

                        <vs-dropdown-menu>
                            <vs-dropdown-item @click.stop="editData(tr)">
                              <span class="flex items-center">
                                <feather-icon icon="Edit2Icon" svgClasses="h-4 w-4" class="mr-2" />
                                <span>Edit</span>
                              </span>
                            </vs-dropdown-item>
                            <vs-dropdown-item @click.stop="deleteData(tr.id)">
                              <span class="flex items-center">
                                <feather-icon icon="TrashIcon" svgClasses="h-4 w-4" class="mr-2" />
                                <span>Delete</span>
                              </span>
                            </vs-dropdown-item>
                        </vs-dropdown-menu>
                    </vs-dropdown>
                    </vs-td>
                  </vs-tr>
                </tbody>
              </template>
            </vs-table>
          </div>
        </div>
      </div>
      <div class="w-1/3">
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
            <span
              style="
font-family: ABeeZee;
font-style: normal;
font-weight: normal;
font-size: 24px;
line-height: 28px;

color: #000000;
              "
            >
              {{ activeUser.role }}
            </span>
          </div>
        </div>
        <div class="mt-10">
          <h1 
          style="
font-family: ABeeZee;
font-style: normal;
font-weight: normal;
font-size: 26px;
color: #000000;"
          class="heading">Factories</h1>
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
                style="
                  font-family: Product Sans;
                  font-size: 14px;
                  color: #000000;
                "
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
                style="
                  font-family: Product Sans;
                  font-size: 14px;
                  color: #000000;
                "
                >This month`s bill</span
              >
            </div>
          </div>
          <div
            class="mt-4 flex"
            style="align-items: end; justify-content: space-between"
          >
            <span
              style="
                font-family: Product Sans;
                font-size: 14px;
                color: #000000;
              "
            >
              Total :
            </span>
            <span
              style="
                font-family: Gugi;
                font-size: 24px;
                color: #000000;
              "
            >
              $ 2,000
            </span>
          </div>
          <div class="itm w-full mt-6">
            <div class="con-img flex">
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
                  Good Evening Mikey!
                </h4>
                <p style="font-size: 15px; color: #1f396f; opacity: 0.5">
                  Attachments
                </p>
              </div>
            </div>
          </div>
          <div class="itm w-full mt-3">
            <div class="con-img flex">
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
                  Good Evening Mikey!
                </h4>
                <p style="font-size: 15px; color: #1f396f; opacity: 0.5">
                  Attachments
                </p>
              </div>
            </div>
          </div>
          <div class="itm w-full mt-3">
            <div class="con-img flex">
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
                  Good Evening Mikey!
                </h4>
                <p style="font-size: 15px; color: #1f396f; opacity: 0.5">
                  Attachments
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
import PopUpList from './components/AddUser.vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import VueEasyPieChart from "vue-easy-pie-chart";
import "vue-easy-pie-chart/dist/vue-easy-pie-chart.css";
export default {
  name: "Company",
  data() {
    return {
      activePrompt: false,
      itemsPerPage: 4,
      activeUser: null,
      PopUp: false,
      PopUpData: {},
      settings: {
        maxScrollbarLength: 60
      },
    };
  },
  components: { VueEasyPieChart, VuePerfectScrollbar, PopUpList },
  computed: {
    scrollbarTag () { return this.$store.getters.scrollbarTag },
    currentPage() {
      if (this.isMounted) {
        return this.$refs.table.currentx;
      }
      return 0;
    },
    company() {
      return this.$store.state.addUser.admins
    },
    queriedItems() {
      return this.$refs.table
        ? this.$refs.table.queriedResults.length
        : this.products.length;
    },
  },
  methods: {
    getUser(id){
      console.log(id)
    this.activeUser = this.company.find(x => x.id === id)
    },
    addNewData () {
      this.PopUpData = {}
      this.toggleDataSidebar(true)
    },
    deleteData (id) {
      this.$store.dispatch('addUser/removeItem', id)
      this.$store.dispatch('addUser/fetchDataListItems').then(
      response => {
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
    scrollHandle(evt) {
        return evt
    },
  },
  mounted(){
        this.$store.dispatch("addUser/fetchDataListItems");
    this.getUser()
  },
  created() {
          this.$store.dispatch('addUser/fetchDataListItems').then(
      response => {
        this.activeUser = response.data[0]
      })
  },
};
</script>
<style scoped>
.scr{
   overflow-y:scroll;
  height:100px;
  display:block;
}
.heading {
  /* width: 149px; */
  font-family: Product Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 23px;
  line-height: 22px;
  /* identical to box height */

  color: #000000;
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
  margin-top: 8px;
  font-family: Gugi;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 30px;
  /* identical to box height */
  font-weight: 600;

  color: #000000;
}
.widget {
  height: 42px !important;
  border: none;
  float: right;
  background: #ff7f5c !important;
  /* box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); */
  border-radius: 5px;
}
.widget:hover{
  border: none !important;
}
.widget-text {
  /* padding: 8px 18px !important; */
  font-family: Product Sans;
  font-style: normal;
  font-weight: normal;
  /* font-size: 15px !important; */
  line-height: 16px !important;
  /* identical to box height */

  color: #ffffff;
}
.color {
  width: 30px;
  height: 30px;
  background: #c4c4c4;
  border-radius: 5px;
}
.status {
  color: white;
  background: #80e1b2;
  border-radius: 5px;
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
}
</style>
<style  lang="scss">
#data-list-list-view {
  .vs-con-table {
    /*
      Below media-queries is fix for responsiveness of action buttons
      Note: If you change action buttons or layout of this page, Please remove below style
    */
    @media (max-width: 689px) {
      .vs-table--search {
        margin-left: 0;
        max-width: unset;
        width: 100%;

        .vs-table--search-input {
          width: 100%;
        }
      }
    }

    @media (max-width: 461px) {
      .items-per-page-handler {
        display: none;
      }
    }

    @media (max-width: 341px) {
      .data-list-btn-container {
        width: 100%;

        .dd-actions,
        .btn-add-new {
          width: 100%;
          margin-right: 0 !important;
        }
      }
    }

    .product-name {
      max-width: 23rem;
    }

    .vs-table--header {
      display: flex;
      flex-wrap: wrap;
      margin-left: 1.5rem;
      margin-right: 1.5rem;
      > span {
        display: flex;
        flex-grow: 1;
      }

      .vs-table--search {
        padding-top: 0;
        position: absolute;
        left: 27% !important;

        .vs-table--search-input {
          padding: 0.9rem 2.5rem;
          border: none;
          font-size: 1rem;
          background: #f7f8fd;
          backdrop-filter: blur(4px) !important;
          border-radius: 5px !important;
          width: 201px !important;

          & + i {
            left: 1rem;
          }

          &:focus + i {
            left: 1rem;
          }
        }
      }
    }

    .vs-table {
      border-collapse: separate;
      border-spacing: 0 1.3rem;
      padding: 0 1rem;
      tr {
        box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05);
        td {
          padding: 17px;
          font-size: 15px;
          font-weight: 500;
          &:first-child {
            border-top-left-radius: 0.5rem;
            border-bottom-left-radius: 0.5rem;
          }
          &:last-child {
            border-top-right-radius: 0.5rem;
            border-bottom-right-radius: 0.5rem;
          }
        }
        td.td-check {
          padding: 20px !important;
        }
      }
    }
    .vs-table--thead {
      th {
        padding-top: 0;
        padding-bottom: 0;
      }
      th.td-check {
        padding: 0 15px !important;
      }
      tr {
        background: none;
        box-shadow: none;
      }
    }

    .vs-table--pagination {
      justify-content: center;
    }
  }
}
</style>
