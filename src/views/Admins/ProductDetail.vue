<template>
  <div>
    <div class="user-profile" >
      <div class="user-header">
        <div class="user-header__first">
          <img src="../../assets/images/icons/products-bold.svg" width="130px" alt="user icon" />
          <div class="user-name">
            <h4>{{ product.name }}</h4>
          </div>
        </div>
        <!-- <div class="user-header__second">
          <img
            src="../../assets/images/icons/trash.svg"
            alt="trash icon"
            @click="deleteHandler"
          />
          <img
            @click="$router.push(`/user/${id}/editing`)"
            src="../../assets/images/icons/pencil.svg"
            alt="pencil icon"
          />
        </div> -->
      </div>
      <div class="user-details">
        <div class="user-detail">
          <p>Завод</p>
          <h4 v-if="product.company_name === null" style="color: #58dfb6">-</h4>
          <h4 v-else >{{ product.company_name }}</h4>
        </div>
        <div class="user-detail">
          <p>Категория</p>
          <h4 v-if="product.category_name === null" style="color: #58dfb6">-</h4>
          <h4 v-else>{{ product.category_name }}</h4>
        </div>
        <div class="user-detail">
          <p>Цена</p>
          <h4 >{{ Number(product.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") }} {{ $t('sum') }}  </h4>
        </div>
        <div class="user-detail">
          <p>Описание</p>
          <h4 v-if="product.description === 'No Description'" style="color: #58dfb6">-</h4>
          <h4 v-else>{{ product.description }}</h4>
        </div>
        <!-- <div class="user-detail">
          <p>Категории</p>
          <div class="factory">
            <span class="item" v-for="(item, i) in company.categories" :key="i" >{{ item.name }} </span>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      isDeleted: true,
    };
  },
  computed: {
    product() {
      return this.$store.state.addUser.product_detail;
    },
  },
  destroyed(){
   this.company = null
  },
  created() {
    this.$store.dispatch("addUser/fetchProductID", this.id);
  },
};
</script>

<style lang="scss" scoped>
.user-profile {
  width: 100%;
  padding: 35px;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0px 3.82748px 8px rgba(70, 121, 236, 0.1);

  .user-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .user-header__first {
      display: flex;
      align-items: center;

      img {
        background: #edf2fb;
        border-radius: 14px;
        padding: 28px 35px;
      }

      .user-name {
        margin-left: 1rem;

        h4:first-child {
          font-weight: 600;
          font-size: 20px;
          line-height: 141.4%;
          color: #00121a;
        }

        h4:nth-child(2) {
          font-weight: 500;
          font-size: 18px;
          line-height: 22px;
          color: #60739f;

          span {
            margin: 0 0.3rem;
            font-size: 20px;
          }
        }
      }
    }

    .user-header__second {
      img {
        padding: 15px;
        border-radius: 10px;
        margin: 10px;
        cursor: pointer;
        transition: 0.2s linear;
      }

      img:hover {
        transform: scale(1.1);
      }

      img:first-child {
        background: #db23791f;
      }

      img:nth-child(2) {
        background: #edf1fd;
      }
    }
  }
  .user-details {
    margin-top: 3.5rem;
    .user-detail {
      margin: 1.5rem 0;
      .factory {
        display: flex;
        align-items: center;
        margin-top: 12px;
            flex-wrap: wrap;
        .item {
          padding: 14px 40px;
          margin-right: 15px;
          margin-bottom: 20px;
          height: 45px;
          background: #edf1fd;
          border-radius: 10px;
          font-family: Montserrat;
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          line-height: 17px;
          /* identical to box height */

          text-align: center;

          /* Main */

          color: #4679ec;
        }
      }

      p {
        font-weight: 500;
        font-size: 16px;
        line-height: 20px;
        color: #394560;
      }

      h4 {
        font-weight: 600;
        font-size: 18px;
        line-height: 22px;
        color: #394560;
        margin-top: 10px;
      }
    }
  }
}
</style>
