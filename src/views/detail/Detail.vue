<template>
  <div id="wrapper">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="container"
            ref="scroll"
            :pull-up-load="true"
            @scroll="contentScroll"
            :probe-type="3">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo"
                         @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo" ref="param"/>
      <detail-comment-info :comment-info="commentInfo" ref="commentInfo"/>
      <goods-list :goods="recommends" ref="recommend"/>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"/>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";
import GoodsList from "@/components/content/goods/GoodsList";

import Scroll from "@/components/common/scroll/Scroll";

import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "@/network/detail";
import {itemListenerMixin, backTopMixin} from '@/common/mixin';
import {debounce} from "@/common/utils";

export default {
  name: "Detail",
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      pullUpLoad: {
        type: Boolean,
        default: false
      },
      detailImages: [],
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
    }
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
  },
  updated() {
    this.$refs.scroll.refresh();
  },
  created() {
    //1.保存传入的iid
    this.iid = this.$route.params.iid;
    //2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      //1.获取顶部轮播图数据
      const data = res.result
      this.topImages = data.itemInfo.topImages;

      //2.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);

      //3.创建店铺信息对象
      this.shop = new Shop(data.shopInfo);

      //4.保存商品的详情数据
      this.detailInfo = data.detailInfo;

      //5.获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

      //6.取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }

    })

    //请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list;
    })

    //给getThemeTopY进行防抖
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push((this.$refs.param.$el.offsetTop) - 45);
      this.themeTopYs.push((this.$refs.commentInfo.$el.offsetTop) - 45);
      this.themeTopYs.push((this.$refs.recommend.$el.offsetTop) - 45);
      this.themeTopYs.push(Number.MAX_VALUE);
    }, 100)
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
      this.getThemeTopY();
    },
    titleClick(index) {
      console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
    },
    contentScroll(position) {
      // console.log(position)
      //获取y值
      const positionY = -position.y;
      //positionY和主题中的值对比
      let length = this.themeTopYs.length;
      for (let i = 0; i < length - 1; i++) {
        if (this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
      //判断BackTop是否显示
      this.listenShowBackTop(position);
    },
    addToCart() {
      //获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages;
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      //将商品添加到购物车
      this.$store.dispatch('addCart', product)
    }
  },
  mounted() {
    // let newrefresh = debounce(this.$refs.scroll.refresh, 50);
    // this.itemImgListener = () => {newrefresh();}
    // this.$bus.$on('itemImageLoad', this.itemImgListener);
  },
  destroyed() {
    this.$bus.$off('itemImageLoad', this.itemImgListener);
  }
}
</script>

<style scoped>
#wrapper {
  z-index: 9;
  height: 100vh;
  background: #fff;
  position: relative;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background: #fff;
}

.container {
  background: #fff;
  height: calc(100% - 44px - 49px);
  overflow: hidden;
}
</style>
