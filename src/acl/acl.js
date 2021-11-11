import Vue from 'vue'
import { AclInstaller, AclCreate, AclRule } from 'vue-acl'
import router from '@/router'

Vue.use(AclInstaller)

let initialRole = 'admin'
function parseJwt(token) {
  try {
    // Get Token Header
    const base64HeaderUrl = token.split('.')[0];
    const base64Header = base64HeaderUrl.replace('-', '+').replace('_', '/');
    const headerData = JSON.parse(window.atob(base64Header));

    // Get Token payload and date's
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    const dataJWT = JSON.parse(window.atob(base64));
    dataJWT.header = headerData;

// TODO: add expiration at check ...


    return dataJWT;
  } catch (err) {
    return false;
  }
}
const userInfo = parseJwt("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTMsInVzZXJfdHlwZSI6ImFkbWluIiwiZXhwIjoxNjM2NDcxOTU4fQ.jwGGFsKZARJRNr3lPFTHEPAqIeBt0QrtIzmpvjXuw3Y") ;
if (userInfo && userInfo.user_type)
initialRole = userInfo.user_type

export default new AclCreate({
  initial  : initialRole,
  notfound : '/pages/not-authorized',
  router,
  acceptLocalRules : true,
  globalRules: {
    admin  : new AclRule('admin').generate(),
    editor : new AclRule('editor').or('admin').generate()
  }
})
