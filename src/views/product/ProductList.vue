<template>
  <div class="product-list">
    <section class="product-list__banner">
      <img
        class="product-list__banner__img"
        src="@/assets/images/backgrounds/list_bg.jpg"
        alt="background"
      />
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
        <button class="content__write" @click="goToRegister">
          글쓰기
        </button>
      </div>
      <div class="products">
        <router-link
          class="products__link"
          v-for="item in productList"
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
import NProgress from 'nprogress'
const { mapState, mapActions } = createNamespacedHelpers('product')

export default {
  created() {
    this.getProducts({ offset: this.productOffset, limit: 10 })
      .then(response => {
        console.log(response)
        console.log('created')
        // this.products = response.data.result
        NProgress.done()
      })
      .catch(e => console.error(e))
  },
  components: { Box, SummaryCard },
  data() {
    return {
      products: []
    }
  },
  computed: {
    ...mapState(['productOffset', 'productList', 'hasMoreProduct'])
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
    },
    onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (this.hasMoreProduct) {
          this.getProducts({ offset: this.productOffset, limit: 10 })
        }
      }
    }
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
    // height: 500px;
    // overflow: hidden;
    &__img {
      width: 100%;
    }
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
</style>
