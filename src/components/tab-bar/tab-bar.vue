<template>
  <div class="tabbar">
    <div class="item" :style="selected === ids[key] ? 'color:#c88c46;border-bottom:.1rem solid #c88c64;' : 'color:#666;border-bottom:.1rem solid #fff;'" @click="clickItem(key)" v-for="(item,key) in titles" :key="key" >
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
var _ = require('lodash-node')
export default {
  name: 'mt-navbar',
  data () {
    return {
      selected: ''
    }
  },
  props: {
    fixed: Boolean,
    value: {},
    titles: {type: Array, default: function () { return [] }},
    ids: {type: Array, default: function () { return [] }}
  },
  created () {
    if (_.isArray(this.ids) && this.ids.length > 0) {
      this.selected = this.ids[0]
    }
  },
  methods: {
    clickItem (index) {
      this.selected = this.ids[index]
      this.$emit('input', this.selected)
    }
  },
  watch: {
    ids: function setCurrent (value) {
      if (_.isArray(value) && value.length > 0) {
        this.selected = value[0]
      }
    },
    value: function setValue (data) {
      this.selected = data
    }
  }
}
</script>

<style >
.tabbar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 2.2rem;
  background-color: #fff;
}
.item {
  color: #666;
  font-size: .7rem;
  text-align: center;
  height: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
