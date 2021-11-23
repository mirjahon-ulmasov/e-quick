<template>
  <div class="center">
      <vs-table
              multiple 
              v-model="selected"
              ref="table"
              maxHeight="60vh"
              pagination
              :max-items="itemsPerPage"
              :data="orders"
            >
              <template slot="thead">
                <vs-th sort-key="name">Заявка</vs-th>
                <vs-th sort-key="Наименование_онлайн_савдо">Завод</vs-th>
                <vs-th sort-key="Завод">Продукт</vs-th>
                <vs-th sort-key="Баланс">Дата</vs-th>
                <vs-th sort-key="Категория">Статус</vs-th>
                <vs-th sort-key="Категория">Сумма(в сум)</vs-th>
                <vs-th sort-key="Категория">Дата (доставки)</vs-th>
                <vs-th sort-key="Категория">Действие</vs-th>
              </template>

              <template slot-scope="{ data }" class="scr">
                <tbody>
                  <vs-tr
                    :data="tr"
                    :key="indextr"
                    v-for="(tr, indextr) in data"
                  >
                    <vs-td>
                        <p> № {{ tr.order_number }}</p>
                    </vs-td>

                    <vs-td>
                      <p>{{ tr.username }}</p>
                    </vs-td>

                    <vs-td>
                      <p>
                        {{ tr.id }}
                      </p>
                    </vs-td>
                    <vs-td>
                      <p>
                        {{ tr.date_ordered }}
                      </p>
                    </vs-td>
                    <vs-td>
                        <vs-chip v-if="tr.status === 0" class="status">
                          <span style="font-size: 11px; color: #ffffff">
                            Ожидается
                          </span>
                        </vs-chip>
                        <vs-chip style="background: rgb(49, 183, 120) !important" v-if="tr.status === 1" class="status">
                          <span style="font-size: 11px; color: #ffffff;">
                            Completed
                          </span>
                        </vs-chip>
                    </vs-td>
                    <vs-td>
                      {{ tr.total_price }} <span class="ml-1" >Sum</span>
                    </vs-td>
                    <vs-td>
                      {{ tr.delivery_date }}
                    </vs-td>
                    <vs-td>
                      <span style="color: #31B778"  class="material-icons">phone</span>  
                    </vs-td>
                  </vs-tr>
                </tbody>
              </template>
        </vs-table>
  </div>
</template>
<script>
export default {
  computed: {
    orders(){
    return  this.$store.state.product.orders
    },
    queriedItems() {
      return this.$refs.table
        ? this.$refs.table.queriedResults.length
        : this.products.length;
    },
  },
  data: () => ({
    editActive: false,
    edit: null,
    editProp: {},
    datas: [],
    search: "",
    allCheck: false,
    page: 1,
    max: 6,
    active: 0,
    itemsPerPage: 4,
    selected: [],
  }),
  created(){
    this.$store.dispatch('product/GetOrder')
  }
}
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;600;700;800;900&display=swap");
.status {
  background: #ea5455 !important;
}
.center {
   .vs-pagination--li.is-current {
       .effect{
         background: #135c81  !important;
       }
   }
   .vs-checkbox-primary {
     input:checked+.vs-checkbox{
       background: #135c81  !important;
       border: none !important;
     }
   }
  .vs-con-table {
    .vs-table {
      .vs-table--thead{
        background: linear-gradient(90deg, #5E585C 0%, #000000 100%);
        border-radius: 5.9434px;
        th{
          padding: 12px 15px !important;
        }
      }
      th.td-check {
        .con-td-check {
          box-shadow: none !important;
        }
      }
      th {
        padding: 12px 0px;
        padding-left: 20px;
        padding-right: 0px;
        .vs-table-text {
          font-family: Inter;
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          line-height: 140%;
          letter-spacing: -0.262146px;

          /* Body */
          color: white;
        }
      }

      tr {
        background: transparent !important;
        td {
             padding: 20px 15px !important;
          // padding-left: 0px !important ;
          font-family: Inter;
          font-style: normal;
          font-weight: 500;
          font-size: 12px !important;
          line-height: 140%;
          text-align: start;
          letter-spacing: -0.262146px;
          color: #767676;
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
  }
}
</style>