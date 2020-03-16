import { action, actions } from '@storybook/addon-actions'
import { text, boolean } from '@storybook/addon-knobs'
import AppNav from './AppNav.vue'

export default {
  title: 'Addon/AppNav'
}

export const ActionOnly = () => ({
  components: { AppNav },
  template: `
      <div style="max-width: 1280px; width: 100%;">
        <AppNav />
      </div>  
    `,
  props: {
    isDisabled: {
      default: boolean('Disabled', false)
    },
    text: {
      default: text('Text', 'Hello Storybook')
    }
  },
  methods: {
    log: action('log1')
  }
})
