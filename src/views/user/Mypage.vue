<template>
  <div class="mypage">
    <header class="mypage__header">
      <img src="@/assets/images/icons/cat.png" alt="" class="mypage__my-icon" />
      <div class="mypage__my-info">
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
          <StatusCard />
          <StatusCard />
        </div>
        <div v-else class="mypage__content mypage__content--sold-out">
          <StatusCard :soldOut="true" />
          <StatusCard />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { StatusCard } from '@/components/Cards'
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapActions } = createNamespacedHelpers('mypage')
export default {
  components: {
    StatusCard
  },
  async created() {
    await this.getUserProfile()
  },
  data() {
    return {
      currentTab: 0,
      tabs: ['판매중', '판매완료']
    }
  },
  computed: {
    ...mapState(['profile']),
    selectedPet() {
      const isSelectedDog = this.profile.has_dog ? '강아지' : ''
      const isSelectedCat = this.profile.has_cat ? '고양이' : ''
      const divider = isSelectedDog && isSelectedCat ? ', ' : ''
      return `${isSelectedDog}${divider}${isSelectedCat}`
    }
  },
  methods: {
    ...mapActions(['getUserProfile']),
    selectTab(index) {
      console.log(index)
      this.currentTab = index
    }
  }
}
</script>

<style lang="scss" scoped>
.mypage {
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
}
</style>
