<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button :is-checked="isSelectAll"
                    class="check-button"
                    @click.native="checkClick"/>
      <span>全选</span>
    </div>

    <div class="price">
      合计：{{ totalPrice }}
    </div>
    <div class="calculate">
      去计算({{ checkLength }})
    </div>
  </div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton";
import {mapGetters} from 'vuex'

export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return '￥' + this.cartList.filter(item => {
        return item.checked;
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count;
      }, 0).toFixed(2);
    },
    checkLength() {
      return this.cartList.filter(item => item.checked).length
    },
    isSelectAll() {
      if (this.cartList.length === 0) return false;
      return !this.cartList.find(item => !item.checked)

      // if(this.cartList.length === 0) return false;
      // return !(this.cartList.filter(item => !item.checked).length);

      // for (let item of this.cartList) {
      //   if(!item.checked) {
      //     return false;
      //   }
      // }
      // return true;
    }
  },
  methods: {
    checkClick() {
      if(this.isSelectAll) { //全部选中
        this.cartList.forEach(item => item.checked = false)
      }else { //部门或全部不选中
        this.cartList.forEach(item => item.checked = true)
      }

      // this.cartList.forEach(item => item.checked = !this.isSelectAll)
    }
  }
}
</script>

<style scoped>
.bottom-bar {
  height: 40px;
  display: flex;
  background: #eee;
  line-height: 40px;
  position: relative;
  font-size: 14px;
}

.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}

.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}

.price {
  flex: 1;
  margin-left: 20px;
}

.calculate {
  width: 90px;
  background: red;
  color: #fff;
  text-align: center;
}
</style>
