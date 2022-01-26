<template>
    <div>
        <textarea class="custom-input" v-if="type === 'textarea'" :style="btnStyles" style="resize: none; " ></textarea>
      <input :type="type" class="custom-input" v-else :style="btnStyles">
    </div>
</template>
<script>
export default {
  name: ''  ,
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
</style>