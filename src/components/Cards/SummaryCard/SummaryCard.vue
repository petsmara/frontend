<template>
  <div class="card">
    <div class="card__img-wrap">
      <img
        class="card__img"
        :src="imgLink || require('@/assets/images/icons/default-image.png')"
        :alt="title"
      />
    </div>
    <h3 class="card__title">{{ title }}</h3>
    <span class="card__category">{{ category }}</span>
    <span class="card__places">{{ places }}</span
    ><span class="card__time">{{ dayjs(time).fromNow() }}</span>
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
      default: ''
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
      type: [String, Number],
      default: 200
    },
    id: {
      type: Number,
      default: 0
    },
    content: {
      type: String,
      deafult: ''
    },
    image: {
      type: String,
      default: ''
    },
    time: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  text-align: center;
  &__img-wrap {
    overflow: hidden;
    width: 100%;
    max-width: 340px;
    position: relative;
    padding-bottom: 100%;
    // border-radius: 4px;
    border: 1px solid #c4c4c4;
  }

  &__img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 720px;
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
  &__places,
  &__time {
    font-size: 15px;
    color: #6f6f6f;
    margin-bottom: 10px;
    position: relative;
    @include respond-to('tablet-portrait-only') {
      font-size: 12px;
    }
  }
  &__places {
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
  &__time {
    padding-left: 16px;
    position: relative;
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 6px;
      width: 5px;
      height: 5px;
      background-color: #6f6f6f;
      border-radius: 50%;
      @include respond-to('tablet-portrait-only') {
        content: none;
      }
    }
    @include respond-to('tablet-portrait-only') {
      margin-top: 8px;
      padding-left: 0;
      display: block;
    }
  }
  &__price {
    margin-top: 2px;
    display: block;
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
