<template>
  <div class="product">
    <h2>Product Navigation</h2>
    <p>asdfasdfasdf</p>
    <p>User {{ $route.params.id }}</p>

    <!-- <p>{{ $route.parmas.id }}번째 상품</p> -->
  </div>
</template>

<script>
export default {
  mounted() {
    console.log(this)
  }
}
</script>

<style lang="scss" scoped></style>
