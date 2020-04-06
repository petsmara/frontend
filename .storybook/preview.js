import { addParameters, addDecorator } from '@storybook/vue'
import Vue from 'vue'
import Vuex from 'vuex'
import { withA11y } from '@storybook/addon-a11y'
import { withKnobs } from '@storybook/addon-knobs'
import '../src/assets/css/style.scss';
import Dayjs from '@/plugin/dayjs'

Vue.use(Vuex)
Vue.use(Dayjs)

// addDecorator(centered)
addDecorator(withKnobs)
addDecorator(withA11y)
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
addParameters({
  docs: {
    inlineStories: true,
    iframeHeight: '60px'
  }
})
