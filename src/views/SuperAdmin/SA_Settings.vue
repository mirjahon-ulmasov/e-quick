<template>
  <div>
    <div v-if="$route.path === '/setting' && user" class="user-profile">
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
            <h4>{{ user.full_name }}</h4>
            <h4>{{ user.role }}</h4>
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
            <router-link class="item" to="/setting/edit">
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
            <h4>{{ user.full_name }}</h4>
          </div>
          <div class="user-detail">
            <p>Имя пользователя</p>
            <h4>{{ user.username }}</h4>
          </div>
          <div class="user-detail">
            <p>Телефон номера</p>
            <h4>
              +998 {{ user.phone_number.substring(0, 2) }}
              {{ user.phone_number.substring(2, 5) }}-{{
                user.phone_number.substring(5, 7)
              }}-{{ user.phone_number.substring(7) }}
            </h4>
          </div>
          <div class="user-detail">
            <p>Email</p>
            <h4>{{ user.email }}</h4>
          </div>
        </div>
        <div class="user-details">
          <h3 class="head">Уведомления</h3>
          <div class="user-detail">
            <div class="form-group">
              <input
                v-model="site_notifications"
                disabled
                type="checkbox"
                id="news"
              />
              <label for="news">Получать обновления</label>
            </div>
          </div>
          <div class="user-detail">
            <div class="form-group">
              <input
                v-model="email_notifications"
                disabled
                type="checkbox"
                id="email"
              />
              <label for="email">Получать сообщения на почту</label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Compressor from "compressorjs";
export default {
  name: "SA_Settings",
  data() {
    return {
      site_notifications: false,
      email_notifications: false,
      quality1: null,
      image: null,
      img: null,
      baseUrl: process.env.VUE_APP_IMG,
    };
  },
  created() {
    this.$store
      .dispatch("addUser/fetchUserById", this.$route.meta.id)
      .then(() => {
        this.email_notifications = this.user.email_notifications === "active";
        this.site_notifications = this.user.site_notifications === "active";
      });
  },
  computed: {
    user() {
      return this.$store.state.addUser.detail;
    },
    info() {
      return this.$store.state.auth.info;
    },
  },
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
            text: "Image size must be pover 1 MB",
            iconPack: "feather",
            icon: "icon-alert-circle",
            color: "danger",
          });
        },
      });
      setTimeout(() => {
        if (this.quality1.result.size < 1000000) {
          const reader = new FileReader();
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
};
</script>

<style lang="scss" scoped></style>
