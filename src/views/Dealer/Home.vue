<template>
    <div class="wrapper">
      <SideBar />
         <div class="container">
            <div class="row flex">
               <div class="w-3/5 flex">
                  <div class="w-auto">
                <h2 class="cathaed">
                  Выберите категорию
              </h2>
              <v-select v-model="selected" :options="options" />
                  </div>
              <div class="w-auto ml-6">
                <h2 class="cathaed">
                  Выберите подкатегорию
              </h2>
                  </div>
               </div>
            <div class="ml-6 w-auto">
              <h2 class="cathaed">
                  Выберите категорию
              </h2>
               </div>
            </div>
             <div class="container-footer">
            </div>
        </div>
    </div>
</template>
<script>
import vSelect from 'vue-select'
import SideBar  from  "./components/Sidebar.vue"
export default {
  components: { 
    SideBar
    },
  name: "Home",
  data(){
    return{
      options: [
        {id: 1, label: 'foo'},
        {id: 3, label: 'bar'},
        {id: 2, label: 'baz'}
      ],
      selected: {id: 3, label: 'bar'}
    }
  },
  components: {
  'v-select':  vSelect
  }
};
</script>
<style scoped>
.cathead{
  font-family: Montserrat;
font-style: normal;
font-weight: 500;
font-size: 15.9208px;
line-height: 19px;
}
</style>
<style lang="scss" scoped>
div.wrapper {
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: linear-gradient(215.31deg, #3f4f61 8.35%, #3a9fd1 137.05%);
  div.container {
    width: 80%;
    height: 100%;
    padding: 0px !important;
    background: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius:  30px;
    justify-content: flex-end;
    .row{
      height: 80%;
      padding: 20px;
      width: 100%;
      display: flex;
      // flex-direction: row;
        
    }
    .container-footer{
      width: 100%;
      height: 20%;
      background-image: url("~@/assets/dealer/img/svg/components/Footer2.png");
      background-repeat: no-repeat;
      background: cover cover;
      box-sizing: border-box;
      background-size: 100% 100%;
    }
  }
}
</style>