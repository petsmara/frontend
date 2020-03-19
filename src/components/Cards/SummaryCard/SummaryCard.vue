<template>
  <div class="card">
    <img class="card__img" :src="imgLink" :alt="title" />
    <h3 class="card__title">{{ title }}</h3>
    <span class="card__category">{{ category }}</span>
    <span class="card__places">{{ places }}</span>
    <span class="card__price">{{ price }}<b>원 (100g)</b></span>
  </div>
</template>

<script>
/**
 * SummaryCard component description
 */
export default {
  props: {
    imgLink: {
      type: String,
      default:
        'https://serieamania.com/g2/data//member/ha/hahazz00_serieamania_1584280189.jpg'
    },
    title: {
      type: String,
      default: '제목 입력'
    },
    category: {
      type: String,
      default: '강아지'
    },
    places: {
      type: String,
      default: '서울'
    },
    price: {
      type: Number,
      default: 200
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  width: 340px;
  text-align: center;
  &__img {
    width: 100%;
    max-width: 340px;
    max-height: 340px;
  }
  &__title {
    font-size: 16px;
    margin: 10px 0;
  }
  &__category {
    display: block;
    margin-bottom: 10px;
    font-size: 14px;
  }
  &__places {
    // display: block;
    margin-bottom: 10px;
    font-size: 14px;
    position: relative;
    &:after {
      content: '';
      width: 8px;
      height: 12px;
      position: absolute;
      left: -12px;
      top: 2px;
      background: url('~@/assets/images/icons/location.png') center / 100%
        no-repeat;
    }
  }
  &__price {
    margin-top: 2px;
    display: block;
    font-family: Roboto;
    font-size: 20px;
    font-weight: 900;
    b {
      font-size: 12px;
      font-style: normal;
      font-weight: normal;
    }
  }
}
</style>
