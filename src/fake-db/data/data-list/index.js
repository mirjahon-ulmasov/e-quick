import mock from '@/fake-db/mock.js'

const data = {
  products: [
    {
      id: 1,
      parent_id: 2,
      name: 'Java',
      description: '$65.00',
      options: {},
      status: 1,
  },
  {
    id: 2,
    parent_id: 1,
    name: 'Nusrat',
    description: '$65.00',
    options: {},
    status: 1,
},
{
  id: 3,
  parent_id: 1,
  name: 'Kkkkkk',
  description: '$65.00',
  options: {},
  status: 1,
},
{
  id: 4,
  parent_id: 1,
  name: 'okkkkkkk',
  description: '$65.00',
  options: {},
  status: 1,
},
  ]
}


mock.onGet('/api/data-list/products').reply(() => {
  return [200, JSON.parse(JSON.stringify(data.products)).reverse()]
})

// POST : Add new Item
mock.onPost('/api/data-list/products/').reply((request) => {

  // Get event from post data
  const item = JSON.parse(request.data).item

  const length = data.products.length
  let lastIndex = 0
  if (length) {
    lastIndex = data.products[length - 1].id
  }
  item.id = lastIndex + 1

  data.products.push(item)

  return [201, {id: item.id}]
})

// Update Product
mock.onPost(/\/api\/data-list\/products\/\d+/).reply((request) => {

  const itemId = request.url.substring(request.url.lastIndexOf('/') + 1)

  const item = data.products.find((item) => item.id == itemId)
  Object.assign(item, JSON.parse(request.data).item)

  return [200, item]
})

// DELETE: Remove Item
mock.onDelete(/\/api\/data-list\/products\/\d+/).reply((request) => {

  const itemId = request.url.substring(request.url.lastIndexOf('/') + 1)

  const itemIndex = data.products.findIndex((p) => p.id == itemId)
  data.products.splice(itemIndex, 1)
  return [200]
})
