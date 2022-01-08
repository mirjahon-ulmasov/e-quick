<template>
  <div id="data-list-list-view" class="data-list-container">
    <vs-table 
              ref="table"
              maxHeight="300px"
              pagination
              :max-items="itemsPerPage"
              search
              :data="products"
     >
      <template slot="thead">
        <vs-th sort-key="ИД_онлайн_савдо">ИД онлайн савдо</vs-th>
        <vs-th sort-key="Наименование_онлайн_савдо">Наименование онлайн савдо</vs-th>
        <vs-th sort-key="Завод">Завод</vs-th>
        <vs-th sort-key="Баланс">Баланс</vs-th>
        <vs-th sort-key="Категория">Категория</vs-th>
        <vs-th sort-key="Название_системы/Субкатегория" >Название системы / Субкатегория</vs-th>
        <vs-th sort-key="SAP_код">SAP код</vs-th>
        <vs-th sort-key="Короткое_наименование_SAP" >Короткое наименование SAP</vs-th>
      </template>

        <template slot-scope="{ data }" >
          <tbody>
            <vs-tr 
            :data="tr" 
            :key="indextr" v-for="(tr, indextr) in data">

              <vs-td>
                <p class="product-category">{{ tr.ИД_онлайн_савдо }}</p>
              </vs-td>

              <vs-td>
                <p >{{ tr.Наименование_онлайн_савдо }}</p>
              </vs-td>

              <vs-td>
              <p>
                  {{ tr.Завод }}
              </p>
              </vs-td>

              <vs-td>
               <p style="font-size: 11px" >
                 {{ tr.Баланс }}
               </p>
              </vs-td>

              <vs-td>
                <p class="product-price">
                  {{ tr.Категория }}
                </p>
              </vs-td>

              <vs-td >
                {{ tr.Название_системы/Субкатегория }}
              </vs-td>
              <vs-td >
                <p>
                  {{ tr.SAP_код }}
                </p>
              </vs-td>
              <vs-td>
                <p>
                  {{ tr.Короткое_наименование_SAP }}
                </p>
              </vs-td>
            </vs-tr>
          </tbody>
        </template>
    </vs-table>
  </div>
</template>

<script>
// import DataViewSidebar from '../DataViewSidebar.vue'
// import moduleDataList from '@/store/data-list/moduleDataList.js'
// import product from './json/data.json'
// import product2 from './data2.json'
export default {
  components: {
    // DataViewSidebar
  },
  data () {
    return {
      selected: [],
      itemsPerPage: 4,
      isMounted: false,

      // Data Sidebar
      addNewDataSidebar: false,
      sidebarData: {}
    }
  },
  computed: {
    currentPage () {
      if (this.isMounted) {
        return this.$refs.table.currentx
      }
      return 0
    },
    products () {
      return this.$store.state.dataList.products
    },
    queriedItems () {
      return this.$refs.table ? this.$refs.table.queriedResults.length : this.products.length
    }
  },
  methods: {
    addNewData () {
      this.sidebarData = {}
      this.toggleDataSidebar(true)
    },
    deleteData (id) {
      this.$store.dispatch('dataList/removeItem', id).catch(err => { console.error(err) })
    },
    editData (data) {
      // this.sidebarData = JSON.parse(JSON.stringify(this.blankData))
      this.sidebarData = data
      this.toggleDataSidebar(true)
    },
    getOrderStatusColor (status) {
      if (status === 'on_hold')   return 'warning'
      if (status === 'delivered') return 'success'
      if (status === 'canceled')  return 'danger'
      return 'primary'
    },
    getPopularityColor (num) {
      if (num > 90)  return 'success'
      if (num > 70)  return 'primary'
      if (num >= 50) return 'warning'
      if (num < 50)  return 'danger'
      return 'primary'
    },
    toggleDataSidebar (val = false) {
      this.addNewDataSidebar = val
    }
  },
  created () {

  },
  mounted () {
    this.$store.dispatch('dataList/fetchDataListItems')
    this.isMounted = true
  }
}
</script>

<style scoped lang="scss">
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

      .vs-table--search{
        padding-top: 0;

        .vs-table--search-input {
          padding: 0.9rem 2.5rem;
          font-size: 1rem;

          &+i {
            left: 1rem;
          }

          &:focus+i {
            left: 1rem;
          }
        }
      }
    }

    .vs-table {
      border-collapse: separate;
      border-spacing: 0 1.3rem;
      padding: 0 1rem;
      tr{
          box-shadow: 0 4px 20px 0 rgba(0,0,0,.05);
          td{
            padding: 10px;
            &:first-child{
              border-top-left-radius: .5rem;
              border-bottom-left-radius: .5rem;
            }
            &:last-child{
              border-top-right-radius: .5rem;
              border-bottom-right-radius: .5rem;
            }
          }
          td.td-check{
            padding: 20px !important;
          }
      }
    }
    .vs-table--thead{
      th {
        padding-top: 0;
        padding-bottom: 0;

        .vs-table-text{
          text-transform: uppercase;
          font-weight: 600;
        }
      }
      th.td-check{
        padding: 0 15px !important;
      }
      tr{
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
