<template>
  <div class="error-page">
    <img src="../../assets/images/icons/404.png" alt="404" />
    <h3>{{ $t('auth.not_found1') }}</h3>
    <p>
      {{ $t('auth.not_found2') }}
    </p>
    <div class="actions">
      <my-button
        @click.native="$router.go(-1)"
        type="button"
        :title="$t('auth.back')"
        bgColor="#EDF1FD"
        color="#4679EC"
      ></my-button>
      <my-button
        @click.native="routHandler"
        type="button"
        :title="$t('auth.mainPage')"
        bgColor="#4679EC"
        color="#FFFFFF"
      ></my-button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    routHandler() {
      const role = this.$store.state.auth.info;
      if (role === "super_admin" || role === "admin") {
        this.$router.push("/analytics");
      } else if (role === "dealer") {
        this.$router.push("/dealer/analytics");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.error-page {
  text-align: center;
  margin-top: 3rem;

  h3 {
    font-weight: bold;
    font-size: 26px;
    line-height: 32px;
    color: #394560;
  }

  p {
    width: 50%;
    display: inline-block;
    font-weight: 500;
    font-size: 18px;
    margin-top: 12px;
    color: #60739f;
  }

  .actions {
    display: flex;
    margin-top: 2rem;
    justify-content: center;

    & * {
      margin: 0 1rem;
    }
  }
}
</style>
