import { addParameters, addDecorator } from '@storybook/vue'
import Vue from 'vue'
import Vuex from 'vuex'
import { withA11y } from '@storybook/addon-a11y'
import { withKnobs } from '@storybook/addon-knobs'
import '../src/assets/css/style.scss';

// addDecorator(centered)
addDecorator(withKnobs)
addParameters({
  backgrounds: [
    {
      name: 'twitter',
      value: '#00aced',
      // default: true
    },
    {
      name: 'facebook',
      value: '#3b5998'
    }
  ]
})

import MyButton from '../src/components/Button/Button.vue'

addDecorator(withA11y)
Vue.component('my-button', MyButton)
Vue.use(Vuex)

addParameters({
  docs: {
    inlineStories: true,
    iframeHeight: '60px'
  }
})
