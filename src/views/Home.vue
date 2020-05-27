<template>
  <div class="home">
    <section class="banner">
      <swiper
        ref="bannerSwiper"
        :options="bannerSwiperOption"
        class="banner__swiper"
      >
        <swiper-slide class="banner__slide">
          <router-link class="event-intro__link" to="/event">
            <picture class="banner__slide__bg">
              <source
                media="(min-width: 768px)"
                :srcset="
                  require(`@/assets/images/backgrounds/main_banner03-pc.png`)
                "
              />
              <img
                :srcset="
                  require(`@/assets/images/backgrounds/main_banner03-mobile.png`)
                "
                alt=""
              />
            </picture>
          </router-link>
        </swiper-slide>
        <swiper-slide
          class="banner__slide"
          v-for="(banner, index) in bannerList"
          :key="`${banner.title}-${index}`"
        >
          <div class="banner__slide__content" :class="[`banner-${index}`]">
            <picture class="banner__slide__bg">
              <source
                media="(min-width: 768px)"
                :srcset="
                  require(`@/assets/images/backgrounds/${banner.imgUrl}-pc.png`)
                "
              />
              <img
                :srcset="
                  require(`@/assets/images/backgrounds/${banner.imgUrl}-mobile.png`)
                "
                alt=""
              />
            </picture>
            <div class="banner__slide__text-wrap">
              <h2 class="banner__title">{{ banner.firstText }}</h2>
              <h2 class="banner__paragraph">{{ banner.secondText }}</h2>
              <button @click="moveToProductList" class="banner__btn">
                {{ banner.content }}
              </button>
            </div>
          </div>
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
        <el-button class="content__write" @click="goToRegister">
          판매하기
        </el-button>
      </div>
      <div class="products">
        <router-link
          class="products__link"
          v-for="item in products"
          :key="item.id"
          :to="`/product/${item.id}`"
        >
          <SummaryCard
            :imgLink="item.images | getFirstImage"
            :title="item.title"
            :category="selectedCategory(item.category)"
            :places="item.places"
            :price="Number(parseInt(item.price)).toLocaleString()"
            :time="item.created_at"
          />
        </router-link>
      </div>
    </section>
    <template>
      <el-backtop :bottom="112" :right="16"></el-backtop>
    </template>
  </div>
</template>

<script>
import { Box } from '@/components/Box'
import { SummaryCard } from '@/components/Cards'
import { createNamespacedHelpers } from 'vuex'
import { CategoryMixin } from '@/mixins/CategoryMixin'
const { mapActions } = createNamespacedHelpers('product')
const { mapGetters } = createNamespacedHelpers('user')

