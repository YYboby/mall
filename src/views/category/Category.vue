<template>
  <div>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import {backTopMixin} from "@/common/mixin";

export default {
  name: 'Category',
  mixins: [backTopMixin],
  components: {},
  data() {
    return {};
  },
  methods: {}
};
</script>


<style scoped>
.content {
  height: 300px;
  background: red;
  overflow: hidden;
}
</style>
