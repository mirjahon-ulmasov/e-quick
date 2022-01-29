<template>
  <div>
    <div class="card-container">
      <div v-for="i in [1, 2, 3, 4]" :key="i" class="card">
        <img src="../../assets/images/icons/profile.svg" alt="Profile" />
        <h4>Общее количество админов</h4>
        <h3>25</h3>
        <h4>23% <span></span></h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {},
};
</script>

<style lang="scss" scoped>
.card-container {
  display: flex;
  .card {
    width: 30%;
    height: 203px;
    margin: 20px;
    padding: 18px;
    border-radius: 14px;
    box-shadow: 0px -2px 8px rgba(70, 121, 236, 0.1),
      2px 4px 9px rgba(70, 121, 236, 0.09);

    img {
      padding: 15px;
      border-radius: 50%;
      background: #edf2fb;
    }

    h4 {
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
      color: #7081a9;
      margin: 10px 0;
      display: flex;

      span {
        margin: 8px;
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-bottom: 5px solid #87d03f;
      }
    }

    h3 {
      font-weight: bold;
      font-size: 24px;
      line-height: 28px;
      color: #394560;
      margin: 10px 0;
    }
  }
}
</style>
