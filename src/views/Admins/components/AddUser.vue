<template>
    <div>
 <vs-prompt class="holamundo" :active.sync="isSidebarActiveLocal">
    <div v-show="!next" class="container">
    <!-- <VuePerfectScrollbar class="scroll-area"> -->
      <div class="form scroll-area" :is="scrollbarTag" :settings="settings"  >
        <h2> User {{ Object.entries(this.data).length === 0 ? "Registeration" : "UPDATE" }} </h2>
        <div class="form__inputs">
            <!-- ROle -->
        <vs-select v-if="!dataId" v-model="position"  placeholder="Role" data-vv-validate-on="blur" class="mt-5 w-full" name="role" >
          <vs-select-item :key="item.id" :value="item.role" :text="item.role" v-for="item in roles" />
        </vs-select>
        <!-- Full name -->
          <input v-model="fullname" placeholder="Full Name" data-vv-validate-on="blur" name="fullname" v-validate="'required'" />
          <span class="text-danger text-sm" v-show="errors.has('fullname')">{{ errors.first('fullname') }}</span>
         <!-- Username -->
          <input v-model="username" placeholder="Username" data-vv-validate-on="blur" name="username" v-validate="'required'" />
          <span class="text-danger text-sm" v-show="errors.has('username')">{{ errors.first('username') }}</span>
         <!-- password -->
          <input 
          v-model="password" 
          placeholder="Password" 
          name="password" 
          ref="password"
          type="password"
          data-vv-validate-on="blur"
          v-validate="'required|min:3|max:10'" />
          <span class="text-danger text-sm" v-show="errors.has('password')">{{ errors.first('password') }}</span>
        <!-- Confrim -->
          <input v-model="confirm" 
          placeholder="Confirm Password" 
          name="confirm" 
          type="password"
          v-validate="'min:3|max:10|confirmed:password'"
          data-vv-validate-on="blur"
          data-vv-as="password" />
          <span class="text-danger text-sm" v-show="errors.has('confirm')">{{ errors.first('confirm') }}</span>
         <!-- email -->
          <input v-model="email" type="text" placeholder="Email"  name="email" data-vv-validate-on="blur" v-validate="'required|email'" />
          <span class="text-danger text-sm" v-show="errors.has('email')">{{ errors.first('email') }}</span>
           <input v-model="phone" type="text" placeholder="Phone Number"  name="phone" data-vv-validate-on="blur" v-validate="'required|min:9|max:10|numeric'" />
          <span class="text-danger text-sm" v-show="errors.has('phone')">{{ errors.first('phone') }}</span>
              <div v-if="dataId !== null && dataId >= 0" class="mt-4 flex justify-around">
                <h5>User Status</h5>
                <vs-switch v-model="active" />
              </div>
      </div>
    </div>
  <!-- </VuePerfectScrollbar> -->
  <!-- Submit reset buttonla -->
          <div class="form__btn" style="margin-left: 12rem; padding-bottom: 20px">
          <vs-button style="background: #f9896b !important;" @click="submitData">Submit</vs-button>
          <vs-button type="reset" @click="Reset" >Cancel</vs-button>
        </div>
    </div>
        <div v-show="next" class="container">
    <!-- <VuePerfectScrollbar class="scroll-area"> -->
      <div class="form scroll-area" :is="scrollbarTag" :settings="settings">
        <h2> User  {{ fullname }} add company </h2>
        <div class="form__inputs">
            <!-- Company -->
              <v-select 
               class="sle"
               v-model="selected" 
               :options="companies" 
               multiple
               label="name" />
      </div>
    </div>
  <!-- </VuePerfectScrollbar> -->
  <!-- Submit reset buttonla -->
          <div class="form__btn" style="margin-left: 12rem; padding-bottom: 20px">
          <vs-button style="background: #f9896b !important;" @click="submitCom">Submit</vs-button>
          <vs-button type="reset" @click="Reset" >Cancel</vs-button>
        </div>
    </div>
    </vs-prompt>
    </div>
