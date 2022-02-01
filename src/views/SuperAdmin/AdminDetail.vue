<template>
  <div>
    <div v-if="$route.path === `/admins/${id}` && user" class="user-profile">
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
            @click="$router.push(`/admins/${id}/edit`)"
            src="../../assets/images/icons/pencil.svg"
            alt="pencil icon"
          />
        </div>
      </div>
      <div style="display: flex; justify-content: space-between">
        <div class="user-details">
          <h3 class="head">Персональные данные</h3>
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
            <h4>
              +998 {{ user.phone_number.substring(0, 2) }} {{
                user.phone_number.substring(2, 5)
              }}-{{ user.phone_number.substring(5, 7) }}-{{
                user.phone_number.substring(7)
              }}
            </h4>
          </div>
          <div class="user-detail">
            <p>Имя пользователя</p>
            <h4>{{ user.username }}</h4>
          </div>
          <div class="user-detail">
            <p>Email</p>
            <h4>{{ user.email }}</h4>
          </div>
        </div>
        <div class="user-details">
          <h3 class="head">Уведомления</h3>
          <div class="user-detail">
            <div class="form-group">
              <input
                v-model="site_notifications"
                disabled
                type="checkbox"
                id="news"
              />
              <label for="news">Получать обновления</label>
            </div>
          </div>
          <div class="user-detail">
            <div class="form-group">
              <input
                v-model="email_notifications"
                disabled
                type="checkbox"
                id="email"
              />
              <label for="email">Получать сообщения на почту</label>
            </div>
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
      site_notifications: false,
      email_notifications: false,
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
    handlerOne() {
      this.notification = {
        show: false,
        header: "",
        content: "",
        btnFirst: "",
        btnSecond: "",
      };
      if (!this.isDeleted) {
        this.$router.push("/admins");
      }
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
              btnFirst: "Список админов",
            };
            this.isDeleted = false;
          })
          .catch((err) => console.log(err));
      }
    },
  },
  computed: {
    user() {
      return this.$store.state.addUser.detail;
    },
  },
  created() {
    this.$store
      .dispatch("addUser/fetchUserById", this.id)
      .then((res) => res.data)
      .then((user) => {
        this.email_notifications = user.email_notifications === "active";
        this.site_notifications = user.site_notifications === "active";
      });
  },
};
</script>

<style lang="scss" scoped>
.user-profile {
  width: 98%;
  padding: 35px 30px;
  background: #fff;
  margin: 5px;
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
    margin-top: 3rem;
  }
}
</style>
