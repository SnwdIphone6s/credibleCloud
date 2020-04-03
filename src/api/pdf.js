import request from '@/utils/request'

export function vm_test_coun(query) {
  return request({
    url: 'vm/test_instance/vm_test_pdf',
    method: 'get',
    params: query
  })
}
export function getScore(data) {
  return request({
    url: 'vm/test_instance/vm_score_rank',
    method: 'post',
    data
  })
}
