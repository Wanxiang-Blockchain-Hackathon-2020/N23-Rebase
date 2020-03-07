import Base from '../Base'

import create from './create'
import update from './update'
import list from './list'

export default Base.setRouter([
  {
    path: '/create',
    router: create,
    method: 'post'
  },
  {
    path: '/update',
    router: update,
    method: 'post'
  },
  {
    path: '/list',
    router: list,
    method: 'get'
  },
])
