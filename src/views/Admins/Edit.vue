<template>
  <div>
    <form @submit.prevent="submitHandler">
      <div v-if="!$route.meta.id" class="form-input">
        <h4>Выберите роль</h4>
        <v-select
          v-model="user.role"
          style="width: 375px"
          :options="roles"
          label="role"
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
      <h4 class="notify" v-if="$route.meta.id" >
        Уведомления
      </h4>
    <div class="form-group" v-if="$route.meta.id">
      <input v-model="user.site_notifications" type="checkbox" id="news">
      <label for="news">Получать обновления</label>
    </div>
      <div class="form-group" v-if="$route.meta.id" >
      <input v-model="user.email_notifications"  type="checkbox" id="email">
      <label for="email">Получать сообщения на почту</label>
    </div>
      <div v-if="!$route.meta.id && user.role === 'dealer'" class="form-input">
        <h4>Компании</h4>
        <v-select
          v-model="user.role"
          style="width: 375px"
          :options="roles"
          label="role"
          id="select-state"
        >
          <template #open-indicator="{ attributes }">
            <span v-bind="attributes">
              <img src="../../assets/images/icons/select-icon.svg" alt="" />
            </span>
          </template>
        </v-select>
      </div>
      <div class="actions">
        <my-button
          @click.native="handlerTwo()"
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
      editID: null,
      user: {
        full_name: "",
        phone_number: "",
        role: "",
        email: "",
        username: "",
        email_notifications: false,
        site_notifications: true,
      },
      password: "",
      confirm: "",
      old_password: "",
      pass_title: "Пароль",
      confirm_title: "Потвердите пароль",
    };
  },
  computed:{
   roles () {
      return this.$store.state.addUser.roles
    },
  },
  created() {
    this.$store.dispatch('addUser/fetchRoles')
    if (this.$route.meta.id) {
      this.editID = this.$route.meta.id;
    }
    if (this.id) {
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
          this.user.email_notifications = user.email_notifications === 'active' ? true : false
          this.user.site_notifications = user.site_notifications === 'active' ? true : false
          this.pass_title = "Новый пароль";
          this.confirm_title = "Потвердите новый пароль";
        })
        .catch((err) => console.log(err));
    }
  },
  methods: {
    handlerOne() {
      this.$router.push(this.$route.path);
    },
    handlerTwo() {
      this.reset();
      if (this.id || !this.$route.meta.id) {
        this.$router.push("/users");
      } else {
        this.$router.push("/settings");
      }
    },
    submitHandler() {
      if (this.password === this.confirm) {
        if (this.editID) {
          this.$store
            .dispatch("addUser/updateItem", {
              ...this.user,
              password: this.password,
              old_password: this.old_password,
              email_notifications: this.user.email_notifications === true ? 'active' : 'inactive',
              site_notifications: this.user.site_notifications === true ? 'active' : 'inactive'
            })
            .then((res) => {
              if (this.id) {
                this.notification = {
                  show: true,
                  is_success: true,
                  header: "Пользователь был изменён успешно",
                  content:
                    "Теперь вы можете увидеть изменения в списке админов",
                  btnFirst: "Вернуться",
                  btnSecond: "Список админов",
                };
              } else {
                this.notification = {
                  show: true,
                  is_success: true,
                  header: "Данные были изменены успешно",
                  content: "Теперь вы можете увидеть изменения в настройках",
                  btnFirst: "Вернуться",
                  btnSecond: "Настройки",
                };
              }
            })
            .catch((err) => console.log(err));
        } else if (this.password) {
          this.$store
            .dispatch("addUser/addItem", {
              ...this.user,
              password: this.password,
            })
            .then((res) => {
              this.notification = {
                show: true,
                is_success: true,
                header: "Пользователь был добавлен успешно",
                content: "Теперь вы можете увидеть изменения в списке админов",
                btnFirst: "Вернуться",
                btnSecond: "Список админов",
              };
            })
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
  destroyed(){
    if(this.$route.meta.link === 'add-admin'){
         this.user = null
    console.log(this.user, 'dddd');
    }
  }
};
</script>

<style lang="scss" scoped>
form {
  .form-input {
    margin: 25px 5px;

    h4 {
      margin-bottom: 12px;
      font-weight: 500;
      font-size: 16px;
      color: #394560;
    }
  }
  .notify{
    font-family: Montserrat;
font-style: normal;
font-weight: 600;
font-size: 20px;
line-height: 24px;
color: #394560;
margin: 54px 0px 30px 5px;
  }
        .form-group {
        display: block;
        margin-left: 5px;
        margin-bottom: 15px;
      }

      .form-group input {
        padding: 0;
        height: initial;
        width: initial;
        margin-bottom: 0;
        display: none;
        cursor: pointer;
      }

      .form-group label {
        position: relative;
        cursor: pointer;
        font-family: Montserrat;
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 20px;
        /* identical to box height */

        /* Main txt */

        color: #394560;
      }

      .form-group label:before {
        content: "";
        -webkit-appearance: none;
        //   padding: 10px;
        display: inline-block;
        vertical-align: middle;
        cursor: pointer;
        margin-right: 10px;
        width: 28px;
        height: 28px;
        border: 1px solid #dae5fb;
        box-sizing: border-box;
        border-radius: 4.94118px;
      }

      .form-group input:checked + label:after {
        content: "";
        display: block;
        position: absolute;
        top: 2px;
        left: 10px;
        width: 6px;
        height: 14px;
        border: solid #4679ec;
        border-width: 0 3px 3px 0;
        border-radius: 2px;
        transform: rotate(45deg);
      }
  .actions {
    margin-top: 3rem;
    width: 375px;
    display: flex;
    justify-content: space-between;
  }
}
</style>
