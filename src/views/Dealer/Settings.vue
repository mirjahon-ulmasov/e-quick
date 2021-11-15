<template>
    <div class="wrapper">
      <SideBar />
         <div class="container">
            <form  class="container-body">
              <div class="col">
                <p class="title">Профиль</p>
                <p class="sub-title">ФИО, E-mail</p>
                <input class="custom-input" type="text" placeholder="Name">
                <input class="custom-input" type="text" placeholder="Surname">
                <input class="custom-input" type="text" placeholder="Email">
              </div>
               <div class="col">
                 <p class="title">Банковские карты</p>
                 <div class="carousel-container">
                   <Carousel/>
                   <div class="carousel-col">
                     <p><span>$</span> 130 млн</p>
                     <p class="comment">Текущий баланс</p>
                     <div class="switch-container">
                      <label class="switch" for="checkbox">
                        <input type="checkbox" id="checkbox" />
                        <div class="slider round"></div>
                      </label>
                    </div>
                    <p class="comment">Отключить карту</p>
                   </div>
                 </div>
              </div>
               <div class="col">
                  <p class="title">Пароль</p>
                  <p class="sub-title">Ваша почта -  dmataraci@gmail.com</p>
                  <input class="custom-input" type="text" placeholder="Password">
                  <input class="custom-input" type="text" placeholder="New password">
              </div>
              <div class="col">
                 <p class="title">Уведомления</p>
                 <p class="sub-title">Оповещание о серьзных событий</p>
                 <label class="checkbox-container">
                  <input type="checkbox" checked="checked">
                  <span class="checkmark"></span>
                  Получать еженедельные письма
                </label>
                 <button class="save-btn">Сохранить настройки</button>
              </div>
            </form>
            <div class="container-footer">
              <p class="contact">www.imzo.uz</p>
            </div>
        </div>
    </div>
</template>

<script>
import SideBar from './components/Sidebar.vue'
import Carousel from "./components/Carousel.vue";
export default {
  components: {
    Carousel,
    SideBar
  },
  name: "Settings",
};
</script>

<style lang="scss" scoped>
div.wrapper {
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 20px !important;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: linear-gradient(215.31deg, #3f4f61 8.35%, #3a9fd1 137.05%);
  div.container {
    width: 75%;
    height: 100%;
    padding: 0px !important;
    background: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 30px;
    .container-body {
      padding: 20px 30px;
      height: 80%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      overflow-y: scroll;
      &::-webkit-scrollbar {
        width: 10px;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background-color: #234b79;
      }
      .col {
        padding: 10px;
        width: 50%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .carousel-container {
          display: flex;
          flex-direction: row;
          .carousel-col {
            position: relative;
            padding: 40px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            &::before{
              content: "";
              display: block;
              position: absolute;
              height: 80%;
              width: 1px;
              top: 5%;
              background: #E8E8E8;
              left: 15%;
            }
            p {
              text-align: center;
              font-family: "Montserrat" sans-serif;
              font-style: normal;
              font-weight: bold;
              font-size: 26.5448px;
              line-height: 32px;
              span {
                font-size: 15.1443px;
                line-height: 18px;
              }
            }
            p.comment {
              font-family: "Montserrat" sans-serif;
              font-style: normal;
              font-weight: normal;
              font-size: 11.7789px;
              line-height: 14px;
              color: #aeaeae;
            }
            .switch {
              margin-top: 20px;
              display: inline-block;
              height: 26px;
              position: relative;
              width: 50px;
            }

            .switch input {
              display: none;
            }

            .slider {
              background-color: #ccc;
              bottom: 0;
              cursor: pointer;
              left: 0;
              position: absolute;
              right: 0;
              top: 0;
              transition: 0.4s;
            }

            .slider:before {
              background: #ffffff;
              box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
              border-radius: 11.4566px;
              bottom: 0px;
              content: "";
              height: 26px;
              left: 0px;
              position: absolute;
              transition: 0.4s;
              width: 26px;
            }

            input:checked + .slider {
              background-color: #31b778;
            }

            input:checked + .slider:before {
              transform: translateX(26px);
            }

            .slider.round {
              border-radius: 34px;
            }

            .slider.round:before {
              border-radius: 50%;
            }
          }
        }
        .title {
          font-family: "Montserrat" sans-serif;
          font-style: normal;
          font-weight: bold;
          font-size: 20.1888px;
          line-height: 23px;
          color: #000022;
        }
        .sub-title {
          font-family: "Lato" sans-serif;
          font-style: normal;
          font-weight: normal;
          font-size: 20.8699px;
          line-height: 25px;
          color: rgba(0, 0, 34, 0.5);
          margin: 20px 0px;
        }
        input.custom-input {
          margin-bottom: 10px;
          width: 80%;
          height: 57.04px;
          background: #f2f2f2;
          border-radius: 5.7972px;
          border: none;
          outline: none;
          padding-left: 20px;
          font-style: normal;
          font-weight: normal;
          font-size: 15px;
          line-height: 18px;
          color: #666666;
          &::placeholder {
            color: #666666;
          }
        }
        .save-btn {
          cursor: pointer;
          width: 305.13px;
          height: 44.91px;
          background: linear-gradient(90deg, #5e585c 0%, #000000 100%);
          border-radius: 8.6357px;
          text-align: center;
          font-family: "Lato" sans-serif;
          font-style: normal;
          font-weight: normal;
          font-size: 20.15px;
          line-height: 27px;
          letter-spacing: -0.02em;
          color: #ffffff;
        }
        .checkbox-container {
          display: block;
          position: relative;
          padding-left: 35px;
          margin-bottom: 12px;
          cursor: pointer;
          font-size: 22px;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }

        /* Hide the browser's default checkbox */
        .checkbox-container input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
          height: 0;
          width: 0;
        }

        /* Create a custom checkbox */
        .checkmark {
          position: absolute;
          top: 0;
          left: 0;
          height: 25px;
          width: 25px;
          background-color: #eee;
        }

        /* On mouse-over, add a grey background color */
        .checkbox-container:hover input ~ .checkmark {
          background-color: #ccc;
          border-radius: 8px;
          width: 29px;
          height: 29px;
        }

        /* When the checkbox is checked, add a blue background */
        .checkbox-container input:checked ~ .checkmark {
          background: #31b778;
          border-radius: 8px;
          width: 29px;
          height: 29px;
        }

        /* Create the checkmark/indicator (hidden when not checked) */
        .checkmark:after {
          content: "";
          position: absolute;
          display: none;
        }

        /* Show the checkmark when checked */
        .checkbox-container input:checked ~ .checkmark:after {
          display: block;
        }

        /* Style the checkmark/indicator */
        .checkbox-container .checkmark:after {
          left: 10.5px;
          top: 5px;
          width: 6px;
          height: 12px;
          border: solid white;
          border-width: 0 3px 3px 0;
          -webkit-transform: rotate(45deg);
          -ms-transform: rotate(45deg);
          transform: rotate(45deg);
        }
      }
    }
    .container-footer {
      width: 100%;
      height: 20%;
      box-sizing: border-box;
      background-image: url("~@/assets/dealer/img/svg/components/Footer3.png");
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
        display: flex;
        align-items: center;
        margin-left: 150px;
        color: #ffffff;
      }
    }
  }
}
</style>