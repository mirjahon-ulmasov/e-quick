<template>
<div class="carousel-slider">
  <div id="slider">
    <transition-group tag="div" :name="transitionName" class="slides-group">
      <div @click="slide(1)" v-if="show" :key="current" class="slide" :class="slides[current].className">
        <p>{{slides[current].className}}</p>
      </div>
    </transition-group>
    <div class="btn btn-prev" aria-label="Previous slide" @click="slide(-1)">
      &#10094;
    </div>
    <div class="btn btn-next" aria-label="Next slide" @click="slide(1)">
      &#10095;
    </div>
  </div>
  <div class="progress-bar">
    <div class="progress">
      <div class="color">
      </div>
    </div>
    <span>Потрачено</span>
  </div>
</div>
</template>
<script>
export default {
  data: () => ({
    current: 0,
    direction: 1,
    transitionName: 'fade',
    show: false,
    slides: [
      { className: 'blue' },
      { className: 'red' },
      { className: 'yellow' }
    ]
  }),
  methods: {
    slide (dir) {
      this.direction = dir
      dir === 1
        ? (this.transitionName = 'slide-next')
        : (this.transitionName = 'slide-prev')
      const len = this.slides.length
      this.current = (this.current + (dir % len) + len) % len
    }
  },
  mounted () {
    this.show = true
  }
}
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Crimson+Text");
.carousel-slider {
  display: flex;
  flex-direction: column;
  span {
    margin: 5px 0px;
    font-family: "Montserrat" sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 11.7789px;
    line-height: 14px;

    color: #aeaeae;
  }
  .progress-bar {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    .progress {
      position: relative;
      width: 100%;
      height: 7.97px;
      background: #f1f1f1;
      border-radius: 11.4566px;
    }
    .progress .color {
      position: absolute;
      background: linear-gradient(90deg, #5e585c 0%, #000000 100%);
      width: 0px;
      height: 10px;
      border-radius: 15px;
      animation: progres 4s infinite linear;
    }
    @keyframes progres {
      0% {
        width: 0%;
      }
      25% {
        width: 50%;
      }
      50% {
        width: 75%;
      }
      75% {
        width: 85%;
      }
      100% {
        width: 100%;
      }
    }
  }
  /* FADE IN */
  .fade-enter-active {
    transition: opacity 1s;
  }
  .fade-enter {
    opacity: 0;
  }

  /* GO TO NEXT SLIDE */
  .slide-next-enter-active,
  .slide-next-leave-active {
    transition: transform 0.5s ease-in-out;
  }
  .slide-next-enter {
    transform: translate(0%);
  }
  .slide-next-leave-to {
    transform: translate(-0%);
  }

  /* GO TO PREVIOUS SLIDE */
  .slide-prev-enter-active,
  .slide-prev-leave-active {
    transition: transform 0.5s ease-in-out;
  }
  .slide-prev-enter {
    transform: translate(-0%);
  }
  .slide-prev-leave-to {
    transform: translate(0%);
  }

  /* SLIDES CLASSES */

  /* SLIDER STYLES */
  body {
    overflow: hidden;
    margin: 0;
    font-size: 50px;
    font-family: "Crimson Text", sans-serif;
    color: #fff;
  }
  .blue {
    background: #4a69bd;
  }

  .red {
    background: #e55039;
  }

  .yellow {
    background: #f6b93b;
  }

  #slider {
    height: 173.46292114257812px;
    width: 269.58966064453125px;
    position: relative;
  }

  .slide {
    height: 173.46292114257812px;
    width: 269.58966064453125px;
    border-radius: 8px;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .btn {
    z-index: 10;
    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    position: absolute;
    top: calc(50% - 25px);
    left: -15%;
    transition: transform 0.3s ease-in-out;
    user-select: none;
  }

  .btn-next {
    left: auto;
    right: -15%;
  }

  .btn:hover {
    transform: scale(1.1);
  }
}
</style>