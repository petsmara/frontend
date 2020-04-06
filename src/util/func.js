export const convertCategory = value => {
  switch (value) {
    case 1:
      return '강아지'
      break
    case 2:
      return '고양이'
      break
    case 3:
      return '공통'
      break
    case 4:
      return '기타'
      break
    default:
      return ''
  }
}
