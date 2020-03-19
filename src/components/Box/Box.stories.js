import { text } from '@storybook/addon-knobs'
import Box from './Box.vue'

export default {
  title: 'Addon/Box',
  component: Box
}

export const BoxTitle = () => ({
  components: { Box },
  template: `
    <Box>
      <template #title>
        {{ title }}
      </template>
      <template #content>
        {{ content }}
      </template>
    </Box>
  `,
  props: {
    title: {
      default: text('title', 'NEW ITEM')
    },
    content: {
      default: text('content', 'NEW CONTENT')
    }
  }
})
