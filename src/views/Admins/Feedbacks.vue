<template>
  <div class="feedbacks">
    <div class="feedback" v-for="(feedback, i) in reviews" :key="i">
      <div class="top">
        <img src="../../assets/images/icons/user.svg" alt="" />
        <div class="right">
          <h2>{{ feedback.username }}</h2>
          <span> {{ feedback.role }} </span>
          <span style="margin: 0px 5px 0px 5px">&bull;</span>
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
      <p v-if="!feedback.message">-</p>
    </div>
    <nav>
      <ul class="pagination">
        <li class="page">
          <button type="button" class="page-link" @click="changeM(page)">
            <img src="../../assets/images/icons/arrow-right.svg" alt="search" />
          </button>
        </li>
        <li class="page-center">
          <button
            type="button"
            v-for="(pageNumber, i) in pages"
            :key="i"
            :class="{ active: page === pageNumber }"
            @click="page = pageNumber"
          >
            {{ pageNumber }}
          </button>
        </li>
        <li class="page">
          <button type="button" @click="change(page)" class="page-link">
            <img src="../../assets/images/icons/arrow-left.svg" alt="search" />
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
import Rate from "../../components/rate.vue";
export default {
  data() {
    return {
      rating: 3,
      page: 1,
      perPage: 20,
      pages: [],
    };
  },
  computed: {
    reviews() {
      return this.paginate(this.$store.state.addUser.reviews)
    },
    reviews1() {
      return this.$store.state.addUser.reviews;
    },
  },
  components: {
    Rate,
  },
    watch: {
    reviews1() {
      this.setPages();
    },
  },
  methods: {
    setPages() {
      let numberOfPages = Math.ceil(this.reviews1.length / this.perPage);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
    change(loq) {
      console.log(loq);
      if (loq === this.pages.length) {
        this.page = this.pages.length;
      } else {
        this.page++;
      }
    },
    changeM(loq) {
      console.log(loq);
      if (loq === 1) {
        this.page = 1;
      } else {
        this.page--;
      }
    },
    paginate(posts) {
      let page = this.page;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return posts.slice(from, to);
    },
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