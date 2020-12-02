<template>
  <div class="product-container">
      <ProductHead/>
      <DataLists/>
      <Fenye/>
      <Huihuakuang/>
      <Bianji/>
  </div>
</template>

<script>
import DataLists from './DataLists';
import Fenye from './Fenye';
import ProductHead from './ProductHead';
import Huihuakuang from './Huihuakuang';
import Bianji from './Bianji';

export default {
  components:{
    DataLists,
    Fenye,
    ProductHead,
    Huihuakuang,
    Bianji
  }
}
</script>

<style>

</style>