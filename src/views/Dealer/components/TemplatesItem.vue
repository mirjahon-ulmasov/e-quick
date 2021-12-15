<template>
    <div>
    <vs-popup
      class="ozgar"
      background-color="rgb(45 39 39 / 70%)"
      background-color-popup="#ffffff"
      :active.sync="isSidebarActiveLocal"
    >
        <h2
          style="margin-top: -20px; margin-bottom: 15px;text-align: center; font-family: Montserrat;font-style: normal;font-weight: 500;font-size: 29px;line-height: 35px;color: #000000;"
          >
           Данные о {{ detail.title }}
          </h2>
      <div class="flex" style="justify-content: center;" >
           <vs-table
              ref="table"
              maxHeight="50vh"
              style="max-width: 400px !important"
              class="produ mt-4"
              :data="detail.items"
            >
              <template slot="thead">
                <vs-th sort-key="name">№</vs-th>
                <vs-th
                  sort-key="Наименование_онлайн_савдо"
                  style="
                    border-left: 2px solid #3a9fd1 !important;
                    border-right: 2px solid #3a9fd1 !important;
                  "
                  >Наименования</vs-th
                >
                <vs-th
                  sort-key="Завод"
                  style="border-right: 2px solid #3a9fd1 !important"
                  >Количество</vs-th
                >
                <vs-th sort-key="Баланс">Цена (сум)</vs-th>
              </template>
              <template slot-scope="{ data }" class="scr">
                <tbody>
                  <vs-tr
                    :data="tr"
                    :key="indextr"
                    v-for="(tr, indextr) in data"
                  >
                    <vs-td style="background: white;" >
                      <p>{{ indextr + 1 }}</p>
                    </vs-td>
                    <vs-td
                      style="
                        border-left: 2px solid #3a9fd1 !important;
                        border-right: 2px solid #3a9fd1 !important;
                        background: white;
                      "
                    >
                      <p>{{ tr.product_name }}</p>
                    </vs-td>
                    <vs-td style="border-right: 2px solid #3a9fd1 !important; background: white;">
                    <div  class="flex">
                        <span
                         class="add">
                        {{ tr.quantity }}
                        </span>
                         </div>
                    </vs-td>
                    <vs-td style="background: white;">
                      <p class="prise">
                        {{ tr.price }}
                      </p>
                    </vs-td>
                  </vs-tr>
                </tbody>
              </template>
            </vs-table>
      </div>
            <div class="itogo mt-4">
                <h2 class="text">Итоговая сумма:</h2>
                <h1 class="prise">{{ detail.total_price }} сум</h1>
              </div>
              <div class="flex mt-4">
                  <vs-button @click="Order()" class="submit">
                      Order
                  </vs-button>
                    <vs-button @click="AddCart()" class="cancel">
                      Add cart
                  </vs-button>
              </div>
    </vs-popup>
    <order-template  :Temp="Temp" @closeSidebar="toggleDataOrder" ></order-template>
    </div>
