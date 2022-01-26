<template>
    <div>
        <textarea class="custom-input" v-if="type === 'textarea'" :style="btnStyles" style="resize: none; " ></textarea>
<div v-else-if="type === 'password'" :style="`width: ${width}px; display: flex; align-items: center`" >
      <input :type="toggle ? 'text' : type" class="custom-input password" :style="btnStyles">
         <i class="eye-close" ></i>
         <img :src="toggle ? show : close" class="toggle" @click="func()" alt="">
</div>
      <input :type="type" class="custom-input" v-else :style="btnStyles">
    </div>
</template>
<script>
export default {
  name: ''  ,
  data(){
    return{
      toggle: false,
      show:  require('../assets/images/icons/eye-show.svg'),
      close: require('../assets/images/icons/eye-close.svg')
    }
  },
   props: {
    type: {
        type: String,
        default: 'text'
    },
        width: {
        type: Number,
        default: 165
    },
        height: {
        type: Number,
        default: 46
    }
  },
  methods: {
   func(){
     this.toggle = !this.toggle
   }
  },
     computed: {
    btnStyles() {
      return {
        color: this.color,
        height: `${this.height}px`,
        width: `${this.width}px`,
      };
    }
  }
}
</script>
<style lang="scss" scoped>
.custom-input{
background: #F6F8FE;
border: 0.886581px solid #E3EBFC;
box-sizing: border-box;
border-radius: 8.86582px;
padding: 14px 25px;
font-family: Montserrat;
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 20px;
/* identical to box height */


/* Text */
color: #60739F;
}
.toggle{
    float: right;
    cursor: pointer;
        margin-left: -40px;
}
.eye-close{
background-image: url('../assets/images/icons/eye-close.svg');
}
</style>