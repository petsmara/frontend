<template>
  <div class="event">
    <header class="event-header">
      <p class="event-header__paragraph">펫츠밥 홍보 이벤트</p>
      <h1 class="event-header__title">
        펫츠밥 회원가입하고<br />
        시원한 스타벅스 마시자!
      </h1>
      <p class="event-header__date">
        2020.05.25 - 2020.06.08
      </p>
      <div class="event-header__content">
        <h2>#펫츠밥 #사료직거래<br />#동네사료거래</h2>
        <div class="event-header__box-wrap">
          <div class="event-header__box">
            <img
              class="event-header__img-coffee"
              src="@/assets/images/backgrounds/event_sb01.png"
              alt="스타벅스 아메리카노"
            />
            <div class="event-header__tooltip">회원가입<br />SNS 공유</div>
          </div>
          <div class="event-header__box">
            <img
              class="event-header__img-cake"
              src="@/assets/images/backgrounds/event_sb02.png"
              alt="스타벅스 아메리카노과 케익"
            />
            <div class="event-header__tooltip">
              회원가입<br />SNS 공유<br />+게시글
            </div>
          </div>
        </div>
        <p>참여고객 중 추첨을 통해 스타벅스 아메리카노를 드립니다.</p>
      </div>
    </header>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.event {
  padding: 20px 16px 12px;
  background: #144d3b;
}
.event-header {
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
  &__content {
    padding: 16px;
    background: #ffffff;
    border-radius: 16px;
  }
  &__box-wrap {
  }
  &__box {
  }
  &__img-coffee {
    width: 118px;
  }
  &__img-cake {
    width: 218px;
  }
  &__tooltip {
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