export default {
  mixins: [CategoryMixin],
  created() {
    this.getProducts({ offset: 0, limit: 9, type: 'main' })
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
          firstText: '반려동물의',
          secondText: '사료를 판매해보세요.',
          content: '모든상품보기',
          imgUrl: 'main_banner01'
        },
        {
          firstText: '반려동물의',
          secondText: '사료를 판매해보세요.',
          content: '모든상품보기',
          imgUrl: 'main_banner02'
        }
      ],
      bannerSwiperOption: {
        autoplay: {
          delay: 3000
        },
        loop: true,
        pagination: {
          el: '.swiper-pagination'
        }
      }
    }
  },
  computed: {
    ...mapGetters(['loggedIn'])
  },
  methods: {
    ...mapActions(['getProducts']),
    moveToProductList() {
      this.$router.push('/product/list')
    },
    goToRegister() {
      if (this.loggedIn) {
        this.$router.push('/product/register')
      } else {
        this.$confirm('회원가입 또는 로그인을 하시겠습니까?', '알림', {
          confirmButtonText: '예',
          cancelButtonText: '아니요',
          type: 'info'
        })
          .then(() => {
            this.$router.push('/user/login')
          })
          .catch(() => {
            return
          })
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
  &__slide {
    text-align: center;
    font-size: 18px;

    /* Center slide text vertically */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &__content {
      width: 100%;
      position: relative;
    }
    &__bg {
      img {
        width: 100%;
      }
    }
    &__text-wrap {
      text-align: left;
      position: absolute;
      top: 106px;
      left: 52px;
      z-index: 1;
      @include respond-to('tablet-portrait-only') {
        text-align: center;
        width: 100%;
        top: 10%;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
  &__title {
    margin-bottom: 10px;
    font-style: normal;
    font-weight: 900;
    font-size: 40px;
    letter-spacing: -0.05em;
    color: #000000;
    text-shadow: 0px 3px 5px rgba(0, 0, 0, 0.3);
    @include respond-to('tablet-portrait-only') {
      font-weight: 900;
      font-size: 28px;
    }
    @include respond-to('mobile-portrait-only') {
      font-weight: 900;
      font-size: 20px;
    }
  }
  &__paragraph {
    margin-bottom: 30px;
    font-style: normal;
    font-weight: 900;
    font-size: 40px;
    letter-spacing: -0.05em;
    color: #000000;
    text-shadow: 0px 3px 5px rgba(0, 0, 0, 0.2);
    @include respond-to('tablet-portrait-only') {
      font-weight: 900;
      font-size: 28px;
    }
    @include respond-to('mobile-portrait-only') {
      font-weight: 900;
      font-size: 20px;
    }
  }
  &__btn {
    .banner-1 & {
      background: #5685ff;
    }
    .banner-0 & {
      &:hover {
        background: #ff5656;
      }
    }

    cursor: pointer;
    font-style: normal;
    font-weight: 900;
    font-size: 26px;
    line-height: 30px;
    color: #ffffff;
    padding: 16px 70px;
    background: #ff5656;
    border-radius: 8px;
    border: none;

    @include respond-to('tablet-portrait-only') {
      padding: 12px 32px;
      font-size: 20px;
      line-height: 19px;
    }
    @include respond-to('mobile-portrait-only') {
      padding: 8px 28px;
      font-size: 16px;
      line-height: 19px;
    }
  }
}
.content {
  position: relative;
  &__header {
    position: relative;
  }
  &__box {
    margin: 36px auto;
    text-align: center;
  }
  &__write {
    &:hover {
      background-color: #8fb5ff;
      color: #fff;
    }
    @include respond-to('tablet-portrait-only') {
      z-index: 5;
      position: fixed;
      top: auto;
      bottom: 120px;
      left: 50%;
      transform: translateX(-50%);
    }
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
    background: #ffffff;
    border: 2px solid #e9e9e9;
    cursor: pointer;
    font-size: 16px;
    color: #ffffff;
    padding: 10px 40px 10px 40px;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 8px;
    margin: 0 10px 0 auto;
    color: #000000;
    // &::after {
    //   content: '';
    //   position: absolute;
    //   left: 30px;
    //   top: 50%;
    //   transform: translateY(-50%);
    //   width: 28px;
    //   height: 20px;
    //   background: url('~@/assets/images/icons/write.png') center / 100%
    //     no-repeat;
    // }
  }
}
.products {
  padding: 16px 8px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  &__link {
    padding: 0 8px;
    flex-basis: 33.3%;
    margin-bottom: 26px;
    @include respond-to('mobile-portrait-only') {
    }
    @include respond-to('tablet-portrait-only') {
      flex-basis: 50%;
    }
  }
}
.event-intro {
  width: 100%;
  max-width: 720px;
  padding: 20px 16px 12px;
  background: #144d3b;
  &__paragraph {
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 14px;
    text-align: center;
    letter-spacing: -0.679682px;
    color: #ffffff;
    margin-bottom: 14px;
  }

  &__title {
    font-style: normal;
    font-weight: 900;
    font-size: 26px;
    line-height: 30px;
    text-align: center;
    letter-spacing: -0.679682px;
    color: #ffffff;
    margin-bottom: 10px;
  }
  &__date {
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
    text-align: center;
    letter-spacing: -0.679682px;
    color: #ffffff;
    margin-bottom: 16px;
  }
  &__link {
    // display: inline-block;
    // margin-bottom: 12px;
    // font-style: normal;
    // font-weight: 900;
    // font-size: 16px;
    // line-height: 19px;
    // border: 1px solid #ffffff;
    // border-radius: 8px;
    // color: #ffffff;
    // padding: 8px 16px;
  }
  &__tag {
    margin-bottom: 14px;
    font-style: normal;
    font-weight: 900;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    letter-spacing: -0.679682px;
    color: #ffffff;
  }
  &__content {
    padding: 16px;
    background: #ffffff;
    border-radius: 16px;
    p {
      font-style: normal;
      font-weight: 500;
      font-size: 9px;
      line-height: 11px;
      letter-spacing: -0.679682px;
      color: #000000;
    }
  }
  &__box-wrap {
    width: 278px;
    height: 224px;
    position: relative;
    margin: 0 auto;
    background: url('url(~@/assets/images/backgrounds/event_sb03.png') center /
      100% no-repeat;
  }
  &__tooltip {
    &--coffee {
      left: 75px;
    }
    &--cake {
      right: 0;
    }
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 24px;
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background: #144d3b;
    font-style: normal;
    font-weight: normal;
    font-size: 8px;
    line-height: 12px;
    text-align: center;
    letter-spacing: -0.679682px;
    color: #ffffff;
  }
}
</style>
