import Vue from 'vue';
import VueRouter from 'vue-router';
import login from './components/login';
import register from './components/register';
import home from './components/home';

// Vendor components

import vendorDashboard from './components/modules/vendor/dashboard.vue';
import vendorBookingHistory from './components/modules/vendor/booking-history.vue';
import vendorWishlist from './components/modules/vendor/wishlist.vue';
import vendorProfile from './components/modules/vendor/profile.vue';
import vendorBoats from './components/modules/vendor/boat/boats.vue';
import vendorBoatsCreate from './components/modules/vendor/boat/boat-create.vue';
import vendorBoatAvailability from './components/modules/vendor/boat/boat-availability.vue';
import vendorCars from './components/modules/vendor/car/cars.vue';
import vendorCarsCreate from './components/modules/vendor/car/car-create.vue';
import vendorCarAvailability from './components/modules/vendor/car/car-availability.vue';
import vendorEvents from './components/modules/vendor/event/events.vue';
import vendorEventsCreate from './components/modules/vendor/event/event-create.vue';
import vendorEventAvailability from './components/modules/vendor/event/event-availability.vue';
import vendorFlight from './components/modules/vendor/flight/flight.vue';
import vendorFlightCreate from './components/modules/vendor/flight/flight-create.vue';
import vendorHotel from './components/modules/vendor/hotel/hotels.vue';
import vendorHotelCreate from './components/modules/vendor/hotel/hotel-create.vue';
import vendorRoom from './components/modules/vendor/room/room.vue';
import vendorRoomCreate from './components/modules/vendor/room/room-create.vue';
import vendorSpace from './components/modules/vendor/space/space.vue';
import vendorSpaceCreate from './components/modules/vendor/space/space-create.vue';
import vendorSpaceAvailability from './components/modules/vendor/space/space-availability.vue';
import vendorTour from './components/modules/vendor/tour/tours.vue';
import vendorTourCreate from './components/modules/vendor/tour/tour-create.vue';
import vendorTourAvailability from './components/modules/vendor/tour/tour-availability.vue';
import vendorBookingReport from './components/modules/vendor/booking-report.vue';
import vendorChangePassword from './components/modules/vendor/change-password.vue';
import vendorCoupons from './components/modules/vendor/coupon.vue';
import vendorCouponCreate from './components/modules/vendor/coupon-create.vue';
import vendorVerification from './components/modules/vendor/verification.vue';
import vendorVerificationUpdate from './components/modules/vendor/verification-update.vue';
import vendorPayouts from './components/modules/vendor/payouts.vue';
import vendorPlans from './components/modules/vendor/my-plans.vue';
import vendorEnquiryReport from './components/modules/vendor/enquiry-report.vue';
import vendorNews from './components/modules/vendor/news.vue';
import vendorNewsCreate from './components/modules/vendor/news-create.vue';



// User components

import hotels from './components/modules/user/hotels.vue';
import hotelDetail from './components/modules/user/hotel-details.vue';
import tours from './components/modules/user/tours.vue';
import tourDetail from './components/modules/user/tour-details.vue';
import spaces from './components/modules/user/spaces.vue';
import spaceDetail from './components/modules/user/space-details.vue';
import cars from './components/modules/user/cars.vue';
import carDetail from './components/modules/user/car-details.vue';
import events from './components/modules/user/events.vue';
import eventDetail from './components/modules/user/event-details.vue';
import flights from './components/modules/user/flights.vue';
import boats from './components/modules/user/boats.vue';
import boatDetail from './components/modules/user/boat-details.vue';
import checkout from './components/modules/user/checkout.vue';
import checkoutSuccess from './components/modules/user/checkout-success.vue';


Vue.use(VueRouter);

