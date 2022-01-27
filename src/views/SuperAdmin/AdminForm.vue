<template>
  <div>
    <form @submit.prevent="submitHandler">
      <div v-if="!$route.meta.id" class="form-input">
        <h4>Выберите роль</h4>
        <v-select
          v-model="user.role"
          style="width: 375px"
          :options="['admin']"
          id="select-state"
        >
          <template #open-indicator="{ attributes }">
            <span v-bind="attributes">
              <img src="../../assets/images/icons/select-icon.svg" alt="" />
            </span>
          </template>
        </v-select>
      </div>
      <div class="form-input">
        <h4>Ф.И.О.</h4>
        <my-input type="input" :width="375" v-model="user.full_name" />
      </div>
      <div class="form-input">
        <h4>Телефон номера</h4>
        <my-input type="input" :width="375" v-model="user.phone_number" />
      </div>
      <div class="form-input">
        <h4>Email</h4>
        <my-input type="email" :width="375" v-model="user.email" />
      </div>
      <div class="form-input">
        <h4>Имя пользователя</h4>
        <my-input type="input" :width="375" v-model="user.username" />
      </div>
      <div v-if="editID" class="form-input">
        <h4>Старый пароль</h4>
        <my-input type="password" :width="375" v-model="old_password" />
      </div>
      <div class="form-input">
        <h4>{{ pass_title }}</h4>
        <my-input type="password" :width="375" v-model="password" />
      </div>
      <div class="form-input">
        <h4>{{ confirm_title }}</h4>
        <my-input type="password" :width="375" v-model="confirm" />
      </div>
      <div class="actions">
        <my-button
          @click.native="closeHandler"
          type="button"
          title="Отменить"
          bgColor="#EDF1FD"
          color="#4679EC"
        ></my-button>
        <my-button
          type="submit"
          title="Добавить"
          bgColor="#4679EC"
          color="#FFFFFF"
        ></my-button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      editID: null,
      user: {
        full_name: "",
        phone_number: "",
        role: "",
        email: "",
        username: "",
      },
      password: "",
      confirm: "",
      old_password: "",
      pass_title: "Пароль",
      confirm_title: "Потвердите пароль",
    };
  },
  created() {
    if (this.$route.meta.id) {
      this.editID = this.$route.meta.id;
    } else if (this.id) {
      this.editID = this.id;
    }
    if (this.editID) {
      this.$store
        .dispatch("addUser/fetchUserById", this.editID)
        .then((res) => res.data)
        .then((user) => {
          this.user = {
            ...user,
          };
          this.pass_title = "Новый пароль";
          this.confirm_title = "Потвердите новый пароль";
        })
        .catch((err) => console.log(err));
    }
  },
  methods: {
    closeHandler() {
      this.reset();
      this.$router.push("/admins");
    },
    submitHandler() {
      if (this.password === this.confirm) {
        if (this.editID) {
          this.$store
            .dispatch("addUser/updateItem", {
              ...this.user,
              password: this.password,
              old_password: this.old_password,
            })
            .then((res) => this.closeHandler())
            .catch((err) => console.log(err));
        } else if (this.password) {
          this.$store
            .dispatch("addUser/addItem", {
              ...this.user,
              password: this.password,
            })
            .then((res) => this.closeHandler())
            .catch((err) => console.log(err));
        }
      }
    },
    reset() {
      this.role = "";
      this.fullname = "";
      this.phone = "";
      this.email = "";
      this.username = "";
      this.password = "";
      this.confirm = "";
      this.old_password = "";
      this.user = null;
    },
  },
};
</script>

<style lang="scss" scoped>
form {
  .form-input {
    margin: 25px 0;

    h4 {
      margin-bottom: 12px;
      font-weight: 500;
      font-size: 16px;
      color: #394560;
    }
  }

  .actions {
    margin-top: 2rem;
    width: 375px;
    display: flex;
    justify-content: space-between;
  }
}
</style>
