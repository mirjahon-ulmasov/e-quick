<template>
  <div>
    <form>
      <div class="form-input">
        <h4>Выберите роль</h4>
        <my-input type="input" width="375" />
      </div>
      <div class="form-input">
        <h4>Ф.И.О.</h4>
        <my-input type="input" width="375" />
      </div>
      <div class="form-input">
        <h4>Телефон номера</h4>
        <my-input type="input" width="375" />
      </div>
      <div class="form-input">
        <h4>Имя пользователя</h4>
        <my-input type="input" width="375" />
      </div>
      <div class="form-input">
        <h4>Пароль</h4>
        <my-input type="input" width="375" />
      </div>
      <div class="form-input">
        <h4>Потвердите пароль</h4>
        <my-input type="input" width="375" />
      </div>
      <div class="actions">
        <my-button
          title="Отменить"
          bgColor="#EDF1FD"
          color="#4679EC"
        ></my-button>
        <my-button
          title="Добавить"
          bgColor="#4679EC"
          color="#FFFFFF"
        ></my-button>
      </div>
    </form>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
form {
  .form-input {
    margin: 25px 0;

    h4 {
      margin-bottom: 12px;
      font-weight: 500;
      font-size: 16px;
      color: #394560;
    }
  }

  .actions {
    margin-top: 2rem;
    width: 375px;
    display: flex;
    justify-content: space-between;
  }
}
</style>
