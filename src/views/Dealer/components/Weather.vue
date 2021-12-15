<template>
  <div class="vx-row weather">
    <div class="vx-col sm:w-full lg:w-2/5 pl-0">
      <div class="bg1">
        <div style="float: right; padding: 5px">
          <img src="@/assets/dealer/img/icons/oy.svg" alt="oy" />
        </div>
        <br />
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
          <h3 class="text">Конвертер валют</h3>
          <img
            style="margin-top: -8px"
            src="@/assets/dealer/img/icons/dollar.svg"
            alt="som"
          />
        </div>
        <div class="">
          <div class="flex">
            <input type="text" v-model="value" class="custom" @keyup="Currency()" />
            <select class="custom-select ml-2" @click="Currency()" v-model="exchange" >
              <option value="USD">Usd</option>
              <option value="RUB">Rub</option>
              <option value="EUR">Eur</option>
            </select>
          </div>
          <input type="text" v-model="currencies" class="custom mt-2" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'weather',
  data () {
    return {
      weather: null,
      date: '',
      month: '',
      day: '',
      region: '',
      exchange: 'USD',
      value: null,
      currencies: null
    }
  },
  methods: {
     Geolocation: async  function () {
      axios
        .get('http://ipinfo.io/195.158.4.138?token=b717c9d541b33e')
        .then((response) => {
          this.region = response.data.region
          console.log(response, 'loca')
        })
    },
    Currency () {
      const item = 
         {
           code: this.exchange,
           value: this.value
         }
      this.$store.dispatch('product/GetOrderExchange', item).then(response => {
        this.currencies = `${Number(response.data.value).toLocaleString('de-DE')  }  ` + 'soum'
      })
    },
     Weathers: async  function () {
      const Current = `https://api.weatherapi.com/v1/current.json?key=8820a279f8d041ac96043919211412&q=${this.region}&aqi=yes`
      axios.get(Current).then((response) => {
        console.log(response, 'weaher')
        this.weather = Math.round(response.data.current.temp_c)
      })
    },
    CurrentDates () {
      const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]
      const today = new Date()
      this.date = String(today.getDate()).padStart(2, '0')
      this.month = monthNames[today.getMonth()]
      switch (new Date().getDay()) {
      case 0:
        this.day = 'Sunday'
        break
      case 1:
        this.day = 'Monday'
        break
      case 2:
        this.day = 'Tuesday'
        break
      case 3:
        this.day = 'Wednesday'
        break
      case 4:
        this.day = 'Thursday'
        break
      case 5:
        this.day = 'Friday'
        break
      case 6:
        this.day = 'Saturday'
      }
    }
  },
  mounted () {
    this.Geolocation()
    setTimeout(() => this.Weathers(), 500)
    this.Currency()
    this.CurrentDates()
  }
}
</script>
<style lang="scss">
.weather {
  .bg1 {
    width: 100%;
    height: 80.61px;
    background: linear-gradient(99.52deg, #3f4f61 -14.96%, #3a9fd1 156.83%);
    border-radius: 7.68696px;
    .flex {
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

      background: linear-gradient(90deg, #434343 0%, #000000 100%);
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