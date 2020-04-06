import Vue from 'vue'

Vue.filter('getFirstImage', function(value) {
  if (!value) {
    return
  }
  return value[0]
})
