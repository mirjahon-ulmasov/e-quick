<template>
  <div class="error-page">
    <img src="../../assets/images/icons/404.png" alt="404" />
    <h3>Страница которую вы ищете не сущуствует.</h3>
    <p>
      Пожалуйста попробуйте перейти на главную страницу либо вернуться обратно.
    </p>
    <div class="actions">
      <my-button
        @click.native="$router.go(-1)"
        type="button"
        title="Вернуться"
        bgColor="#EDF1FD"
        color="#4679EC"
      ></my-button>
      <my-button
        @click.native="$router.push('/analytics')"
        type="button"
        title="Главная страница"
        bgColor="#4679EC"
        color="#FFFFFF"
      ></my-button>
    </div>
  </div>
</template>

<script>
export default {};
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