const routes = [
    {
        name: 'home',
        path: '/home-vue',
        component: home
    },
    {
        name: 'vendorLogin',
        path: '/login-vue',
        component: login
    },
    {
        name: 'register',
        path: '/register-vue',
        component: register
    },
    {
        name: 'vendorDashboard',
        path: '/user/dashboard-vue',
        component: vendorDashboard,
        meta: { requiresAuth: true }
    },
    {
        name: 'bookingHistory',
        path: '/user/booking-history-vue',
        component: vendorBookingHistory,
        meta: { requiresAuth: true }
    },
    {
        name: 'wishlist',
        path: '/user/wishlist-vue',
        component: vendorWishlist,
        meta: { requiresAuth: true }
    },
    {
        name: 'profile',
        path: '/user/profile-vue',
        component: vendorProfile,
        meta: { requiresAuth: true }
    },
    {
        name: 'vendorHotels',
        path: '/user/hotel-vue',
        component: vendorHotel,
        meta: { requiresAuth: true }
    },
    {
        name: 'vendorRoom',
        path: '/user/room-vue/:id?',
        component: vendorRoom,
        meta: { requiresAuth: true }
    },
    {
        name: 'vendorRoomCreate',
        path: '/user/room-create-vue/:hotelid/:id?',
        component: vendorRoomCreate,
        meta: { requiresAuth: true }
    },
    {
        name: 'vendorHotelCreate',
        path: '/user/hotel-create-vue/:id?',
        component: vendorHotelCreate,
        meta: { requiresAuth: true }
    },
    {
        name: 'vendorBoats',
        path: '/user/boats-vue',
        component: vendorBoats,
        meta: { requiresAuth: true }
    },
    {
        name: 'vendorBoatsCreate',
        path: '/user/boat-create-vue/:id?',
        component: vendorBoatsCreate,
        meta: { requiresAuth: true }
    },
    {
        name: 'vendorBoatAvailability',
        path: '/user/boat-availability-vue',
        component: vendorBoatAvailability,
        meta: { requiresAuth: true }
    },
    {
        name: 'vendorCars',
        path: '/user/cars-vue',
        component: vendorCars,
        meta: { requiresAuth: true }
    },
    {
        name: 'vendorCarsCreate',
        path: '/user/car-create-vue/:id?',
        component: vendorCarsCreate,
        meta: { requiresAuth: true }
    },
    {
        name: 'vendorCarAvailability',
        path: '/user/car-availability-vue',
        component: vendorCarAvailability,
        meta: { requiresAuth: true }
    },
    {
        name: 'vendorEvents',
        path: '/user/events-vue',
        component: vendorEvents,
        meta: { requiresAuth: true }
    },
    {
        name: 'vendorEventsCreate',
        path: '/user/event-create-vue/:id?',
        component: vendorEventsCreate,
        meta: { requiresAuth: true }
    },
    {
        name: 'vendorEventAvailability',
        path: '/user/event-availability-vue',
        component: vendorEventAvailability,
        meta: { requiresAuth: true }
    },
    {
        name: 'vendorFlight',
        path: '/user/flight-vue',
        component: vendorFlight,
        meta: { requiresAuth: true }
    },
    {
        name: 'vendorFlightCreate',
        path: '/user/flight-create-vue/:id?',
        component: vendorFlightCreate,
        meta: { requiresAuth: true }
    },
    {
        name: 'vendorSpace',
        path: '/user/space-vue',
        component: vendorSpace,
        meta: { requiresAuth: true }
    },
    {
        name: 'vendorSpaceCreate',
        path: '/user/space-create-vue/:id?',
        component: vendorSpaceCreate,
        meta: { requiresAuth: true }
    },
    {
        name: 'vendorSpaceAvailability',
        path: '/user/space-availability-vue',
        component: vendorSpaceAvailability,
        meta: { requiresAuth: true }
    },
    {
        name: 'vendorTour',
        path: '/user/tours-vue',
        component: vendorTour,
        meta: { requiresAuth: true }
    },
    {
        name: 'vendorTourCreate',
        path: '/user/tour-create-vue/:id?',
        component: vendorTourCreate,
        meta: { requiresAuth: true }
    },
    {
        name: 'vendorTourAvailability',
        path: '/user/tour-availability-vue',
        component: vendorTourAvailability,
        meta: { requiresAuth: true }
    },
    {
        name: 'vendorBookingReport',
        path: '/user/booking-report-vue',
        component: vendorBookingReport,
        meta: { requiresAuth: true }
    },
    {
        name: 'vendorChangePassword',
        path: '/user/change-password-vue',
        component: vendorChangePassword,
        meta: { requiresAuth: true }
    },
    {
        name: 'vendorCoupons',
        path: '/user/copouns-vue',
        component: vendorCoupons,
        meta: { requiresAuth: true }
    },
    {
        name: 'vendorCouponCreate',
        path: '/user/copouns-create-vue/:id?',
        component: vendorCouponCreate,
        meta: { requiresAuth: true }
    },
    {
        name: 'vendorVerification',
        path: '/user/verification-vue',
        component: vendorVerification,
        meta: { requiresAuth: true }
    },
    {
        name: 'vendorVerificationUpdate',
        path: '/user/verification-vue/update',
        component: vendorVerificationUpdate,
        meta: { requiresAuth: true }
    },
    {
        name: 'vendorPayouts',
        path: '/user/payouts-vue',
        component: vendorPayouts,
        meta: { requiresAuth: true }
    },
    {
        name: 'vendorPlans',
        path: '/user/my-plans-vue',
        component: vendorPlans,
        meta: { requiresAuth: true }
    },
    {
        name: 'vendorEnquiryReport',
        path: '/user/enquiry-report-vue',
        component: vendorEnquiryReport,
        meta: { requiresAuth: true }
    },
    {
        name: 'vendorNews',
        path: '/user/news-vue',
        component: vendorNews,
        meta: { requiresAuth: true }
    },
    {
        name: 'vendorNewsCreate',
        path: '/user/news-create-vue/:id?',
        component: vendorNewsCreate,
        meta: { requiresAuth: true }
    },
    {
        name: 'hotels',
        path: '/hotels',
        component: hotels,
    },
    {
        name : 'hotelDetail',
        path : '/hotels/:hotel?',
        component : hotelDetail
    },
    {
        name: 'tours',
        path: '/tours',
        component: tours
    },
    {
        name : 'tourDetail',
        path : '/tours/:tour?',
        component : tourDetail
    },
    {
        name: 'spaces',
        path: '/spaces',
        component: spaces
    },
    {
        name : 'spaceDetail',
        path : '/spaces/:space?',
        component : spaceDetail
    },
    {
        name: 'cars',
        path: '/cars',
        component: cars
    },
    {
        name : 'carDetail',
        path : '/cars/:car?',
        component : carDetail
    },
    {
        name: 'events',
        path: '/events',
        component: events
    },
    {
        name : 'eventDetail',
        path : '/events/:event?',
        component : eventDetail
    },
    {
        name: 'flights',
        path: '/flights',
        component: flights
    },
    {
        name: 'boats',
        path: '/boats',
        component: boats
    },
    {
        name : 'boatDetail',
        path : '/boats/:boat?',
        component : boatDetail
    },
    {
        name : 'checkout',
        path : '/checkout/:code?',
        component : checkout
    },
    {
        name: 'checkoutSuccess',
        path : '/bookings/:code?',
        component : checkoutSuccess
    }
];

const router = new VueRouter({
    mode: 'history',
    scrollBehavior: (to, from, savedPosition) => ({ y: 0 }), 
    routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!localStorage.getItem('token')) {
            next({ name: 'vendorLogin' }); // Redirect to the login page if not authenticated
        } else {
            next(); // Proceed to the route if authenticated
        }
    } else {
        next(); // Proceed to the route if it doesn't require authentication
    }
});

export default router;
