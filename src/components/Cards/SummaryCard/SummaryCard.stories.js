import { text, number } from '@storybook/addon-knobs'
import SummaryCard from './SummaryCard.vue'

export default {
  title: 'Addon/Cards/SummaryCard',
  component: SummaryCard
}

export const Cards = () => ({
  components: { SummaryCard },
  template: `
      <SummaryCard 
        :imgLink="imgLink"
        :title="title"
        :category="category"
        :places="places"
        :price="price"
        :time="time"
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
    },
    time: {
      default: text('time', '2020-04-04T16:15:18.736Z')
    }
  }
})
