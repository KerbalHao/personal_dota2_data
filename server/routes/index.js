var express = require('express');
var path = require('path');
var jwt = require('jsonwebtoken')
var fs = require('fs')
var router = express.Router();
var initDota2 = JSON.parse(fs.readFileSync(`${__dirname}/data/dota2.json`, 'utf8'))
var initUserList = JSON.parse(fs.readFileSync(`${__dirname}/data/user.json`, 'utf8'))
var secret = 'dota2'
var personalData = {}
var userList,currentUser;
initData()

// 深克隆
function deepClone(data) {
  return JSON.parse(JSON.stringify(data))
}

// 初始化基础后台数据
function initData() {
  currentUser = ''
  dota2 = deepClone(initDota2),
  userList = deepClone(initUserList)
  personalData = {}
}

// 获取用户个人数据
getPersonalData =  (currentUser) => {
  try {
    personalData = JSON.parse(fs.readFileSync(`${__dirname}/data/${currentUser}.json`, 'utf8'))
  } catch {
    personalData = initPersonalData(currentUser)
  }
}

//新注册用户时，初始化用户个人数据
initPersonalData = (currentUser) => {
  let data = {
    userName:currentUser,
    heroes: deepClone(initDota2).heroes,
    items: deepClone(initDota2).items,
  }
  fs.writeFile(`${__dirname}/data/${currentUser}.json`, JSON.stringify(data), 'utf8', err => {
    if (err) throw err;
    console.log('文件已被保存');
  })
  return data
}

// 保存个人数据
savePersonalData = (currentUser) => {
  console.log('save')
  fs.writeFile(`${__dirname}/data/${currentUser}.json`, JSON.stringify(personalData), 'utf8', ()=>console.log('done'))
}

/* GET hero page. */
router.get('/', function (req, res) {
  res.json(dota2);
});

router.post('/like/:id', (req, res, next) => {
  let {userName, id} = req.body 
  let target = personalData.heroes[id]
  target.like = !target.like
  savePersonalData(userName)
  res.json({
    code: 0,
    message: personalData.heroes[id].like ? '收藏成功' : '已取消收藏'
  })
})
/* Get item page */
// 前端 put 时，将整个 操作后的 item 发送给后台，用于操作个人数据
router.post('/item/addcart', (req, res, next) => {
    let {numId, num} = req.body
    personalData.items = personalData.items.map(item => {
      if (item.numId == numId) {
        item.num += num
      }
      return item
    })
  savePersonalData(personalData.userName)
  res.json({
    code: 0,
    message: '数据已更改'
  })
})

router.get('/item/clear', (req,res) => {
  console.log(1)
  personalData.items = personalData.items.map(item => {
    item.num = 0
    return item
  })
  savePersonalData(personalData.userName)
  res.json({
    code: 0,
    message: '已清除'
  })
})

router.post('/item/buy', (req, res) => {
  let data = req.body
  console.log(data)
  personalData.items = personalData.items.map(item => {
    for(let i = 0; i< data.length;i++) {
      if (item.numId == data[i].numId){
        item.num = 0
        item.bought = true
        item.bought_num += data[i].bought_num
        console.log(item, i)
      }
    }
    return item
  })
  savePersonalData(personalData.userName)
  res.json({
    code: 0,
    message: '成功'
  })
})

/*get user page */
router.post('/login', (req, res) => {
  let { userName, passWord } = req.body
  let user = userList.find(item => item.userName === userName && item.passWord === passWord)
  if (!user) {
    res.json({
      code: 1,
      warnning: '账号或密码错误，请重新输入'
    })
  } else {
    // 添加 token
    let token = jwt.sign({ userName }, secret, { expiresIn: '1h' })
    // 确定登陆成功后，获取用户个人数据并操作数据
    getPersonalData(userName)
    res.json({
      code: 0,
      personalData,
      token
    })
  }
})

router.get('/checktoken', (req, res) => {
  let token = req.headers.authorization
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      res.json({
        code: 1,
        warnning: '请登录'
      })
    } else {
      let userName = decoded.userName
      res.json({
        code: 0,
        userName,
        token: jwt.sign({userName}, secret, { expiresIn: '1h' })
      })
    }
  })
})

router.get('/user/exit', (req, res) => {
  // 用户注销后，初始化后台数据
  initData()
  res.json({
    message: 'you logout'
  })
})



module.exports = router;
