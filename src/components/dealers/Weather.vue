<template>
  <div class="vx-row weather">
    <div class="vx-col sm:w-full lg:w-2/5 pl-0">
      <div class="bg1">
        <div style="display: flex; justify-content: flex-end;padding: 5px">
          <img src="@/assets/dealer/img/icons/oy.svg" alt="oy" />
        </div>
        <div class="flex">
          <h2 class="head">{{ weather }}°</h2>
          <div class="ml-3">
            <span class="date"> {{ day }}, {{ date }} {{ month }} </span>
            <br />
            <span class="location">
              <img src="@/assets/dealer/img/icons/pinmap.svg" alt="oy" />
              {{ region }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="vx-col sm:w-full lg:w-3/5 pr-0">
      <div class="bg2 flex">
        <div>
          <h3 class="text">{{ $t('conver') }}</h3>
          <img
            style="margin-top: -8px"
            src="@/assets/dealer/img/icons/dollar.svg"
            alt="som"
          />
        </div>
        <div class="">
          <div class="flex">
            <input
              type="text"
              v-model="value"
              class="custom"
              @keyup="Currency()"
            />
            <select
              class="custom-select ml-2"
              @click="Currency()"
              v-model="exchange"
            >
              <option value="USD">USD</option>
              <option value="RUB">RUB</option>
              <option value="EUR">EUR</option>
            </select>
          </div>
          <input type="text" v-model="currencies" class="custom mt-2" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "weather",
  data() {
    return {
      weather: null,
      date: "",
      month: "",
      day: "",
      region: "",
      exchange: "USD",
      value: null,
      currencies: null,
    };
  },
  methods: {
    Geolocation: async function () {
      axios
        .get("https://ipinfo.io/195.158.4.138?token=b717c9d541b33e")
        .then((response) => {
          this.region = response.data.region;
        });
    },
    Currency() {
      const item = {
        code: this.exchange,
        value: parseInt(this.value),
      };
      this.$store
        .dispatch("product/GetOrderExchange", item)
        .then((response) => {
          this.currencies =
            `${Number(response.data.value).toLocaleString("de-DE")}  ` + "soum";
        });
    },
    Weathers: async function () {
      const Current = `https://api.weatherapi.com/v1/current.json?key=8820a279f8d041ac96043919211412&q=${this.region}&aqi=yes`;
      axios.get(Current).then((response) => {
        this.weather = Math.round(response.data.current.temp_c);
      });
    },
    CurrentDates() {
      const today = new Date();
      this.date = String(today.getDate()).padStart(2, "0");
      // this.month = monthNames[today.getMonth()];
      switch (new Date().getDay()) {
        case 0:
          this.day = this.$t('weeks.day7');
          break;
        case 1:
          this.day = this.$t('weeks.day1');
          break;
        case 2:
          this.day = this.$t('weeks.day2');
          break;
        case 3:
          this.day = this.$t('weeks.day3');
          break;
        case 4:
          this.day = this.$t('weeks.day4');
          break;
        case 5:
          this.day = this.$t('weeks.day5');
          break;
        case 6:
          this.day = this.$t('weeks.day6');
      }
      switch (new Date().getMonth()) {
        case 0:
          this.month = 
          localStorage.getItem('lang') ? this.$t('month.day1') : this.$t('month.day3');
          break;
        case 1:
          this.month = this.$t('month.day2');
          break;
        case 2:
          this.month = this.$t('month.day3');
          break;
        case 3:
          this.month = this.$t('month.day4');
          break;
        case 4:
          this.month = this.$t('month.day5');
          break;
        case 5:
          this.month = this.$t('month.day6');
          break;
        case 6:
          this.month = this.$t('month.day7');
                  case 7:
          this.month = this.$t('month.day8');
                  case 8:
          this.month = this.$t('month.day9');
                  case 9:
          this.month = this.$t('month.day10');
                  case 10:
          this.month = this.$t('month.day11');
                  case 11:
         this.month = this.$t('month.day12');
      }
    },
  },
  mounted() {
    this.Geolocation();
    setTimeout(() => this.Weathers(), 1000);
    this.CurrentDates();
   console.log(new Date().getMonth());
  },
  updated(){
    this.CurrentDates()
  }
};
</script>
<style lang="scss">
.weather {
  .bg1 {
    width: 100%;
    min-height: 85.61px;
    background: linear-gradient(81.75deg, #3C4A5A 99.96%, #3A9FD1 183.61%) !important;
    border-radius: 7.68696px;
        display: flex;
    flex-direction: column;
    .flex {
          margin-top: -7px;
      justify-content: center;
      align-items: center;
    }
    .head {
      font-family: Helvetica;
      font-style: normal;
      font-weight: normal;
      font-size: 48.0435px;
      line-height: 29px;
      /* identical to box height, or 60% */
      text-align: center;
      letter-spacing: 0.02em;

      color: #ffffff;
    }
    .date {
      font-family: Montserrat;
      font-style: normal;
      font-weight: normal;
      font-size: 11.5304px;
      line-height: 7px;
      /* identical to box height, or 65% */

      letter-spacing: 0.02em;

      color: #ffffff;
    }
    .location {
      font-family: Montserrat;
      font-style: normal;
      font-weight: normal;
      font-size: 9.6087px;
      line-height: 7px;
      /* identical to box height, or 78% */

      letter-spacing: 0.02em;

      color: #ffffff;
    }
  }
  .bg2 {
    width: 100%;
    height: 78.25px;
    padding: 7px;
    align-items: center;
    justify-content: space-around;
    background: #ffffff;
    box-shadow: 0px 3.72603px 13.0411px rgba(0, 0, 0, 0.1);
    border-radius: 7.45205px;
    .text {
      font-family: Poppins;
      font-style: normal;
      font-weight: bold;
      font-size: 13.9726px;
      line-height: 33px;
      /* identical to box height, or 233% */

      color: #000000;
    }
    .custom {
      width: 100%;
      padding: 2px 5px 2px 6px;
      height: 21.42px;
      border: none;
      background: #f2f2f2;
      border-radius: 1.74193px;
      font-family: Montserrat;
      font-style: normal;
      font-weight: bold;
      font-size: 9.31507px;
      line-height: 11px;
    }
    .custom-select {
      width: 51.28px;
      height: 21.42px;
      left: 847.08px;
      top: 805.29px;

       background: linear-gradient(81.75deg, #3C4A5A 99.96%, #3A9FD1 183.61%);
       border: none;
      border-radius: 1.86301px;
      font-family: Montserrat;
      font-style: normal;
      font-weight: bold;
      font-size: 9.31507px;
      line-height: 11px;

      color: #ffffff;
      option {
        color: black !important;
        font-size: 12px !important;
      }
    }
  }
}
</style>