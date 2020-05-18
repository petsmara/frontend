<template>
  <div class="product">
    <swiper
      ref="productSwiper"
      :options="productSwiperOption"
      class="product__swiper"
    >
      <swiper-slide
        class="product__slide"
        v-for="(image, index) in productImages"
        :key="`${image}-${index}`"
      >
        <div class="product__img-wrap">
          <img class="product__img" :src="image" alt="" />
        </div>
      </swiper-slide>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
      <!-- Add Pagination -->
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>

    <div class="product__detail">
      <p class="product__seller">{{ product.seller }}</p>
      <p class="product__title">{{ product.title }}</p>
      <p class="product__category">{{ selectedCategory(product.category) }}</p>
      <p class="product__places">
        {{ product.places || '장소 협의'
        }}<span class="product__time">{{
          dayjs(product.modified_at).fromNow()
        }}</span>
        <span class="product__view-count">조회 {{ product.view_count }}</span>
      </p>

      <p class="product__price">
        {{ Number(parseInt(product.price)).toLocaleString()
        }}<span>원 (종이컵 1컵)</span>
      </p>
      <p class="product__content">{{ product.content }}</p>
      <!-- <router-link class="product__list--btn" to="/product/list"
        >상품목록보기</router-link
      > -->
    </div>

    <section class="product__list">
      <Box class="product__list__box">
        <template #title>
          ITEM
        </template>
        <template #content>
          비슷한 사료를 만나보세요
        </template>
      </Box>
      <div class="products">
        <router-link
          v-for="item in newProductsList"
          :key="item.title"
          :to="`/product/${item.id}`"
        >
          <SummaryCard
            :imgLink="item.images[0]"
            :title="item.title"
            :category="selectedCategory(item.category)"
            :places="item.places"
            :price="Number(parseInt(item.price)).toLocaleString()"
            :time="item.created_at"
          />
        </router-link>
      </div>
    </section>
  </div>
</template>

<script>
import { CategoryMixin } from '@/mixins/CategoryMixin'
import { Box } from '@/components/Box'
import { SummaryCard } from '@/components/Cards'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('product')
import store from '@/store/store'

const getCurrentProduct = async (routeTo, next) => {
  const currentId = parseInt(routeTo.params.id) || 1
  await store.dispatch('product/getProducts', {
    offset: 0,
    limit: 3,
    type: 'new',
    product_id: currentId
  })
  store.dispatch('product/getProduct', currentId).then(() => {
    next()
  })
}

export default {
  mixins: [CategoryMixin],
  components: { Box, SummaryCard },
  beforeRouteEnter(routeTo, routeFrom, next) {
    getCurrentProduct(routeTo, next)
  },
  beforeRouteUpdate(routeTo, routeFrom, next) {
    getCurrentProduct(routeTo, next)
  },
  async mounted() {
    this.getProducts({
      offset: 0,
      limit: 3,
      type: 'new',
      product_id: this.$route.params.id
    })
  },
  data() {
    return {
      productSwiperOption: {
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        pagination: {
          el: '.swiper-pagination'
        },
        loop: true
      }
    }
  },
  computed: {
    ...mapState(['newProductsList', 'product']),
    productImages() {
      const newProductImages = this.product.images.filter(item => !!item)
      if (newProductImages.length === 0) {
        newProductImages[0] = require('@/assets/images/icons/default-image.png')
      }
      return newProductImages
    }
  },
  methods: {
    ...mapActions(['getProduct', 'getProducts'])
  }
}
</script>

<style lang="scss" scoped>
.product {
  @include respond-to('tablet-portrait-only') {
  }
  padding: 0 20px 20px;
  &__swiper {
    margin: 0 auto;
    max-width: 600px;
    width: 100%;
  }
  &__img-wrap {
    @include respond-to('tablet-portrait-only') {
      max-width: 90%;
    }
    // border: 1px solid #c4c4c4;
    overflow: hidden;
    margin: 0 auto;
    width: 100%;
    max-width: 500px;
    position: relative;
    padding-bottom: 100%;
  }
  &__img {
    border-radius: 12px;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translateY(-50%);
    transform: translate(-50%, -50%);
    max-width: 100%;
  }
  &__detail {
    padding: 0 20px;
    margin: 0 auto;
    max-width: 500px;
    width: 100%;
    text-align: left;
  }
  &__seller {
    margin-bottom: 8px;
    position: relative;
    padding: 6px 30px;
    color: #000000;
    font-size: 14px;
    line-height: 16px;
    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background: url('~@/assets/images/icons/user_icon.png') center / 100%
        no-repeat;
    }
  }
  &__title {
    font-weight: 900;
    font-size: 18px;
    line-height: 21px;
    color: #000000;
    margin-bottom: 10px;
  }
  &__category {
    display: block;
    margin-bottom: 4px;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 14px;
    color: #000000;
  }

  &__places,
  &__time,
  &__view-count {
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 14px;
    color: #979797;
    // @include respond-to('tablet-portrait-only') {
    //   // font-weight: 900;
    //   font-size: 12px;
    // }
  }
  &__places {
    display: inline-block;
    position: relative;
    margin-bottom: 9px;
    // &:after {
    //   content: '';
    //   width: 8px;
    //   height: 12px;
    //   position: absolute;
    //   left: -12px;
    //   top: 4px;
    //   background: url('~@/assets/images/icons/location.png') center / 100%
    //     no-repeat;
    // }
  }
  &__time,
  &__view-count {
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
    }
  }
  &__price {
    font-weight: 900;
    font-size: 20px;
    margin-bottom: 9px;
    color: #000000;
    span {
      font-weight: normal;
      font-size: 12px;
    }
  }
  &__content {
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 14px;
    color: #000000;
    margin-bottom: 44px;
    white-space: pre-wrap;
    // border-top: 1px solid #cecece;
    // padding-top: 10px;
    text-align: left;
  }
  &__list--btn {
    border: 1px solid transparent;
    transition: 0.4s all;
    font-size: 16px;
    color: #ffffff;
    font-weight: normal;
    background: #8fb5ff;
    border-radius: 8px;
    padding: 8px 16px;
  }
  &__list {
    border-top: 1px solid #c4c4c4;
    margin-top: 36px;
    &__box {
      margin: 36px auto;
      text-align: center;
    }
  }
  &::v-deep .swiper-pagination-bullets {
    bottom: 8%;
  }
  & /deep/ .swiper-button-next {
    right: 0;
  }
  & /deep/ .swiper-button-prev {
    left: 0;
  }
  & /deep/ .swiper-button-next,
  & /deep/ .swiper-button-prev {
    width: 16px;
    height: 30px;
    background: url('~@/assets/images/icons/right_arrow.png') center / 100%
      no-repeat;
    //      @include respond-to('tablet-portrait-only') {
    //   width: 8px;
    //   height: 15px;
    // }
    @include respond-to('mobile-portrait-only') {
      width: 8px;
      height: 15px;
    }
  }
  & /deep/ .swiper-button-prev {
    transform: rotate(180deg);
  }
  & /deep/ .swiper-pagination-bullet {
    width: 5px;
    height: 5px;
    margin: 0 2px;
  }
}

.products {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  a {
    padding: 0 10px;
    flex-basis: 33.3%;
    margin-bottom: 26px;
    @include respond-to('mobile-portrait-only') {
      // flex-basis: 50%;
      // background-color: lavender;
    }
    @include respond-to('tablet-portrait-only') {
      flex-basis: 50%;
      // background-color: red;
    }
  }
}
</style>
