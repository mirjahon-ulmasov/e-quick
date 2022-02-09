<template>
  <div>
    <div v-if="isShow && (headerTrans || contentTrans)" class="background">
      <div class="notification">
        <img
          src="../assets/images/icons/close.svg"
          alt="Close"
          class="close_btn"
          @click="firstHandler()"
        />
        <div class="notif__content">
          <img
            :style="is_success ? 'background: #E9FCF7' : 'background: #FBE9F2'"
            :src="is_success ? successImg : errImg"
            alt="Error"
          />
          <h3>{{ headerTrans }}</h3>
          <p>{{ contentTrans }}</p>
        </div>
        <div class="notif__actions">
          <my-button
            type="button"
            :width="230"
            :title="btnFirst"
            bgColor="#EDF1FD"
            color="#4679EC"
            @click.native="firstHandler()"
          ></my-button>
          <my-button
            v-if="btnSecond"
            type="button"
            :width="230"
            color="#FFF"
            :title="btnSecond"
            :bgColor="is_success ? '#4679EC' : '#DB2379'"
            @click.native="secondHandler()"
          ></my-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import translate from "translate";

export default {
  data() {
    return {
      errImg: require("../assets/images/icons/error.svg"),
      successImg: require("../assets/images/icons/success.svg"),
      headerTrans: "",
      contentTrans: "",
    };
  },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    is_success: {
      type: Boolean,
      default: false,
    },
    header: {
      type: String,
      default: "",
    },
    content: {
      type: String,
      default: "",
    },
    btnFirst: {
      type: String,
      default: "",
    },
    btnSecond: {
      type: String,
      default: "",
    },
  },
  methods: {
    firstHandler() {
      this.$emit("handlerOne");
    },
    secondHandler() {
      this.$emit("handlerTwo");
    },
  },

  async updated() {
    this.headerTrans = this.header
      ? await translate(this.header, this.$i18n.locale)
      : "";
    this.contentTrans = this.content
      ? await translate(this.content, this.$i18n.locale)
      : "";
  },

  created() {
    translate.from = "ru";
  },
};
</script>

<style lang="scss" scoped></style>
