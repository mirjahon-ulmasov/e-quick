<template>
    <div>
            <vs-popup
      background-color="rgb(45 39 39 / 70%)"
      background-color-popup=" #FFFFFF"
      class=""
      :active.sync="isSidebarActiveLocal"
    >
    <h2 class="title" >
        {{ $t('saveTemp') }}
    </h2>
    <input @keypress.enter="submitData()" v-model="NameWab" type="text">
       <div class="flex justify-center mt-16">
        <vs-button  @click="isSidebarActiveLocal = false" class="no">
            {{ $t('cart.close') }}
        </vs-button>
        <vs-button :disabled="!NameWab"  @click="submitData()" class="ok">
          {{ $t('cart.submit') }}
        </vs-button>
    </div>
    </vs-popup>
    </div>
</template>
<script>
export default {
  name: '',
  data () {
    return {
    NameWab: '',
    }
  },
  props: {
    isPopUpTemp: {
      type: Boolean,
      required: true
    }
  },
  watch: {
    isPopUpTemp (val) {
      if (!val) return
    }
  },
  computed: {
    isSidebarActiveLocal: {
      get () {
        return this.isPopUpTemp
      },
      set (val) {
        if (!val) {
          this.$emit('closeSidebarTemp')
        }
      }
    }
  },
  methods:{
    submitData() {
      const payload = {
        template_name: this.NameWab,
        user_id: parseInt(localStorage.getItem("Id")),
        cart_id:  this.$store.state.product.carts.id,
      };
      this.$store
        .dispatch("product/PostTemplates", payload)
        .then((response) => {
          this.$vs.notify({
            title: 'OK',
            text: this.$t('created'),
            iconPack: "feather",
            icon: "icon-alert-circle",
            color: "success",
          });
          this.NameWab = null;
          this.isSidebarActiveLocal = false
        })
        .catch((err) => {
          this.$vs.notify({
            title: "Error",
            text: err,
            iconPack: "feather",
            icon: "icon-alert-circle",
            color: "danger",
          });
        });
    },
  }
}
</script>
<style scoped>
.title{
    font-family: Montserrat;
font-style: normal;
font-weight: bold;
font-size: 20.3179px;
line-height: 25px;
/* identical to box height */
    margin-top: -11px;
    text-align: center;
color: #000000;
}
input{
    width: 506.32px;
height: 45.51px;
border: 1.72852px solid #000000;
box-sizing: border-box;
border-radius: 7.34832px;
font-family: Montserrat;
font-style: normal;
font-weight: normal;
font-size: 20.3179px;
padding: 0px 15px;
line-height: 25px;
/* identical to box height */
margin-top: 43px;
margin-left: 65px;
color: #000000;
}
.ok{
    width: 235px;
background: linear-gradient(81.75deg, #3C4A5A 99.96%, #3A9FD1 183.61%) !important;
border-radius: 8px;
font-family: Montserrat;
font-style: normal;
font-weight: 500;
font-size: 13.2491px;
line-height: 18px;
/* or 133% */
margin-left: 30px;
text-align: center;
letter-spacing: -0.02em;

color: #FFFFFF;
padding: 5px !important;
}
.ok:hover{
    box-shadow: none !important;
}
.no{
    width: 235px;
background: #F2F2F2 !important;
border-radius: 4.21062px;
font-family: Montserrat;
font-style: normal;
font-weight: 500;
font-size: 13.2491px;
line-height: 18px;
/* or 133% */

text-align: center;
letter-spacing: -0.02em;
/* margin-right: 10px; */
color: #000000;
}
.no:hover{
    box-shadow: none !important;
}
</style>