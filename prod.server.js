const express = require('express')
const path = require('path')
const port = process.env.PORT || 4000
const app = express()

const appData = require('./data.json')
const seller = appData.seller
const goods = appData.goods
const ratings = appData.ratings

const router = express.Router()

router.get('/seller', function (req, res) {
  res.json({
    errno: 0,
    data: seller
  })
})
router.get('/goods', function (req, res) {
  res.json({
    errno: 0,
    data: goods
  })
})
router.get('/ratings', function (req, res) {
  res.json({
    errno: 0,
    data: ratings
  })
})

app.use('/api', router)
// 加载静态文件
app.use(express.static(path.join(__dirname, './dist')))

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
