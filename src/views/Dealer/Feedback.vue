<template>
  <div class="page">
    <div class="left">
      <p>{{ $t("feedback.star") }}</p>
      <form @submit.prevent="submitHandler">
        <my-input
          :placeholder="`${$t('feedback.message')}`"
          type="textarea"
          :width="450"
          :height="150"
          v-model="message"
        />
        <div style="margin-top: 1.5rem">
          <rate
            class="RateCustom"
            :length="5"
            :value="3"
            v-model="rating"
            iconref="icon-star-full"
          ></rate>
        </div>
        <div style="margin-top: 3rem">
          <my-button
            :width="450"
            color="#FFF"
            type="submit"
            bgColor="#4679EC"
            :title="$t('feedback.review')"
          ></my-button>
        </div>
      </form>
    </div>
    <div class="right">
      <img src="@/assets/images/icons/feedbackpage.svg" alt="Feedback" />
    </div>
    <v-notification
      btnFirst="Вернуться"
      :is_success="true"
      :isShow="show"
      header="Благодарим за оставленный отзыв"
      content="Наш менеджер в ближайшее время рассмотрит ваше предложение или жалобу"
      @handlerOne="handlerOne"
    ></v-notification>
  </div>
</template>

<script>
import Rate from "../../components/rate.vue";

export default {
  components: { Rate },
  data() {
    return {
      message: "",
      rating: 3,
      show: false,
    };
  },
  methods: {
    submitHandler() {
      const user_id = localStorage.getItem("Id");
      const payload = {
        user_id,
        message: this.message,
        rate: this.rating,
      };

      this.$store
        .dispatch("addUser/UserReviews", payload)
        .then(() => (this.show = true));
    },

    handlerOne() {
      this.message = "";
      this.rating = 3;
      this.show = false;

      // this.$router.push("/dealer/profile");
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  justify-content: space-between;

  .left {
    p {
      width: 460px;
      font-weight: 500;
      font-size: 18px;
      line-height: 22px;
      color: #394560;
      margin-bottom: 2rem;
    }
  }

  .right {
    margin: 1rem auto;

    img {
      width: 25rem;
    }
  }
}
</style>
