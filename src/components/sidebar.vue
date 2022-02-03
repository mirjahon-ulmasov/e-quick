<template>
  <transition name="show">
    <div class="overlay" v-show="show" @click="Close()">
      <div class="sidebar">
        <div class="actions">
          <feather-icon
            :icon="'XIcon'"
            @click="Close()"
            class="icon"
            svgClasses="h-6 w-9"
          />
        </div>
        <div class="body"></div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    Close() {
      this.$emit("close");
    },
  },
};
</script>
