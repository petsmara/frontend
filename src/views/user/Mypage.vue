<template>
  <div class="mypage">
    <header class="mypage__header">
      <img src="@/assets/images/icons/cat.png" alt="" class="mypage__my-icon" />
      <div class="mypage__my-info">
        <span class="mypage__email">{{ $store.state.user.user.email }}</span>
        <span class="mypage__nickname">{{ profile.nickname }}</span>
        {{ selectedPet ? '/' : '' }}
        <span class="mypage__species">{{ selectedPet }}</span>
      </div>
    </header>
    <main class="mypage__main">
      <div class="mypage__tabs">
        <button
          v-for="(tab, index) in tabs"
          :key="tab"
          :class="{ 'mypage__tab--is-active': currentTab === index }"
          class="mypage__tab"
          @click="selectTab(index)"
        >
          {{ tab }}
        </button>
      </div>
      <div class="mypage__content">
        <div
          v-if="currentTab === 0"
          class="mypage__content mypage__content--sell"
        >
          <StatusCard
            v-for="(item, index) in sellingProductList"
            :key="`${item.title}-${index}`"
            :imgLink="item.image__image_1"
            :title="item.title"
            :category="convertedCategory(item.category)"
            :places="item.places"
            :price="parseInt(item.price)"
            @onClickSoldOut="handleChangeToSoldOut(item.id)"
            @onClickDelete="handleDelete(item.id)"
          />
        </div>
        <div v-else class="mypage__content mypage__content--sold-out">
          <StatusCard
            v-for="(item, index) in soldOutProductList"
            :key="`${item.title}-${index}`"
            :imgLink="item.image__image_1"
            :title="item.title"
            :category="convertedCategory(item.category)"
            :places="item.places"
            :price="parseInt(item.price)"
            :soldOut="true"
          />
        </div>
      </div>
      <section v-if="isLoading" class="loading">
        <i class="el-icon-loading"></i>
      </section>
    </main>
  </div>
</template>

<script>
import { StatusCard } from '@/components/Cards'
import { createNamespacedHelpers } from 'vuex'
import throttle from 'lodash.throttle'
const { mapState, mapActions } = createNamespacedHelpers('mypage')

export default {
  components: {
    StatusCard
  },
  async created() {
    await this.getUserProfile()
    await this.getUserProductList({
      tabId: this.tabId,
      offset: this.productListOffset,
      limit: 10
    })
  },
  data() {
    return {
      currentTab: 0,
      tabId: 1,
      tabs: ['판매중', '판매완료'],
      isLoading: false
    }
  },
  watch: {
    async currentTab(newValue, oldValue) {
      if (newValue === oldValue) {
        return
      }
      this.tabId = oldValue
      this.initMypageOptions()
      await this.getUserProductList({
        tabId: this.tabId,
        offset: this.productListOffset,
        limit: 10
      })
    }
  },
  computed: {
    ...mapState([
      'profile',
      'sellingProductList',
      'soldOutProductList',
      'hasMoreProduct',
      'productListOffset'
    ]),
    selectedPet() {
      const isSelectedDog = this.profile.has_dog ? '강아지' : ''
      const isSelectedCat = this.profile.has_cat ? '고양이' : ''
      const divider = isSelectedDog && isSelectedCat ? ', ' : ''
      return `${isSelectedDog}${divider}${isSelectedCat}`
    }
  },
  methods: {
    ...mapActions([
      'getUserProfile',
      'getUserProductList',
      'initMypageOptions',
      'changeToSoldOut',
      'deleteProduct'
    ]),
    selectTab(index) {
      this.currentTab = index
    },
    convertedCategory(id) {
      if (id === 1) {
        return '강아지'
      } else if (id === 2) {
        return '고양이'
      } else if (id === 3) {
        return '강아지 / 고양이'
      } else {
        return ''
      }
    },
    onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 500
      ) {
        if (this.hasMoreProduct) {
          this.isLoading = true
          this.dispatchGetUserProductList()
        }
      }
    },
    dispatchGetUserProductList: throttle(function() {
      this.getUserProductList({
        tabId: this.tabId,
        offset: this.productListOffset,
        limit: 10
      }).then(_ => {
        this.isLoading = false
      })
    }, 2000),
    handleChangeToSoldOut(id) {
      this.changeToSoldOut(id)
    },
    handleDelete(id) {
      this.deleteProduct(id)
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
.mypage {
  padding: 0 16px;
  width: 100%;
  max-width: 760px;
  margin: 0 auto;
  &__header {
    margin-bottom: 40px;
  }
  &__my-icon {
  }
  &__my-info {
    margin-top: 12px;
    font-weight: 900;
    font-size: 24px;
    color: #000000;
  }
  &__email {
    display: block;
    margin-bottom: 10px;
  }
  &__nickname {
  }
  &__species {
  }
  &__main {
  }
  &__tabs {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  &__tab {
    margin-bottom: 10px;
    padding-bottom: 8px;
    cursor: pointer;
    width: 210px;
    font-weight: 500;
    font-size: 20px;
    color: #000000;
    border-bottom: 4px solid transparent;
    background-color: #ffffff;
    &--is-active {
      border-bottom: 4px solid #8fb5ff;
    }
    &--sell {
    }
    &--sold-out {
    }
  }

  &__content {
    display: flex;
    justify-content: center;
    flex-direction: column;
    & /deep/ .status-card {
      margin-bottom: 30px;
    }
  }
  .loading {
    padding: 50px 0;
  }
}
</style>
