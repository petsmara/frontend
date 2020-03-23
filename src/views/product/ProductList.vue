<template>
  <div class="product-list">
    <section class="product-list__banner">
      <img
        class="product-list__banner__img"
        src="@/assets/images/backgrounds/list_bg.png"
        alt="background"
      />
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
      <button class="products__write">
        글쓰기
      </button>
    </section>
    <template>
      Scroll down to see the bottom-right button.
      <el-backtop target=".product-list" :bottom="100">
        <div
          style="{
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      }"
        >
          UP
        </div>
      </el-backtop>
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
    this.getProducts({ offset: 0, limit: 3 })
      .then(response => {
        this.products = response.data.result
      })
      .catch(e => console.error(e))
  },
  components: { Box, SummaryCard },
  data() {
    return {
      products: []
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
.product-list {
  padding: 60px 0;
  &__banner {
    &__img {
      width: 100%;
    }
  }
}

.content {
  &__box {
    margin: 72px auto;
    text-align: center;
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
