<template>
  <div class="home">
    <section class="banner">
      <swiper
        ref="bannerSwiper"
        :options="bannerSwiperOption"
        class="banner__swiper"
      >
        <swiper-slide
          class="banner__slide"
          v-for="(banner, index) in bannerList"
          :key="`${banner.title}-${index}`"
        >
          <h2 class="banner__title">{{ banner.title }}</h2>
          <button class="banner__btn">{{ banner.content }}</button>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </section>

    <section class="content">
      <div class="content__header">
        <Box class="content__box">
          <template #title>
            NEW ITEM
          </template>
          <template #content>
            새로운 사료를 만나보세요
          </template>
        </Box>
        <button class="content__write">
          글쓰기
        </button>
      </div>
      <div class="products">
        <router-link
          class="products__link"
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
    <template>
      <el-backtop></el-backtop>
    </template>
  </div>
</template>

<script>
import { Box } from '@/components/Box'
import { SummaryCard } from '@/components/Cards'
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('product')

export default {
  created() {
    this.getProducts({ offset: 0, limit: 9 })
      .then(response => {
        this.products = response.data.result
      })
      .catch(e => console.error(e))
  },
  components: { Box, SummaryCard },
  data() {
    return {
      products: [],
      bannerList: [
        {
          title: '반려동물사료를 공유해보세요',
          content: '흠냐흠냐'
        },
        {
          title: '반려동물사료를 판매해보세요',
          content: '흠냐흠냐22'
        }
      ],
      bannerSwiperOption: {
        pagination: {
          el: '.swiper-pagination'
        }
      }
    }
  },
  methods: {
    ...mapActions([
      'getProducts' //also supports payload `this.nameOfAction(amount)`
    ]),
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
.home {
  padding: 0 0 60px;
}
.banner {
  width: 100%;
  &__swiper {
    height: 700px;
  }
  &__slide {
    background-color: #3d62e2;
    height: 100%;
    text-align: center;
    font-size: 18px;

    /* Center slide text vertically */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  &__title {
    font-size: 40px;
    color: #000000;
    margin-bottom: 40px;
  }
  &__btn {
    cursor: pointer;
    font-size: 20px;
    color: #000000;
    padding: 16px 70px;
    background: #fd9f9f;
    border-radius: 8px;
    border: none;
  }
}
.content {
  position: relative;
  &__header {
    position: relative;
  }
  &__box {
    margin: 72px auto;
    text-align: center;
  }
  &__write {
    @include respond-to('mobile-portrait-only') {
    }
    @include respond-to('tablet-portrait-only') {
      z-index: 5;
      position: fixed;
      top: auto;
      bottom: 40px;
      left: 50%;
      transform: translateX(-50%);
    }
    cursor: pointer;
    font-size: 16px;
    color: #000000;
    padding: 10px 40px 10px 66px;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    background: #e9e9e9;
    border-radius: 8px;
    border: none;
    margin: 0 10px 0 auto;
    &::after {
      content: '';
      position: absolute;
      left: 30px;
      top: 50%;
      transform: translateY(-50%);
      width: 28px;
      height: 20px;
      background: url('~@/assets/images/icons/write.png') center / 100%
        no-repeat;
    }
  }
}
.products {
  padding: 16px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  &__link {
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
