<template>
  <div>
    <transition name="show">
      <div class="overlay" v-show="isSidebarActiveLocal">
        <div class="sidebar">
          <div class="actions">
            <feather-icon
              :icon="'XIcon'"
              @click="isSidebarActiveLocal = false"
              class="icon"
              svgClasses="h-6 w-9"
            />
          </div>
          <div class="body">
            <h2 class="filter">Уведомления</h2>
            <div class="notis" v-if="notis_not.length !== 0">
              <h3>Недавние</h3>
              <div class="item" v-for="(notis, i) in notis_not" :key="i">
                <feather-icon
                  @click="Delete(notis.id)"
                  style="float: right; color: #eb84b4; cursor: pointer"
                  icon="XIcon"
                  svgClasses="h-6 w-6"
                />
                <div class="top">
                  <img
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                    alt=""
                  />
                  <div class="right">
                    <h1>
                      Nusratullo
                      <span>&bull;</span>
                      <span class="role"> Admin </span>
                    </h1>
                    <span>
                      {{ notis.created_at.slice(0, 10) }}
                      <span>&bull;</span>
                      {{ notis.created_at.slice(11, 16) }}
                    </span>
                  </div>
                </div>
                <div class="bottom">
                  <h1>
                    {{ notis.title }}
                    <br />
                    {{ notis.message }}
                    <a href="#" @click="Seen(notis)">
                      {{ $t("journal.title") }}</a
                    >
                  </h1>
                </div>
              </div>
            </div>
            <div class="notis" style="margin-top: 30px" >
              <h3>Прочитанные</h3>
              <div class="item" v-for="(notis, i) in notisfy" :key="i">
                <feather-icon
                  @click="Delete(notis.id)"
                  style="float: right; color: #eb84b4; cursor: pointer"
                  icon="XIcon"
                  svgClasses="h-6 w-6"
                />
                <div class="top">
                  <img
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                    alt=""
                  />
                  <div class="right">
                    <h1>
                      Nusratullo
                      <span>&bull;</span>
                      <span class="role"> Admin </span>
                    </h1>
                    <span>
                      {{ notis.created_at.slice(0, 10) }}
                      <span>&bull;</span>
                      {{ notis.created_at.slice(11, 16) }}
                    </span>
                  </div>
                </div>
                <div class="bottom">
                  <h1>
                    {{ notis.title }}
                    <br />
                    {{ notis.message }}
                    <a href="#" @click="Seen(notis)">
                      {{ $t("journal.title") }}</a
                    >
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <order-item
      :isOrderItem="Sidebar"
      @closeSidebar="toggleDataSidebar"
    ></order-item>
  </div>
</template>

<script>
import OrderItem from "./OrderItems.vue";
export default {
  name: "",
  data() {
    return {
      date: null,
      PopUpData: {},
      Sidebar: false,
    };
  },
  components: {
    OrderItem,
  },
  props: {
    isSidebarNotis: {
      type: Boolean,
      required: true,
    },
  },
  watch: {
    isSidebarNotis(val) {
      if (!val) return;
    },
  },
  computed: {
    notisfy() {
      return this.$store.state.addUser.notisfy;
    },
    notis_not() {
      return this.$store.state.addUser.not_seen;
    },
    isSidebarActiveLocal: {
      get() {
        return this.isSidebarNotis;
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
          this.$store
            .dispatch("product/GetOrderItem", item.order_id)
            .then(() => {
              setTimeout(() => {
                this.toggleDataSidebar(true);
              }, 200);
            });
        })
        .catch((err) => {
          this.$vs.notify({
            title: "Error",
            text: err,
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
            title: this.$t("seen"),
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
            text: this.$t("delete"),
            iconPack: "feather",
            icon: "icon-check-circle",
            color: "success",
          });
          this.$store.dispatch("addUser/NotisfyGet");
          setTimeout(() => {
            if (this.notisfy.headers === null) {
              this.$store.state.addUser.notisfy = [];
              this.isSidebarActiveLocal = false;
              this.$store.state.addUser.not_seen = [];
            }
          }, 1000);
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
      this.Sidebar = val;
      this.$store.dispatch("addUser/NotisfyGet");
    },
  },
  created() {
    this.$store.dispatch("addUser/NotisfyGet");
  },
};
</script>

<style lang="scss" scoped>
.notis {
  h3 {
    font-family: Montserrat;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    /* identical to box height */

    color: #60739f;
  }
  .top {
    display: flex;
    margin-top: 25px;
    img {
      width: 44px;
      height: 44px;
      border-radius: 50%;
    }
    .right {
      margin-left: 8px;
      h1 {
        font-family: Montserrat;
        font-style: normal;
        font-weight: 600;
        font-size: 15px;
        line-height: 18px;

        color: #394560;
        .role {
          font-family: Montserrat;
          font-style: normal;
          font-weight: 500;
          font-size: 12px;
          line-height: 15px;
          /* identical to box height */

          /* Text */

          color: #60739f;
        }
      }
      span {
        font-family: Montserrat;
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 15px;
        /* identical to box height */

        /* Text */

        color: #60739f;
      }
    }
  }
  .bottom {
    h1 {
      font-family: Montserrat;
      font-style: normal;
      font-weight: 500;
      font-size: 15px;
      line-height: 18px;
      margin-top: 12px;
      color: #60739f;
      a {
        border: none;
        background: transparent;
        font-family: Montserrat;
        font-style: normal;
        font-weight: 500;
        font-size: 15px;
        line-height: 18px;
        margin-top: 14px;
        color: #3767d6;
      }
    }
  }
}
</style>