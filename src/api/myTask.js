import request from '@/utils/request'

export function testInstance(query) {
  return request({
    url: 'vm/test_instance/list',
    method: 'get',
    params: query
  })
}

