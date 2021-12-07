<template>
    <div>
    <vs-popup
      background-color="rgb(45 39 39 / 70%)"
      background-color-popup="linear-gradient(90deg, #5E585C 0%, #000000 100%)"
      class=""
      :active.sync="isSidebarActiveLocal"
    >
      <h1
        style="
          font-family: Montserrat;
          text-align: center;
          font-weight: bold;
          font-size: 25px;
          line-height: 30px;
          color: #ffffff;
        "
      >
        Выберите необходимые данные
      </h1>
      <div class="flex" style="margin-top: 40px">
        <div class="w-1/2">
          <h3
            style="
              font-family: Montserrat;
              font-style: normal;
              font-weight: normal;
              font-size: 29px;
              line-height: 36px;
              color: #ffffff;
            "
          >
            Дата доставки:
          </h3>
          <h3
            style="
              margin-top: 40px;
              font-family: Montserrat;
              font-style: normal;
              font-weight: normal;
              font-size: 29px;
              line-height: 36px;
              color: #ffffff;
            "
          >
            Тип заказа:
          </h3>
          <h3
            style="
              margin-top: 40px;
              font-family: Montserrat;
              font-style: normal;
              font-weight: normal;
              font-size: 29px;
              line-height: 36px;
              color: #ffffff;
            "
          >
            Тип доставки:
          </h3>
        <vs-button class="close" 
          @click="isSidebarActiveLocal = false" >Закрыть</vs-button>
        </div>
        <div class="w-1/2">
          <input
          v-validate="'required'"
            class="picker"
            type="date"
            style="height: 55px"
            placeholder="Select Date"
            v-model="date"
          >
          <select v-model="ordertype" v-validate="'required'" class="picker" style="margin-top: 20px; height: 55px">
            <option v-for="(item, i) in orders" :key="i" :value="item.value" >{{ item.text }}</option>
          </select>
          <select v-model="type" v-validate="'required'" class="picker" style="margin-top: 20px; height: 55px">
            <option value="THROUGH_THE_BASE" >ЧЕРЕЗ БАЗУ</option>
            <option value="DIRECT_DELIVERY" >ПРЯМАЯ ДОСТАВКА</option>
          </select>
          <vs-button @click="submitData" style="margin-top: 25px !important" class="confirmac">Подтвердить</vs-button>
        </div>
      </div>
    </vs-popup>
    </div>
</template>
<script>
export default {
  name: "",
    data(){
    return{
    date: null,
    type: null,
    ordertype: null,
    orders: [
      {
        text: "ЗАКАЗ ДИЛЕРА НА ПОКУПКУ",
        value: "DEALER_PURCHASE_ORDER"
      },
      {
        text: "ЗАКАЗ ДИЛЕРА ВОЗВРАТА",
        value: "DEALER_RETURN_ORDER"
      },
      {
        text: "СПЕЦИАЛЬНЫЙ ЗАКАЗ ДИЛЕРА",
        value: "DEALER_SPECIAL_ORDER"
      }
    ]
    }
  },
    props: {
    isPopUpOrder: {
      type: Boolean,
      required: true
    },
  },
    watch: {
    isPopUpOrder (val) {
      if (!val) return
    }
  },
    computed: {
      validateForm(){
       return !this.errors.any() && this.type !== '' && this.ordertype !== '' && this.date !== ''
      },
    isSidebarActiveLocal: {
      get () {
        return this.isPopUpOrder
      },
      set (val) {
        if (!val) {
          this.$emit('closeSidebarOrder')
        }
      }
    },
    },
  methods:{
    Reset(){
    this.date = null,
    this.type = null
      this.$emit('closeSidebarOrder')
    },
    submitData() {
         if(this.type !== null && this.ordertype !== null && this.date !== null){
          this.$store.dispatch('product/Order', {
            user_id: parseInt(localStorage.getItem('Id')),
            delivery_date: this.date,
            order_type: this.ordertype,
            delivery_type: this.type
            }).then(response => {
            this.$vs.notify({
            title: 'Ordered',
            text: "Muvafayaqiyta",
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'success'
          })
          // window.location.reload()
          this.$store.state.product.carts = null
            })
            .catch(err => { 
            this.$vs.notify({
            title: 'Error',
            text: err,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger'
          })
              console.error(err) })
          this.Reset()
         }
         else{
          this.$vs.notify({
            title: 'Error',
            text: 'Formani toliq toldiring',
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger'
          })
         }
    },
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
  width: 289.15px;
  /* height: 37.31px; */
  background: linear-gradient(102.4deg, #3f4f61 -160.6%, #3a9fd1 156.82%) !important;
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
.confirmac:hover{
  box-shadow: none !important;
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
.picker select {
  padding-left: 6px;
  padding-right: 6px;
}
 select::after {
    content:'\25BC';
    display:inline-block;
    color:#000;
    background-color:#fff;
    margin-left:-17px;   /* remove the damn :after space */
    pointer-events:none; /* let the click pass trough */
}
 .picker option{
    color: #000;
    height: 30px !important;
}
  input[type="date"]::-webkit-calendar-picker-indicator{
    filter: invert(1);
    padding-right: 15px !important;
} 
.close {
  margin-top: 20px !important;
  width: 289.15px;
  /* height: 37.31px; */
 margin-top: 45px !important;
  background: #f2f2f2 !important;
  border-radius: 5.18092px;
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 16.3022px;
  line-height: 22px;
  /* or 133% */

  text-align: center;
  letter-spacing: -0.02em;

  color: #000000 !important;
}
.close:hover{
  box-shadow: none !important;
}
</style>