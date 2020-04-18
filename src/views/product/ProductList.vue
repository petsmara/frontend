<template>
  <div class="product-list">
    <section class="product-list__banner">
      <picture class="product-list__banner__img">
        <source
          media="(min-width: 768px)"
          :srcset="
            require(`@/assets/images/backgrounds/product_list_bg-pc.png`)
          "
        />
        <img
          :srcset="
            require(`@/assets/images/backgrounds/product_list_bg-mobile.jpg`)
          "
          alt=""
        />
      </picture>
      <h2 class="product-list__title">모든 상품</h2>
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
          v-for="(item, index) in productList"
          :key="`${item.title}-${index}`"
          :to="`/product/${item.id}`"
        >
          <SummaryCard
            :imgLink="item.images | getFirstImage"
            :title="item.title"
            :category="selectedCategory(item.category)"
            :places="item.places"
            :price="Number(parseInt(item.price)).toLocaleString()"
            :time="item.modified_at"
          />
        </router-link>
      </div>
    </section>
    <section v-if="isLoading" class="loading">
      <i class="el-icon-loading"></i>
    </section>
    <template>
      <el-backtop></el-backtop>
    </template>
  </div>
</template>

<script>
import { CategoryMixin } from '@/mixins/CategoryMixin'
import { Box } from '@/components/Box'
import { SummaryCard } from '@/components/Cards'
import { createNamespacedHelpers } from 'vuex'
import NProgress from 'nprogress'
import throttle from 'lodash.throttle'
const { mapState, mapActions } = createNamespacedHelpers('product')
const { mapGetters } = createNamespacedHelpers('user')

export default {
  mixins: [CategoryMixin],
  created() {
    this.getProducts({ offset: this.productOffset, limit: 10, type: 'list' })
      .then(response => {
        NProgress.done()
      })
      .catch(e => console.error(e))
  },
  components: { Box, SummaryCard },
  data() {
    return {
      isLoading: false,
      products: []
    }
  },
  computed: {
    ...mapState(['productOffset', 'productList', 'hasMoreProduct']),
    ...mapGetters(['loggedIn'])
  },
  methods: {
    ...mapActions([
      'getProducts' //also supports payload `this.nameOfAction(amount)`
    ]),
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
    },
    onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 500
      ) {
        if (this.hasMoreProduct) {
          this.isLoading = true
          this.dispatchGetProducts()
        }
      }
    },
    dispatchGetProducts: throttle(function() {
      this.getProducts({ offset: this.productOffset, limit: 10 }).then(_ => {
        this.isLoading = false
      })
    }, 2000)
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.onScroll)
  }
}
</script>
<style lang="scss" scoped>
.product-list {
  padding: 0 0 60px;
  &__banner {
    position: relative;
    // background: rgba(0, 0, 0, 0.4);
    // height: 500px;
    // overflow: hidden;
    &::before {
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.4);
    }
    img {
      width: 100%;
    }
    &__img {
      width: 100%;
    }
  }
  &__title {
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: 900;
    font-size: 20px;
    color: #ffffff;
  }
}

.content {
  &__header {
    position: relative;
  }
  &__box {
    margin: 72px auto;
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
      bottom: 40px;
      left: 50%;
      transform: translateX(-50%);
    }
    cursor: pointer;
    font-size: 16px;
    color: #ffffff;
    padding: 10px 40px 10px 66px;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
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
.loading {
  padding: 50px 0;
}
</style>
