<template>
    <div>
    <vs-popup
      background-color="rgb(45 39 39 / 70%)"
      background-color-popup="#FFFFFF"
      :active.sync="isSidebarActiveLocal"
    >
      <h1
        style="
          font-family: Montserrat;
          text-align: center;
          font-weight: bold;
          font-size: 25px;
          line-height: 30px;
          color: #000000;
        "
      >
       {{ $t('cart.sOfffer') }}
      </h1>
      <div class="flex pl-10" style="margin-top: 40px">
        <div class="w-1/2">
          <h3
            style="
              font-family: Montserrat;
              font-style: normal;
              font-weight: normal;
              font-size: 29px;
              line-height: 36px;
              color: #000000;
            "
          >
            {{ $t('cart.dOffer') }}
          </h3>
          <h3
            style="
              margin-top: 40px;
              font-family: Montserrat;
              font-style: normal;
              font-weight: normal;
              font-size: 29px;
              line-height: 36px;
              color: #000000;
            "
          >
            {{ $t('cart.tOffer') }}
          </h3>
          <h3
            style="
              margin-top: 40px;
              font-family: Montserrat;
              font-style: normal;
              font-weight: normal;
              font-size: 29px;
              line-height: 36px;
              color: #000000;
            "
          >
            {{ $t('cart.dyOffer') }}
          </h3>
        <vs-button class="close" 
          @click="isSidebarActiveLocal = false" >{{ $t('cart.close') }}</vs-button>
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
            <option value="DEALER_PURCHASE_ORDER" >{{ $t('cart.type1') }}</option>
             <option value="DEALER_RETURN_ORDER" >{{ $t('cart.type2') }}</option>
              <option value="DEALER_SPECIAL_ORDER" >{{ $t('cart.type3') }}</option>
          </select>
          <select v-model="type" v-validate="'required'" class="picker" style="margin-top: 20px; height: 55px">
            <option value="THROUGH_THE_BASE" >{{ $t('cart.dtype1') }}</option>
            <option value="DIRECT_DELIVERY" >{{ $t('cart.dtype2') }}</option>
          </select>
          <vs-button @click="submitData" style="margin-top: 25px !important" class="confirmac">{{ $t('cart.submit') }}</vs-button>
        </div>
      </div>
    </vs-popup>
    </div>
</template>
<script>
export default {
  name: '',
  data () {
    return {
      date: null,
      type: null,
      ordertype: null,
        date1: new Date('YYYY-MM-DD'),
      orders: [
        {
          text: 'ЗНП',
          value: 'DEALER_PURCHASE_ORDER'
        },
        {
          text: 'ЗДВ',
          value: 'DEALER_RETURN_ORDER'
        },
        {
          text: 'СЗД',
          value: 'DEALER_SPECIAL_ORDER'
        }
      ]
    }
  },
  props: {
    isPopUpOrder: {
      type: Boolean,
      required: true
    }
  },
  watch: {
    isPopUpOrder (val) {
      if (!val) return
    }
  },
  computed: {
    validateForm () {
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
    }
  },
  methods:{
    Reset () {
      this.date = null,
      this.type = null
      this.$emit('closeSidebarOrder')
    },
    submitData () {
      console.log(this.date);
      if (this.type !== null && this.ordertype !== null && this.date !== null) {
        this.$store.dispatch('product/Order', {
          user_id: parseInt(localStorage.getItem('Id')),
          delivery_date: this.date,
          order_type: this.ordertype,
          delivery_type: this.type
        }).then(response => {
          this.$vs.notify({
            text: this.$t('cart.successOffer'),
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'success'
          })
          setTimeout(() => {
            this.$store.dispatch("addUser/NotisfyGet");
          }, 4000);
          // window.location.reload()
          this.$store.state.product.carts = null
        })
          .catch(err => { 
            this.$vs.notify({
              text: err,
              iconPack: 'feather',
              icon: 'icon-alert-circle',
              color: 'danger'
            })
            console.error(err) 
          })
        this.Reset()
      } else {
        this.$vs.notify({
          text: this.$t('auth.fillCorrect'),
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        })
      }
    }
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
  border: 1.01618px solid #000000;
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

  color: #000000;
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
  background: url("~@/assets/images/pages/product.svg");
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
background: linear-gradient(81.75deg, #3C4A5A 99.96%, #3A9FD1 183.61%) !important;
border-radius: 8px;
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 16.3022px;
  line-height: 22px;
  text-align: center;
  letter-spacing: -0.02em;

  color: #ffffff;
}
.confirmac:hover{
  box-shadow: none !important;
}
.picker {
padding-left: 15px;
  color: #000000;
  width: 289.15px;
  border: 2.12684px solid #000000;
  box-sizing: border-box;
  background: transparent ;
  border-radius: 9.04168px;
  font-family: Montserrat;
font-style: normal;
font-weight: normal;
font-size: 26px;
line-height: 36px;
    -moz-appearance:none; /* Firefox */
    -webkit-appearance:none; /* Safari and Chrome */
    appearance:none;

color: #000000;
}
 select {
  padding-left: 6px;
  padding-right: 6px;
text-indent: 1px;
  text-overflow: '';
  width: 100px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  padding: 2px 2px 2px 2px;
  border: none;
  background: transparent url(http://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/br_down.png) no-repeat 250px center !important;
}
 .picker option{
    color: #000;
    height: 30px !important;
    font-size: 17px;
}
  input[type="date"]::-webkit-calendar-picker-indicator{
    filter: invert(1);
    padding-right: 15px !important;
    color: #000000;
} 
.close {
  margin-top: 20px !important;
  width: 289.15px;
  /* height: 37.31px; */
 margin-top: 45px !important;
  background: #DDDDDD !important;
  border-radius: 5.18092px;
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 16.3022px;
  line-height: 22px;
  /* or 133% */

  text-align: center;
  letter-spacing: -0.02em;
border-radius: 6.06021px;
  color: #000000 !important;
}
.close:hover{
  box-shadow: none !important;
}
</style>