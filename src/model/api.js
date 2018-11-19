import vhttp from 'model/vueRequest'

export const getSeller = (params) => vhttp('/api/seller', params, 'GET')
export const getGoods = (params) => vhttp('/api/goods', params, 'GET')
// export const get_ratings = (params) => vhttp('/api/ratings', params, 'GET')
