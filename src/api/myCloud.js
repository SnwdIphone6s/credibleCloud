import request from '@/utils/request'

export function getMyCloud(query) {
  return request({
    url: 'vm/vm_list',
    method: 'get',
    params: query
  })
}
export function delMyCloud(data) {
  return request({
    url: 'vm/info/del',
    method: 'post',
    data
  })
}

