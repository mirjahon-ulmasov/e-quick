import Vue from 'vue'
import { AclInstaller, AclCreate, AclRule } from 'vue-acl'
import router from '@/router'

Vue.use(AclInstaller)                     
let initialRole = 'editor'
if (localStorage.getItem('access')) {
  function parseJwt (token) {
    try {
      // Get Token Header
      const base64HeaderUrl = token.split('.')[0]
      const base64Header = base64HeaderUrl.replace('-', '+').replace('_', '/')
      const headerData = JSON.parse(window.atob(base64Header))
  
      // Get Token payload and date's
      const base64Url = token.split('.')[1]
      const base64 = base64Url.replace('-', '+').replace('_', '/')
      const dataJWT = JSON.parse(window.atob(base64))
      dataJWT.header = headerData
      // TODO: add expiration at check ...
     return dataJWT
    } catch (err) {
      return false
    }
  }
  //  User Info
  const userInfo = parseJwt(localStorage.getItem('access'))
  initialRole = userInfo.user_type || userInfo
}
export default new AclCreate({
  initial  : initialRole,
  notfound : '/404',
  router,
  acceptLocalRules : true,
  globalRules: {
    dealer: new AclRule('dealer').generate(),
    public: new AclRule('admin_or_super').or('admin').or('super_admin').or('dealer').generate(),
    super_admin: new AclRule('super_admin').generate(),
    admin  : new AclRule('admin').generate(),
    editor : new AclRule('editor')
  }
})
