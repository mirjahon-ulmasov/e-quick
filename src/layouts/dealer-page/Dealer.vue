<template>
    <div>
       <router-view></router-view>
    </div>
</template>
<script>
export default {
    components:{
    }
}
</script>
<style scoped>
@charset "UTF-8";
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;400;500;600;700;800;900&display=swap');

* {
  margin: 0;
  padding: 0;
  font-family: "Poppins", sans-serif;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: none;
}

html body {
  background: linear-gradient(99.52deg, #3F4F61 -14.96%, #3A9FD1 156.83%) !important;
  font-size: 1.125rem;
  text-rendering: optimizeLegibility;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

ul li {
  margin: 0 1.75rem 0 0;
}

a {
  color: #888;
  text-decoration: none;
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
}

a:hover {
  color: #333;
}

a.active {
  color: #333;
}

h1,
h2,
h3,
h4 {
  color: #333;
  font-weight: normal;
  margin: 1.75rem 0 1rem 0;
}

h1 {
  font-size: 2.5rem;
}

h2 {
  font-size: 2.125rem;
  margin: 0;
}

h3 {
  font-size: 2rem;
}

h4 {
  font-size: 1.5rem;
  margin: 1rem 0 0.5rem 0;
}

img {
  max-width: 100%;
  height: auto;
  -o-object-fit: cover;
  object-fit: cover;
}

nav {
  display: block;
}

nav li {
  font-size: 1.125rem;
  margin: 0;
}

p {
  font-size: 16px;
  font-weight: 300;
}

a {
  text-decoration: none;
  font-size: 15px;
}
</style>
<style lang="scss" scoped>
div.wrapper{
    width: 100%;
    height: 100vh;
    margin: 0;
    padding: 0;
    background: linear-gradient(99.52deg, #3F4F61 -14.96%, #3A9FD1 156.83%);
    display: flex;
    justify-content: center;
    align-items: center;
    div.container{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        input{
            background: none;
        }
    }
}
</style>