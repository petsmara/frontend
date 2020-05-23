<template>
  <div class="event">
    <section class="event-intro">
      <p class="event-intro__paragraph">펫츠밥 홍보 이벤트</p>
      <h1 class="event-intro__title">
        펫츠밥 회원가입하고<br />
        시원한 스타벅스 마시자!
      </h1>
      <p class="event-intro__date">
        2020.05.25 - 2020.06.08
      </p>
      <div class="event-intro__content">
        <h2>#펫츠밥 #사료직거래<br />#동네사료거래</h2>
        <div class="event-intro__box-wrap">
          <div class="event-intro__tooltip event-intro__tooltip--coffee">
            회원가입<br />SNS 공유
          </div>
          <div class="event-intro__tooltip event-intro__tooltip--cake">
            회원가입<br />SNS 공유<br />+게시글
          </div>
        </div>
        <p>참여고객 중 추첨을 통해 스타벅스 아메리카노를 드립니다.</p>
      </div>
    </section>

    <section class="event-sns">
      <header class="event__header">
        <span class="event__header__order">#01</span>
        <h2 class="event__header__title">
          <el-divider>회원가입 SNS 공유</el-divider>
        </h2>
        <h2 class="event__header__paragraph">
          대상 SNS : 인스타그램, 페이스북
        </h2>
      </header>
      <div class="event-sns__steps">
        <div class="event-sns__step event-sns__step--01">
          <div class="event-sns__step__top">
            <span class="event-sns__step__order">1</span>
            <div class="event-sns__step__tooltip">
              <img
                class="event-sns__step__image"
                src="@/assets/images/icons/logo.png"
                alt="logo"
              />
            </div>
          </div>
          <div class="event-sns__step__bottom">
            펫츠밥<br />
            회원가입하기
          </div>
        </div>
        <div class="event-sns__step event-sns__step--02">
          <div class="event-sns__step__top">
            <span class="event-sns__step__order">2</span>
            <div class="event-sns__step__tooltip">
              <div class="event-sns__step__image-wrap">
                <img
                  class="event-sns__step__image"
                  src="@/assets/images/icons/icon_instagram.png"
                  alt="instagram"
                />
                <img
                  class="event-sns__step__image"
                  src="@/assets/images/icons/icon_facebook.png"
                  alt="facebook"
                />
              </div>
            </div>
          </div>
          <div class="event-sns__step__bottom">
            SNS에<br />
            홍보 페이지 공유
          </div>
        </div>
        <div class="event-sns__step event-sns__step--03">
          <div class="event-sns__step__top">
            <span class="event-sns__step__order">3</span>
            <div class="event-sns__step__tooltip">
              <span class="event-sns__step__text"># 펫츠밥</span>
            </div>
          </div>
          <div class="event-sns__step__bottom">
            해시태그 남기기<br />
            #펫츠밥 #동네사료거래<br />
            #사료직거래
          </div>
        </div>
      </div>
      <div class="event-sns__content event-intro__content">
        <div class="event-sns__box-wrap event-intro__box-wrap">
          <div
            class="event-sns__tooltip event-intro__tooltip event-sns__tooltip--coffee event-intro__tooltip--coffee"
          >
            3명<br />추첨 증정
          </div>
        </div>
        <p>스타벅스 아메리카노 (Tall size) 기프티콘 1매 증정</p>
      </div>
      <div class="event-sns__form">
        구글 폼 링크
      </div>
    </section>
    <section class="event-write">
      <header class="event__header">
        <span class="event__header__order">#01</span>
        <h2 class="event__header__title">
          <el-divider>회원가입 SNS 공유</el-divider>
        </h2>
        <h2 class="event__header__paragraph">
          대상 SNS : 인스타그램, 페이스북
        </h2>
      </header>
      <div class="event-write__content">
        <h3 class="event-write__sub-title">
          게시글을 올리면<br />스타벅스 싱글달콤 세트!!!
        </h3>
        <div class="event-write__boxes">
          <div class="event-write__box">
            <img
              class="event-write__box__img"
              src="@/assets/images/backgrounds/img_event_write_01.png"
              alt="상품판매 글쓰기 이미지"
            />
            <span class="event-write__box__text">메뉴바에서 글쓰기 클릭!</span>
          </div>
          <div class="event-write__box">
            <img
              class="event-write__box__img"
              src="@/assets/images/backgrounds/img_event_write_02.png"
              alt="상품판매 글쓰기 이미지2"
            />
            <span class="event-write__box__text"
              >판매게시글 작성완료후 게시판 확인!</span
            >
          </div>
        </div>
      </div>
      <div class="event-write__gift">
        <div class="event-write__gift__box-wrap event-intro__box-wrap">
          <div
            class="event-write__gift__tooltip event-intro__tooltip event-write__gift__tooltip--coffee event-intro__tooltip--coffee"
          >
            3명<br />추첨 증정
          </div>
        </div>
        <p>달콤 싱글 디저트 세트 기프티콘 1매 증정</p>
      </div>
    </section>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.event {
  margin: 0 auto;
  max-width: 720px;
  width: 100%;
  &__header {
    &__order {
      font-style: normal;
      font-weight: bold;
      font-size: 14px;
      line-height: 16px;
      text-align: center;
      letter-spacing: -0.679682px;
      color: #144d3b;
    }
    &__title {
      margin: 20px 0;
      &::v-deep .el-divider__text {
        font-style: normal;
        font-weight: bold;
        font-size: 20px;
        line-height: 23px;
        text-align: center;
        letter-spacing: -0.679682px;
        color: #000000;
      }
    }
    &__paragraph {
      font-style: normal;
      font-weight: normal;
      font-size: 10px;
      line-height: 12px;
      text-align: center;
      letter-spacing: -0.679682px;
      color: #000000;
    }
  }
}
.event-intro {
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

.event-sns {
  padding: 18px 16px;
  background: #fff;
  &__steps {
    margin-top: 36px;
    margin-bottom: 6px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  &__step {
    &:not(:first-child) {
      margin-left: 28px;
    }
    width: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    &--01 {
      img {
        width: 40px;
      }
    }
    &--02 {
      .event-sns__step__image-wrap {
        position: absolute;
        width: 100%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      img {
        &:first-child {
          margin-right: 6px;
        }
        width: 32px;
        position: static;
        transform: translate(0, 0);
      }
    }
    &__top {
      position: relative;
      width: 90px;
      height: 90px;
    }
    &__bottom {
      margin-top: 10px;
      font-style: normal;
      font-weight: 500;
      font-size: 9px;
      line-height: 11px;
      text-align: center;
      color: #000000;
    }
    &__order {
      position: absolute;
      top: 0;
      right: 0;
      border-radius: 50%;
      display: inline-block;
      width: 24px;
      height: 24px;
      background: #144d3b;
      font-style: normal;
      font-weight: 900;
      font-size: 16px;
      line-height: 24px;
      color: #ffffff;
    }
    &__tooltip {
      position: relative;
      border-radius: 50%;
      width: 90px;
      height: 90px;
      background: rgba(196, 196, 196, 0.2);
    }
    &__image {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    &__text {
      width: 100%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      line-height: 21px;
      /* identical to box height */

      letter-spacing: -0.679682px;

      color: #144d3b;
    }
  }
  &__box-wrap {
    width: 140px;
    background: url('url(~@/assets/images/backgrounds/event_sb01.png') center /
      100% no-repeat;
  }
  &__tooltip {
    top: 0;
    right: 0;
    width: 62px;
    height: 62px;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 12px;
    /* or 100% */
    text-align: center;
    letter-spacing: -0.679682px;
  }
}
.event-write {
  padding: 18px 16px 36px;
  background: #144d3b;
  color: #ffffff;
  .event__header__title {
    &::v-deep .el-divider__text {
      background: #144d3b;
      color: #ffffff;
    }
  }
  .event__header__paragraph {
    color: #ffffff;
  }
  &__sub-title {
    margin: 30px 0;
    font-style: normal;
    font-weight: 900;
    font-size: 26px;
    line-height: 30px;
    text-align: center;
    letter-spacing: -0.679682px;
    color: #ffffff;
  }
  &__boxes {
    display: flex;
  }
  &__box {
    display: flex;
    flex-direction: column;
    width: 100%;
    &:first-child {
      margin-right: 16px;
    }
    &__img {
      margin-bottom: 14px;
      width: 100%;
    }
    &__text {
      margin-top: auto;
      font-style: normal;
      font-weight: 500;
      font-size: 11px;
      line-height: 13px;
      text-align: center;
      color: #ffffff;
    }
  }
  &__gift {
    margin-top: 56px;
    padding: 16px;
    background: #ffffff;
    border-radius: 16px;
    &__box-wrap {
      width: 218px;
      background: url('url(~@/assets/images/backgrounds/event_sb02.png') center /
        100% no-repeat;
    }
    p {
      margin-top: 24px;
      font-style: normal;
      font-weight: 500;
      font-size: 9px;
      line-height: 11px;
      letter-spacing: -0.679682px;
      color: #000000;
    }
    &__tooltip {
      top: 0;
      right: -20px;
      left: auto;
      width: 62px;
      height: 62px;
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      line-height: 12px;
      /* or 100% */
      text-align: center;
      letter-spacing: -0.679682px;
    }
  }
}
</style>
