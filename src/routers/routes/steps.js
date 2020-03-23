import headline from './steps/headline'
import categories from './steps/categories'
import profile from './steps/profile'
import detail from './steps/detail'

export default [
  headline, categories, profile, detail
].map((step, index) => {
  step.meta.index = index

  return step
})
