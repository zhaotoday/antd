import keyMirror from 'fbjs/lib/keyMirror'

// 当前 host
const HOST = window.location.host

// 开发
const DEVELOPMENT = 'DEVELOPMENT'

// 生产
const PRODUCTION = 'PRODUCTION'

// 当前环境
const ENV = (function () {
  if (HOST === 'localhost:8080') {
    return DEVELOPMENT
  } else {
    return PRODUCTION
  }
})()

// 基础地址
const BASE_URL = (function () {
  if (ENV === DEVELOPMENT) {
    return 'http://localhost:8080'
  } else {
    return 'http://www.furuan.cn'
  }
})()

// 接口地址
const API_URL = BASE_URL + '/api'

// 分页大小
const PAGE_SIZE = 10

// 网站标题
const TITLE = '网站后台'

// 模型列表
const MODELS = keyMirror({
  ARTICLES: null,
  FILES: null,
  JOBS: null,
  COMMODITIES: null
})

// 语言列表
const LANGS = {
  'cn': '中文',
  'ar': 'العربية',
  'en': 'English'
}

export default {
  BASE_URL,
  API_URL,
  PAGE_SIZE,
  TITLE,
  MODELS,
  LANGS
}
