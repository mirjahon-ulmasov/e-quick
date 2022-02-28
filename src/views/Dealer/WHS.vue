<template>
  <div class="error-page">
    <img src="../../assets/images/icons/404.png" alt="404" />
    <h3>{{ $t('auth.not_found1') }}</h3>
    <p>
      {{ $t('auth.not_found2') }}
    </p>
  </div>
</template>

<script>
export default {
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
