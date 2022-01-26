<template>
  <div class="nav-bar">
    <h3>{{ title }}</h3>
<div>
      <div @click="active = !active" class="profile">
      <img src="../assets/images/logo/profile.png" alt="Profile" />
      <div class="profile-content">
        <h4>Nargiza Akhmedova</h4>
        <p>Superadmin</p>
      </div>
    </div>
    <div :style="active ? 'display: none;' : 'display: block;'" class="dropdown">
      <div class="item">
        <img src="" alt="">
        <span>
          Сменить язык
        </span>
      </div>
      <div class="item">
        <img src="" alt="">
        <span>
          Настройки
        </span>
      </div>
            <div class="item">
        <img src="" alt="">
        <span>
          Выйти с аккаунта
        </span>
      </div>
    </div>
</div>
  </div>
</template>

<script>
export default {
  props: ["title"],
  data(){
    return{
      active: false,
    }
  }
};
</script>

<style lang="scss" scoped>
.nav-bar {
    cursor: pointer;
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  align-items: center;
  font-family: Montserrat;

  h3 {
    font-weight: bold;
    font-size: 24px;
    color: #394560;
  }
 .dropdown{
    // display: none;
    position: fixed;
    z-index: 999;
    margin-top: 6px;
            -webkit-transform: translateY(20px);
            -ms-transform: translateY(20px);
            transform: translateY(20px);
            -webkit-transition: all 0.3s ease-in;
            -o-transition: all 0.3s ease-in;
            transition: all 0.3s ease-in;
  width: 183px;
height: 135px;
  background: #F6F8FE;
box-shadow: 0px -2px 8px rgba(70, 121, 236, 0.1), 2px 4px 9px rgba(70, 121, 236, 0.09);
border-radius: 8px;
    right: 171px;
 &:before {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    margin-left: 0.5em;
    right: 45px;
    box-sizing: border-box;
    border: 14px solid black;
    border-color: transparent transparent #F6F8FE #F6F8FE;
    transform-origin: 0 0;
    transform: rotate(135deg);
    box-shadow: -3px 3px 3px -3px rgba(214, 214, 214, 0.78);
  }
.item{
  padding: 15px;
  font-family: Raleway;
font-style: normal;
font-weight: 500;
font-size: 14px;
line-height: 16px;
/* identical to box height */

display: flex;
align-items: center;

/* Main */

color: #4679EC;
}
}
  .profile {
    display: flex;
    align-items: center;
    &:hover {
        .dropdown {
                  display: block;
                    -webkit-transform: scaleY(1);
                    -ms-transform: scaleY(1);
                    transform: scaleY(1);
                    opacity: 1;
                    visibility: visible;
                }
            }

    .profile-content {
      margin-left: 12px;
      font-size: 16px;

      h4 {
        font-weight: 600;
        color: #60739f;
        margin-bottom: 3px;
      }
      p {
        color: #60739fb3;
      }
    }
  }
}
</style>
