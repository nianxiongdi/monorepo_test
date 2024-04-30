const path = require('path')
const fs = require('fs')

function resolveSrc (file, subDir = '') {
  return path.join(__dirname, '../src', subDir, file || '')
}

function resolveDist (platform, subDir = '') {
  return path.join(__dirname, '../dist', platform, subDir)
}

function resolve (file) {
  return path.join(__dirname, '..', file || '')
}

// pnpm 下 node_modules 依赖受软连接影响，Webpack Rule.include Rule.exclude
// 如果使用 resolve 的绝对路径会导致资源真实路径匹配失败，需要改为正则匹配。
function resolvePnpmRule(file = '') {
  if (
    (file.startsWith('node_modules/') || file.startsWith('/node_modules/')) &&
    !['/node_modules/', 'node_modules/'].includes(file)
  ) {
    return new RegExp(file)
  } else {
    return resolve(file)
  }
}

// pnpm 下软链接指向的真实路径
function resolvePnpmRealPath (file = '') {
  try {
    const symlinkPath = resolve(file)
    const realPath = fs.realpathSync(symlinkPath)
    return realPath
  } catch (err) {
    console.error('Failed to resolve the physical path of the package.', err)
    return resolve(file)
  }
}

function normalizeArr (arrCfg) {
  if (Array.isArray(arrCfg) && arrCfg.length) {
    return arrCfg
  } else if (arrCfg) {
    return [arrCfg]
  }
  return []
}

function getRootPath (...args) {
  return args.filter(item => item).join('-')
}

function getConf (conf, options) {
  return typeof conf === 'function' ? conf(options) : conf
}

function getPartialCompileConfig (conf) {
  let confArr = []
  if (Object.prototype.toString.call(conf) === '[object Object]') {
    Object.keys(conf).forEach(key => {
      confArr.push(...getPartialCompileConfig(conf[key]))
    })
  } else if (Object.prototype.toString.call(conf) === '[object Array]') {
    confArr.push(...conf)
  } else {
    confArr.push(conf)
  }
  // console.log('-----------------getPartialCompileConfig-', confArr)
  return confArr
}

module.exports = {
  resolve,
  resolveSrc,
  resolveDist,
  resolvePnpmRule,
  resolvePnpmRealPath,
  normalizeArr,
  getRootPath,
  getConf,
  getPartialCompileConfig
}
