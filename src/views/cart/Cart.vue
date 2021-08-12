<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <cart-list/>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import CartList from "./childComps/CartList";

import {mapGetters} from 'vuex'

export default {
  name: 'Cart',
  data() {
    return {};
  },
  components: {
    NavBar,
    CartList,
  },
  computed: {
    //两种语法
    // ...mapGetters(['cartLength']),

    ...mapGetters({
      length: 'cartLength',
    })
  }
};
</script>

<style scoped>
.cart {
  height: 100vh;
}
.nav-bar {
  background: var(--color-tint);
  color: #fff;
}
</style>
