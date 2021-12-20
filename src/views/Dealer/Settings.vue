<template>
  <div>
    <form class="container-body">
      <div class="col">
        <div
          class="flex justify-between items-center mb-6"
          style="padding-right: 20%"
        >
          <div>
            <p class="title">Профиль</p>
            <p class="sub-title">ФИО, E-mail</p>
          </div>
          <div
            @click="$refs.updateImgInput.click()"
            :style="{ 'background-image': `url(${image})` }"
            class="user"
          >
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
          placeholder="Name"
        />
        <input
          class="custom-input"
          v-model="surname"
          type="text"
          placeholder="Surname"
        />
        <input
          class="custom-input"
          v-model="email"
          type="text"
          placeholder="Email"
        />
      </div>
      <div class="col">
        <p class="title">Вам нравится E-Quick?</p>
        <p class="text mb-4 mt-3">
          Чтобы помочь нам усовершенствовать данный продукт, прошу оставить
          отзыв и оценить приложение по пяти бальной шкале (от 1 до 5)
        </p>
        <textarea
          id="custom-input"
          cols="30"
          rows="10"
          placeholder="Напишите что Вам больше всего нравится, либо чтобы вы хотели улучшить."
        ></textarea>
        <star-rating
          v-model="rating"
          :increment="0.5"
          :show-rating="false"
          :max-rating="5"
          :star-size="30"
        ></star-rating>
          <vs-button class="save-btn mt-2 p-2" @click="SaveInfo()"
          >Отправить отзыв</vs-button
        >
      </div>
      <div class="col">
        <p class="title">Пароль</p>
        <p class="sub-title">Ваша почта - {{ info.email }}</p>
        <input class="custom-input" type="text" placeholder="Password" />
        <input
          class="custom-input"
          v-model="password"
          type="text"
          placeholder="New password"
        />
      </div>
      <div class="col">
        <p class="title">Уведомления</p>
        <p class="sub-title">Оповещание о событий</p>
        <label class="checkbox-container">
          <input type="checkbox" v-model="sitenotf" checked="checked" />
          <span class="checkmark"></span>
          Получать уведомления
        </label>
        <div class="flex mb-6 mt-3">
          <vs-switch color="#31b778" v-model="emailnotf" id="swich"></vs-switch>
          <label class="checkmark1" for="#swich">
            Получать сообщения на почту</label
          >
        </div>
        <vs-button class="save-btn mt-4" @click="SaveInfo()"
          >Сохранить настройки</vs-button
        >
      </div>
    </form>
    <div class="container-footer">
      <a href="https://imzo.uz" target="__blank" class="contact">www.imzo.uz</a>
    </div>
  </div>
</template>

<script>
import StarRating from "vue-star-rating";
export default {
  components: {
    StarRating,
  },
  computed: {
    info() {
      return this.$store.state.auth.info
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
      rating: 4,
      image:
        "https://eros.mingle2.com/main/resources/assets/no_photo_male-69f72765b4837e51717fb0a56e2aaa3c.png",
    };
  },
  name: "Settings",
  // watch: {
  //  User(){
  //    this.name = this.info.full_name
  //  }
  // },
  methods: {
    SaveInfo() {
      // const sitenotefy = this.sitenotf ? 'inactive' : 'active',
      // const emailnotefy = this.emailnotf ? 'inactive' : 'active',
      const payload = {
        role: "dealer",
        site_notifications: this.sitenotf ? 'active' : 'inactive',
        email_notifications : this.emailnotf ? 'active' : 'inactive',
        id: localStorage.getItem("Id"),
        username: this.surname,
        password: this.password,
        full_name: this.name,
        email: this.email,
        phone_number: this.info.phone_number,
      };
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
            text: err.response.data.detail,
            iconPack: "feather",
            icon: "icon-alert-circle",
            color: "danger",
          });
        });
    },
    updateCurrImg(input) {
      if (input.target.files && input.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.image = e.target.result;
        };
        this.img = this.$refs.updateImgInput.files[0];
        console.log(this.img, "nusrat");
        reader.readAsDataURL(input.target.files[0]);
      }
    },
    user(){
      this.name = this.info.full_name,
       this.surname = this.info.username , 
          this.email = this.info.email,
    this.sitenotf = this.info.site_notifications === 'active' ? true : false,
    this.emailnotf = this.info.email_notifications === 'active'  ? true : false
    }
  },
  created() {
    setTimeout(() =>   this.user(), 500 )
    this.$store.dispatch("auth/DealerInfo")
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
      background: linear-gradient(81.75deg, #3C4A5A 99.96%, #3A9FD1 183.61%) !important;
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