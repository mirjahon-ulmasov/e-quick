<template>
    <div>
    <vs-popup
      background-color="rgb(45 39 39 / 70%)"
      :active.sync="isSidebarActiveLocal"
    >
      <div class="flex">
        <div class="w-1/3" style="margin-left: 70px; !important;" >
          <h2
            style="
              font-family: Montserrat;
              font-weight: bold;
              font-size: 17px;
              line-height: 17px;
              color: #ffffff;
            "
          >
            Продукты
          </h2>
          <div 
          :style="{ 'background-image':  `url(${ picture })`}"
          class="photo" >
            <div class="inner" 
            style="padding: 5px">
              <span
                style="
                  font-family: Montserrat;
                  font-weight: bold;
                  font-size: 10px;
                  line-height: 12px;

                  color: #ffffff;
                "
              >
                {{ name }}
              </span>
            </div>
          </div>
        </div>
        <div class="w-4/5 flex" style="justify-content: space-around">
          <div style="text-align: center">
            <h2
              style="
                font-family: Montserrat;
                font-weight: bold;
                font-size: 18px;
                margin-top: 5px;
                line-height: 17px;
                color: #ffffff;
              "
            >
              Количество:
            </h2>
            <div class="add-item">
              <span @click="Minus()" > - </span>
              <span class="ml-6 mr-6"> {{ count }} </span>
              <span @click="Plus()"> + </span>
            </div>
            <button
            @click="submitData()"
              class="confirmac"
              style="
                height: 26px;
                width: 170px;
                margin-top: 20px !important;
                font-size: 11px;
                font-weight: normal;
              "
            >
              Создать заявку
            </button>
          </div>
          <div style="text-align: start;margin-left: 14px;">
            <h2
              style="
                font-family: Montserrat;
                font-weight: bold;
                font-size: 18px;
                margin-top: 5px;
                line-height: 17px;
                color: #ffffff;
              "
            >
              Цена:
            </h2>
            <input
              style="width: 179px; height: 27px; margin-top: 15px"
              type="text"
              v-model="calcPrice"
              class="picker"
            />
            <button
            @click="Reset()"
              class="close"
              style="
                height: 26px;
                width: 170px;
                margin-top: 20px !important;
                font-size: 11px;
                font-weight: normal;
              "
            >
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </vs-popup>
    </div>
</template>
<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
export default {
  name: "",
    data(){
    return{
    picture: null,
    name: '',
    description: '',
    price: null,
    calcPrice: null,
    count: 1,
    dataId: null,
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
        const { id, name, picture, price } = JSON.parse(JSON.stringify(this.data))
        this.dataId = id,
        this.name = name
        this.picture = picture
        this.calcPrice = price
        this.price = price
        this.initValues()
      }
      // Object.entries(this.data).length === 0 ? this.initValues() : { this.dataId, this.dataName, this.dataCategory, this.dataOrder_status, this.dataPrice } = JSON.parse(JSON.stringify(this.data))
    }
  },
    computed: {
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
        this.price = null
        this.name = ''
        this.count = 1
        this.picture = null
    },
    Reset(){
        this.dataId = null
        this.price = null
        this.name = ''
        this.count = 1
        this.picture = null
      this.$emit('closeSidebar')
    },
    submitData() {
          if (this.dataId !== null && this.dataId >= 0) {
            this.$store.dispatch('product/AddCart', {
            user_id: parseInt(localStorage.getItem('Id')),
            product_id: this.dataId,
            quantity: this.count
            }).catch(err => { console.error(err) })
          } 
          // this.$emit('closeSidebar')
          // some chANGES
          this.Reset()
    },
    scrollHandle(evt) {
        return evt
    },
        Minus() {
            if(this.count > 1){
                this.count = this.count - 1
                this.calcPrice =   this.price / this.count
            }
            else{
                this.count =  1
                this.calcPrice =   this.price
            }
        },
        Plus() {
            this.count = this.count + 1
            this.calcPrice =  this.count * this.price
        },
  },
  created(){
   this.$store.dispatch('product/GetProduct')
  },
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
.add-item {
  margin-top: 15px !important;
  width: 88.56px;
  margin-left: 38px;
  height: 27px;
  border: 1.01618px solid #ffffff;
  box-sizing: border-box;
  border-radius: 4.32px;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.add-item span {
  font-family: Lato;
  cursor: pointer;
  font-style: normal;
  font-weight: 800;
  font-size: 19.44px;
  line-height: 18px;
  /* identical to box height, or 94% */

  letter-spacing: -0.02em;
  text-transform: uppercase;

  color: #ffffff;
}
.add-item span:hover{
color: rgba(58, 159, 209, 1);
}
.photo {
    margin-right: 10px;
  width: auto;
  height: 76px;
  display: flex;
  margin-top: 12px;
  align-items: flex-end;
  background: url("~@/assets/dealer/img/svg/components/product.svg");
  /* background: url(.png); */
  border-radius: 9.47126px;
}
.inner {
  width: 100%;

  background: linear-gradient(99.52deg, #3f4f61 -14.96%, #3a9fd1 156.83%);
  border-radius: 2px;
}
.confirmac {
  margin-top: 45px !important;
  width: 289.15px;
  height: 37.31px;
  background: linear-gradient(102.4deg, #3f4f61 -160.6%, #3a9fd1 156.82%);
  border-radius: 3.73099px;
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 16.3022px;
  line-height: 22px;
  /* or 133% */

  text-align: center;
  letter-spacing: -0.02em;

  color: #ffffff;
}
.picker {
padding-left: 15px;
  color: white;
  width: 289.15px;
  border: 2.12684px solid #ffffff;
  box-sizing: border-box;
  background: transparent !important;
  border-radius: 9.04168px;
}
</style>