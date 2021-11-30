export const state = () => ({
  count: 500,
})

export const getters = {
  getCount: state => state.count,
}