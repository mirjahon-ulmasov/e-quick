<template>
  <div>
    <div class="flex" style="justify-content: space-between">
      <div class="w-3/5">
        <h1 class="heading ml-6">Account Summary</h1>
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
                <div class="resize" >
                  <img src="~@/assets/images/icons/DownIcon.svg" alt="icon">
               </div>  
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
                <div class="resize" >
                  <img src="~@/assets/images/icons/DownIcon.svg" alt="icon">
               </div>  
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
                          <div class="resize" >
                  <img src="~@/assets/images/icons/DownIcon.svg" alt="icon">
               </div>  
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
              maxHeight="400px"
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
                    <span class="widget-text">Add Company</span>
                  </vs-button>
                </div>
              </div>
              <template slot="thead">
                <vs-th sort-key="name">Company Name</vs-th>
                <vs-th sort-key="Наименование_онлайн_савдо">Description</vs-th>
                <vs-th sort-key="Завод">Options</vs-th>
                <vs-th sort-key="Баланс">Status</vs-th>
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
                        <div class="color"></div>
                        <p class="product-category ml-3">{{ tr.name }}</p>
                      </div>
                    </vs-td>

                    <vs-td>
                      <p>{{ tr.description }}</p>
                    </vs-td>

                    <vs-td>
                      <p>
                        {{ tr.options }}
                      </p>
                    </vs-td>
                    <vs-td>
                      <div class="flex" style="align-items: center">
                        <vs-chip class="status">
                          <span style="font-size: 11px; color: #ffffff">
                            Completed
                          </span>
                        </vs-chip>
                      </div>
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
        <h1 class="heading1">Details</h1>
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
                  font-family:  ABeeZee;
                  font-style: normal;
                  font-weight: normal;
                  font-size: 24px;
                  line-height: 29px;

                  color: #000000;
                "
              >
               {{ activeUser.name }}
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
               {{ activeUser.description }}
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
              {{ activeUser.description }}
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
                    font-size: 25px;
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
                    font-size: 25px;
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
                    font-size: 25px;
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
    <vs-prompt class="holamundo" :active.sync="activePrompt">
      <div>
        <h2 style="text-align: center">Good Evening Mikey!</h2>
        <div class="form__inputs">
          <select>
            <option value="0">Choose</option>
            <option value="1">Item 1</option>
            <option value="2">Item 2</option>
            <option value="2">Item 3</option>
          </select>
          <input type="text" placeholder="Choose" />
          <textarea rows="5"></textarea>
          <div class="form_key_value">
            <input type="text" placeholder="Choose" />
            <input type="text" placeholder="Choose" />
          </div>
        </div>
      </div>
    </vs-prompt>
  </div>
</template>
<script>
import PopUpList from '@/components/admin/AddCompany.vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import VueEasyPieChart from 'vue-easy-pie-chart'
import 'vue-easy-pie-chart/dist/vue-easy-pie-chart.css'
export default {
  name: 'Company',
  data () {
    return {
      activePrompt: false,
      itemsPerPage: 5,
      activeUser: null,
      PopUp: false,
      PopUpData: {},
      settings: {
        maxScrollbarLength: 60
      }
    }
  },
  components: { VueEasyPieChart, VuePerfectScrollbar, PopUpList },
  computed: {
    scrollbarTag () { return this.$store.getters.scrollbarTag },
    currentPage () {
      if (this.isMounted) {
        return this.$refs.table.currentx
      }
      return 0
    },
    company () {
      return this.$store.state.dataList.products
    },
    queriedItems () {
      return this.$refs.table
        ? this.$refs.table.queriedResults.length
        : this.products.length
    }
  },
  methods: {
    getUser (id) {
      this.activeUser = this.company.find(x => x.id === id)
    },
    addNewData () {
      this.PopUpData = {}
      this.toggleDataSidebar(true)
    },
    deleteData (id) {
      this.$store.dispatch('dataList/removeItem', id)
      this.$store.dispatch('dataList/fetchDataListItems').then(
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
      this.$store.dispatch('dataList/fetchDataListItems')
      this.$store.dispatch('dataList/fetchDataListItems').then(
        response => {
          this.activeUser = response.data[0]
        }
      )
    },
    scrollHandle (evt) {
      return evt
    }
  },
  mounted () {
    this.$store.dispatch('dataList/fetchDataListItems')
    this.getUser()
  },
  created () {
    this.$store.dispatch('dataList/fetchDataListItems').then(
      response => {
        this.activeUser = response.data[0]
      })
  }
}
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
.heading1{
  font-family: ABeeZee;
font-style: normal;
font-weight: normal;
font-size: 24px;
line-height: 28px;

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
  /* font-family: Gugi; */
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
.resize{
  padding-left: 2px;
    padding-top: 4px;
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
        right: 54% !important;

        .vs-table--search-input {
          padding: 0.9rem 2.5rem;
          border: none;
          font-size: 1rem;
          background: #ffffff;
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
