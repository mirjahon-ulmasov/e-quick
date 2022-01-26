<template>
  <div>
    <div v-if="$route.path === `/admins/${id}` && user" class="user-profile">
      <div class="user-header">
        <div class="user-header__first">
          <img src="../../assets/images/icons/user.svg" alt="user icon" />
          <div class="user-name">
            <h4>{{ user.full_name }}</h4>
            <h4>{{ user.role }} <span>&bull;</span>@{{ user.username }}</h4>
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
      <div class="user-details">
        <div class="user-detail">
          <p>Роль</p>
          <h4>{{ user.role }}</h4>
        </div>
        <div class="user-detail">
          <p>Телефон номера</p>
          <h4>{{ user.phone_number }}</h4>
        </div>
        <div class="user-detail">
          <p>Имя пользователя</p>
          <h4>@{{ user.username }}</h4>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  props: ["id"],
  methods: {
    deleteHandler() {
      this.$store
        .dispatch("addUser/removeItem", this.id)
        .then(() => {
          this.$router.push("/admins");
        })
        .catch((err) => console.log(err));
    },
  },
  computed: {
    user() {
      return this.$store.state.addUser.detail;
    },
  },
  created() {
    this.$store.dispatch("addUser/fetchUserById", this.id);
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
