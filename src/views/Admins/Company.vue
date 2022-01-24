<template>
  <div>
    <nav-bar :title="'Компании'" ></nav-bar>
   <h1>Hello fgsdfgsdge</h1>
  </div>
</template>
<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
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
  components: {  VuePerfectScrollbar },
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

</style>
