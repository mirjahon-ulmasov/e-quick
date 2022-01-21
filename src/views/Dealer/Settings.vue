<template>
  <div>
    <form  enctype="multipart/form-data" class="container-body">
      <div class="col">
        <div
          class="flex justify-between items-center mb-6"
          style="padding-right: 20%"
        >
          <div>
            <p class="title">{{ $t("profile.title") }}</p>
            <p class="sub-title">{{ $t('profile.fish') }}, {{ $t('profile.email') }}</p>
          </div>
          <div
            v-if="image"
            @click="upload()"
            :style="{ 'background-image': `url(${image})` }"
            class="user"
          >
            <input
              type="file"
              id="updateImgInput"
              class="hidden"
              ref="updateImgInput"
              @change="updateCurrImg"
              accept="image/*"
            />
            <div class="edit">
              <img src="@/assets/images/icons/edit.svg" alt="img" />
            </div>
          </div>
          <input
            type="file"
            id="updateImgInput"
            class="hidden"
            ref="updateImgInput"
            @change="updateCurrImg"
            accept="image/*"
          />
        </div>
        <input
          class="custom-input"
          v-model="name"
          type="text"
          name="fullname"
          v-validate="'required|min:3'"
          :placeholder="$t('profile.fullname')"
        />
        <span class="text-danger text-sm" v-show="errors.has('fullname')">{{
          errors.first("fullname")
        }}</span>
        <input
          class="custom-input"
          v-model="surname"
          type="text"
          name="username"
          v-validate="'required|min:3'"
          :placeholder="$t('profile.username')"
        />
        <span class="text-danger text-sm" v-show="errors.has('username')">{{
          errors.first("username")
        }}</span>
        <input
          class="custom-input"
          v-model="email"
          type="text"
          name="email"
          v-validate.bails="'required|email'"
          :placeholder="$t('profile.email')"
        />
        <span class="text-danger text-sm" v-show="errors.has('email')">{{
          errors.first("email")
        }}</span>
      </div>
      <div class="col">
        <p class="title">{{ $t("profile.ok") }}</p>
        <p class="text mb-4 mt-3">
          {{ $t("profile.star") }}
        </p>
        <textarea
          id="custom-input"
          cols="30"
          v-model="message"
          rows="10"
          :placeholder="$t('profile.message')"
        ></textarea>
    <svg style="position: absolute; width: 25px; height: 25px;" width="22px" height="22px" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <symbol id="icon-star-full" class="icon" viewBox="0 0 32 32">
          <path d="M32 12.408l-11.056-1.607-4.944-10.018-4.944 10.018-11.056 1.607 8 7.798-1.889 11.011 9.889-5.199 9.889 5.199-1.889-11.011 8-7.798z"></path>
        </symbol>
      </defs>
    </svg>
  <rate class="RateCustom" :length="5" :value="3" v-model="rating" iconref="icon-star-full"></rate>
        <vs-button class="save-btn mt-2 p-2" @click="SaveReview()"
          >{{ $t('profile.review') }}</vs-button
        >
      </div>
      <div class="col">
        <p class="title">{{ $t("profile.password") }}</p>
        <p class="sub-title">{{ $t("profile.curemail") }} - {{ info.email }}</p>
       <div class="flex" v-if="password === ''" >
       <input
          class="custom-input"
          v-model="old_password"
          :type="[showPassword1 ? 'text' : 'password']"
          name="oldpassword"
          :placeholder="$t('profile.new')"
        />
              <feather-icon
              @click="showPassword1 = !showPassword1"
                  :icon="showPassword1 ? 'EyeIcon' : 'EyeOffIcon'"
                  style="color: #135c81 !important; margin-left: -45px !important; margin-top: -8px;"
                  svgClasses="h-7 w-7"
                />
       </div>
        <div 
        v-else
        style="display: flex; flex-direction: column"
         >
       <div class="flex" >
                 <input
          class="custom-input"
          v-model="old_password"
          name="oldpassword"
          v-validate="'min:3|required'"
          :type="[showPassword1 ? 'text' : 'password']"
          :placeholder="$t('profile.old')"
        />
              <feather-icon
              @click="showPassword1 = !showPassword1"
                  :icon="showPassword1 ? 'EyeIcon' : 'EyeOffIcon'"
                  style="color: #135c81 !important; margin-left: -45px !important; margin-top: -8px;"
                  svgClasses="h-7 w-7"
                />
       </div>
        <span class="text-danger text-sm" v-show="errors.has('oldpassword')">{{
          errors.first("oldpassword")
        }}</span>
        </div>
       <div class="flex">
                 <input
          class="custom-input"
          v-model="password"
          :type="[showPassword2 ? 'text' : 'password']"
          ref="password"
          :placeholder="$t('profile.new')"
        />
              <feather-icon
              @click="showPassword2 = !showPassword2"
                  :icon="showPassword2 ? 'EyeIcon' : 'EyeOffIcon'"
                  style="color: #135c81 !important; margin-left: -45px !important; margin-top: -8px;"
                  svgClasses="h-7 w-7"
                />
       </div>
      </div>
      <div class="col">
        <p class="title">{{ $t("profile.notis") }}</p>
        <p class="sub-title"> {{ $t('profile.event') }}</p>
        <label class="checkbox-container">
          <input type="checkbox" v-model="sitenotf" checked="checked" />
          <span class="checkmark"></span>
          {{ $t("profile.siteNotis") }}
        </label>
        <div class="flex mb-6 mt-3">
          <vs-switch color="#31b778" v-model="emailnotf" id="swich"></vs-switch>
          <label class="checkmark1" for="#swich">
            {{ $t("profile.emailNotis") }}
          </label>
        </div>
        <vs-button class="save-btn mt-4" @click="SaveInfo()">{{
          $t("profile.save")
        }}</vs-button>
      </div>
    </form>
    <div class="container-footer">
      <a href="https://imzo.uz" target="__blank" class="contact">www.imzo.uz</a>
    </div>
  </div>