</template>
<script>
import OrderTemplate from './OrderTemplete.vue'
export default {
  name: '',
  props: {
    isPopUp: {
      type: Boolean,
      required: true
    }
  },
  components: {
    OrderTemplate
  },
  data () {
    return {
      Temp: false
    }
  },
  watch: {
    isPopUp (val) {
      if (!val) return
      // Object.entries(this.data).length === 0 ? this.initValues() : { this.dataId, this.dataName, this.dataCategory, this.dataOrder_status, this.dataPrice } = JSON.parse(JSON.stringify(this.data))
    }
  },
  computed: {
    detail () {
      return  this.$store.state.product.tempDetail
    },
    isSidebarActiveLocal: {
      get () {
        return this.isPopUp
      },
      set (val) {
        if (!val) {
          this.$emit('closeSidebar')
        }
      }
    }
  },
  methods: {
    Order () {
      this.isSidebarActiveLocal = false
      this.toggleDataOrder(true)
    },
    AddCart () {
      this.isSidebarActiveLocal = false
      this.$store.dispatch('product/AddCartTemplate', {
        user_id: parseInt(localStorage.getItem('Id')),
        template_id: this.detail.template_id
      }).then(response => {
        this.isSidebarActiveLocal = false
        this.$vs.notify({
          title: 'Success',
          text: 'Muvafayaqiyta',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'success'
        })
        this.isSidebarActiveLocal = false
        this.$router.push('/dealer/main')
      })
        .catch(err => { 
          this.$vs.notify({
            title: 'Error',
            text: err,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger'
          })
          console.error(err) 
        })
    },
    toggleDataOrder (val = false) {
      this.Temp = val
    }
  },
  created () {
    this.$store.dispatch('product/GetTemplatesItem')
    console.log(this.detail)
  },
  mounted () {
    this.$store.dispatch('product/GetTemplatesItem')
  }
}
</script>
<style lang="scss" scoped>
.add {
  text-align: center !important;
  width: 76px;
  height: 23.17px;

  border: 0.872058px solid #000000;
  box-sizing: border-box;
  border-radius: 3.70732px;
}
.add span {
  font-family: Lato;
  font-style: normal;
  font-weight: 800;
  font-size: 10px;
  line-height: 16px;
  /* identical to box height, or 158% */
  letter-spacing: -0.02em;
  text-transform: uppercase;
  color: #000000;
}
.submit{
  width: 205px;
  margin-left: 18%;
background: linear-gradient(99.52deg, #3F4F61 -14.96%, #3A9FD1 156.83%) !important;
border-radius: 6.87619px !important;
}
.submit:hover{
  box-shadow: none !important;
}
.cancel{
  width: 205px !important;
    margin-left: 10px !important;
    background: linear-gradient(90deg, #5E585C 0%, #000000 100%) !important;
border-radius: 5.9434px !important;
}
.cancel:hover{
  box-shadow: none !important;
}
.itogo{
    margin-left: 20%;
}
.itogo .prise {
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 25px;
  line-height: 30px;
  /* identical to box height, or 120% */
  text-align: start;
  letter-spacing: 0.333333px;
  color: #000000;
}
.itogo .text {
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 30px;
  text-align: start !important;
  /* identical to box height, or 200% */

  text-align: center;
  letter-spacing: 0.333333px;
  color: rgba(58, 159, 209, 1);
}
.vs-con-table {
      .vs-con-tbody{
         width: 100% !important;
         overflow: auto !important;
      }
        .vs-con-tbody::-webkit-scrollbar{
    width: 5px;
  }
  .vs-con-tbody::-webkit-scrollbar-track {
    background: rgb(97, 48, 48) !important;
  }
  .vs-con-tbody::-webkit-scrollbar-thumb {
    background-color: rgb(204, 41, 41) !important;
    border-radius: 6px;
    // border: 3px solid blue;
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

            .vs-table--search-input {
              padding: 0.9rem 2.5rem;
              font-size: 1rem;

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
            background: transparent !important;
            box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05);
            border-bottom: 2px solid #3a9fd1;
            td {
              padding: 10px;
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
          background: transparent !important;
          border-bottom: 2px solid #3a9fd1 !important;
          tr {
            background: red !important;
            box-shadow: none;
          }
          th {
            border-bottom: 2px solid #3a9fd1 !important;
            font-family: Montserrat !important;
            font-style: normal;
            font-weight: bold;
            font-size: 12px !important;
            /* or 278% */

            letter-spacing: 0.400518px;

            color: #000000 !important;

            .vs-table-text {
              text-transform: uppercase;
              font-weight: 600;
            }
          }
          th.td-check {
            padding: 0 15px !important;
          }
        }
        .vs-table--pagination {
          justify-content: center;
        }
      }
      .con-select {
        .vs-select--input {
          padding: 10px;
          font-size: 1rem;
          background: transparent !important;
        }
      }
</style>