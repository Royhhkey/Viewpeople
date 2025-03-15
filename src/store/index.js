import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    userAuth: [],
    // useDetail: {}
  }),
  actions: {
    setUserAuth(auth) {
      this.userAuth = auth;
    },
    // setUserDetail(detail) {
    //   this.useDetail = detail;
    // }
  }
});
// import { defineStore } from 'pinia'

// export const useAuthStore = defineStore('auth', {
//   state: () => ({
//     userAuth: []
//   }),
//   actions: {
//     setUserAuth(authData) {
//       this.userAuth = Array.isArray(authData) ? 
//         authData : 
//         [authData?.QX || '']
//     }
//   }
// })