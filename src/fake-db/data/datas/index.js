import mock from '@/fake-db/mock.js'
import ok from './data.json'


mock.onGet('/api/sap/sap/').reply(() => {
  return [200, ok]
})

// POST : Add new Item
mock.onPost('/api/admin/admins/').reply((request) => {

  // Get event from post data
  const item = JSON.parse(request.data).item

  const length = data.admins.length
  let lastIndex = 0
  if (length) {
    lastIndex = data.admins[length - 1].id
  }
  item.id = lastIndex + 1

  data.admins.push(item)

  return [201, {id: item.id}]
})

// Update Product
mock.onPost(/\/api\/admin\/admins\/\d+/).reply((request) => {

  const itemId = request.url.substring(request.url.lastIndexOf('/') + 1)

  const item = data.admins.find((item) => item.id == itemId)
  Object.assign(item, JSON.parse(request.data).item)

  return [200, item]
})

// DELETE: Remove Item
mock.onDelete(/\/api\/admin\/admins\/\d+/).reply((request) => {

  const itemId = request.url.substring(request.url.lastIndexOf('/') + 1)

  const itemIndex = data.admins.findIndex((p) => p.id == itemId)
  data.admins.splice(itemIndex, 1)
  return [200]
})
