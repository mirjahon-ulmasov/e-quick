<template>
  <div>
    <div class="user-profile" v-if="$route.path === `/user/${id}` && user" >
      <div class="user-header">
        <div class="user-header__first">
          <img src="../../assets/images/icons/user.svg" alt="user icon" />
          <div class="user-name">
            <h4>{{ user.full_name }}</h4>
            <h4>{{ user.role }} <span>&bull;</span>{{ user.username }}</h4>
          </div>
        </div>
        <div class="user-header__second">
          <img
            src="../../assets/images/icons/trash.svg"
            alt="trash icon"
            @click="deleteHandler"
          />
          <img
            @click="$router.push(`/user/${id}/editing`)"
            src="../../assets/images/icons/pencil.svg"
            alt="pencil icon"
          />
        </div>
      </div>
      <div class="user-details">
        <div class="user-detail">
          <p>Роль</p>
          <h4>{{ user.role }}</h4>
        </div>
        <div class="user-detail">
          <p>Статус</p>
          <h4 v-if="user.active === 1" style="color: #58dfb6">Активен</h4>
          <h4 v-if="user.active === 0" style="color: #841549">Неактивен</h4>
        </div>
        <div class="user-detail">
          <p>Телефон номера</p>
          <h4>{{ user.phone_number }}</h4>
        </div>
        <div class="user-detail">
          <p>Имя пользователя</p>
          <h4>@{{ user.username }}</h4>
        </div>
        <div class="user-detail">
          <p>Email</p>
          <h4>{{ user.email }}</h4>
        </div>
        <div class="user-detail">
          <p>Savdo ID</p>
          <h4>{{ user.savdo_id }}</h4>
        </div>
        <div class="user-detail" v-show="user.role === 'dealer'" >
          <p>Завод</p>
          <div class="factory">
            <span class="item" v-for="(item, i) in dealer_company" :key="i" >{{ item.name }} </span>
          </div>
        </div>
      </div>
      <v-notification
        :isShow="notification.show"
        :is_success="notification.is_success"
        :header="notification.header"
        :content="notification.content"
        :btnFirst="notification.btnFirst"
        :btnSecond="notification.btnSecond"
        @handlerTwo="handlerTwo"
        @handlerOne="handlerOne"
      ></v-notification>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      notification: {
        show: false,
        is_success: true,
        header: "",
        content: "",
        btnFirst: "",
        btnSecond: "",
      },
      isDeleted: true,
    };
  },
  methods: {
    deleteHandler() {
      this.notification = {
        show: true,
        is_success: false,
        header: "Вы действительно хотите удалить этого пользователя?",
        content: "Все данные включая персональные инфо будут удалены",
        btnFirst: "Отмена",
        btnSecond: "Удалить",
      };
    },
    handlerTwo() {
      if (this.isDeleted) {
        this.$store
          .dispatch("addUser/removeItem", this.id)
          .then(() => {
            this.notification = {
              show: true,
              is_success: true,
              header: "Пользователь был удален успешно",
              content: "",
              btnFirst: "Вернуться",
              btnSecond: "Пользователи",
            };
            this.isDeleted = false;
          })
          .catch((err) => console.log(err));
      } else {
        this.$router.push("/users");
      }
    },
    handlerOne() {
      if (!this.isDeleted) {
        this.$router.push("/users");
      }
    },
  },
  computed: {
    user() {
      return this.$store.state.addUser.detail;
    },
    dealer_company() {
      return this.$store.state.addUser.dealer_company;
    },
  },
  created() {
    this.$store.dispatch("addUser/fetchUserById", this.id);
    this.$store.dispatch("addUser/fetchCompanyDealerID", this.id);
  },
};
</script>

<style lang="scss" scoped>
.user-profile {
  width: 100%;
  padding: 35px;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0px 3.82748px 8px rgba(70, 121, 236, 0.1);

  .user-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .user-header__first {
      display: flex;
      align-items: center;

      img {
        background: #edf2fb;
        border-radius: 14px;
        padding: 28px 35px;
      }

      .user-name {
        margin-left: 1rem;

        h4:first-child {
          font-weight: 600;
          font-size: 20px;
          line-height: 141.4%;
          color: #00121a;
        }

        h4:nth-child(2) {
          font-weight: 500;
          font-size: 18px;
          line-height: 22px;
          color: #60739f;

          span {
            margin: 0 0.3rem;
            font-size: 20px;
          }
        }
      }
    }

    .user-header__second {
      img {
        padding: 15px;
        border-radius: 10px;
        margin: 10px;
        cursor: pointer;
        transition: 0.2s linear;
      }

      img:hover {
        transform: scale(1.1);
      }

      img:first-child {
        background: #db23791f;
      }

      img:nth-child(2) {
        background: #edf1fd;
      }
    }
  }
  .user-details {
    margin-top: 3.5rem;
    .user-detail {
      margin: 1.5rem 0;
      .factory {
        display: flex;
        align-items: center;
        margin-top: 12px;
            flex-wrap: wrap;
        .item {
          padding: 14px 40px;
          margin-right: 15px;
          margin-bottom: 20px;
          height: 45px;
          background: #edf1fd;
          border-radius: 10px;
          font-family: Montserrat;
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          line-height: 17px;
          /* identical to box height */

          text-align: center;

          /* Main */

          color: #4679ec;
        }
      }

      p {
        font-weight: 500;
        font-size: 16px;
        line-height: 20px;
        color: #394560;
      }

      h4 {
        font-weight: 600;
        font-size: 18px;
        line-height: 22px;
        color: #394560;
        margin-top: 10px;
      }
    }
  }
}
</style>
