import { action, actions } from '@storybook/addon-actions'

export default {
  title: 'Addon/Actions'
}

export const ActionOnly = () => ({
  template: '<my-button @click="log">Click me to log the action</my-button>',
  methods: {
    log: action('log1')
  }
})
