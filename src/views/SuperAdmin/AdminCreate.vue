<template>
  <div>
    <form @submit.prevent="submitHandler">
      <div class="form-input">
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
        <span class="phone-code">+998</span>
        <my-input
          padding="14px 70px"
          type="tel"
          :width="375"
          v-model="user.phone_number"
          :error="errors.has('phone')"
          name="phone"
          v-validate="'required|numeric|length:9'"
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
          v-validate="'required|email'"
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
      <div class="form-input">
        <h4>Пароль</h4>
        <my-input
          type="password"
          name="password"
          v-model="password"
          ref="password"
          :width="375"
          :error="errors.has('password')"
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
        <h4>Потвердите пароль</h4>
        <my-input
          type="password"
          :width="375"
          v-model="confirm"
          :error="errors.has('confirm')"
          name="confirm"
          data-vv-as="password"
          v-validate="'required|min:5|confirmed:password'"
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
      @handlerOne="reset"
      @handlerTwo="handlerTwo"
    ></v-notification>
    <v-notification
      header="Error"
      :is_success="false"
      btnFirst="Вернуться"
      :isShow="notificationError.show"
      :content="notificationError.content"
      @handlerOne="handlerOneError"
    ></v-notification>
  </div>
</template>

<script>
export default {
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
      notificationError: {
        show: false,
        content: "",
      },
      user: {
        active: 1,
        full_name: "",
        phone_number: "",
        role: "admin",
        email: "",
        username: "",
        email_notifications: false,
        site_notifications: false,
      },
      password: "",
      confirm: "",
    };
  },

  methods: {
    handlerTwo() {
      this.reset();
      this.$router.push("/admins");
    },
    handlerOneError() {
      this.notificationError = {
        show: false,
        content: "",
      };
    },
    submitHandler() {
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
                content: "Теперь вы можете увидеть изменения в списке админов",
                btnFirst: "Вернуться",
                btnSecond: "Список админов",
              };
            })
            .catch((err) => {
              this.notificationError = {
                show: true,
                content: `${err.response.data.detail}`, //Ошибка
              };
            });
        }
      });
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
      this.notificationError = {
        show: false,
        content: "",
      };
      this.user = {
        full_name: "",
        phone_number: "",
        role: "admin",
        email: "",
        username: "",
        email_notifications: false,
        site_notifications: false,
      };
      this.password = "";
      this.confirm = "";
    },
  },

  destroyed() {
    this.reset();
  },
};
</script>

<style lang="scss" scoped></style>
