import request from '@/utils/request'

export function setArrow(data) {
  return request({
    url: '/vm/info/add',
    method: 'post',
    data
  })
}
export function updateArrow(data) {
  return request({
    url: '/vm/info/update',
    method: 'post',
    data
  })
}

export function facilitatorList(query) {
  return request({
    url: 'vm/facilitator_list',
    method: 'get',
    params: query
  })
}
export function setComputing(data) {
  return request({
    url: 'vm/test_vm',
    method: 'post',
    data
  })
}
export function setCount(data) {
  return request({
    url: 'vm/test_storage',
    method: 'post',
    data
  })
}
export function setNet(data) {
  return request({
    url: 'vm/test_net',
    method: 'post',
    data
  })
}
