<template>
  <div>
    <transition name="show">
      <div class="overlay" v-show="isSidebarActiveLocal">
        <div class="close" @click="isSidebarActiveLocal = false"></div>
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
            <h2 class="filter">{{ $t("profile.notis") }}</h2>
            <div class="notisfy">
              <div
                class="notis"
                v-if="notis_not.headers !== null && notis_not.length !== 0"
              >
                <a href="#" class="seen-all" @click="SeenAll()">
                  {{ $t("notisSeen") }}
                </a>
                <h3>{{ $t("not_seen") }}</h3>
                <div
                  class="item"
                  style="margin-right: 30px; margin-left: 10px"
                  v-for="(notis, i) in notis_not"
                  :key="i"
                >
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
              <div
                class="notis"
                style="margin-top: 30px"
                v-if="notisfy.headers !== null && notisfy.length !== 0"
              >
                <h3 v-if="notis_not.headers !== null && notis_not.length !== 0">
                  {{ $t("seenok") }}
                </h3>
                <div
                  class="item"
                  style="margin-right: 30px; margin-left: 10px"
                  v-for="(notis, i) in notisfy"
                  :key="i"
                >
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
              <div
                class="not"
                v-if="notisfy.length === 0 && notis_not.length === 0 || notis_not.headers === null && notisfy.headers === null"
              >
                <img src="../../assets/images/notis-404.svg" alt="" />
                <h4>
                  {{ $t("notis_404") }}
                </h4>
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
          this.$store.dispatch("addUser/NotisfyGet").then((res) => {
            if (res.data.headers === null) {
              this.$store.commit("addUser/SET_Notisfy", res.data);
              this.$store.commit("addUser/SET_notseen", res.data);
              this.isSidebarActiveLocal = false;
            }
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
    toggleDataSidebar(val = false) {
      this.Sidebar = val;
      this.$store.dispatch("addUser/NotisfyGet");
    },
  },
  created() {
    if (this.$store.state.userType === "dealer" || this.$acl.check("dealer")) {
      this.$store.dispatch("addUser/NotisfyGet");
    }
  },
};
</script>

<style lang="scss" scoped>
.notisfy {
  height: 73vh;
  overflow-y: scroll;
  .not {
    text-align: center;
    h4 {
      font-family: Montserrat;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 22px;
      /* identical to box height */
      text-align: center;
      color: #394560;
    }
  }
  &::-webkit-scrollbar {
    width: 4px;
    height: 21px;
    padding: 40px;
  }
  &::-webkit-scrollbar-track {
    background: #f6f8fe;
    border-radius: 16px;
  }
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(0deg, #a3bcf5, #a3bcf5), #f6f8fe;
    border-radius: 16px;
    width: 4px;
    height: 21px;
  }
  .notis {
    h3 {
      font-family: Montserrat;
      font-style: normal;
      font-weight: 600;
      font-size: 18px;
      line-height: 22px;
      margin-left: 10px;

      color: #60739f;
    }
    .seen-all {
      font-family: Montserrat;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
      margin-right: 10px;
      text-align: right;
      color: #4679ec;
      float: right;
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
}
</style>