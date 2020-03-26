import { text, number } from '@storybook/addon-knobs'
import LogoCard from './LogoCard.vue'

export default {
  title: 'Addon/LogoCard',
  component: LogoCard
}

export const Cards = () => ({
  components: { LogoCard },
  template: `
      <LogoCard 
        :imgLink="imgLink"
        :title="title"
        :category="category"
        :places="places"
        :price="price"
      />
    `,
  props: {
    imgLink: {
      default: text(
        'imgLink',
        'https://serieamania.com/g2/data//member/ha/hahazz00_serieamania_1584280189.jpg'
      )
    },
    title: {
      default: text('title', '사료 팔아요')
    },
    category: {
      default: text('category', '고양이')
    },
    places: {
      default: text('places', '서울 강남구 / 서울 동작구')
    },
    price: {
      default: number('price', 200)
    }
  }
})
