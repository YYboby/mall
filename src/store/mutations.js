import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutations-types'

export default {
  //mutations修改state中的状态，尽可能完成的事情比较单一
  [ADD_COUNTER](state, payload) {
    payload.count++;
  },
  [ADD_TO_CART](state, payload) {
    payload.checked = true;
    state.cartList.push(payload);
  }
}
