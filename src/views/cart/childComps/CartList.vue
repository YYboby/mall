<template>
<div class="cart-list">
  <scroll class="content" ref="scroll">
    <cart-list-item v-for="(item, index) in cartList"
                    :key="index"
                    :item-info="item"/>
  </scroll>
</div>
</template>

<script>
import Scroll from "@/components/common/scroll/Scroll";
import CartListItem from "./CartListItem";

import {mapGetters} from 'vuex';
export default {
  name: "CartList",
  computed: {
    ...mapGetters(['cartList']),
  },
  components: {
    Scroll,
    CartListItem
  },
  activated() {
    this.$refs.scroll.refresh();
  },
  methods: {
    pullingUp() {

    }
  }
}
</script>

<style scoped>
.cart-list {
  height: calc(100% - 44px - 49px);
}
.content {
  height: 100%;
  overflow: hidden;
}
</style>
