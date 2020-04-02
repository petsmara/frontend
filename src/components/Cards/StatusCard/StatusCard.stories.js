import { text, number } from '@storybook/addon-knobs'
import StatusCard from './StatusCard.vue'

export default {
  title: 'Addon/Cards/StatusCard',
  component: StatusCard
}

export const Cards = () => ({
  components: { StatusCard },
  template: `
      <StatusCard 
        
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
