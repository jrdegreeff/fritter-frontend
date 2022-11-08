import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from './components/Freet/HomePage.vue';
import AccountPage from './components/Account/AccountPage.vue';
import LoginPage from './components/Login/LoginPage.vue';
import ProfilePage from './components/Profile/ProfilePage.vue';
import FreetPage from './components/Freet/FreetPage.vue';
import ThreadPage from './components/Thread/ThreadPage.vue';
import NotFound from './NotFound.vue';

Vue.use(VueRouter);

const routes = [
  {path: '/', name: 'Home', component: HomePage},
  {path: '/account', name: 'Account', component: AccountPage},
  {path: '/login', name: 'Login', component: LoginPage},
  {path: '/user/:username', name: 'Profile', component: ProfilePage},
  {path: '/freet/:freetid', name: 'Freet', component: FreetPage},
  {path: '/thread/:freetid', name: 'Thread', component: ThreadPage},
  {path: '*', name: 'Not Found', component: NotFound}
];

const router = new VueRouter({routes});

/**
 * Navigation guards to prevent user from accessing wrong pages.
 */
router.beforeEach((to, from, next) => {
  if (router.app.$store) {
    console.log(router.app.$store.state.username);
    if (to.name === 'Login' && router.app.$store.state.username) {
      next({name: 'Account'}); // Go to Account page if user navigates to Login and are signed in
      return;
    }

    if (to.name === 'Account' && !router.app.$store.state.username) {
      next({name: 'Login'}); // Go to Login page if user navigates to Account and are not signed in
      return;
    }
  }

  next();
});

export default router;
