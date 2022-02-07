<template>
  <div>
    <transition name="show">
      <div class="overlay" v-show="isSidebarActiveLocal">
        <div class="sidebar">
          <div class="actions">
            <feather-icon
              :icon="'XIcon'"
              @click="Reset()"
              class="icon"
              svgClasses="h-6 w-9"
            />
          </div>
          <div class="body">
            <h2 class="filter">Выберите необходимые данные</h2>
            <form @submit.prevent="submitData()">
              <div class="form-input">
                <h4>Дата доставки</h4>
                <input type="date" v-model="date" id="date" />
              </div>
              <div class="form-input">
                <h4>Тип заказа</h4>
                <v-select
                  :options="orders"
                  label="text"
                  v-model="type"
                  id="select-state"
                >
                  <template #open-indicator="{ attributes }">
                    <span v-bind="attributes">
                      <img
                        src="../../assets/images/icons/select-icon.svg"
                        alt=""
                      />
                    </span>
                  </template>
                </v-select>
              </div>
              <div class="form-input">
                <h4>Тип доставки</h4>
                <v-select
                  :options="order_type"
                  label="text"
                  v-model="ordertype"
                  id="select-state"
                >
                  <template #open-indicator="{ attributes }">
                    <span v-bind="attributes">
                      <img
                        src="../../assets/images/icons/select-icon.svg"
                        alt=""
                      />
                    </span>
                  </template>
                </v-select>
              </div>
              <div class="actions">
                <my-button
                  style="margin-left: 9px"
                  type="button"
                  @click.native="Reset()"
                  :width="167"
                  bgColor="#EDF1FD"
                  color="#4679EC"
                  title="Отменить"
                ></my-button>
                <my-button
                  style="margin-left: 9px"
                  type="submit"
                  :width="167"
                  title="Подтвердить"
                ></my-button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </transition>
    <v-notification
      header="Error"
      :is_success="false"
      btnFirst="Вернуться"
      :isShow="notificationError.show"
      :content="notificationError.content"
      @handlerOne="handlerOneError"
    ></v-notification>
    <v-notification
      :isShow="notification.show"
      :is_success="notification.is_success"
      :header="notification.header"
      :content="notification.content"
      :btnFirst="notification.btnFirst"
      :btnSecond="notification.btnSecond"
      @handlerOne="handlerOne"
      @handlerTwo="handlerTwo"
    ></v-notification>
  </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {
      date: null,
      type: null,
      ordertype: null,
      date1: new Date("YYYY-MM-DD"),
      orders: [
        {
          text: this.$t("cart.type1"),
          value: "DEALER_PURCHASE_ORDER",
        },
        {
          text: this.$t("cart.type2"),
          value: "DEALER_RETURN_ORDER",
        },
        {
          text: this.$t("cart.type3"),
          value: "DEALER_SPECIAL_ORDER",
        },
      ],
      order_type: [
        {
          value: "THROUGH_THE_BASE",
          text: this.$t("cart.dtype1"),
        },
        {
          value: "DIRECT_DELIVERY",
          text: this.$t("cart.dtype2"),
        },
      ],
      notification: {
        show: false,
        is_success: true,
        header: "",
        content: "",
        btnFirst: "",
        btnSecond: "",
      },
      notificationError: {
        show: false,
        content: "",
      },
    };
  },
  props: {
    isSidebarOrder: {
      type: Boolean,
      required: true,
    },
  },
  watch: {
    isSidebarOrder(val) {
      if (!val) return;
    },
  },
  computed: {
    validateForm() {
      return (
        !this.errors.any() &&
        this.type !== "" &&
        this.ordertype !== "" &&
        this.date !== ""
      );
    },
    isSidebarActiveLocal: {
      get() {
        return this.isSidebarOrder;
      },
      set(val) {
        if (!val) {
          this.$emit("closeSidebarOrder");
        }
      },
    },
  },
  methods: {
    Reset() {
      (this.date = null), (this.type = null); this.ordertype = null
      this.$emit("closeSidebarOrder");
    },
    submitData() {
      console.log(this.date);
      if (this.type !== null && this.ordertype !== null && this.date !== null) {
        this.$store
          .dispatch("product/Order", {
            user_id: parseInt(localStorage.getItem("Id")),
            delivery_date: this.date,
            order_type: this.ordertype.value,
            delivery_type: this.type.value,
          })
          .then((response) => {
            this.notification = {
              show: true,
              is_success: true,
              header: "Ok",
              content: this.$t("cart.successOffer"),
              btnFirst: "Вернуться",
              btnSecond: "OK",
            };
            setTimeout(() => {
              this.$store.dispatch("addUser/NotisfyGet");
            }, 4000);
            // window.location.reload()
            this.$store.state.product.carts = null;
          })
          .catch((err) => {
          this.notificationError = {
            show: true,
            content: `${err.response.data.detail}`,
          };

          });
        this.Reset();
      } else {
        this.$vs.notify({
          text: this.$t("auth.fillCorrect"),
          iconPack: "feather",
          icon: "icon-alert-circle",
          color: "danger",
        });
      }
    },
        handlerOne() {
      this.notification.show = false;
    },
    handlerTwo() {
       this.notification.show = false;
    },
    handlerOneError() {
      this.notificationError = {
        show: false,
        content: "",
      };
    },
  },
};
</script>
<style lang="scss" scoped>
input[type="date"] {
  border: 0.886581px solid #e3ebfc;
  box-sizing: border-box;
  border-radius: 8.86582px;
  height: 48px;
  width: 375px;
  padding: 20px 15px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: #60739f;
     background:
    #f6f8fe
    url("../../assets/images/icons/calendar.svg")
    right 1rem
    center
    no-repeat;
}
::-webkit-clear-button,
::-webkit-inner-spin-button {
  display:none;
}
::-webkit-calendar-picker-indicator {
  position:absolute;
  width:2.5rem;
  height:100%;
  top:0;
  right:0;
  bottom:0;
  
  opacity:0;
  cursor:pointer;
  
  color:rgba(0, 120, 250, 1);
  background:rgba(0, 120, 250, 1);
 
}
</style>