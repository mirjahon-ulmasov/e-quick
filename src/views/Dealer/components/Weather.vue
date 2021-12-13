<template>
    <div class="vx-row weather" >
      <div class="vx-col sm:w-full lg:w-2/5 pl-0">
         <div class="bg1">
           <div style="    float: right; padding: 5px;">
            <img src="@/assets/dealer/img/icons/oy.svg" alt="oy">
           </div>
           <br>
            <div class="flex" >
                 <h2 class="head">
                     3°
                 </h2>
                 <div class="ml-3">
                     <span class="date">
                       {{ day }}, {{ date }} {{ month }}
                     </span> 
                     <br>
                     <span class="location">
                          <img src="@/assets/dealer/img/icons/pinmap.svg" alt="oy"> Ташкент
                     </span>
                 </div>
             </div>
         </div>
      </div>
    <div class="vx-col sm:w-full lg:w-3/5 pr-0">
      <div class="bg2 flex">
          <div>
        <h3 class="text">
           Конвертер валют  
         </h3>
         <img style="margin-top: -8px;" src="@/assets/dealer/img/icons/dollar.svg" alt="som"> 
          </div>
          <div class="">
             <div class="flex">
                 <input type="text" class="custom">
                  <select class="custom-select ml-2" value="dkjjws">
                   <option value="fff">ffff</option>
                    <option value="fff">ffff</option>
                     <option value="fff">ffff</option>
                  </select>
             </div>
             <input type="text" class="custom mt-2" >
          </div>
      </div>
      </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name: "weather",
    data() {
        return{
         weather: null,
         date: '',
         month: '',
         day: '',
         currencies: {}
        }
    },
    methods: {
        Currency: async  function (){
         axios.get('https://nbu.uz/en/exchange-rates/json/').then(response => {
          console.log(response, 'dollar')
         })
        },
        Weathers: async  function (){
        const key = '44e6b2df9e9515127e413f027b0cf7a1';
        const Current = `https://api.openweathermap.org/data/2.5/weather?q=Tashkent&appid=${key}`;
        axios.get(Current).then(
            response => {
                console.log(response, 'weaher')
        this.weather = response.data.main.temp
            }
        )
        },
        CurrentDates(){
                    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
       var today = new Date();
this.date = String(today.getDate()).padStart(2, '0');
this.month = monthNames[today.getMonth()]
switch (new Date().getDay()) {
  case 0:
    this.day = "Sunday";
    break;
  case 1:
     this.day = "Monday";
    break;
  case 2:
     this.day = "Tuesday";
    break;
  case 3:
     this.day = "Wednesday";
    break;
  case 4:
     this.day = "Thursday";
    break;
  case 5:
     this.day = "Friday";
    break;
  case 6:
     this.day = "Saturday";
}
        }
    },
    created(){
        this.Weathers()
        this.Currency()
        this.CurrentDates()
    }
}
</script>
<style lang="scss">
.weather{
    .bg1{
width: 100%;
height: 80.61px;
background: linear-gradient(99.52deg, #3F4F61 -14.96%, #3A9FD1 156.83%);
border-radius: 7.68696px;
.flex{
        justify-content: center;
    align-items: center;
}
.head{
    font-family: Helvetica;
font-style: normal;
font-weight: normal;
font-size: 48.0435px;
line-height: 29px;
/* identical to box height, or 60% */

text-align: center;
letter-spacing: 0.02em;

color: #FFFFFF;
}
.date{
    font-family: Montserrat;
font-style: normal;
font-weight: normal;
font-size: 11.5304px;
line-height: 7px;
/* identical to box height, or 65% */

letter-spacing: 0.02em;

color: #FFFFFF;
}
.location{
    font-family: Montserrat;
font-style: normal;
font-weight: normal;
font-size: 9.6087px;
line-height: 7px;
/* identical to box height, or 78% */

letter-spacing: 0.02em;

color: #FFFFFF;

}
    }
    .bg2{
        width: 100%;
height: 78.25px;
padding: 7px;
align-items: center;
justify-content: space-around;
background: #FFFFFF;
box-shadow: 0px 3.72603px 13.0411px rgba(0, 0, 0, 0.1);
border-radius: 7.45205px;
   .text{
       font-family: Poppins;
font-style: normal;
font-weight: bold;
font-size: 13.9726px;
line-height: 33px;
/* identical to box height, or 233% */


color: #000000;
   }
   .custom{
    width: 100%;
    padding: 2px 5px 2px 6px;
height: 21.42px;
border: none;
background: #F2F2F2;
border-radius: 1.74193px;
font-family: Montserrat;
font-style: normal;
font-weight: bold;
font-size: 9.31507px;
line-height: 11px;
   }
   .custom-select{
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

color: #FFFFFF;
option{
    color: black !important;
}
   }
    }
}
</style>