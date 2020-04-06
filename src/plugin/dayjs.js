import Vue from 'vue'
import dayjs from 'dayjs'
import timeZone from 'dayjs-ext/plugin/timeZone'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/ko'

dayjs.locale('ko') // use Spanish locale globally
dayjs.extend(relativeTime)
dayjs.extend(timeZone)

export default {
  install(Vue, options) {
    Vue.prototype.dayjs = dayjs
  }
}