</template>
<script>
import vSelect from 'vue-select'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
export default {
  name: "",
    data(){
    return{
    position: 'dealer',
    fullname: '',
    username: '',
    password: '',
    confirm: '',
    next: false,
    email: '',
    phone: '',
    selected: null,
    active: false,
    dataId: null,
    settings: {
        maxScrollbarLength: 60
      },
      role: [
        {text:'Admin', value:'admin'},
        {text:'User', value:'user'},
        {text:'Dealer', value:'dealer'},
      ],
    }
  },
    props: {
    isPopUp: {
      type: Boolean,
      required: true
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
    watch: {
    isPopUp (val) {
      if (!val) return
      if (Object.entries(this.data).length === 0) {
        this.initValues()
        this.$validator.reset()
      } else {
        const { id, username, password, full_name, active, phone_number, role, email } = JSON.parse(JSON.stringify(this.data))
        this.dataId = id
        this.position = role
        this.fullname = full_name
        this.email = email,
        this.phone = phone_number
        this.username = username
        this.password = password
        if(active == 1){
          this.active = true
        }
        else{
          this.active = false
        }
        this.initValues()
      }
      // Object.entries(this.data).length === 0 ? this.initValues() : { this.dataId, this.dataName, this.dataCategory, this.dataOrder_status, this.dataPrice } = JSON.parse(JSON.stringify(this.data))
    }
  },
    computed: {
    roles() {
      return this.$store.state.addUser.roles
    },
    companies() {
      return this.$store.state.dataList.companies
    },
    companie() {
      return this.$store.state.dataList.companies.map(x => x.name)
    },
        user() {
      return this.$store.state.addUser.admins
    },
        scrollbarTag () { return this.$store.getters.scrollbarTag },
    isFormValid () {
      return !this.errors.any()
    },
    isSidebarActiveLocal: {
      get () {
        return this.isPopUp
      },
      set (val) {
        if (!val) {
          this.$emit('closeSidebar')
          this.$validator.reset()
          this.initValues()
        }
      }
    },
    },
  components: { VuePerfectScrollbar, vSelect },
  methods:{
      initValues () {
      if (this.data.id) return
      this.dataId = null
      this.fullname = ''
      this.username = ''
      this.position = ''
      this.email = ''
      this.password = ''
      this.confirm = ''
      // this.active = false
      this.phone = ''
    },
    Reset(){
      this.dataId = null
      this.fullname = ''
      this.username = ''
      this.position = ''
      this.email = ''
      // this.active = false
      this.password = ''
      this.confirm = ''
      this.phone = ''
      this.$emit('closeSidebar')
    },
    submitData() {
          if(this.active === false){
            this.active = -1
          }
          else{
            this.active = 1
          }
          const obj = {
            id: this.dataId,
            username: this.username,
            password: this.password,
            full_name: this.fullname,
            role: this.position,
            active: this.active,
            phone_number: this.phone,
            email: this.email,
          }
          if (this.dataId !== null && this.dataId >= 0) {
            this.$store.dispatch('addUser/updateItem', obj)
           this.$vs.notify({
            title: 'Updated',
            text: 'ok',
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'success'
          })
              this.next = true
            .catch(err => { 
            this.$vs.notify({
            title: 'Error',
            text: err,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger'
          })
             })
          } else {
        this.$validator.validateAll().then(result => {
        if (result) {
            delete obj.id
            delete obj.active
            this.$store.dispatch('addUser/addItem', obj)
            .then(response => {
            this.$vs.notify({
            title: 'Created',
            text: 'ok',
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'success'
          })
          this.next = true
            })
            .catch(err => { 
            this.$vs.notify({
            title: 'Error',
            text:  err.response.data.detail,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger'
          })
              console.error(err)
               })
        }})
          }
    },
    submitCom(){
      let id = this.user.find(x => x.full_name == this.fullname).id
      console.log(id)
      // console.log
      console.log(this.selected, 'list')
      const payload = {
        dealer_id: id,
        company_list: this.selected.map(x => x.id)
      }
      if(this.selected){
             this.$store.dispatch("dataList/AddUserCompanies", payload).then(response => {
          this.$vs.notify({
            title: 'Created',
            text: 'ok',
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'success'
          })
          this.Reset()
          this.next = false
     })
     .catch(err => {
          this.$vs.notify({
            title: 'Error',
            text: err.response.data.detail,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger'
          })
     })
      }
      else{
          this.$vs.notify({
            title: 'Error',
            text: 'Fill correctly, please',
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger'
          })
      }
    },
    scrollHandle(evt) {
        return evt
    },
  },
  created(){
    this.$store.dispatch("dataList/fetchDataCompanies");
    this.$store.dispatch("addUser/fetchRoles");
     this.$store.dispatch("addUser/fetchDataListItems");
  },
  mounted(){
    console.log(this.user, 'data1')
  }
}
</script>
<style scoped>
.scroll-area{
  height: 420px;
}
.text-danger{
    margin-bottom: 15px !important;
    margin-top: -10px  !important;
    margin-left: 7px;
}
</style>