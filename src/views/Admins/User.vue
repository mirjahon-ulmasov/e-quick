<template>
  <div>
    <mtable :header="header" :items="items" ></mtable>
    <my-button @click.native="Use()"></my-button>
    <my-input :type="'select'" v-model="activeUser" :height="48" :width="375" ></my-input>
  </div>
</template>
<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
export default {
  name: "Company",
  data() {
    return {
      activePrompt: false,
      itemsPerPage: 4,
      activeUser: 'f',
      PopUp: false,
      PopUpData: {},
      settings: {
        maxScrollbarLength: 60,
      },
      header: [
        {title: 'Salom'},
        {title: 'Salom'},
        {title: 'Salom'}
      ],
      items: [
        {title: 'Salom'},
        {title: 'Salom'},
        {title: 'Salom'}
      ]
    };
  },
  components: {  VuePerfectScrollbar },
  methods:{
   Use(){
     console.log('dddd');
     console.log(this.activeUser);
   }
  },
  updated(){
    console.log(this.activeUser);
  }
};
</script>
<style scoped>
.scr {
  overflow-y: scroll;
  height: 100px;
  display: block;
}
.heading {
  /* width: 149px; */
  font-family: Product Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 23px;
  line-height: 22px;
  /* identical to box height */

  color: #000000;
}
.bills {
  font-family: Gilroy;
  font-style: normal;
  font-weight: 300;
  font-size: 17px;
  line-height: 15px;
  /* identical to box height */

  color: #000000;
}
.bills-num {
  margin-top: 8px;
  /* font-family: Gugi; */
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 30px;
  /* identical to box height */
  font-weight: 600;

  color: #000000;
}
.widget {
  height: 42px !important;
  border: none;
  float: right;
  background: #ff7f5c !important;
  /* box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); */
  border-radius: 5px;
}
.widget:hover {
  border: none !important;
}
.widget-text {
  /* padding: 8px 18px !important; */
  font-family: Product Sans;
  font-style: normal;
  font-weight: normal;
  /* font-size: 15px !important; */
  line-height: 16px !important;
  /* identical to box height */

  color: #ffffff;
}
.color {
  width: 30px;
  height: 30px;
  background: #c4c4c4;
  border-radius: 5px;
}
.status {
  color: white;
  background: #80e1b2;
  border-radius: 5px;
}
.itm {
  background: #fefeff;
  box-shadow: 0px 100px 80px rgba(41, 72, 152, 0.05),
    0px 64.8148px 46.8519px rgba(41, 72, 152, 0.037963),
    0px 38.5185px 25.4815px rgba(41, 72, 152, 0.0303704),
    0px 20px 13px rgba(41, 72, 152, 0.025),
    0px 8.14815px 6.51852px rgba(41, 72, 152, 0.0196296),
    0px 1.85185px 3.14815px rgba(41, 72, 152, 0.012037);
  border-radius: 18px;
  padding: 14px;
}
.resize {
  padding-left: 2px;
  padding-top: 3px;
}
</style>
<style lang="scss">
#data-list-list-view {
  .vs-con-table {
    /*
      Below media-queries is fix for responsiveness of action buttons
      Note: If you change action buttons or layout of this page, Please remove below style
    */
    @media (max-width: 689px) {
      .vs-table--search {
        margin-left: 0;
        max-width: unset;
        width: 100%;

        .vs-table--search-input {
          width: 100%;
        }
      }
    }

    @media (max-width: 461px) {
      .items-per-page-handler {
        display: none;
      }
    }

    @media (max-width: 341px) {
      .data-list-btn-container {
        width: 100%;

        .dd-actions,
        .btn-add-new {
          width: 100%;
          margin-right: 0 !important;
        }
      }
    }

    .product-name {
      max-width: 23rem;
    }

    .vs-table--header {
      display: flex;
      flex-wrap: wrap;
      margin-left: 1.5rem;
      margin-right: 1.5rem;
      > span {
        display: flex;
        flex-grow: 1;
      }

      .vs-table--search {
        padding-top: 0;
        position: absolute;
        right: 54% !important;

        .vs-table--search-input {
          padding: 0.9rem 2.5rem;
          border: none;
          font-size: 1rem;
          background: #f7f8fd;
          backdrop-filter: blur(4px) !important;
          border-radius: 5px !important;
          width: 201px !important;

          & + i {
            left: 1rem;
          }

          &:focus + i {
            left: 1rem;
          }
        }
      }
    }

    .vs-table {
      border-collapse: separate;
      border-spacing: 0 1.3rem;
      padding: 0 1rem;
      tr {
        box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05);
        td {
          padding: 17px;
          font-size: 15px;
          font-weight: 500;
          &:first-child {
            border-top-left-radius: 0.5rem;
            border-bottom-left-radius: 0.5rem;
          }
          &:last-child {
            border-top-right-radius: 0.5rem;
            border-bottom-right-radius: 0.5rem;
          }
        }
        td.td-check {
          padding: 20px !important;
        }
      }
    }
    .vs-table--thead {
      th {
        padding-top: 0;
        padding-bottom: 0;
      }
      th.td-check {
        padding: 0 15px !important;
      }
      tr {
        background: none;
        box-shadow: none;
      }
    }

    .vs-table--pagination {
      justify-content: center;
    }
  }
}
</style>
