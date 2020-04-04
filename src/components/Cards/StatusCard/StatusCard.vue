<template>
  <div class="status-card" :class="[soldOut ? 'status-card--sold-out' : '']">
    <div class="status-card__img-wrap">
      <div class="status-card__sold-out">
        판매 완료
      </div>
      <img class="status-card__img" :src="imgLink" alt="" />
    </div>
    <div class="status-card__content-wrap">
      <h3 class="status-card__title">{{ title }}</h3>
      <p class="status-card__category">{{ category }}</p>
      <p class="status-card__places">{{ places }}</p>
      <p class="status-card__price">{{ price }}<b>원 (100g)</b></p>
    </div>
    <div class="status-card__status-wrap">
      <button class="status-card__status-btn">판매 완료</button>
    </div>
  </div>
</template>

<script>
/**
 * StatusCard component description
 */
export default {
  props: {
    soldOut: {
      type: Boolean,
      deafult: false
    },
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
    }
  }
}
</script>

<style lang="scss" scoped>
.status-card {
  border: 1px solid #c4c4c4;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 28px 40px;
  max-width: 760px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  @include respond-to('tablet-portrait-only') {
    padding: 16px 18px;
    flex-wrap: wrap;
  }
  &--sold-out {
    .status-card__img-wrap {
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(196, 196, 196, 0.8);
        z-index: 1;
      }
    }
    .status-card__sold-out {
      width: 82px;
      height: 82px;
      border: 3px solid #000000;
      border-radius: 50%;
      display: block;
      position: absolute;
      z-index: 2;
      text-align: center;
      line-height: 82px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-weight: 900;
      font-size: 12px;
      color: #000000;
    }
    .status-card__status-btn {
      display: none;
    }
  }
  &__img-wrap {
    @include respond-to('tablet-portrait-only') {
      margin-right: 18px;
    }
    @include respond-to('mobile-portrait-only') {
      width: 120px;
      height: 120px;
    }
    margin-right: 40px;
    position: relative;
    overflow: hidden;
    width: 200px;
    height: 200px;
  }
  &__sold-out {
    display: none;
  }
  &__img {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 100%;
    background: #c4c4c4;
  }
  &__title {
    @include respond-to('tablet-portrait-only') {
      font-size: 14px;
    }
    font-size: 24px;
    color: #000000;
    margin-bottom: 8px;
  }
  &__category {
    @include respond-to('tablet-portrait-only') {
      font-size: 12px;
    }
    font-size: 16px;
    color: #000000;
    margin-bottom: 4px;
  }
  &__places {
    @include respond-to('tablet-portrait-only') {
      font-size: 14px;
    }
    padding-left: 10px;
    margin-bottom: 10px;
    font-size: 20px;
    color: #000000;
    position: relative;
    &:after {
      content: '';
      width: 8px;
      height: 12px;
      position: absolute;
      left: 0px;
      top: 2px;
      background: url('~@/assets/images/icons/location.png') center / 100%
        no-repeat;
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
  &__status-wrap {
    @include respond-to('tablet-portrait-only') {
      text-align: right;
      flex-basis: 100%;
    }
    margin-left: auto;
  }
  &__status-btn {
    cursor: pointer;
    font-weight: 500;
    font-size: 16px;
    color: #000000;
    border: 1px solid #c4c4c4;
    box-sizing: border-box;
    border-radius: 8px;
    padding: 8px;
  }
}
</style>
