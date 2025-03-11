import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    userAuth: []
  }),
  actions: {
    setUserAuth(auth) {
      this.userAuth = auth;
    }
  }
});
