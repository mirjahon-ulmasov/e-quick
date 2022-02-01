<template>
  <div>
    <div id="pro-wizard">
      <step-navigation
        :steps="steps"
        style="margin-bottom: 40px"
        :currentstep="currentstep"
      >
      </step-navigation>
      <div v-show="currentstep === 1" data-vv-scope="step-1" >
        <div class="form-input">
          <h4>Выберите роль</h4>
          <v-select
            v-model="user.role"
            style="width: 375px"
            :options="roles"
            label="role"
            id="select-state"
            name="role"
            v-validate="'required'"
          >
            <template #open-indicator="{ attributes }">
              <span v-bind="attributes">
                <img src="../../assets/images/icons/select-icon.svg" alt="" />
              </span>
            </template>
          </v-select>
          <span class="error-text" v-show="errors.has('role')">
            <feather-icon
              :icon="'InfoIcon'"
              style="color: #db2379 !important; margin-right: 5px"
              svgClasses="h-6 w-6"
            />
            {{ errors.first("role") }}
          </span>
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
            type="input"
            :width="375"
            :error="errors.has('tel')"
            name="tel"
            v-validate="'required|min:9|max:9|numeric'"
            v-model="user.phone_number"
          />
          <span class="error-text" v-show="errors.has('tel')">
            <feather-icon
              :icon="'InfoIcon'"
              style="color: #db2379 !important; margin-right: 5px"
              svgClasses="h-6 w-6"
            />
            {{ errors.first("tel") }}
          </span>
        </div>
        <div class="form-input">
          <h4>Email</h4>
          <my-input
            type="email"
            :width="375"
            :error="errors.has('email')"
            v-model="user.email"
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
      </div>
      <div v-show="currentstep === 2" >
        <div class="form-input">
          <h4>Savdo ID</h4>
          <my-input
            type="text"
            :width="375"
            v-model="user.savdo_id"
            name="savdo"
            :error="errors.has('savdo')"
            v-validate="'required|numeric'"
          />
          <span class="error-text" v-show="errors.has('savdo')">
            <feather-icon
              :icon="'InfoIcon'"
              style="color: #db2379 !important; margin-right: 5px"
              svgClasses="h-6 w-6"
            />
            {{ errors.first("savdo") }}
          </span>
        </div>
      <div class="form-input">
        <h4>Имя пользователя</h4>
        <my-input
          type="input"
          :width="375"
          v-model="user.username"
          :error="errors.has('user_name')"
          name="user_name"
          v-validate="'required|min:4'"
        />
        <span class="error-text" v-show="errors.has('user_name')">
          <feather-icon
            :icon="'InfoIcon'"
            style="color: #db2379 !important; margin-right: 5px"
            svgClasses="h-6 w-6"
          />
          {{ errors.first("user_name") }}
        </span>
      </div>
        <div class="form-input">
          <h4>{{ pass_title }}</h4>
          <my-input
            type="password"
            :width="375"
            v-model="user.password"
            :error="errors.has('password')"
            name="password"
            ref="password"
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
            v-model="user.confirm"
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
      </div>
      <div v-show="currentstep === 1" >
        <div class="form-input">
          <h4>Выберите завод</h4>
          <v-select
            :multiple="true"
            v-model="companies_d"
            style="width: 375px"
            :options="companies"
            label="name"
            id="select-state"
          >
            <template  #open-indicator="{ attributes }">
              <span v-bind="attributes">
                <img src="../../assets/images/icons/select-icon.svg" alt="" />
              </span>
            </template>

          </v-select>
          <!-- <img src="../../assets/images/icons/select-icon.svg" alt="" /> -->
        </div>
        <div class="sel">
          <div class="selected">
            <span> AKFA </span>
            <feather-icon
              :icon="'XIcon'"
              style="color: #4679ec !important; margin-left: 20px"
              svgClasses="h-6 w-6"
            />
          </div>
          <div class="selected">
            <span> AKFA </span>
            <feather-icon
              :icon="'XIcon'"
              style="color: #4679ec !important; margin-left: 20px"
              svgClasses="h-6 w-6"
            />
          </div>
          <div class="selected">
            <span> AKFA </span>
            <feather-icon
              :icon="'XIcon'"
              style="color: #4679ec !important; margin-left: 20px"
              svgClasses="h-6 w-6"
            />
          </div>
          <div class="selected">
            <span> AKFA </span>
            <feather-icon
              :icon="'XIcon'"
              style="color: #4679ec !important; margin-left: 20px"
              svgClasses="h-6 w-6"
            />
          </div>
        </div>
      </div>

      <step-controls
        v-for="(step, i) in steps"
        :key="i"
        :step="step"
        :stepcount="steps.length"
        :currentstep="currentstep"
        @step-change="stepChanged"
      >
      </step-controls>
    </div>
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
  data() {
    return {
      currentstep: 1,
      indicatorclass: true,
      step: 1,
      active: 1,
      firststep: true,
      laststep: false,
      steps: [
        {
          id: 1,
        },
        {
          id: 2,
        },
      ],
      user: {
        full_name: null,
        phone_number: null,
        role: 'dealer',
        email: null,
        username: null,
        password: null,
        confirm: null,
        savdo_id: null,
      },
      companies_d: null,
      notification: {
        show: false,
        is_success: true,
        header: "",
        content: "",
        btnFirst: "",
        btnSecond: "",
      },
      pass_title: "Пароль",
      confirm_title: "Потвердите пароль",
    };
  },
  computed: {
    roles() {
      return this.$store.state.addUser.roles;
    },
    companies() {
      return this.$store.state.addUser.parent_companies;
    },
  },
  methods: {
    Steps() {
      if (this.user.role === 'dealer' || this.user.role.role === 'dealer' ) {
       this.steps = [
          {
            id: 1,
          },
          {
            id: 2,
          },
          {
            id: 3,
          },
        ];
      }
      else{
              this.steps = [
          {
            id: 1,
          },
          {
            id: 2,
          }
        ];
      }
    },
    stepChanged(step) {
      this.Steps();
      if (step === 0) {
        this.currentstep = 1;
      } else {
        if (step === true) {
          this.currentstep = this.steps.length;
          this.Submit();
        } 
          else if(step === 2 || step === 3){
            this.Validate(step)
          }
          else{
            this.currentstep = step;
          }
      }
    },
    Submit() {
      const payload = {
        ...this.user,
        role: this.user.role.role,
      };
      this.$store.dispatch("addUser/addItem", payload).then(() => {
        this.user = {};
        if (this.companies_d) {
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
            .catch((err) => {});
        } else {
          this.notification = {
            show: true,
            is_success: true,
            header: "Пользователь был добавлен успешно",
            content: "Теперь вы можете его увидеть в списке пользователей",
            btnFirst: "Вернуться",
            btnSecond: "Пользователи",
          };
        }
      });
    },
    handlerOne() {
      this.notification.show = false;
    },
    handlerTwo() {
      this.$router.push("/users");
    },
    Validate(step){
      if (step === 2) {
      this.$validator.validate('email')
      this.$validator.validate('role')
      this.$validator.validate('full_name')
      this.$validator.validate('tel').then(
        () => {
          if (this.errors.items.length === 0) {
            this.currentstep = step;
          }
        }
      )
      }
     else if (step === 3) {
      this.$validator.validate('savdo')
      this.$validator.validate('user_name')
      this.$validator.validate('password')
      this.$validator.validate('confirm').then(
        () => {
          if (this.errors.items.length === 0) {
            this.currentstep = step
          }
        }
      )
      }
    }
  },
  updated(){
  //  console.log(this.companies_d);
  },
  created() {
    this.$store.dispatch("addUser/fetchRoles");
    this.$store.dispatch("addUser/fetchDataCompanies");
  },
};
</script>

<style lang="scss" >
.step-wrapper {
  padding: 20px 0;
  display: none;

  &.active {
    display: block;
    display: flex;
  }
}

.step-indicator {
  border-collapse: separate;
  display: table;
  margin-left: 0px;
  position: relative;
  table-layout: fixed;
  text-align: center;
  vertical-align: middle;
  padding-left: 0;
  padding-top: 20px;

  li {
    display: table-cell;
    position: relative;
    float: none;
    padding: 0;

    &:last-child {
      &:after {
        display: none;
      }
    }

    &.active {
      .step {
        border-color: #4679ec;
        color: #4679ec;
      }
    }

    &.complete {
      .step {
        border-color: #4679ec;
        color: #4679ec;
      }
    }
  }

  .step {
    margin-right: 10px;
    border: 4px solid #e2eafc;
    width: 77px;
    border-radius: 5.5px;
    &:hover {
      cursor: pointer;
    }
  }
}
.form-input {
  margin: 25px 5px;

  h4 {
    margin-bottom: 12px;
    font-weight: 500;
    font-size: 16px;
    color: #394560;
  }
}
.notify {
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