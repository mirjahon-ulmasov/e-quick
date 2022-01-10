<template>
  <div>
    <vs-popup
      background-color="rgb(45 39 39 / 70%)"
      background-color-popup="#FFFFFF"
      style="z-index: 1011 !important"
      :active.sync="isSidebarActiveLocal"
    >
      <h2 class="title mb-6"> {{ $t('profile.notis') }}</h2>
      <div class="scroll-area" :is="scrollbarTag" v-if="notisfy" :settings="settings">
        <div v-for="(notis, i) in notisfy" :key="i" :class="notis.status == `NOT_SEEN` ? 'notis' : 'seen'">
          <div class="flex">
            <img
              src="https://vtrand.ru/content/uploads/photos/2020/11/vtrand_0f7db75d2ef81bcc0a6a526310e56b6e.jpg"
              width="33"
              height="33"
              style="border-radius: 11.7329px"
              alt=""
            />
            <div class="ml-6" style="width: 408px">
              <div class="data flex">
                <span class="ok"> admin </span>
                <svg
                  class="ok"
                  width="3"
                  height="3"
                  viewBox="0 0 3 3"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.57 2.16C1.31667 2.16 1.1 2.07333 0.92 1.9C0.746667 1.72667 0.66 1.50667 0.66 1.24C0.66 0.986667 0.75 0.773333 0.93 0.6C1.11 0.42 1.32333 0.33 1.57 0.33C1.81667 0.33 2.02667 0.42 2.2 0.6C2.38 0.773333 2.47 0.986667 2.47 1.24C2.47 1.50667 2.38 1.72667 2.2 1.9C2.02667 2.07333 1.81667 2.16 1.57 2.16Z"
                    fill="black"
                    fill-opacity="0.56"
                  />
                </svg>
                <span class="ok">
                  <span>{{ notis.created_at.slice(0,10) }}</span> <span class="ml-4" >{{ notis.created_at.slice(11,18) }}</span>
                </span>
              </div>
              <p class="tex">
                {{ notis.title }}
              </p>
              <p class="tex1">
                {{ notis.message }}
                <a href="#" @click="Seen(notis)"> {{ $t('journal.title') }}</a>
              </p>
            </div>
            <feather-icon
              @click="Delete(notis.id)"
              style="margin-top: -59px !important; color: #7f8c8d"
              icon="XIcon"
              svgClasses="h-6 w-6"
              class="ml-1 cursor-pointer"
            />
          </div>
        </div>
      </div>
              <vs-button @click.prevent="SeenAll()" class="delete">
          {{ $t('notisSeen') }}
        </vs-button>
    </vs-popup>
    <order :isPopUp="PopUp" @closeSidebar="toggleDataSidebar"></order>
  </div>
</template>
<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import Order from './order/OrderItem.vue'
export default {
  name: "",
  data() {
    return {
      date: null,
      PopUpData: {},
      PopUp: false,
      settings: {
        maxScrollbarLength: 60
      },
    };
  },
  components: {
    VuePerfectScrollbar,
    Order
  },
  props: {
    isPopUpNotis: {
      type: Boolean,
      required: true,
    },
  },
  watch: {
    isPopUpNotis(val) {
      if (!val) return;
    },
  },
  computed: {
    scrollbarTag () { return this.$store.getters.scrollbarTag },
    notisfy() {
      return this.$store.state.addUser.notisfy;
    },
    isSidebarActiveLocal: {
      get() {
        return this.isPopUpNotis;
      },
      set(val) {
        if (!val) {
          this.$emit("closeSidebarNotis");
        }
      },
    },
  },
  methods: {
    Seen(item) {
      this.$store
        .dispatch("addUser/NotisfyPut", item.id)
        .then((res) => {
          this.$store.dispatch("addUser/NotisfyGet");
          this.$store.dispatch("addUser/NotisfyGet");
            this.$store.dispatch("product/GetOrderItem", item.order_id).then(() => {
        setTimeout(() => {
        this.toggleDataSidebar(true);
     }, 200);
      });
        })
        .catch((err) => {
          this.$vs.notify({
            title: "Error",
            text: err.response.data,
            iconPack: "feather",
            icon: "icon-check-circle",
            color: "danger",
          });
        });
    },
    SeenAll() {
      this.$store
        .dispatch("addUser/NotisfySeenAll")
        .then((res) => {
          this.$vs.notify({
            title: "Seen",
            text: "ok",
            iconPack: "feather",
            icon: "icon-check-circle",
            color: "success",
          });
          this.$store.dispatch("addUser/NotisfyGet");
          this.$store.dispatch("addUser/NotisfyGet");
        })
        .catch((err) => {
          this.$vs.notify({
            title: "Error",
            text: err.response.data,
            iconPack: "feather",
            icon: "icon-check-circle",
            color: "danger",
          });
        });
    },
    Delete(id) {
      this.$store
        .dispatch("addUser/NotisfyDelete", id)
        .then((res) => {
          this.$vs.notify({
            title: "Delete",
            text: "ok",
            iconPack: "feather",
            icon: "icon-check-circle",
            color: "success",
          });
          this.$store.dispatch("addUser/NotisfyGet");
          // this.$store.dispatch("addUser/NotisfyGet");
        })
        .catch((err) => {
          this.$vs.notify({
            title: "Error",
            text: err.response.data,
            iconPack: "feather",
            icon: "icon-check-circle",
            color: "danger",
          });
        });
    },
    toggleDataSidebar(val = false) {
      this.PopUp = val;
              this.$store.dispatch("addUser/NotisfyGet");
    },
  },
  created() {
    this.$store.dispatch("auth/DealerInfo");
    this.$store.dispatch("addUser/NotisfyGet");
  },
  mounted() {
    console.log(this.notisfy);
  },
};
</script>
<style scoped>
.scroll-area{
  min-height: 200px;
  max-height: 550px;
}
.title {
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 29px;
  line-height: 35px;
  text-align: center;
  margin-top: -16px;
  color: #000000;
}
.notis {
  margin: 10px 60px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 16px;
  /* width: 100%; */
  height: 136px;
  top: 76px;

  background: #ffcece;
  /* Notification shadow */

  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.14), 0px 1px 18px rgba(0, 0, 0, 0.12),
    0px 3px 5px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}
.seen {
  margin: 10px 60px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 16px;
  /* width: 100%; */
  height: 136px;
  top: 76px;

  background: #ffffff;
  /* Notification shadow */

  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.14), 0px 1px 18px rgba(0, 0, 0, 0.12),
    0px 3px 5px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}
.delete {
  width: 81%;
  height: 45px;
  margin: 10px 60px;
  background: linear-gradient(90deg, #5e585c 0%, #000000 100%) !important;
  border-radius: 8.6357px !important;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 20.15px;
  line-height: 22px;
  /* identical to box height, or 133% */

  text-align: center;
  letter-spacing: -0.02em;

  color: #ffffff;
}
.delete:hover {
  box-shadow: none !important;
}
.data {
  align-items: center;
}
.data .ok {
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 16px;
  /* identical to box height, or 160% */

  letter-spacing: 0.0125em;
  text-transform: uppercase;

  color: rgba(0, 0, 0, 0.56);

  /* Inside Auto Layout */

  flex: none;
  order: 2;
  flex-grow: 0;
  margin: 0px 8px 0px 0px;
}
.tex {
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  /* or 143% */

  color: #373737;
  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
  margin: 4px 0px;
}
.tex1 {
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  /* or 150% */

  mix-blend-mode: normal;

  /* Inside Auto Layout */

  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
  margin: 8px 0px;
}
.tex1 a {
  color: #3a9fd1;
}
</style>