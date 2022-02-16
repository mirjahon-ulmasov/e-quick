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
        <h4>Старый пароль</h4>
        <my-input
          type="password"
          :width="375"
          v-model="old_password"
          :error="errors.has('old_password')"
          name="old_password"
          v-validate="'min:5'"
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
        <h4>Новый пароль</h4>
        <my-input
          type="password"
          name="password"
          v-model="password"
          ref="password"
          :width="375"
          :error="errors.has('password')"
          v-validate="'min:5'"
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
        <h4>Потвердите новый пароль</h4>
        <my-input
          type="password"
          :width="375"
          v-model="confirm"
          :error="errors.has('confirm')"
          name="confirm"
          data-vv-as="password"
          v-validate="'min:5|confirmed:password'"
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
      <div v-if="user.role === 'dealer'">
        <div class="form-input">
          <h4>Выберите завод</h4>
          <div style="display: flex; align-items: center">
            <my-input
              @click.native="(drop = !drop), (companies_d = [])"
              type="search"
              v-model="search"
              :width="375"
            >
            </my-input>
            <button
              class="plus"
              type="button"
              @click="real_companies = companies_d"
              v-if="companies_d.length !== 0"
              style="
                border-radius: 50%;
                background: #4679ec;
                height: 23px;
                width: 23px;
                border: none;
                color: white;
                font-size: 20px;
                margin-left: -35px;
              "
            >
              +
            </button>
            <img
              style="margin-left: -35px"
              v-else
              src="../../assets/images/icons/select-icon.svg"
              alt=""
            />
          </div>
          <div class="drop" v-show="drop">
            <div class="item form-group" v-for="(item, i) in filter" :key="i">
              <input
                :value="item"
                v-model="companies_d"
                type="checkbox"
                :id="i"
              />
              <label :for="i">{{ item.name }}</label>
            </div>
            <div v-show="filter.length === 0" style="text-align: center">
              <span> Результаты не найдены </span>
            </div>
          </div>
        </div>
        <!-- <span class="error-text" v-show="!have">
          <feather-icon
            :icon="'InfoIcon'"
            style="color: #db2379 !important; margin-right: 5px"
            svgClasses="h-6 w-6"
          />
          Field required
        </span> -->
        <div class="sel" v-show="real_companies">
          <div class="selected" v-for="(item, i) in real_companies" :key="i">
            <span> {{ item.name }} </span>
            <feather-icon
              @click="remove(item)"
              :icon="'XIcon'"
              style="
                color: #4679ec !important;
                margin-left: 20px;
                cursor: pointer;
              "
              svgClasses="h-6 w-6"
            />
          </div>
        </div>
        <div class="sel" v-show="old_companies">
          <div class="selected" v-for="(item, i) in old_companies" :key="i">
            <span> {{ item.name }} </span>
            <feather-icon
              @click="removeBack(item)"
              :icon="'XIcon'"
              style="
                color: #4679ec !important;
                margin-left: 20px;
                cursor: pointer;
              "
              svgClasses="h-6 w-6"
            />
          </div>
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
      :is_success="true"
      btnFirst="Вернуться"
      :isShow="notification.show"
      :header="notification.header"
      :content="notification.content"
      :btnSecond="notification.btnSecond"
      @handlerOne="handlerOne"
      @handlerTwo="handlerTwo"
    >
    </v-notification>
    <v-notification
      header="Error"
      :is_success="false"
      btnFirst="Вернуться"
      :isShow="notificationError.show"
      :content="notificationError.content"
      @handlerOne="handlerOneError"
    >
    </v-notification>
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      notification: {
        show: false,
        header: "",
        content: "",
        btnSecond: "",
      },
      notificationError: {
        show: false,
        content: "",
      },
      editID: null,
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
      old_password: "",
      companies_d: [],
      real_companies: null,
      search: "",
      drop: false,
    };
  },
  computed: {
    filter() {
      if (this.search) {
        return this.companies.filter((item) => {
          return this.search
            .toLowerCase()
            .split(" ")
            .every((v) => item.name.toLowerCase().includes(v));
        });
      } else {
        return this.companies;
      }
    },
    companies() {
      return this.$store.state.addUser.parent_companies.filter(
        (ar) =>
          !this.old_companies.find(
            (rm) => rm.id === ar.id && ar.name === rm.name
          )
      );
    },
    old_companies() {
      return this.$store.state.addUser.dealer_company;
    },
    have() {
      return this.real_companies !== null;
    },
        roles() {
      return this.$store.state.addUser.roles;
    },
  },
  methods: {
    handlerOne() {
      this.notification.show = false;
    },
    handlerTwo() {
      this.reset();
      if (this.id) this.$router.push("/users");
      else this.$router.push("/settings");
    },
    handlerOneError() {
      this.notificationError = {
        show: false,
        content: "",
      };
    },
    remove(index) {
      this.real_companies.splice(index, 1);
    },
    removeBack(index) {
      this.$store.dispatch("addUser/DeleteDealerCompany", {
        dealer_id: parseInt(this.id),
        company_id: index.id,
      });
      setTimeout(() => {
        this.$store.dispatch("addUser/fetchCompanyDealerID", this.id);
      }, 500);
    },
    companyAdd() {
      const id = this.real_companies.map((x) => x.id);
      const payload = {
        dealer_id: parseInt(this.id),
        company_list: id,
      };
        console.log("kirdiku");
        this.$store
          .dispatch("addUser/AddUserCompanies", payload)
          .then(() => {
            this.companies_d = [];
            this.notification = {
              show: true,
              is_success: true,
              header: "Пользователь был добавлен успешно",
              content: "Теперь вы можете его увидеть в списке пользователей",
              btnFirst: "Вернуться",
              btnSecond: "Пользователи",
            };
          })
          .catch((err) => {
            this.notificationError = {
              show: true,
              content: `${err.response.data.detail}`,
            };
          });
    },
    submitHandler() {
      this.$validator.validateAll().then((isValid) => {
        if (isValid) {
          this.$store
            .dispatch("addUser/updateItem", {
              ...this.user,
              role: this.user.role.role || this.user.role,
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
                if (this.user.role === 'dealer' && this.real_companies !== null ) {
                  this.companyAdd()
                }
               else{
                this.notification = {
                  show: true,
                  header: "Пользователь был изменён успешно",
                  content:
                    "Теперь вы можете увидеть изменения в списке Пользователи",
                  btnSecond: "Пользователи",
                };
               }
              } else {
                this.notification = {
                  show: true,
                  header: "Данные были изменены успешно",
                  content: "Теперь вы можете увидеть изменения в настройках",
                  btnSecond: "Настройки",
                };
              }
            })
            .catch((err) => {
              this.notificationError = {
                show: true,
                content: `${err.response.data.detail}`,
              };
            });
        }
      });
    },
    reset() {
      this.$validator.reset();
      this.notification = {
        show: false,
        header: "",
        content: "",
        btnSecond: "",
      };
      this.notificationError = {
        show: false,
        content: "",
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
    },
  },
  created() {
    if (this.$route.meta.id) this.editID = this.$route.meta.id;
    if (this.id) this.editID = this.id;

    this.$store
      .dispatch("addUser/fetchUserById", this.editID)
      .then((res) => res.data)
      .then((user) => {
        this.user = {
          ...user,
          site_notifications: user.site_notifications === "active",
          email_notifications: user.email_notifications === "active",
        };
      })
      .catch((err) => console.log(err));
    this.$store.dispatch("addUser/fetchDataCompanies");
    this.$store.dispatch("addUser/fetchCompanyDealerID", this.id);
    this.$store.dispatch("addUser/fetchRoles");
  },
  destroyed() {
    this.reset();
  },
};
</script>

