<template>
  <div>
    <transition name="show">
      <div class="overlay" v-show="isSidebarActiveLocal">
        <div class="close" @click="isSidebarActiveLocal = false"></div>
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
            <h2 class="filter">{{ $t("cart.sOfffer") }}</h2>
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
    <transition name="show">
      <div class="created" v-show="created" >
        <feather-icon
          :icon="'CheckIcon'"
          class="icon-checkk"
          svgClasses="h-6 w-9"
        />
        <h2>
          Заказ создан. <router-link to="/dealer/journal">Журнал</router-link>
        </h2>
        <feather-icon
          :icon="'XIcon'"
          @click="created = false"
          class="icon"
          svgClasses="h-6 w-9"
        />
      </div>
    </transition>
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
      created: false,
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
      (this.date = null), (this.type = null);
      this.ordertype = null;
      this.$emit("closeSidebarOrder");
    },
    submitData() {
      if (this.type !== null && this.ordertype !== null && this.date !== null) {
        this.$store
          .dispatch("product/Order", {
            user_id: parseInt(localStorage.getItem("Id")),
            delivery_date: this.date,
            order_type: this.ordertype.value,
            delivery_type: this.type.value,
          })
          .then((response) => {
            setTimeout(() => {
              this.$store.dispatch("addUser/NotisfyGet");
            }, 4000);
            this.$store.commit("product/ADD_Carts", null);
            setTimeout(() => {
              this.created = true
            }, 500);
          })
          .catch((err) => {
            this.$vs.notify({
              text: err,
              iconPack: "feather",
              icon: "icon-alert-circle",
              color: "danger",
            });
            console.error(err);
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
  background: #f6f8fe url("../../assets/images/icons/calendar.svg") right 1rem
    center no-repeat;
}
::-webkit-clear-button,
::-webkit-inner-spin-button {
  display: none;
}
::-webkit-calendar-picker-indicator {
  position: absolute;
  width: 2.5rem;
  height: 100%;
  top: 0;
  right: 0;
  bottom: 0;

  opacity: 0;
  cursor: pointer;

  color: rgba(0, 120, 250, 1);
  background: rgba(0, 120, 250, 1);
}
.created {
  position: fixed;
  display: flex;
  right: 27px;
  bottom: 23px;
  align-items: center;
  width: 307px;
  background: #ffffff;
  box-shadow: 0px -1px 11px rgba(70, 121, 236, 0.08),
    -1px 4px 11px rgba(70, 121, 236, 0.05);
  border-radius: 12px;
  padding: 25px 16px;
  .icon-checkk {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background: #35e4b7;

    display: flex;
    justify-content: center;
    color: #ffffff;
  }
  h2 {
    margin: 0px 18px 0px 8px;
    font-family: Montserrat;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 100.9%;
    /* or 16px */
    color: rgba(37, 4, 19, 0.75);
    a {
      color: #5d8aee;
    }
  }
  .icon {
    cursor: pointer;
    color: #5d8aee;
  }
}
</style>