import { action, actions } from '@storybook/addon-actions'
import AppNav from './AppNav.vue'
export default {
  title: 'Addon/AppNav'
}

export const ActionOnly = () => ({
  components: { AppNav },
  template: '<AppNav />',
  methods: {
    log: action('log1')
  }
})
