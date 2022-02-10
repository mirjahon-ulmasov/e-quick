<template>
  <div class="feedbacks">
    <div class="feedback" v-for="(feedback, i) in reviews" :key="i">
      <div class="top">
        <img src="../../assets/images/icons/user.svg" alt="" />
        <div class="right">
          <h2>{{ feedback.username }}</h2>
          <span> {{ feedback.role }} </span>
          <span style="margin: 0px 5px 0px 5px" >&bull;</span>
          <span>{{ feedback.email }}</span>
        </div>
      </div>
      <h3>Рейтинг</h3>
      <rate
        class="RateCustom"
        :readonly="true"
        :length="5"
        v-model="feedback.rate"
        iconref="icon-star-full"
      ></rate>
      <h3>Сообщение</h3>
      <p>
        {{ feedback.message }}
      </p>
      <p v-if="!feedback.message" >
        -
      </p>
    </div>
  </div>
</template>

<script>
import Rate from "../../components/rate.vue";
export default {
  data() {
    return {
      rating: 3,
    };
  },
  computed: {
    reviews() {
      return this.$store.state.addUser.reviews;
    },
  },
  components: {
    Rate,
  },
  created() {
    this.$store.dispatch("addUser/UserFeedbacks");
  },
};
</script>

<style lang="scss" scoped>
.feedback {
  background: #ffffff;
  box-shadow: 0px 3.82748px 8px rgba(70, 121, 236, 0.1);
  border-radius: 7.65496px;
  margin: 20px 10px 6px 10px;
  padding: 18px 28px 40px 28px;
  .top {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    img {
      background: #edf2fb;
      border-radius: 14px;
      padding: 28px 35px;
    }
    .right {
      margin-left: 10px;
      h2 {
        font-family: Montserrat;
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        line-height: 141.4%;
        color: #00121a;
      }
      span {
        font-family: Montserrat;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;
        color: #60739f;
      }
    }
  }
  h3 {
    margin-top: 20px;
    margin-bottom: 12px;
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 100.9%;
    color: #8695b6;
  }
  p {
    width: 80%;
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 100.9%;
    color: #60739f;
  }
}
</style>