<template>
  <div ref="waterfall"
       class="waterfall"
       v-resize="_.debounce(resize,100)"
       :style="{height:`${containerHeight}px`}"
  >
    <div class="waterfall-item"
         v-for="(img,i) in list"
         :key="i"
         ref="item"
         :style="{width:`${imageWidth}px`}"
    >
      <div class="waterfall-item-box">
        <slot
            name="image"
            :data="{
              ...img,
              imageWidth : imageWidth
            }"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {addClass, hasClass} from "@/utils/domUtil";

export default {
  name: "IWaterfall",
  props:{
    list: {
      type: Array,
      default: () => []
    },
    breakpoints: {
      type: Object,
      default: () => ({
        1200: {
          row: 4
        },
        914: {
          row: 3
        },
        760: {
          row: 2
        }
      })
    },
    width: {
      type: Number,
      default: 210
    },
    imageGutter: {
      type: Number,
      default: 10
    },
    animationEffect: {
      type: String,
      default: 'fadeIn'
    },
    animationDuration: {
      type: String,
      default: '1s'
    },
    animationDelay: {
      type: String,
      default: '.3s'
    },
  },
  data(){
    return{
      containerWidth: -1,
      offsetHeightArray: [],
    }
  },
  watch: {
    list: {
      handler() {
        this.containerWidth = this.$refs.waterfall.clientWidth
        this.$nextTick(() => {
          this.calculatePosition()
        })
      },
    },
    rowCount(){
      setTimeout(()=>{
        this.calculatePosition()
      },1000)
    }
  },
  computed: {
    imageWidth() {
      if (this.containerWidth === -1) {
        return 0
      }
      const breakpoints = Object.keys(this.breakpoints)
          .map(v => Number(v))
          .sort((a, b) => a - b)
      for (let i = 0; i < breakpoints.length; i++) {
        const size = breakpoints[i]
        if (this.containerWidth !== 0 && this.containerWidth <= size) {
          return Math.floor(
              (this.containerWidth - this.imageGutter) /
              this.breakpoints[size].row - this.imageGutter
          )
        }
      }
      return this.width
    },
    rowCount() {
      if (this.containerWidth === -1) {
        return 0
      }
      return Math.floor(
          (this.containerWidth - this.imageGutter) / (this.imageWidth + this.imageGutter)
      )
    },
    shiftX() {
      const contentWidth =
          this.rowCount * (this.imageWidth + this.imageGutter) + this.imageGutter;
      return (this.containerWidth - contentWidth) / 2;
    },
    containerHeight() {
      return this._.max(this.offsetHeightArray)
    }
  },
  methods: {
    calculatePosition() {
      const itemList = this.$refs.item
      this.offsetHeightArray = []
      if (!itemList) {
        return
      }
      for (let i = 0; i < this.rowCount; i++) {
        this.offsetHeightArray.push(0)
      }
      itemList.forEach(item => {
        const minHeight = this._.min(this.offsetHeightArray)
        const minIndex = this.offsetHeightArray.indexOf(minHeight)
        this.offsetHeightArray[minIndex] += (item.getBoundingClientRect().height + this.imageGutter)
        const posX = minIndex * (this.imageWidth + this.imageGutter) + this.shiftX
        const posY = minHeight
        item.style.visibility = 'hidden';
        item.style['transform'] = `translate3d(${posX}px,${posY}px, 0)`;

        const content = item.firstChild
        if (!hasClass(content, 'animated')) {
          content.style['animation-duration'] = this.animationDuration;
          content.style['-webkit-animation-duration'] = this.animationDuration;
          content.style['animation-delay'] = this.animationDelay;
          content.style['-webkit-animation-delay'] = this.animationDelay;
          content.style.visibility = 'visible';
          addClass(content, 'animated')
          addClass(content, this.animationEffect)
        }
      })
    },
    resize() {
      this.containerWidth = this.$refs.waterfall.clientWidth
      this.$nextTick(() => {
        this.calculatePosition()
      })
    },
    refresh: function () {
      this._.throttle(() => {
        this.containerWidth = this.$refs.waterfall.clientWidth
        this.$nextTick(() => {
          this.calculatePosition()
        })
      }, 300)()
    }
  }
}
</script>

<style lang="scss">
.waterfall {
  width: 100%;
  position: relative;

  .waterfall-item {
    position: absolute;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    background-color: #fff;
    overflow: hidden;
    color: #303133;
    transition: .3s;
  }

  .waterfall-item-box{
    height: 100%;
    width: 100%;
  }

  .animated {
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }

  @-webkit-keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .fadeIn {
    -webkit-animation-name: fadeIn;
    animation-name: fadeIn;
  }
}
</style>