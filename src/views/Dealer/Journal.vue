<template>
  <div style="width: 100%">
    <div class="container-body">
      <div class="container-header">
        <div class="card">
          <div class="icon">
            <img src="~@/assets/dealer/img/icons/icon-bar-chart-2.svg" alt="" />
          </div>
          <div class="col">
            <p>0</p>
            <p>Клиентов</p>
            <p><span class="up">Нет данных</span> Прошлый месяц</p>
          </div>
        </div>
        <div class="card">
          <div class="icon">
            <img src="~@/assets/dealer/img/icons/icon-file.svg" alt="" />
          </div>
          <div class="col">
            <p>0</p>
            <p>Клиентов</p>
            <p><span class="down">Нет данных</span> Прошлый месяц</p>
          </div>
        </div>
        <div class="card">
          <div class="icon">
            <img src="~@/assets/dealer/img/icons/Shape.svg" alt="" />
          </div>
          <div class="col">
            <p>0</p>
            <p>Клиентов</p>
            <p><span class="up">Нет данных</span> Прошлый месяц</p>
          </div>
        </div>
        <div class="card">
          <div class="icon">
            <img
              src="~@/assets/dealer/img/icons/carbon_request-quote.svg"
              alt=""
            />
          </div>
          <div class="col">
            <p>0</p>
            <p>Клиентов</p>
            <p><span class="down">Нет данных</span> Прошлый месяц</p>
          </div>
        </div>
      </div>
     <div class="scrol">
        <h2 class="head mt-4">{{ $t('journal.lastJ') }} :</h2>
      <Table />
    </div>
    </div>
    <div class="container-footer">
      <div class="image">
        <a href="https://akfagroup.com/uz/engelberg-7600.html" target="__blank" class="contact">Engelberg 7600</a>
      </div>
    </div>
  </div>
</template>
<script>
import Table from "@/components/dealers/order/Table.vue";
export default {
  components: {
    Table,
  },
  name: "Journal",
};
</script>
<style lang="scss" scoped>
.container-header {
  height: 20%;
  padding: 30px;
  padding-left: 0px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  div.card {
    margin: 10px;
    height: 118.9833984375px;
    width: 100%;
    border-radius: 8.811594009399414px;
    background: #ffffff;
    box-shadow: 0px 4.4058px 15.4203px rgba(0, 0, 0, 0.1);
    border-radius: 8.81159px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 0px;
    div.icon {
      margin: 7px;
      height: 52.10952377319336px;
      width: 52.10952377319336px;
      background: linear-gradient(102.4deg, #3f4f61 -160.6%, #3a9fd1 156.82%);
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    div.col {
      width: 65%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      p {
        margin: 5px 0px;
        position: relative;
        &:nth-child(1) {
          font-style: normal;
          font-weight: 600;
          font-size: 15.6329px;
          line-height: 19px;
          display: flex;
          align-items: center;
          color: #171717;
        }
        &:nth-child(2) {
          font-style: normal;
          font-weight: 500;
          font-size: 12.1589px;
          line-height: 15px;
          color: #b9b9b9;
        }
        &:nth-child(3) {
          font-style: normal;
          font-weight: normal;
          font-size: 12.1589px;
          line-height: 15px;
          color: #b9b9b9;
        }
        span.up {
          font-family: "Inter" sans-serif;
          font-style: normal;
          font-weight: normal;
          font-size: 12.1589px;
          line-height: 15px;
          margin-left: 16px;

          /* Success */
          color: #4bde97;
          &::before {
            // left: -12%;
            content: "";
            display: block;
            position: absolute;
            width: 20px;
            height: 20px;
            background: url("~@/assets/dealer/img/icons/icon-trending-up.svg");
            background-repeat: no-repeat;
          }
        }
        span.down {
          font-family: "Inter" sans-serif;
          font-style: normal;
          font-weight: normal;
          font-size: 12.1589px;
          line-height: 15px;
         margin-left: 16px;

          /* Danger */
          color: #f26464;
          &::before {
            // left: -12%;
            content: "";
            display: block;
            position: absolute;
            width: 20px;
            height: 20px;
            background: url("~@/assets/dealer/img/icons/icon-trending-down.svg");
            background-repeat: no-repeat;
          }
        }
      }
    }
  }
}
.container-body {
  padding: 25px;
  padding-bottom: 0;
  width: 100%;
  height: 80%;
  // overflow-y: scroll;
  .head {
    font-family: Montserrat;
    font-style: normal;
    font-weight: bold;
    font-size: 22.615px;
    line-height: 33px;
    background-image: linear-gradient(
      99.52deg,
      #3f4f61 -14.96%,
      #3a9fd1 156.83%
    );
    -webkit-background-clip: text !important;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
    display: table;
    /* identical to box height, or 200% */

    // text-align: end;
    letter-spacing: 0.458111px;
  }
  .scrol{
      height: 80%;
  padding-right: 15px;
    overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #234b79;
  }
  }
  .export {
    padding-right: 25px;
    margin-bottom: 20px;
    display: flex !important;
    align-items: center;
    float: right;
    cursor: pointer;
    .exp {
      width: 75.57px;
      height: 13.39px;
      left: 1316.52px;
      top: 82.7px;

      // font-family: Avenir Next;
      font-style: normal;
      margin-left: 5px;
      font-weight: normal;
      font-size: 11.56604px;
      line-height: 13px;
      text-align: right;

      color: #000000;
    }
  }
  .export:hover {
    box-shadow: 0 8px 25px -8px #135c81;
  }
}
.container-footer {
  width: 100%;
  height: 20%;
    border-bottom-right-radius: 30px;
  border-bottom-left-radius: 30px;
  box-sizing: border-box;
  // background-size: 100% 100%;
  .image{
          background-image: url("https://akfagroup.com/img/src/promo/engelberg-7600.jpg");
      background-size: cover;
      background-position-y: center;
        position: relative;
  background-repeat: no-repeat;
  width: 100%;
      border-bottom-right-radius: 30px;
    border-bottom-left-radius: 30px;
    overflow: hidden;
  height: 100%;
  background: cover cover;
    display: flex;
  align-items: center;
    .contact {
    font-family: "Montserrat" sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 25px;
    line-height: 30px;
    z-index: 222;
    color: #ffffff;
    position: relative;
    margin-left: 150px;
    &::before {
      left: -30%;
      top: -20%;
      content: "";
      display: block;
      position: absolute;
      width: 50px;
      height: 50px;
      background: url("~@/assets/dealer/img/icons/engelberg-icon.svg");
      background-repeat: no-repeat;
    }
  }
  }
.image:before{
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(20, 18, 18, 0.4);
    content: "";
    z-index: 3;
}
}
</style>
