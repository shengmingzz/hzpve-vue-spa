<template>
  <div
    v-show="$parent.swiping || id === $parent.currentActive"
    class="mint-tab-container-item">
    <slot></slot>
  </div>
</template>

<script>
/**
 * mt-tab-container-item
 * @desc 搭配 tab-container 使用
 * @module components/tab-container-item
 *
 * @param {number|string} [id] - 该项的 id
 *
 * @example
 * <mt-tab-container v-model="selected">
 *   <mt-tab-container-item id="1"> 内容A </mt-tab-container-item>
 *   <mt-tab-container-item id="2"> 内容B </mt-tab-container-item>
 *   <mt-tab-container-item id="3"> 内容C </mt-tab-container-item>
 * </mt-tab-container>
 */
export default {
  name: 'mt-tab-container-item',
  props: ['id']
}
</script>

<style>
  @component-namespace mint {
    @component tab-container-item {
      flex-shrink: 0;
      width: 100%;
    }
  }
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
</style>
