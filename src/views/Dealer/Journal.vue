<template>
    <div style="width: 100%;" >
            <div class="container-body">
          <div class="container-header">
                <div class="card">
                    <div class="icon">
                      <img src="~@/assets/dealer/img/icons/icon-bar-chart-2.svg" alt="">
                    </div>
                    <div class="col">
                        <p>1478 286</p>
                        <p>Клиентов</p>
                        <p><span class="up">0.24%</span> Прошлый месяц</p>
                    </div>
                </div>
                <div class="card">
                   <div class="icon">
                     <img src="~@/assets/dealer/img/icons/icon-file.svg" alt="">
                   </div>
                    <div class="col">
                        <p>1478 286</p>
                        <p>Клиентов</p>
                        <p><span class="down">0.24%</span> Прошлый месяц</p>
                    </div>
                </div>
                <div class="card">
                    <div class="icon">
                      <img src="~@/assets/dealer/img/icons/Shape.svg" alt="">
                    </div>
                    <div class="col">
                        <p>1478 286</p>
                        <p>Клиентов</p>
                        <p><span class="up">0.24%</span> Прошлый месяц</p>
                    </div>
                </div>
                <div class="card">
                    <div class="icon">
                      <img src="~@/assets/dealer/img/icons/carbon_request-quote.svg" alt="">
                    </div>
                    <div class="col">
                        <p>1478 286</p>
                        <p>Клиентов</p>
                        <p><span class="down">0.24%</span> Прошлый месяц</p>
                    </div>
                </div>
            </div>
              <h2 class="head">
                Журнал последних заявок:
              </h2>
                <Table />
            </div>
            <div class="container-footer">
                <p class="contact">Engelberg 7600</p>
            </div>
        </div>
</template>
<script>
import SideBar from "./components/Sidebar.vue";
import Table from "./components/Table.vue";
export default {
  components: {
    SideBar,
    Table,
  },
  name: "Journal",
}
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
        width: 234.49281311035156px;
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
          background: linear-gradient(102.4deg, #3F4F61 -160.6%, #3A9FD1 156.82%);
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

              /* Success */
              color: #4bde97;
              &::before {
                left: -12%;
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

              /* Danger */
              color: #f26464;
              &::before {
                left: -12%;
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
      width: 100%;
      height: 80%;
      overflow: scroll;
      .head{
        font-family: Montserrat;
font-style: normal;
font-weight: bold;
font-size: 22.2742px;
margin: 20px 0px 0px 0px;
line-height: 33px;
/* identical to box height, or 150% */
color:   #135c81;
letter-spacing: 0.371237px;
      }
      .export{
        padding-right: 25px;
        margin-bottom: 20px;
        display: flex !important;
        align-items: center;
        float: right;
        cursor: pointer;
      .exp{
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
      .export:hover{
        box-shadow: 0 8px 25px -8px #135c81;
      }
    }
    .container-footer {

      width: 100%;
      height: 20%;
      background-image: url("~@/assets/dealer/img/svg/components/Footer2.png");
      background-repeat: no-repeat;
      background: cover cover;
      box-sizing: border-box;
      background-size: 100% 100%;
      display: flex;
      align-items: center;

      .contact {
        font-family: "Montserrat" sans-serif;
        font-style: normal;
        font-weight: bold;
        font-size: 25px;
        line-height: 30px;
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
</style>