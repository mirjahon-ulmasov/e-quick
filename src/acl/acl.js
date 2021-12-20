import Vue from 'vue'
import { AclInstaller, AclCreate, AclRule } from 'vue-acl'
import router from '@/router'

Vue.use(AclInstaller)
let initialRole = 'admin'
if (localStorage.getItem('UserInfo')) {
  initialRole = localStorage.getItem('UserInfo')
}
export default new AclCreate({
  initial  : initialRole,
  notfound : '/login',
  router,
  acceptLocalRules : true,
  globalRules: {
    dealer: new AclRule('dealer').generate(),
    super_admin: new AclRule('super_admin').generate(),
    admin  : new AclRule('admin').generate(),
    editor : new AclRule('editor').or('admin').or('dealer').or('super_admin').generate()
  }
})
