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
          v-for="(banner, index) in list"
          :key="`${banner.title}-${index}`"
        >
          <h2 class="banner__title">{{ banner.title }}</h2>
          <button class="banner__btn">{{ banner.content }}</button>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </section>

    <section class="content">
      <Box class="content__box">
        <template #title>
          NEW ITEM
        </template>
        <template #content>
          새로운 사료를 만나보세요
        </template>
      </Box>
      <div class="products">
        <SummaryCard v-for="n in 9" :key="n" />
      </div>
      <button class="products__write">
        글쓰기
      </button>
    </section>
  </div>
</template>

<script>
import { Box } from '@/components/Box'
import { SummaryCard } from '@/components/Cards'
export default {
  components: { Box, SummaryCard },
  data() {
    return {
      list: [
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
  }
}
</script>
<style lang="scss" scoped>
.home {
  padding: 60px 0;
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
  &__box {
    margin: 72px auto;
    text-align: center;
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
  &__write {
    cursor: pointer;
    font-size: 16px;
    color: #000000;
    padding: 10px 40px 10px 66px;
    position: relative;
    background: #fd9f9f;
    border-radius: 8px;
    border: none;
    margin: 0 10px 0 auto;
    &::after {
      content: '';
      position: absolute;
      left: 30px;
      top: 50%;
      transform: translateY(-50%);
      width: 26px;
      height: 20px;
      background: url('~@/assets/images/icons/close.png') center / 100%
        no-repeat;
    }
  }
}
</style>
