import request from '@/utils/request'
export function login(data) {
  return new Promise((resolve, reject) => {
    resolve({ code: 20000, data: { token: 'admin-token' } })
  })
}
export function getInfo(a) {
  return new Promise((resolve, reject) => {
    resolve({
      code: 20000,
      data: {
        roles: ['admin'],
        introduction: 'I am a super administrator',
        avatar:
          'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Super Admin'
      }
    })
  })
}

// export function logout(data) {
//   return new Promise((resolve, reject) => {
//     resolve({ code: 20000, data: 'success' })
//   })
// }
export function getInfo_1(data) {
  return request({
    url: '/account/regist ',
    method: 'post',
    data
  })
}
export function login_1(query) {
  return request({
    url: '/account/login',
    method: 'get',
    params: query
  })
}
export function check_current(query) {
  return request({
    url: '/account/check_current',
    method: 'get',
    params: query
  })
}
export function logout(query) {
  return request({
    url: '/account/logout',
    method: 'get',
    params: query
  })
}
export function getLogin(query) {
  return request({
    url: '/account/check_current',
    method: 'get',
    params: query
  })
}
export function setPassword_api(data) {
  return request({
    url: '/account/forget_password_update',
    method: 'post',
    data
  })
}
export function setEmail_api(query) {
  return request({
    url: '/account/email_active',
    method: 'get',
    params: query
  })
}
