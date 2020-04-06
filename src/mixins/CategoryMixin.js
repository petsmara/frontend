import { convertCategory } from '@/util/func'
export const CategoryMixin = {
  methods: {
    selectedCategory(category) {
      return convertCategory(category)
    }
  }
}
