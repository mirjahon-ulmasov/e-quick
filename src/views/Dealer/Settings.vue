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
            <p class="sub-title">ФИО, E-mail</p>
          </div>
          <div
            v-if="image"
            @click="upload()"
            :style="{ 'background-image': `url(${image})` }"
            class="user"
          >
            <!-- <image-compressor
    :done="getFiles"
    :scale="scale"
    ref="compressor"
    :quality="quality">
  </image-compressor> -->
            <input
              type="file"
              id="updateImgInput"
              class="hidden"
              ref="updateImgInput"
              @change="updateCurrImg"
              accept="image/*"
            />
            <div class="edit">
              <img src="@/assets/dealer/img/icons/edit.svg" alt="img" />
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
        <star-rating
          v-model="rating"
          :increment="0.5"
          :show-rating="false"
          :max-rating="5"
          :star-size="30"
        ></star-rating>
        <vs-button class="save-btn mt-2 p-2" @click="SaveReview()"
          >Отправить отзыв</vs-button
        >
      </div>
      <div class="col">
        <p class="title">{{ $t("profile.password") }}</p>
        <p class="sub-title">{{ $t("profile.curemail") }} - {{ info.email }}</p>
        <input
         v-if="password === ''"
          class="custom-input"
          v-model="old_password"
          :placeholder="$t('profile.old')"
          name="oldpassword"
          type="password"
        />
        <div 
        v-else
        style="display: flex; flex-direction: column"
         >
          <input
          class="custom-input"
          v-model="old_password"
          :placeholder="$t('profile.old')"
          name="oldpassword"
          type="password"
          v-validate="'min:3|required'"
        />
        <span class="text-danger text-sm" v-show="errors.has('oldpassword')">{{
          errors.first("oldpassword")
        }}</span>
        </div>
        <input
          class="custom-input"
          v-model="password"
          type="password"
          ref="password"
          :placeholder="$t('profile.new')"
        />
      </div>
      <div class="col">
        <p class="title">{{ $t("profile.notis") }}</p>
        <p class="sub-title">Оповещание о событий</p>
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
import StarRating from "vue-star-rating";
import imageCompressor from 'vue-image-compressor'
export default {
  components: {
    StarRating,
    imageCompressor
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
      old_password: "",
      message: "",
      rating: 4,
       scale: null,
      quality: null,
      image:
        "https://eros.mingle2.com/main/resources/assets/no_photo_male-69f72765b4837e51717fb0a56e2aaa3c.png",
      img: null,
    };
  },
  name: "Settings",
  // watch: {
  //  User(){
  //    this.name = this.info.full_name
  //  }
  // },
  methods: {
          upload () {
        let compressor = this.$refs.updateImgInput
        compressor.click()
      },
      //   getFiles(obj){
      //    if(obj.compressed.size === "0 kB"){
      //     this.scale = 15
      //    this.quality = 100
      //    }
      //    setTimeout(() => {
      //      console.log(obj)
      //              if(obj.compressed.file.size < 999999){
      //      this.image = obj.original.base64
      //   }
      //   // else if(obj.compressed.size === "0 kB"){
      //   //         this.$vs.notify({
      //   //         title: "Sorry",
      //   //         text: 'Something went wrong !',
      //   //         iconPack: "feather",
      //   //         icon: "icon-alert-circle",
      //   //         color: "danger",
      //   //       })
      //   // }
      //         else{
      //         this.$vs.notify({
      //           title: "Error",
      //           text: 'Image size must be pover 1 MB',
      //           iconPack: "feather",
      //           icon: "icon-alert-circle",
      //           color: "danger",
      //         })
      // }
      //    }, 5000);
      // },
    updateCurrImg(input) {
      if (input.target.files && input.target.files[0] && input.target.files[0].size < 1227393  ) {
        const reader = new FileReader();
         reader.readAsDataURL(input.target.files[0]);
        reader.onload = (event) => {
          this.image = event.target.result
        };
        this.img = new FormData();
        this.img.append("image", input.target.files[0])
        // console.log(input.target.files[0])
      }
//       else if(input.target.files[0].size > 1227393){
//          console.log(input.target.files[0])
//       const reader = new FileReader();
//          reader.readAsDataURL(input.target.files[0]);
//         reader.onload = (event) => {
//           const imgElement = document.createElement("img");
//           imgElement.src = event.target.result;
//         imgElement.onload =  (e) => {
//       const canvas = document.createElement("canvas");
//       const MAX_WIDTH = 400;
//       const scaleSize = MAX_WIDTH / e.target.width;
//       canvas.width = MAX_WIDTH;
//       canvas.height = e.target.height * scaleSize;
//       const ctx = canvas.getContext("2d");
//       ctx.drawImage(e.target, 0, 0, canvas.width, canvas.height);
//       const srcEncoded = ctx.canvas.toDataURL(e.target, "image/png");
//       console.log(ctx)
//       // you can send srcEncoded to the server
//       this.image = srcEncoded;
//     };
//         };
//         const i = this.image.indexOf('base64,');
// const buffer = Buffer.from(this.image.slice(i + 10000), 'base64');
// const file = new File(buffer,['IMG_0400'], {
//    type: 'image/png'
// })
// console.log(file);
//         this.img = new FormData();
//         this.img.append("image", file)

//       }
      else{
              this.$vs.notify({
                title: "Error",
                text: 'Image size must be pover 5 MB',
                iconPack: "feather",
                icon: "icon-alert-circle",
                color: "danger",
              });
      }
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
     if(this.img !== null ){
               this.$store
        .dispatch("auth/updateIMG", this.img )
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
              this.$vs.notify({
                title: "Error",
                text: err,
                iconPack: "feather",
                icon: "icon-alert-circle",
                color: "danger",
              });
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
              title: "Thank you",
              text: "ok",
              iconPack: "feather",
              icon: "icon-check-circle",
              color: "success",
            });
          })
          .catch((err) => {
            this.$vs.notify({
              title: "Error",
              text: err.response.data.detail,
              iconPack: "feather",
              icon: "icon-alert-circle",
              color: "danger",
            });
          });
      } else {
        this.$vs.notify({
          title: "Error",
          text: "Fill the form correctly",
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

<style lang="scss" scoped>
.container-body {
  padding: 20px 30px;
  height: 80%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow-y: scroll;
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
  background-image: url("~@/assets/images/bg2.jpg");
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