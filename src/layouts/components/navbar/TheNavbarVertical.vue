<template>
  <div class="relative">

    <div class="vx-navbar-wrapper">

      <vs-navbar class="vx-navbar navbar-custom navbar-skelton">

        <!-- SM - OPEN SIDEBAR BUTTON -->
        <feather-icon class="sm:inline-flex xl:hidden cursor-pointer p-2" icon="MenuIcon" @click.stop="showSidebar" />
          <div class="the-navbar__user-meta flex items-center" >
    <vs-dropdown vs-trigger-click class="cursor-pointer">

      <div class="con-img">
        <img  key="onlineImg" src="https://i.imgur.com/jcDqb3U.jpg" alt="user-img" width="50" height="50" class="rounded-full shadow-md cursor-pointer block" />
      </div>
    </vs-dropdown>
        <div class="text-right leading-tight hidden sm:block ml-3">
      <p 
      style="font-size: 26px; font-family: Gilroy;"
      class=""> Good Evening Mikey </p>
    </div>
  </div>
        <vs-spacer />
        <select name="select" id="vs-select">
          <option value="1">Choose</option>
           <option   value="1">item</option>
            <option  value="1">item</option>
             <option  value="1">item</option>
        </select>
        <div class="not">
           <svg xmlns="http://www.w3.org/2000/svg" width="24px" style="color: white" height="24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-message-square h-6 w-6 stroke-current"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
       </div>
        <feather-icon icon="BellIcon" class="cursor-pointer mt-1 sm:mr-6 mr-2" />
        <feather-icon icon="UserIcon" class="cursor-pointer mt-1 sm:mr-6 mr-2" />


      </vs-navbar>
    </div>
  </div>
</template>


<script>

export default {
  name: 'the-navbar-vertical',
  methods: {
    showSidebar () {
      this.$store.commit('TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE', true)
    }
  }
}
</script>
<style scoped>
.not{
  display: flex;
  align-items: center;
  justify-content: center;
width: 40px;
height: 40px;
margin-left: 14px;
margin-right: 45px;
/* Pallet 4 / Accent */

background: #FF7F5C;
border-radius: 9px;
}
.stok{
  /* Rectangle 192 (Stroke) */

position: absolute;
width: 16px;
height: 13.84px;
left: 2px;
top: 8px;

background: #FFFFFF;
}
#vs-select{
width: 181px;
height: 40px;
border: none;
padding-left: 17px;
padding-right: 15px;
background: #FFFFFF;
border-radius: 9px;
}
option{
  padding: 10px;
  background: white;
}
</style>

