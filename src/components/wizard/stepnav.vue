<template>
  <div>
      <ol class="step-indicator">
          <li
              v-for="(step, i) in steps"
              :key="i"
              is="step-navigation-step"
              :step="step"
              :currentstep="currentstep">
          </li>
      </ol>
  </div>
</template>

<script>
export default {
    data: function () {
      return {
          indicatorclass: false
      }
  },
props: ['steps', 'currentstep']
}
</script>

<style>

</style>