</template>

<script>
import Rate from '../../components/rate.vue'
import Compressor from 'compressorjs';
export default {
  components: {
    Rate
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
      image:
        "https://eros.mingle2.com/main/resources/assets/no_photo_male-69f72765b4837e51717fb0a56e2aaa3c.png",
      img: null,
    }
  },
  name: "Settings",
  methods: {
    upload () {
        let compressor = this.$refs.updateImgInput
        compressor.click()
      },
      updateCurrImg(input){
  const file = input.target.files[0];
  if (!file) {
    return;
  }
   this.quality1 = new Compressor(file, {
    quality: 0.6,
    success(result) {
    console.log(result)
    },
    error(err) {
                this.$vs.notify({
                title: "Error",
                text: 'Image size must be pover 2 MB',
                iconPack: "feather",
                icon: "icon-alert-circle",
                color: "danger",
              })
    },
  })
   setTimeout(() => {
    if(this.quality1.result.size < 1427393){
        const reader = new FileReader();
        console.log(this.quality1.result)
         reader.readAsDataURL(this.quality1.result);
        reader.onload = (event) => {
          this.image = event.target.result
        };
      this.img = new FormData();
      this.img.append('image', this.quality1.result)
      }
      else{
                this.$vs.notify({
                title: "Error",
                text: 'Image size must be over 2 MB',
                iconPack: "feather",
                icon: "icon-alert-circle",
                color: "danger",
              })
      }
   }, 1000);
      },
    SaveInfo() {
      const payload = {
        role: "dealer",
        site_notifications: this.sitenotf ? "active" : "inactive",
        email_notifications: this.emailnotf ? "active" : "inactive",
        id: localStorage.getItem("Id"),
        username: this.surname,
        password: this.password,
        old_password: this.old_password,
        full_name: this.name,
        email: this.email,
        user_lang: localStorage.getItem('lang'),
        savdo_id: this.info.savdo_id,
        phone_number: this.info.phone_number,
      }
      if(this.img !== null){
        this.$store.dispatch("auth/updateIMG", this.img ).then(
          () => { this.img = null }
        )
                    .catch((err) => {
              this.$vs.notify({
                title: "Error",
                text: err,
                iconPack: "feather",
                icon: "icon-alert-circle",
                color: "danger",
              });
            });
      }
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$store
            .dispatch("auth/updateItem", payload)
            .then((response) => {
              this.$vs.notify({
                title: "Updated",
                text: "ok",
                iconPack: "feather",
                icon: "icon-check-circle",
                color: "success",
              });
            })
            .catch((err) => {
             if (err.response.status === 400) {
                this.$vs.notify({
                title: "Error",
                text: "Old password invalid !, try again",
                iconPack: "feather",
                icon: "icon-alert-circle",
                color: "danger",
              });
             }
             else{
                this.$vs.notify({
                title: "Error",
                text: err,
                iconPack: "feather",
                icon: "icon-alert-circle",
                color: "danger",
              });
             }
            });
        }
      });
    },
    SaveReview() {
      if (this.message !== "") {
        const payload = {
          user_id: localStorage.getItem("Id"),
          message: this.message,
          rate: this.rating,
        };
        this.$store
          .dispatch("addUser/UserReviews", payload)
          .then((response) => {
            this.message = "";
            this.$vs.notify({
              text: this.$t('profile.thankYou'),
              iconPack: "feather",
              icon: "icon-check-circle",
              color: "success",
            });
          })
          .catch((err) => {
            this.$vs.notify({
              text: err.response.data.detail,
              iconPack: "feather",
              icon: "icon-alert-circle",
              color: "danger",
            });
          });
      } else {
        this.$vs.notify({
          text: this.$t('auth.fillCorrect'),
          iconPack: "feather",
          icon: "icon-alert-circle",
          color: "danger",
        });
      }
    },
    user() {
      (this.name = this.info.full_name),
        (this.surname = this.info.username),
        (this.email = this.info.email),
        (this.image = process.env.VUE_APP_IMG + this.info.profile_picture)
        (this.sitenotf =
          this.info.site_notifications === "active" ? true : false),
        (this.emailnotf =
          this.info.email_notifications === "active" ? true : false);
    },
  },
  created() {
    setTimeout(() => this.user(), 500);
    this.$store.dispatch("auth/DealerInfo");
  },
};
</script>
<style scoped>
.RateCustom .icon {
  width: 25px;
  height: 25px;
}
  .RateCustom.Rate .Rate__star.filled { color: blue; }
  .RateCustom.Rate .Rate__star { padding: 0px; }
