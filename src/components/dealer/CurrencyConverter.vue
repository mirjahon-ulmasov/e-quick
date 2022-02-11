<template>
  <div >
      <div v-if="open" class="converter" @click="open = false" ></div>
    <button @click="open = !open">
      <img
        src="../../assets/images/icons/currency.svg"
        v-if="!open"
        alt="curren"
      />
      <feather-icon v-else :icon="'XIcon'" class="icon" svgClasses="h-6 w-9" />
    </button>
    <transition name="show-top">
      <div v-show="open" class="exchange">
        <div class="item">
          <input
            type="text"
            v-model="value"
            class="custom"
            @keyup="Currency()"
          />
          <select
            class="custom-select ml-2"
            @click="Currency()"
            v-model="from"
          >
            <option class="options" value="UZS">UZS</option>
            <option class="options" value="USD">USD</option>
            <option class="options" value="RUB">RUB</option>
            <option class="options" value="EUR">EUR</option>
          </select>
        </div>
        <img
          @click="change = !change"
          class="change"
          src="../../assets/images/icons/change-currency.svg"
          alt="change"
        />
        <div class="item">
          <input
            type="text"
            v-model="currencies"
            class="custom"
          />
          <select
            class="custom-select ml-2"
            @click="Currency()"
            v-model="to"
          >
            <option class="options" value="UZS">UZS</option>
            <option class="options" value="USD">USD</option>
            <option class="options" value="RUB">RUB</option>
            <option class="options" value="EUR">EUR</option>
          </select>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      open: false,
      change: true,
      to: "USD",
      from: "RUB",
      value: null,
      currencies: null,
    };
  },
  methods: {
    Currency() {
      const item = {
        code_to: this.to,
        code_from: this.from,
        value: parseInt(this.value),
      };
      this.$store
        .dispatch("product/GetOrderExchange", item)
        .then((response) => {
          this.currencies =
            `${Number(response.data.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}`
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.converter {
    position: fixed;
    height: 100%;
    width: 100%;
    cursor: pointer;
}
  button {
    position: fixed;
    right: 30px;
    bottom: 30px;
    background: #4679ec;
    width: 64px;
    height: 64px;
    box-shadow: 0px 3.82748px 8px rgba(70, 121, 236, 0.1);
    border: none;
    border-radius: 50%;
    cursor: pointer;
    padding: 15px;
    .icon {
      color: #ffffff;
      .feather {
        width: 35px;
        height: 35px;
      }
    }
  }
  .exchange {
    background: #4679ec;
    width: 282px;
    height: 193px;
    box-shadow: 0px 7px 16px rgba(70, 121, 236, 0.2);
    border-radius: 27px;
    position: fixed;
    right: 100px;
    bottom: 90px;
    padding: 28px 21px;
    text-align: center;
    .change {
      margin: 18px 0px;
      cursor: pointer;
    }
    .item {
      background: #8cacf3;
      border-radius: 7px;
      height: 42px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0px 15px;
      input {
        background: transparent;
        padding: 0px 10px;
        border: none;
        height: 100%;
        width: 65%;
        font-family: Montserrat;
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 20px;
        color: #ffffff;
      }
      select {
        height: 100%;
        border: none;
        background: transparent;
        font-family: Montserrat;
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 20px;
        color: #ebebeb;
        .options {
            position: absolute;
            margin-top: 20px;
            width: 300px;
          background: #7ea2f1;
          box-shadow: 0px 2px 5px rgba(70, 121, 236, 0.1);
          border-radius: 7px;
          font-family: Montserrat;
          font-style: normal;
          font-weight: 500;
          font-size: 16px;
          line-height: 20px;
          color: #ebebeb;
          padding: 15px !important;
        }
      }
    }
  }
</style>