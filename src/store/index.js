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
