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
            <h2 class="filter">Сохранить заявку как шаблон</h2>
            <form @submit.prevent="submitData()">
              <div class="form-input">
                <h4>Выберите название для шаблона</h4>
                <my-input type="text" :width="375" v-model="NameWab" id="date" ></my-input>
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
      NameWab: "",
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
    isSidebarTemp: {
      type: Boolean,
      required: true,
    },
  },
  watch: {
    isSidebarTemp(val) {
      if (!val) return;
    },
  },
  computed: {
    isSidebarActiveLocal: {
      get() {
        return this.isSidebarTemp;
      },
      set(val) {
        if (!val) {
          this.$emit("closeSidebarTemp");
        }
      },
    },
  },
  methods: {
    submitData() {
      const payload = {
        template_name: this.NameWab,
        user_id: parseInt(localStorage.getItem("Id")),
        cart_id: this.$store.state.product.carts.id,
      };
      this.$store
        .dispatch("product/PostTemplates", payload)
        .then((response) => {
          this.notification = {
            show: true,
            is_success: true,
            header: "Ok",
            content: "Created",
            btnFirst: "Вернуться",
            btnSecond: "OK",
          };
          this.NameWab = null;
          this.isSidebarActiveLocal = false;
        })
        .catch((err) => {
          this.notificationError = {
            show: true,
            content: `${err.response.data.detail}`,
          };
        });
    },
    Reset() {
      this.NameWab = "";
      this.$emit("closeSidebarTemp");
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

<style>
</style>