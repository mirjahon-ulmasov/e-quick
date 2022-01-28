<template>
  <div>
    <form @submit.prevent="submitHandler">
      <div class="form-input" v-if="id">
        <h4>Статус</h4>
        <div class="segment-control">
          <div class="rad" :class="{ active: user.active === 1 }">
            <input v-model="user.active" :value="1" id="active" type="radio" />
            <label for="active">Активен</label>
          </div>
          <div class="rad" :class="{ inactive: user.active === 0 }">
            <input
              v-model="user.active"
              :value="0"
              id="inactive"
              type="radio"
            />
            <label for="inactive">Неактивен</label>
          </div>
        </div>
      </div>
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
        <my-input
          type="input"
          :width="375"
          v-model="user.full_name"
          :error="errors.has('full_name')"
          name="full_name"
          v-validate="'required|min:5'"
        />
        <span class="error-text" v-show="errors.has('full_name')">
          <feather-icon
            :icon="'InfoIcon'"
            style="color: #db2379 !important; margin-right: 5px"
            svgClasses="h-6 w-6"
          />
          {{ errors.first("full_name") }}
        </span>
      </div>
      <div class="form-input">
        <h4>Телефон номера</h4>
        <my-input
          type="text"
          :width="375"
          v-model="user.phone_number"
          :error="errors.has('phone')"
          name="phone"
          v-validate="'required|length:9'"
        />
        <span class="error-text" v-show="errors.has('phone')">
          <feather-icon
            :icon="'InfoIcon'"
            style="color: #db2379 !important; margin-right: 5px"
            svgClasses="h-6 w-6"
          />
          {{ errors.first("phone") }}
        </span>
      </div>
      <div class="form-input">
        <h4>Email</h4>
        <my-input
          type="email"
          :width="375"
          v-model="user.email"
          :error="errors.has('email')"
          name="email"
          v-validate="'email'"
        />
        <span class="error-text" v-show="errors.has('email')">
          <feather-icon
            :icon="'InfoIcon'"
            style="color: #db2379 !important; margin-right: 5px"
            svgClasses="h-6 w-6"
          />
          {{ errors.first("email") }}
        </span>
      </div>
      <div class="form-input">
        <h4>Имя пользователя</h4>
        <my-input
          type="input"
          :width="375"
          v-model="user.username"
          :error="errors.has('username')"
          name="username"
          v-validate="'required|min:4'"
        />
        <span class="error-text" v-show="errors.has('username')">
          <feather-icon
            :icon="'InfoIcon'"
            style="color: #db2379 !important; margin-right: 5px"
            svgClasses="h-6 w-6"
          />
          {{ errors.first("username") }}
        </span>
      </div>
      <div v-if="editID" class="form-input">
        <h4>Старый пароль</h4>
        <my-input
          type="password"
          :width="375"
          v-model="old_password"
          :error="errors.has('old_password')"
          name="old_password"
          v-validate="'required|min:5'"
        />
        <span class="error-text" v-show="errors.has('old_password')">
          <feather-icon
            :icon="'InfoIcon'"
            style="color: #db2379 !important; margin-right: 5px"
            svgClasses="h-6 w-6"
          />
          {{ errors.first("old_password") }}
        </span>
      </div>
      <div class="form-input">
        <h4>{{ pass_title }}</h4>
        <my-input
          type="password"
          :width="375"
          v-model="password"
          :error="errors.has('password')"
          name="password"
          v-validate="'required|min:5'"
        />
        <span class="error-text" v-show="errors.has('password')">
          <feather-icon
            :icon="'InfoIcon'"
            style="color: #db2379 !important; margin-right: 5px"
            svgClasses="h-6 w-6"
          />
          {{ errors.first("password") }}
        </span>
      </div>
      <div class="form-input">
        <h4>{{ confirm_title }}</h4>
        <my-input
          type="password"
          :width="375"
          v-model="confirm"
          :error="errors.has('confirm')"
          name="confirm"
          v-validate="'required|min:5'"
        />
        <span class="error-text" v-show="errors.has('confirm')">
          <feather-icon
            :icon="'InfoIcon'"
            style="color: #db2379 !important; margin-right: 5px"
            svgClasses="h-6 w-6"
          />
          {{ errors.first("confirm") }}
        </span>
      </div>
      <!-- <div v-if="$route.meta.id"> -->
      <div>
        <h4 class="notify">Уведомления</h4>
        <div class="form-group">
          <input v-model="user.site_notifications" type="checkbox" id="news" />
          <label for="news">Получать обновления</label>
        </div>
        <div class="form-group">
          <input
            v-model="user.email_notifications"
            type="checkbox"
            id="email"
          />
          <label for="email">Получать сообщения на почту</label>
        </div>
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
        active: 0,
        full_name: "",
        phone_number: "",
        role: "",
        email: "",
        username: "",
        email_notifications: false,
        site_notifications: false,
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
    }
    if (this.id) {
      this.editID = this.id;
    }
    if (this.editID) {
      this.$store
        .dispatch("addUser/fetchUserById", this.editID)
        .then((res) => res.data)
        .then((user) => {
          console.log(user);
          this.user = {
            ...user,
            site_notifications: user.site_notifications === "active",
            email_notifications: user.email_notifications === "active",
          };
          this.pass_title = "Новый пароль";
          this.confirm_title = "Потвердите новый пароль";
        })
        .catch((err) => console.log(err));
    }
  },
  methods: {
    handlerOne() {
      if (!this.editID) {
        this.reset();
      }
      this.notification.show = false;
    },
    handlerTwo() {
      this.reset();
      if (this.id || !this.$route.meta.id) {
        this.$router.push("/admins");
      } else {
        this.$router.push("/settings");
      }
    },
    submitHandler() {
      if (this.password === this.confirm) {
        if (this.$route.path === "/add-admin" && this.password) {
          this.$validator.validateAll().then((isValid) => {
            if (isValid) {
              this.$store
                .dispatch("addUser/addItem", {
                  ...this.user,
                  password: this.password,
                  email_notifications: this.user.email_notifications
                    ? "active"
                    : "inactive",
                  site_notifications: this.user.site_notifications
                    ? "active"
                    : "inactive",
                })
                .then((res) => {
                  this.notification = {
                    show: true,
                    is_success: true,
                    header: "Пользователь был добавлен успешно",
                    content:
                      "Теперь вы можете увидеть изменения в списке админов",
                    btnFirst: "Вернуться",
                    btnSecond: "Список админов",
                  };
                })
                .catch((err) => console.log(err));
            }
          });
        } else if (this.editID) {
          this.$store
            .dispatch("addUser/updateItem", {
              ...this.user,
              password: this.password,
              old_password: this.old_password,
              email_notifications: this.user.email_notifications
                ? "active"
                : "inactive",
              site_notifications: this.user.site_notifications
                ? "active"
                : "inactive",
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
        }
      }
    },
    reset() {
      this.$validator.reset();
      this.notification = {
        show: false,
        is_success: true,
        header: "",
        content: "",
        btnFirst: "",
        btnSecond: "",
      };
      this.editID = null;
      this.user = {
        full_name: "",
        phone_number: "",
        role: "",
        email: "",
        username: "",
        email_notifications: false,
        site_notifications: true,
      };
      this.password = "";
      this.confirm = "";
      this.old_password = "";
      this.pass_title = "Пароль";
      this.confirm_title = "Потвердите пароль";
    },
  },

  destroyed() {
    this.reset();
  },
};
</script>

<style lang="scss" scoped></style>