</style>
<style lang="scss" scoped>
.container-body {
  padding: 20px 30px;
  height: 80%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
   overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #234b79;
  }
  .col {
    padding: 10px;
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .user {
      cursor: pointer;
      background-image: url("https://guaranteedremovals.com/wp-content/uploads/2020/05/business-man-quote-1024x1024.png");
      width: 80px;
      height: 87px;
      background-position: center;
      background-color: #3e5b71;
      background-size: cover;
      border-radius: 8.84722px;
      position: relative;
      .edit {
        display: none;
        height: 100%;
      }
    }
    .user:hover .edit {
      display: block;
      cursor: pointer;
      display: flex;
      align-items: center;
      text-align: center;
      justify-content: center;
    }
    .user:hover {
      cursor: pointer;
      display: block;
      background-color: #141b22;
      opacity: 0.8;
    }
    .carousel-container {
      display: flex;
      flex-direction: row;
      .carousel-col {
        position: relative;
        padding: 40px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        &::before {
          content: "";
          display: block;
          position: absolute;
          height: 80%;
          width: 1px;
          top: 5%;
          background: #e8e8e8;
          left: 15%;
        }
        p {
          text-align: center;
          font-family: "Montserrat" sans-serif;
          font-style: normal;
          font-weight: bold;
          font-size: 26.5448px;
          line-height: 32px;
          span {
            font-size: 15.1443px;
            line-height: 18px;
          }
        }
        p.comment {
          font-family: "Montserrat" sans-serif;
          font-style: normal;
          font-weight: normal;
          font-size: 11.7789px;
          line-height: 14px;
          color: #aeaeae;
        }
        .switch {
          margin-top: 20px;
          display: inline-block;
          height: 26px;
          position: relative;
          width: 50px;
        }

        .switch input {
          display: none;
        }

        .slider {
          background-color: #ccc;
          bottom: 0;
          cursor: pointer;
          left: 0;
          position: absolute;
          right: 0;
          top: 0;
          transition: 0.4s;
        }

        .slider:before {
          background: #ffffff;
          box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
          border-radius: 11.4566px;
          bottom: 0px;
          content: "";
          height: 26px;
          left: 0px;
          position: absolute;
          transition: 0.4s;
          width: 26px;
        }

        input:checked + .slider {
          background-color: #31b778;
        }

        input:checked + .slider:before {
          transform: translateX(26px);
        }

        .slider.round {
          border-radius: 34px;
        }

        .slider.round:before {
          border-radius: 50%;
        }
      }
    }
    .title {
      font-family: "Montserrat" sans-serif;
      font-style: normal;
      font-weight: bold;
      font-size: 20.1888px;
      line-height: 23px;
      color: #000022;
    }
    .text {
font-family: Montserrat;
font-style: normal;
font-weight: normal;
font-size: 17px;
line-height: 21px;

color: #000022;
    }
    .sub-title {
      font-family: "Lato" sans-serif;
      font-style: normal;
      font-weight: normal;
      font-size: 20.8699px;
      line-height: 25px;
      color: rgba(0, 0, 34, 0.5);
      margin: 20px 0px;
    }
    input.custom-input {
      margin-bottom: 10px;
      width: 80%;
      height: 57.04px;
      background: #f2f2f2;
      border-radius: 5.7972px;
      border: none;
      outline: none;
      padding-left: 20px;
      font-style: normal;
          font-family: Montserrat;
      font-weight: normal;
      font-size: 15px;
      line-height: 18px;
      color: #666666;
      &::placeholder {
        color: #666666;
      }
    }
    #custom-input {
      margin-bottom: 10px;
      width: 80%;
      height: 97.04px;
      resize: none;
      background: #f2f2f2;
      border-radius: 5.7972px;
      border: none;
      outline: none;
          font-family: Montserrat;
      padding: 10px;
      font-style: normal;
      font-weight: normal;
      font-size: 15px;
      line-height: 18px;
      color: #666666;
      &::placeholder {
        color: #666666;
      }
    }
    .save-btn {
      cursor: pointer;
      width: 305.13px;
      // height: 44.91px;
      background: linear-gradient(
        81.75deg,
        #3c4a5a 99.96%,
        #3a9fd1 183.61%
      ) !important;
      border-radius: 8.6357px !important;
      text-align: center;
      font-family: "Lato" sans-serif !important;
      font-style: normal;
      font-weight: normal;
      font-size: 20.15px;
      padding: 10px;
      line-height: 27px;
      letter-spacing: -0.02em;
      color: #ffffff;
    }
    .save-btn:hover {
      box-shadow: none !important;
    }
    .checkbox-container {
      display: block;
      position: relative;
      padding-left: 45px;
      margin-bottom: 12px;
      cursor: pointer;
      font-size: 20px;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }

    /* Hide the browser's default checkbox */
    .checkbox-container input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
    }

    /* Create a custom checkbox */
    .checkmark {
      position: absolute;
      top: 0;
      left: 0;
      height: 25px;
      width: 25px;
      background-color: #eee;
    }
    .checkmark1 {
      // font-family: Avenir Next;
      font-style: normal;
      // font-weight: 500;
      margin-left: 5px;
      font-size: 20px;
      line-height: 22px;
      /* identical to box height */

      color: #000022;
    }

    /* On mouse-over, add a grey background color */
    .checkbox-container:hover input ~ .checkmark {
      background-color: #ccc;
      border-radius: 8px;
      width: 29px;
      height: 29px;
    }

    /* When the checkbox is checked, add a blue background */
    .checkbox-container input:checked ~ .checkmark {
      background: #31b778;
      border-radius: 8px;
      width: 29px;
      height: 29px;
    }

    /* Create the checkmark/indicator (hidden when not checked) */
    .checkmark:after {
      content: "";
      position: absolute;
      display: none;
    }

    /* Show the checkmark when checked */
    .checkbox-container input:checked ~ .checkmark:after {
      display: block;
    }

    /* Style the checkmark/indicator */
    .checkbox-container .checkmark:after {
      left: 10.5px;
      top: 5px;
      width: 6px;
      height: 12px;
      border: solid white;
      border-width: 0 3px 3px 0;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
    }
  }
}
// .container-body
.container-footer {
  width: 100%;
  height: 20%;
  box-sizing: border-box;
  background-image: url("~@/assets/images/pages/bg2.jpg");
  background-repeat: no-repeat;
  background: cover cover;
  box-sizing: border-box;
  background-size: cover;
  display: flex;
  border-bottom-right-radius: 30px;
  border-bottom-left-radius: 30px;
  align-items: center;

  .contact {
    font-family: "Montserrat" sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 25px;
    line-height: 30px;
    display: flex;
    align-items: center;
    margin-left: 150px;
    color: #ffffff;
  }
}
</style>