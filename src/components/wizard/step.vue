<template>
  <li :class="indicatorclass">
          <div class="step"></div>
 </li>
</template>

<script>
export default {
 props: ['step', 'currentstep'],

  computed: {
      indicatorclass: function() {
          return {
              'active': (this.step.id == this.currentstep),
              'complete': (this.currentstep > this.step.id)
          }
      }
  }
}
</script>

<style>

</style>