<style lang="scss" scoped>
.drop {
  width: 375px;
  padding: 20px;
  margin-top: 10px;
  background: #f6f8fe;
  border: 0.886581px solid #e3ebfc;
  box-sizing: border-box;
  /* Main Sahdow */
  height: 180px;
  overflow-y: scroll;
  overflow-x: hidden;
  box-shadow: 0px 3.82748px 8px rgba(70, 121, 236, 0.1);
  border-radius: 8.86582px;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  &::-webkit-scrollbar-track {
    border-radius: 30px;
    background: none;
  }
  &::-webkit-scrollbar-thumb {
    background: #9fb4da;
    border-radius: 30px;
    border: 1px solid transparent;
    background-clip: content-box;
  }
}
.drop label {
  position: relative;
  cursor: pointer;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: #60739f;
}

.drop label:before {
  content: "";
  -webkit-appearance: none;
  //   padding: 10px;
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
  margin-right: 10px;
  width: 22px;
  height: 22px;
  border: 1px solid #dae5fb;
  box-sizing: border-box;
  border-radius: 4.94118px;
}

.drop input:checked + label:after {
  content: "";
  display: block;
  position: absolute;
  top: 2px;
  left: 7px;
  width: 6px;
  height: 12px;
  border: solid #4679ec;
  border-width: 0 3px 3px 0;
  border-radius: 2px;
  transform: rotate(45deg);
}
.sel {
  display: flex;
  flex-wrap: wrap;
  width: 420px;

  .selected {
    text-align: center;
    margin-right: 15px;
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
    padding: 16px;
    align-items: center;
    // width: 106px;
    height: 45px;

    background: #edf1fd;
    border-radius: 10px;
  }
}
</style>
