<template>
    <div>
 <vs-prompt class="holamundo" :active.sync="isSidebarActiveLocal">
    <div class="container">
    <!-- <VuePerfectScrollbar class="scroll-area"> -->
      <div class="form scroll-area" :is="scrollbarTag" :settings="settings"  >
        <h2> Company {{ Object.entries(this.data).length === 0 ? "Registeration" : "UPDATE" }} </h2>
        <div class="form__inputs">
        <vs-select v-model="position"  placeholder="Parent ID" data-vv-validate-on="blur" class="mt-5 w-full" name="role" v-validate="'required'" >
          <vs-select-item :key="item.id" :value="item.id" :text="item.name" v-for="item in ids" />
        </vs-select>
         <span class="text-danger text-sm" v-show="errors.has('role')">{{ errors.first('role') }}</span>
        <!-- Full name -->
          <input 
          v-model="fullname" 
          placeholder="Company Name" 
          data-vv-validate-on="blur" name="company" v-validate="'required'" />
          <span class="text-danger text-sm" v-show="errors.has('company')">{{ errors.first('company') }}</span>
          <textarea
          v-model="description"
          placeholder="Description"
          data-vv-validate-on="blur" name="description" v-validate="'required'"
          ></textarea>
           <span class="text-danger text-sm" v-show="errors.has('description')">{{ errors.first('description') }}</span>
          <div v-for="(input,k) in inputs" :key="k" >
               <div class="form_key_value mb-3">
                 <input type="text" placeholder="Key" v-model="input.key" />
                 <input type="text" placeholder="Value" v-model="input.value" />
               </div>
                <span class="ml-4">
                  <feather-icon 
                  icon="PlusIcon" svgClasses="h-8 w-8 cursor-pointer text-success"  class="mt-2" 
                  @click="add(k)" v-show="k == inputs.length-1" />
                  <feather-icon 
                  icon="MinusIcon" svgClasses="h-8 w-8 cursor-pointer text-danger" class="ml-2 mt-2" 
                  @click="remove(k)" v-show="k || ( !k && inputs.length > 1)" />
              </span>
          </div>
        </div>
      </div>
  <!-- </VuePerfectScrollbar> -->
  <!-- Submit reset buttonla -->
          <div class="form__btn" style="margin-left: 12rem; padding-bottom: 20px">
          <vs-button style="background: #f9896b !important;" :disabled="!isFormValid" @click="submitData">Submit</vs-button>
          <vs-button type="reset" @click="Reset" >Cancel</vs-button>
        </div>
    </div>
    </vs-prompt>
    </div>
</template>
<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
export default {
  name: "",
    data(){
    return{
    ids: null,
    position: '',
    fullname: '',
    ok: '',
    inputs: [
        {
        key: '',
        value: '',
        }
        ],
      options: {},
    description: '',
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
        const { id, name, parent_id, options, description } = JSON.parse(JSON.stringify(this.data))
        this.dataId = id
        this.position = parent_id
        this.description = description
        this.fullname = name
        this.ok = options
        this.initValues()
      }
      // Object.entries(this.data).length === 0 ? this.initValues() : { this.dataId, this.dataName, this.dataCategory, this.dataOrder_status, this.dataPrice } = JSON.parse(JSON.stringify(this.data))
    }
  },
    computed: {
    company() {
      return this.$store.state.dataList.products;
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
  components: { VuePerfectScrollbar },
  methods:{
      initValues () {
      if (this.data.id) return
        this.dataId = null
        this.position = null
        this.inputs = [
        {
        key: this.key,
        value: this.value
        }
        ],
        this.description = ''
        this.fullname = ''
    },
    Reset(){
        this.dataId = null
        this.position = null
        this.inputs = [
        {
        key: this.key,
        value: this.value
        }
        ],
        this.description = ''
        this.fullname = ''
      this.$emit('closeSidebar')
    },
    submitData() {
        this.options =  this.inputs.reduce((acc, {key, value}) => ({...acc, [key]: value}), {})
        console.log(this.options, 'option')
      this.$validator.validateAll().then(result => {
        if (result) {
          const obj = {
            id: this.dataId,
            name: this.fullname,
            parent_id: this.position,
            description: this.description,
            options: this.options
          }
          if (this.dataId !== null && this.dataId >= 0) {
            this.$store.dispatch('dataList/updateItem', obj).catch(err => { console.error(err) })
          } else {
            delete obj.id
            this.$store.dispatch('dataList/addItem', obj).catch(err => { console.error(err) })
          }
          // this.$emit('closeSidebar')
          this.Reset()
        }
      })
    },
    scrollHandle(evt) {
        return evt
    },
        add(index) {
            this.inputs.push({ key: '', value: '' } );
        },
        remove(index) {
            this.options.splice(index, 1);
        },
  },
  created(){
    this.$store.dispatch("dataList/fetchDataListItems");
    this.$store.dispatch('dataList/fetchDataListItems').then(
      response => {
        this.ids = response.data
      })
  },
  mounted(){
      this.ids = this.company.map(x => x.id)
     
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