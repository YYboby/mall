import {debounce} from "./utils";
import BackTop from "@/components/content/backTop/BackTop";

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null

    }
  },
  mounted() {
    let newrefresh = debounce(this.$refs.scroll.refresh, 50);
    this.itemImgListener = () => {
      newrefresh();
    }
    this.$bus.$on('itemImageLoad', this.itemImgListener);
  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backClick() {
      //快速回到顶部按钮，第三个参数,500毫秒回到顶部
      this.$refs.scroll.scrollTo(0, 0, 300);
    },
    listenShowBackTop(position) {
      //判断BackTop是否显示
      this.isShowBackTop = (-position.y) > 1000
    }
  }
}
