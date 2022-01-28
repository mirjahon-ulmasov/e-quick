<template>
  <div>
    <div class="user-profile">
      <div class="user-header">
        <div class="user-header__first">
          <img
            v-if="image"
            :src="image"
            alt="user icon"
            width="135px"
            height="135px"
          />
          <img
            v-else
            :src="baseUrl + info.profile_picture"
            alt="user icon"
            width="135px"
            height="135px"
          />
          <input
            style="display: none"
            type="file"
            id="updateImgInput"
            class="hidden"
            ref="updateImgInput"
            @change="updateCurrImg"
            accept="image/*"
          />
          <div class="user-name">
            <h4>{{ info.full_name }}</h4>
            <h4>{{ info.role }}</h4>
          </div>
        </div>
        <div class="user-header__second">
          <img src="../../assets/images/icons/pencil.svg" alt="pencil icon" />
          <div :class="'dropdown'">
            <div class="item" @click="upload()">
              <img
                src="../../assets/images/icons/photo.svg"
                style="margin-right: 12px"
                alt="c"
              />
              <span> Сменить фото </span>
            </div>
            <router-link         
             v-if="
            this.$store.state.userType === 'super_admin' ||
            $acl.check('super_admin')
          "  class="item" to="/edit">
              <img
                src="../../assets/images/icons/edit.svg"
                style="margin-right: 12px"
                alt="c"
              />
              <span> Изменить данные </span>
            </router-link>
                        <router-link         
             v-if="
            this.$store.state.userType === 'admin' ||
            $acl.check('admin')
          "  class="item" to="/editing">
              <img
                src="../../assets/images/icons/edit.svg"
                style="margin-right: 12px"
                alt="c"
              />
              <span> Изменить данные </span>
            </router-link>
          </div>
        </div>
      </div>
      <div style="display: flex; justify-content: space-between">
        <div class="user-details">
          <h3 class="head">Персональные данные</h3>
          <div class="user-detail">
            <p>Имя</p>
            <h4>{{ info.full_name }}</h4>
          </div>
          <div class="user-detail">
            <p>Имя пользователя</p>
            <h4>{{ info.username }}</h4>
          </div>
          <div class="user-detail">
            <p>Телефон номера</p>
            <h4>{{ info.phone_number }}</h4>
          </div>
          <div class="user-detail">
            <p>Email</p>
            <h4>{{ info.email }}</h4>
          </div>
        </div>
        <div class="user-details">
          <h3 class="head">Уведомления</h3>
          <div class="user-detail">
              <div class="form-group">
      <input v-model="emailnotf" disabled type="checkbox" id="news">
      <label for="news">Получать обновления</label>
    </div>
          </div>
          <div class="user-detail">
    <div class="form-group">
      <input v-model="sitenotf" disabled  type="checkbox" id="email">
      <label for="email">Получать сообщения на почту</label>
    </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Rate from "../../components/rate.vue";
