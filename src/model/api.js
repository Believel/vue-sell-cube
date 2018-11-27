import vhttp from 'model/vueRequest'

export const getSeller = (params) => vhttp('/api/seller', params, 'GET')
export const getGoods = (params) => vhttp('/api/goods', params, 'GET')
export const getRatings = (params) => vhttp('/api/ratings', params, 'GET')
