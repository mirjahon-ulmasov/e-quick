<template>
    <div class="wrapper">
        <Sidebar />
     <div class="container">
         <router-view></router-view>
     </div>
    </div>
</template>
<script>
import Sidebar from '../components/MainSidebar.vue'
export default {
    name: '',
    components: {
        Sidebar,
    }
}
</script>
<style lang="scss" scoped>

</style>