import Compressor from "compressorjs";
import Button from "../../components/Button.vue";
export default {
  components: {
    Rate,
    Button,
  },
  computed: {
    info() {
      return this.$store.state.auth.info;
    },
  },
  data() {
    return {
      swich: true,
      sitenotf: true,
      emailnotf: false,
      name: "",
      surname: "",
      email: "",
      password: "",
      showPassword1: false,
      showPassword2: false,
      old_password: "",
      message: "",
      rating: 4,
      scale: null,
      quality1: null,
      image: null,
      img: null,
      baseUrl: process.env.VUE_APP_IMG,
    };
  },
  name: "Settings",
  methods: {
    upload() {
      let compressor = this.$refs.updateImgInput;
      compressor.click();
    },
    updateCurrImg(input) {
      const file = input.target.files[0];
      if (!file) {
        return;
      }
      this.quality1 = new Compressor(file, {
        quality: 0.5,
        success(result) {
          console.log(result);
        },
        error(err) {
          this.$vs.notify({
            title: "Error",
            text: "Image size must be over 1 MB",
            iconPack: "feather",
            icon: "icon-alert-circle",
            color: "danger",
          });
        },
      });
      setTimeout(() => {
        if (this.quality1.result.size < 1000000) {
          const reader = new FileReader();
          console.log(this.quality1);
          reader.readAsDataURL(this.quality1.result);
          reader.onload = (event) => {
            this.image = event.target.result;
          };
          this.img = new FormData();
          this.img.append("image", this.quality1.result);
          this.$store
            .dispatch("auth/updateIMG", this.img)
            .then(() => {
              this.img = null;
            })
            .catch((err) => {
              this.$vs.notify({
                title: "Error",
                text: err,
                iconPack: "feather",
                icon: "icon-alert-circle",
                color: "danger",
              });
            });
        } else {
          this.$vs.notify({
            title: "Error",
            text: "Image size must be over 2 MB",
            iconPack: "feather",
            icon: "icon-alert-circle",
            color: "danger",
          });
        }
      }, 1000);
    },
  },
  created() {
    this.$store.dispatch("auth/DealerInfo");
    setTimeout(() => {
      this.sitenotf = this.info.site_notifications === "active" ? true : false;
      this.emailnotf =
        this.info.email_notifications === "active" ? true : false;
    }, 1000);
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.user-profile {
  width: 100%;
  padding: 35px;
  background: #ffffff;
  box-shadow: 0px 3.82748px 8px rgba(70, 121, 236, 0.1);
  border-radius: 30px;

  .user-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .user-header__first {
      display: flex;
      align-items: center;

      img {
        background: #edf2fb;
        padding:  4px;
        background: #FFFFFF;
       box-shadow: 0px 3.82748px 8px rgba(70, 121, 236, 0.1);
       border-radius: 50%;
        border: 4.42857px solid #FFFFFF;
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
          font-family: Montserrat;
          font-style: normal;
          font-weight: 500;
          font-size: 17px;
          line-height: 20px;
          color: #9fabc6;

          span {
            margin: 0 0.3rem;
            font-size: 20px;
          }
        }
      }
    }

    .user-header__second {
      .dropdown {
        position: fixed;
        z-index: 999;
        margin-top: 20px;
        display: block;
        visibility: hidden;
        opacity: 0;
        -webkit-transform: translateY(20px);
        -ms-transform: translateY(20px);
        transform: translateY(20px);
        -webkit-transition: all 0.3s ease-in;
        -o-transition: all 0.3s ease-in;
        transition: all 0.3s ease-in;
        width: 194px;
        height: 105px;
        background: #f6f8fe;
        box-shadow: 0px -2px 8px rgba(70, 121, 236, 0.1),
          2px 4px 9px rgba(70, 121, 236, 0.09);
        border-radius: 8px;
        right: 91px;
        &:before {
          content: "";
          position: absolute;
          width: 0;
          height: 0;
          margin-left: 0.5em;
          right: 0px;
          box-sizing: border-box;
          border: 14px solid black;
          border-color: transparent transparent #f6f8fe #f6f8fe;
          transform-origin: 0 0;
          transform: rotate(135deg);
          box-shadow: -3px 3px 3px -3px rgba(214, 214, 214, 0.78);
        }
        .item {
          cursor: pointer;
          padding: 15px 10px 15px 15px;
          font-family: Raleway;
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          line-height: 16px;
          display: flex;
          align-items: center;

          /* Main */
          color: #4679ec;
          img {
            background: none;
            padding: 0px;
            margin: 0;
            border-radius: 0;
          }
        }
      }
      &:hover {
        .dropdown {
          -webkit-transform: scaleY(1);
          -ms-transform: scaleY(1);
          transform: scaleY(1);
          opacity: 1;
          visibility: visible;
        }
      }
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
        background: #edf1fd;
      }
    }
  }
  .user-details {
    margin-top: 3.5rem;
    .head {
      font-family: Montserrat;
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
      line-height: 24px;

      /* Main txt */

      color: #394560;
    }
    .user-detail {
      margin: 1.5rem 0;
      .form-group {
        display: block;
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
