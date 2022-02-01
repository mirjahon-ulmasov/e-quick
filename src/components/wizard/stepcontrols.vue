<template>
  <div>
    <div class="step-wrapper" :class="{ active: active }">
      <my-button
        type="button"
        title="Назад"
        bgColor="#EDF1FD"
        color="#4679EC"
        @click.native="lastStep()"
        :disabled="firststep"
        ></my-button
      >
      <my-button
        @click.native="nextStep()"
        style="margin-left: 35px"
          type="submit"
          title="Следующее"
          bgColor="#4679EC"
          color="#FFFFFF"
        v-if="!laststep"
        :disabled="laststep"
        >Next</my-button
      >
      <my-button 
        type="submit"
        @click.native="Submit()"
          title="Добавить"
          bgColor="#4679EC"
          color="#FFFFFF"
      v-if="laststep" style="margin-left: 35px"></my-button>
    </div>
  </div>
</template>
<script>
export default {
  props: ["step", "stepcount", "currentstep"],

  computed: {
    active: function () {
      return this.step.id == this.currentstep;
    },

    firststep: function () {
      return this.currentstep == 1;
    },

    laststep: function () {
      return this.currentstep == this.stepcount;
    },
  },
  methods: {
    nextStep: function () {
      this.$emit("step-change", this.currentstep + 1);
    },

    lastStep: function () {
      this.$emit("step-change", this.currentstep - 1);
    },
   Submit(){
     this.$emit("step-change", true );
   }
  },
};
</script>

<style>
</style>