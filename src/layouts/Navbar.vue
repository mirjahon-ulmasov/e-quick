<template>
  <div class="nav-bar">
    <h3>{{ title }}</h3>
    <div class="profile">
      <img src="../assets/new-images/icons/profile.png" alt="Profile" />
      <div class="profile-content">
        <h4>Nargiza Akhmedova</h4>
        <p>Superadmin</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title"],
};
</script>

<style lang="scss" scoped>
.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: Montserrat;

  h3 {
    font-weight: bold;
    font-size: 24px;
    color: #394560;
  }

  .profile {
    display: flex;
    align-items: center;

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
