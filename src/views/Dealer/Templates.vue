<template>
    <div style="width: 100%" >
      <div class="search-area">
        <input type="text" v-model="search" placeholder="Поиск шаблонов" class="search" />
      </div>
           <div class="row" >
             <div v-for="(temp,i) in resultTemplates" :key="i" class="card">
               <div class="card-header">
                 <p>{{ temp.title }}</p>                      
                  <feather-icon icon="TrashIcon"
                      @click="deleteTemplete(temp.template_id)"
                        svgClasses="h-5 w-5 hover:text-success text-white" 
                        class="ml-1"
                           />
               </div>
               <div class="card-body">
        <div class="flex" style="justify-content: center;" >
           <vs-table
              ref="table"
              class="produ mt-4"
              :data="temp.items"
            >
              <template slot="thead">
                <vs-th sort-key="name">№</vs-th>
                <vs-th
                  sort-key="Наименование_онлайн_савдо"
                  style="
                    border-left: 1px solid #3a9fd1 !important;
                    border-right: 1px solid #3a9fd1 !important;
                  "
                  >Наименования</vs-th
                >
                <vs-th
                  sort-key="Завод"
                  style="border-right: 1px solid #3a9fd1 !important"
                  >Количество</vs-th
                >
                <vs-th sort-key="Баланс">Цена (сум)</vs-th>
              </template>
              <template slot-scope="{ data }"  class="scr">
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
                        border-left: 1px solid #3a9fd1 !important;
                        border-right: 1px solid #3a9fd1 !important;
                        background: white;
                      "
                    >
                      <p>{{ tr.product_name }}</p>
                    </vs-td>
                    <vs-td style="border-right: 1px solid #3a9fd1 !important; background: white;">
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
               </div>
               <div class="card-footer">
                 <button class="btn" @click="Open(temp.template_id)" >Просмотреть</button>
               </div>
            </div>
           </div>
            <div class="container-footer">
              <p class="contact">71 203 01 01</p>
            </div>
            <pop-up-ok  :isPopUp="PopUp" @closeSidebar="toggleDataSidebar" ></pop-up-ok>
        </div>
</template>

<script>
import PopUpOk from './components/TemplatesItem.vue'
export default {
  components: {
    PopUpOk
  },
  name: "Templates",
  data(){
    return{
      search: '',
      PopUp: false,
      PopUpData: {},
    }
  },
  computed: {
  resultTemplates() {
      if (this.search) {
        return this.templates.filter(item => {
          return this.search.toLowerCase().split(" ").every(v => item.title.toLowerCase().includes(v));
        });
      } else {
        return this.templates;
      }
    },
  templates(){
    return  this.$store.state.product.templetes
    },
  },
  methods: {
        Open (id) {
      this.toggleDataSidebar(true)
      this.$store.dispatch('product/GetTemplatesItem', id)
    },
    deleteTemplete(id){
      console.log(id)
      this.$store.dispatch('product/UpdateTemplate', (id))
    },
        toggleDataSidebar (val = false) {
      this.PopUp = val
    },
  },
 created(){
   this.$store.dispatch('product/GetTemplates')
   console.log(this.templates, 'chiq')
  //  this.$store.dispatch('product/GetTemplatesItem')
 },
 mounted(){
   this.$store.dispatch('product/GetTemplates')
 }
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&family=Poppins:wght@100;200;400;500;600;700;800;900&display=swap");
   .search-area{
     height: 7%;
     margin-top: 40px;
     padding: 0px 60px 0px 80px;
     width: 100%;
    input.search{
    height: 36px;
    position: relative;
    width: 100%;
    padding: 20px;
    border: none !important;
    background: #F2F2F2 !important;
    border-radius: 5.7972px !important;
    color: rgba(58, 159, 209, 1);
    padding-left: 40px;
        &::placeholder {
          background-position: 10%;
          color: rgba(58, 159, 209, 1) !important;
        }
        &:nth-child(1) {
          content: "";
          display: block;
          position: relative;
          background: url("~@/assets/dealer/img/icons/search.svg") ,#F2F2F2  !important;
          background-repeat: no-repeat !important;
          background-position: 1% !important;
          background-size: 7%;
          background-color: #F2F2F2 !important;
        }
   } 
   }
    .row {
      height: 70%;
      padding: 20px;
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      justify-content: space-around;
      overflow-y: scroll;
      &::-webkit-scrollbar {
        width: 10px;
      }
      &::-webkit-scrollbar-thumb {
         border-radius: 10px;
        background-color: #234b79;
      }
      .card {
        margin: 10px;
        width: 286.55px;
        height: 273.14px;
        background: #ffffff;
        box-shadow: 0px 4.09362px 14.3277px rgba(0, 0, 0, 0.1);
        border-radius: 8.18723px;
        display: flex;
        overflow: hidden;
        flex-direction: column;
        .card-header {
          height: 20%;
          display: flex;
          justify-content: space-between;
          background: linear-gradient(
            215.31deg,
            #3f4f61 8.35%,
            #3a9fd1 137.05%
          );
          border-radius: 30.7021px;
          padding-right: 10px;
          border-radius: 0px;
          align-items: center;
          p {
            padding: 0px 20px;
            font-family: "Poppins" sans-serif;
            font-style: normal;
            font-weight: bold;
            font-size: 13.6454px;
            line-height: 36px;
            /* identical to box height, or 262% */
            color: #ffffff;
          }
        }
        .card-body {
          height: 60%;
          padding: 5px;
              overflow: hidden;
          
          .vs-con-table {
      .vs-con-tbody{
         overflow: hidden !important;
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
          min-width: 300px !important;
          tr {
            background: transparent !important;
            box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05);
            border-bottom: 1px solid #3a9fd1;
            td {
              text-align: center !important;
              padding: 5px;
              font-size: 9px !important;
              &:first-child {
                border-top-left-radius: 0.5rem;
                border-bottom-left-radius: 0.5rem;
              }
              &:last-child {
                border-top-right-radius: 0.5rem;
                border-bottom-right-radius: 0.5rem;
              }
            }
          }
        }
        .vs-table--thead {
          background: transparent !important;
          border-bottom: 1px solid #3a9fd1 !important;
          tr {
            background: red !important;
            box-shadow: none;
          }
          th {
            border-bottom: 1px solid #3a9fd1 !important;
            font-family: Montserrat !important;
            font-style: normal;
            font-weight: bold;
            padding: 0px 10px !important;
            font-size: 9px !important;
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
        }
        .card-footer {
          height: 20%;
          display: flex;
          justify-content: center;
          align-items: center;
          button.btn {
            border: none;
            padding: 5px 20px;
            cursor: pointer;
            background: linear-gradient(90deg, #434343 0%, #000000 100%) !important;
            border-radius: 8.33218px;
            font-family: "Lato" sans-serif;
            font-style: normal;
            font-weight: normal;
            font-size: 13.5167px;
            line-height: 18px;
            text-align: center;
            letter-spacing: -0.02em;
            color: #ffffff;
          }
        }
      }
    }
    .container-footer {
      width: 100%;
      height: 20%;
      background-image: url("~@/assets/dealer/img/svg/components/Footer1.png");
      background-repeat: no-repeat;
      background: cover cover;
      box-sizing: border-box;
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      padding: 40px;
      .contact {
        font-family: "Montserrat" sans-serif;
        font-style: normal;
        font-weight: bold;
        font-size: 25px;
        line-height: 30px;
        display: flex;

        color: #ffffff;
      }
    }
</style>