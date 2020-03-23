<template>
  <div class="product">
    <swiper
      ref="productSwiper"
      :options="productSwiperOption"
      class="product__swiper"
    >
      <swiper-slide
        class="product__slide"
        v-for="(image, index) in product.images"
        :key="`${image}-${index}`"
      >
        <img class="product__img" :src="image" alt="" />
      </swiper-slide>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
      <!-- Add Pagination -->
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>

    <div class="product__detail">
      <p class="product__seller">{{ product.seller }}</p>
      <p class="product__title">{{ product.title }}</p>
      <p class="product__category">{{ convertCategory(product.category) }}</p>
      <p class="product__places">{{ product.places || '구룡/개포동' }}</p>
      <p class="product__price">
        {{ Number(parseInt(product.price)).toLocaleString()
        }}<span>원 (100g)</span>
      </p>
      <p class="product__content">{{ product.content }}</p>
      <button class="product__deal">
        거래하기
      </button>
    </div>

    <section class="product__list">
      <Box class="product__list__box">
        <template #title>
          NEW ITEM
        </template>
        <template #content>
          새로운 사료를 만나보세요
        </template>
      </Box>
      <div class="products">
        <router-link
          v-for="item in products"
          :key="item.title"
          :to="`/product/${item.id}`"
        >
          <SummaryCard
            :imgLink="item.images[0]"
            :title="item.title"
            :category="convertCategory(item.category)"
            :places="item.places"
            :price="Number(parseInt(item.price)).toLocaleString()"
          />
        </router-link>
      </div>
    </section>
  </div>
</template>

<script>
import { Box } from '@/components/Box'
import { SummaryCard } from '@/components/Cards'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('product')
import store from '@/store/store'

const getCurrentProduct = (routeTo, next) => {
  const currentId = parseInt(routeTo.params.id) || 1
  store.dispatch('product/getProduct', currentId).then(product => {
    routeTo.params.product = product
    next()
  })
}

export default {
  components: { Box, SummaryCard },
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    getCurrentProduct(routeTo, next)
  },
  beforeRouteUpdate(routeTo, routeFrom, next) {
    getCurrentProduct(routeTo, next)
  },
  async created() {
    const getProducts = await this.getProducts({
      offset: 0,
      limit: 3
    })
    this.products = getProducts.data.result
  },
  data() {
    return {
      products: [],
      productSwiperOption: {
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        pagination: {
          el: '.swiper-pagination'
        }
      }
    }
  },
  methods: {
    ...mapActions(['getProduct', 'getProducts']),
    convertCategory(value) {
      switch (value) {
        case 1:
          return '강아지'
          break
        case 2:
          return '고양이'
          break
        case 3:
          return '공통'
          break
        case 4:
          return '기타'
          break
        default:
          return ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.product {
  &__swiper {
    margin: 0 auto;
    width: 600px;
  }
  &__slide {
  }
  &__img {
    width: 500px;
  }
  &__detail {
    margin: 0 auto;
    width: 100%;
    max-width: 500px;
    text-align: center;
  }
  &__seller {
    position: relative;
    margin-top: 14px;
    padding-left: 46px;
    height: 40px;
    line-height: 40px;
    font-size: 15px;
    color: #000000;
    text-align: left;
    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: grey;
    }
  }
  &__title {
    margin-bottom: 12px;
    font-size: 20px;
    color: #000000;
  }
  &__category {
    font-size: 17px;
    color: #000000;
    margin-bottom: 10px;
  }
  &__places {
    display: inline-block;
    position: relative;
    font-size: 15px;
    margin-bottom: 9px;
    color: #000000;
    &:after {
      content: '';
      width: 8px;
      height: 12px;
      position: absolute;
      left: -12px;
      top: 4px;
      background: url('~@/assets/images/icons/location.png') center / 100%
        no-repeat;
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
    margin-bottom: 54px;
    font-size: 15px;
    color: #000000;
    line-height: 18px;
    margin-bottom: 44px;
  }
  &__deal {
    font-size: 20px;
    color: #000000;
    background: #fd9f9f;
    border-radius: 8px;
    padding: 16px 70px;
  }
  &__list {
    border-top: 1px solid #c4c4c4;
    margin-top: 72px;
    &__content {
    }
    &__box {
      margin: 72px auto;
      text-align: center;
    }
  }
}

.products {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  .card {
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
