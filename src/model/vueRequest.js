import axios from 'axios'
// 请求域名
const BASEURL = ''

/**
 * 封装axios请求接口
 * @param url  请求的地址 例如(/api/seller)
 * @param params 传给服务端的参数
 * @param type  请求的方式(GET/POST)
 * return 返回一个promise对象
 */
export default async (url = '', params = {}, type = 'GET') => {
    type = type.toUpperCase()
    if (type === 'GET') {
        let time = (new Date()).getTime()
        params.time = time
    }
    return new Promise((resolve, reject) => {
        axios({
            method: type,
            url: BASEURL + url,
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            data: type === 'POST' ? params : '',
            params: type === 'GET' ? params : ''
        }).then(res => {
            // 成功响应
            resolve(res.data)
        }).catch(err => {
            // 失败响应
            reject(err)
        })
    })
}
