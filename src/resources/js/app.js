require('./bootstrap');

window.Vue = require('vue').default;
import VueI18n from 'vue-i18n';
import App from './App.vue';
import router from './routes';
import CKEditor from '@ckeditor/ckeditor5-vue2';
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import * as VueGoogleMaps from 'vue2-google-maps';
import Vue from 'vue';


import '../../assets/css/global.css';
import '../../assets/css/app.css';
import '../../assets/css/user.css';
import '../../assets/css/notification.css';
import '../../assets/css/bootstrap.css';

// modules css
import '../../assets/css/modules/hotel.css';
import '../../assets/css/modules/tour.css';
import '../../assets/css/modules/space.css';
import '../../assets/css/modules/car.css';
import '../../assets/css/modules/boat.css';
import '../../assets/css/modules/flight.css';
import '../../assets/css/modules/event.css';
import '../../assets/css/modules/checkout.css';

Vue.use(DatePicker);
Vue.use(CKEditor);
Vue.use(VueI18n);
Vue.use(VueGoogleMaps, {
  load: {
      key: 'AIzaSyAc7pTNsbaW8DJLWjiLaxWYf40mGhHFsBU', // Replace with your Google Maps API key
      libraries: 'places', // Necessary for places input
  }
});

// Define your translations
const messages = {
  en: {
    Dashboard: 'Dashboard',
    'Booking History': 'Booking History',
    Wishlist: 'Wishlist',
    'My Profile': 'My Profile',
    'Change password': 'Change password',
    'Admin Dashboard': 'Admin Dashboard',
  },
  // Add other languages here
};

const i18n = new VueI18n({
  locale: 'en', // set locale
  messages, // set locale messages
});

const app = new Vue({
  el: '#app',
  router,
  i18n,
  render: h => h(App),
});



