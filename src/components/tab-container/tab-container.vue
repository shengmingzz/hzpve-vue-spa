<template>
  <div
    @touchstart="startDrag"
    @touchmove="onDrag"
    @touchend="endDrag"
    class="mint-tab-container">
    <div
      ref="wrap"
      class="mint-tab-container-wrap">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="css">
.mint-tab-item {
    display: block;
    padding: 7px 0;
    -webkit-box-flex: 1;
        -ms-flex: 1;
            flex: 1;
    text-decoration: none
}
.mint-tab-item-icon {
    width: 24px;
    height: 24px;
    margin: 0 auto 5px
}
.mint-tab-item-icon:empty {
    display: none
}
.mint-tab-item-icon > * {
    display: block;
    width: 100%;
    height: 100%
}
.mint-tab-item-label {
    color: inherit;
    font-size: 12px;
    line-height: 1
}

.mint-tab-container-item {
    -ms-flex-negative: 0;
        flex-shrink: 0;
    width: 100%
}

.mint-tab-container {
    overflow: hidden;
    position: relative;
}
.mint-tab-container .swipe-transition {
    -webkit-transition: -webkit-transform 150ms ease-in-out;
    transition: -webkit-transform 150ms ease-in-out;
    transition: transform 150ms ease-in-out;
    transition: transform 150ms ease-in-out, -webkit-transform 150ms ease-in-out;
}
.mint-tab-container-wrap {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
}
  @component-namespace mint {
    @component tab-container {
      overflow: hidden;
      position: relative;
      @descendent wrap {
        display: flex;
      }
      .swipe-transition {
        transition: transform 150ms ease-in-out;
      }
    }
  }
</style>

<script>
import { once } from './dom'
import arrayFindIndex from './array-find-index'
/**
 * mt-tab-container
 * @desc 面板，搭配 tab-container-item 使用
 * @module components/tab-container
 *
 * @param {number|string} [value] - 当前激活的 tabId
 *
 * @example
 * <mt-tab-container v-model="selected">
 *   <mt-tab-container-item id="1"> 内容A </mt-tab-container-item>
 *   <mt-tab-container-item id="2"> 内容B </mt-tab-container-item>
 *   <mt-tab-container-item id="3"> 内容C </mt-tab-container-item>
 * </mt-tab-container>
 */
export default {
  name: 'mt-tab-container',
  props: {
    value: {},
    swipeable: Boolean
  },
  data () {
    return {
      start: { x: 0, y: 0 },
      swiping: false,
      activeItems: [],
      pageWidth: 0,
      currentActive: this.value
    }
  },
  watch: {
    value (val) {
      this.currentActive = val
    },
    currentActive (val, oldValue) {
      this.$emit('input', val)
      if (!this.swipeable) return
      const lastIndex = arrayFindIndex(this.$children,
        item => item.id === oldValue)
      this.swipeLeaveTransition(lastIndex)
    }
  },
  mounted () {
    if (!this.swipeable) return
    this.wrap = this.$refs.wrap
    this.pageWidth = this.wrap.clientWidth
    this.limitWidth = this.pageWidth / 4
  },
  methods: {
    swipeLeaveTransition (lastIndex = 0) {
      if (typeof this.index !== 'number') {
        this.index = arrayFindIndex(this.$children,
          item => item.id === this.currentActive)
        this.swipeMove(-lastIndex * this.pageWidth)
      }
      setTimeout(() => {
        this.wrap.classList.add('swipe-transition')
        this.swipeMove(-this.index * this.pageWidth)
        once(this.wrap, 'webkitTransitionEnd', _ => {
          this.wrap.classList.remove('swipe-transition')
          this.wrap.style.webkitTransform = ''
          this.swiping = false
          this.index = null
        })
      }, 0)
    },
    swipeMove (offset) {
      this.wrap.style.webkitTransform = `translate3d(${offset}px, 0, 0)`
      this.swiping = true
    },
    startDrag (evt) {
      if (!this.swipeable) return
      evt = evt.changedTouches ? evt.changedTouches[0] : evt
      this.dragging = true
      this.start.x = evt.pageX
      this.start.y = evt.pageY
    },
    onDrag (evt) {
      if (!this.dragging) return
      let swiping
      const e = evt.changedTouches ? evt.changedTouches[0] : evt
      const offsetTop = e.pageY - this.start.y
      const offsetLeft = e.pageX - this.start.x
      const y = Math.abs(offsetTop)
      const x = Math.abs(offsetLeft)
      swiping = !(x < 5 || (x >= 5 && y >= x * 1.73))
      if (!swiping) return
      evt.preventDefault()
      const len = this.$children.length - 1
      const index = arrayFindIndex(this.$children,
        item => item.id === this.currentActive)
      const currentPageOffset = index * this.pageWidth
      const offset = offsetLeft - currentPageOffset
      const absOffset = Math.abs(offset)
      if (absOffset > len * this.pageWidth ||
          (offset > 0 && offset < this.pageWidth)) {
        this.swiping = false
        return
      }
      this.offsetLeft = offsetLeft
      this.index = index
      this.swipeMove(offset)
    },
    endDrag () {
      if (!this.swiping) return
      this.dragging = false
      const direction = this.offsetLeft > 0 ? -1 : 1
      const isChange = Math.abs(this.offsetLeft) > this.limitWidth
      if (isChange) {
        this.index += direction
        const child = this.$children[this.index]
        if (child) {
          this.currentActive = child.id
          return
        }
      }
      this.swipeLeaveTransition()
    }
  }
}
</script>
