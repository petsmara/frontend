<template>
  <div class="box">
    <h3 class="box__title" v-if="$slots.title">
      <slot name="title"></slot>
    </h3>
    <p class="box__content" v-if="$slots.content">
      <slot name="content"></slot>
    </p>
  </div>
</template>

<script>
/**
 * Box component description
 */
export default {}
</script>

<style lang="scss" scoped>
.box {
  text-align: center;
  &__title {
    font-weight: 500;
    font-size: 20px;
    color: #000000;
  }
  &__content {
    font-size: 16px;
    color: #000000;
  }
}
</style>
