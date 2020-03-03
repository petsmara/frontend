// import {
//   configure,
//   addDecorator,
//   addParameters
// } from '@storybook/vue'
// import Vue from 'vue'
// import centered from '@storybook/addon-centered/vue'
// import {
//   withKnobs
// } from '@storybook/addon-knobs'

// addDecorator(centered)
// addDecorator(withKnobs)
// // addParameters({
// //   backgrounds: [
// //     {
// //       name: 'twitter',
// //       value: '#00aced',
// //       default: true
// //     },
// //     {
// //       name: 'facebook',
// //       value: '#3b5998'
// //     }
// //   ]
// // })
// addParameters({
//   docs: {
//     inlineStories: true,
//     iframeHeight: '60px',
//   },
// });

// // Import Vue plugins
// // import Vuex from 'vuex'

// // Import your global components.
// // import Mybutton from '../src/stories/Button.vue';

// // Install Vue plugins.
// // Vue.use(Vuex)

// // Register global components.
// // Vue.component('my-button', Mybutton);

// // configure(require.context('../src', true, /\.stories\.js$/), module)

import { addParameters, addDecorator } from '@storybook/vue'
import Vue from 'vue'
import Vuex from 'vuex'
import { withA11y } from '@storybook/addon-a11y'
import centered from '@storybook/addon-centered/vue'
import { withKnobs } from '@storybook/addon-knobs'

addDecorator(centered)
addDecorator(withKnobs)
addParameters({
  backgrounds: [
    {
      name: 'twitter',
      value: '#00aced',
      default: true
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
