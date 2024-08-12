<template>
    <div class="bravo_wrap">
        <topbar></topbar>
        <breadcrumb :type="type" :breadcrumb-data="breadcrumbData" />
        <div v-if="isLoading" id="loader"></div>
        <div v-else class="bravo-booking-page padding-content">
            <div class="container">
                <div class="row booking-success-notice">
                    <div class="col-lg-8 col-md-8">
                        <div class="d-flex align-items-center">
                            <img src="../../../../../assets/images/ico_success.svg" alt="Payment Success">
                            <div v-if="booking" class="notice-success">
                                <p class="line1"><span>{{ booking.first_name }},</span>
                                    your booking was submitted successfully!
                                </p>
                                <p class="line2">Booking details has been sent to:
                                    <span>{{ booking.email }}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-4">
                        <ul v-if="booking" class="booking-info-detail">
                            <li><span>Booking Number:</span> {{ booking.id }}</li>
                            <li><span>Booking Date:</span> {{ formatDate(booking.created_at) }}</li>
                            <li><span>Payment Method:</span> {{ gateway ? gateway.name : '' }}</li>
                            <li style="text-transform: capitalize;"><span>Booking Status:</span> {{ booking.status }}
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="row booking-success-detail">
                    <div class="col-md-8">
                        <div class="booking-review">
                            <h4 class="booking-review-title">Your Information</h4>
                            <div class="booking-review-content">
                                <div class="review-section">
                                    <div v-if="booking" class="info-form">
                                        <ul>
                                            <li class="info-first-name">
                                                <div class="label">First name</div>
                                                <div class="val">{{ booking.first_name }}</div>
                                            </li>
                                            <li class="info-last-name">
                                                <div class="label">Last name</div>
                                                <div class="val">{{ booking.last_name }}</div>
                                            </li>
                                            <li class="info-email">
                                                <div class="label">Email</div>
                                                <div class="val">{{ booking.email }}</div>
                                            </li>
                                            <li class="info-phone">
                                                <div class="label">Phone</div>
                                                <div class="val">{{ booking.phone }}</div>
                                            </li>
                                            <li class="info-address">
                                                <div class="label">Address line 1</div>
                                                <div class="val">{{ booking.address }}</div>
                                            </li>
                                            <li class="info-address2">
                                                <div class="label">Address line 2</div>
                                                <div class="val">{{ booking.address2 }}</div>
                                            </li>
                                            <li class="info-city">
                                                <div class="label">City</div>
                                                <div class="val">{{ booking.city }}</div>
                                            </li>
                                            <li class="info-state">
                                                <div class="label">State/Province/Region</div>
                                                <div class="val">{{ booking.state }}</div>
                                            </li>
                                            <li class="info-zip-code">
                                                <div class="label">ZIP code/Postal code</div>
                                                <div class="val">{{ booking.zip_code }}</div>
                                            </li>
                                            <li class="info-country">
                                                <div class="label">Country</div>
                                                <div class="val">{{ booking.country }}</div>
                                            </li>
                                            <li class="info-notes">
                                                <div class="label">Special Requirements</div>
                                                <div class="val">{{ booking.customer_notes }}</div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="text-center">
                            <a href="/user/booking-history" class="btn btn-primary">Booking
                                History</a>
                        </div>
                    </div>
                    <div v-if="booking" class="col-md-4">
                        <div class="booking-detail booking-form">
                            <div class="booking-review">
                                <h4 class="booking-review-title">Your Booking</h4>
                                <div class="booking-review-content">
                                    <!-- review-section -->
                                    <div class="review-section">
                                        <div v-if="service" class="service-info">
                                            <div>
                                                <h3 class="service-name">
                                                    <a :href="`/${booking.object_model}/${service.slug}`">{{
                                                        service.title }}</a>
                                                </h3>
                                                <p v-if="booking.object_model != 'flight'" class="address"><i
                                                        class="fa fa-map-marker"></i>
                                                    {{ service.address }}
                                                </p>
                                            </div>
                                            <div>
                                                <img :src="image_url" alt="New York – Discover America">
                                            </div>
                                            <div v-if="service.vendor" class="mt-2"><i class="icofont-info-circle"></i>
                                                Vendor: <a :href="`/profile/${service.vendor.id}`" target="_blank">{{
                                                    service.vendor.name }}</a>
                                            </div>
                                            <div v-if="booking.object_model == 'flight'" class="mt-2">
                                                <h3 class="service-name">{{ service.airline.name }}</h3>
                                            </div>
                                            <div v-if="booking.object_model == 'flight'"
                                                class="font-weight-medium  mb-3 mt-2">
                                                <p class="mb-1">
                                                    {{ service.airport_from.name }} to {{ service.airport_to.name }}
                                                </p>
                                                {{ service.duration }} hrs
                                            </div>
                                            <div v-if="booking.object_model == 'flight'"
                                                class="flex-self-start justify-content-between mt-2">
                                                <div class="flex-self-start">
                                                    <div class="mr-2"><i
                                                            class="icofont-airplane font-size-30 text-primary"></i>
                                                    </div>
                                                    <div class="text-lh-sm ml-1">
                                                        <h6 class="font-weight-bold font-size-21 text-gray-5 mb-0">
                                                            {{ formatOnlyTime(service.departure_time) }}</h6> <span
                                                            class="font-size-14 font-weight-normal text-gray-1">{{
                                                                service.airport_from.name }}</span>
                                                    </div>
                                                </div>

                                                <div class="flex-self-start">
                                                    <div class="mr-2"><i
                                                            class="d-block rotate-90 icofont-airplane-alt font-size-30 text-primary"></i>
                                                    </div>
                                                    <div class="text-lh-sm ml-1">
                                                        <h6 class="font-weight-bold font-size-21 text-gray-5 mb-0">
                                                            {{ formatOnlyTime(service.arrival_time) }}</h6> <span
                                                            class="font-size-14 font-weight-normal text-gray-1">{{
                                                                service.airport_to.name }}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="review-section" v-if="booking && booking.object_model == 'event'">
                                        <ul class="review-list">
                                            <li>
                                                <div class="label">Start date:</div>
                                                <div class="val">
                                                    {{ formatDate(booking.start_date) }}
                                                </div>
                                            </li>
                                            <li v-if="type == 'ticket'">
                                                <div class="label">Duration:</div>
                                                <div class="val">
                                                    {{ booking.service.duration }}H
                                                </div>
                                            </li>

                                            <li v-if="type == 'time_slot'">
                                                <div class="label">Duration:</div>
                                                <div class="val">
                                                    {{ duration }}
                                                    {{ duration_unit }}
                                                </div>
                                            </li>
                                            <li class="flex-wrap">
                                                <div class="label w-100 mb-2">Start Time:</div>
                                                <div class="val w-100">
                                                    <div v-if="time_slots.length > 0"
                                                        class="slots-wrapper d-flex justify-content-start flex-wrap">
                                                        <div v-for="item in time_slots"
                                                            class="btn btn-sm mr-2 mb-2 btn-success">
                                                            {{ formatTime(item.start_time) }}
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>

                                            <li v-for="item in ticket_types">
                                                <div class="label">{{ item.name }}:</div>
                                                <div class="val">
                                                    {{ item.number }}
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="review-section"
                                        v-if="booking && booking.object_model == 'car' || booking.object_model == 'boat' || booking.object_model == 'space'">
                                        <ul v-if="booking" class="review-list">
                                            <li>
                                                <div class="label">Start date:</div>
                                                <div v-if="booking.object_model == 'car' || booking.object_model == 'space'"
                                                    class="val">
                                                    {{ formatDate(booking.start_date) }}
                                                </div>
                                                <div v-if="booking.object_model == 'boat'" class="val">
                                                    {{ booking.start_date }}
                                                </div>
                                            </li>
                                            <li>
                                                <div class="label">End date:</div>
                                                <div v-if="booking.object_model == 'car' || booking.object_model == 'space'"
                                                    class="val">
                                                    {{ formatDate(booking.end_date) }}
                                                </div>
                                                <div v-if="booking.object_model == 'boat'" class="val">
                                                    {{ booking.end_date }}
                                                </div>
                                            </li>
                                            <li v-if="booking.object_model == 'car'">
                                                <div class="label">Days:</div>
                                                <div class="val">
                                                    {{ booking.duration_days }}
                                                </div>
                                            </li>
                                            <li v-if="booking.object_model == 'space' && type == 'by_day'">
                                                <div class="label">Days:</div>
                                                <div class="val">
                                                    {{ booking.duration_days }}
                                                </div>
                                            </li>
                                            <li v-if="booking.object_model == 'space' && type == 'by_night'">
                                                <div class="label">Nights:</div>
                                                <div class="val">
                                                    {{ booking.duration_nights }}
                                                </div>
                                            </li>
                                            <li v-if="booking.object_model == 'space' && booking.adults">
                                                <div class="label">Adults:</div>
                                                <div class="val">
                                                    {{ booking.adults }}
                                                </div>
                                            </li>
                                            <li v-if="booking.object_model == 'space' && booking.adults">
                                                <div class="label">Children:</div>
                                                <div class="val">
                                                    {{ booking.children }}
                                                </div>
                                            </li>
                                            <li v-if="booking.object_model == 'boat'">
                                                <div class="label">Durations:</div>
                                                <div class="val" v-if="booking.type_date == 'per_hour'">
                                                    {{ booking.duration_hours }}
                                                </div>
                                                <div class="val" v-else>
                                                    {{ booking.duration_nights }}
                                                </div>
                                            </li>
                                            <li v-if="booking.object_model == 'car'">
                                                <div class="label">Number:</div>
                                                <div class="val">
                                                    {{ booking.number }}
                                                </div>
                                            </li>
                                            <li class="flex-wrap">
                                                <div class="flex-grow-0 flex-shrink-0 w-100">
                                                    <p class="text-center"><a data-toggle="modal"
                                                            data-target="#detailBookingDatee734c933646df111a3b6517b811c12f9"
                                                            aria-expanded="false"
                                                            aria-controls="detailBookingDatee734c933646df111a3b6517b811c12f9">
                                                            Detail <i style="cursor: pointer;"
                                                                class="icofont-list"></i></a></p>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="review-section" v-if="booking && booking.object_model == 'tour'">
                                        <ul class="review-list">
                                            <li>
                                                <div class="label">Start date:</div>
                                                <div class="val">
                                                    {{ formatDate(booking.start_date) }}
                                                </div>
                                            </li>
                                            <li v-if="type == 'ticket'">
                                                <div class="label">Duration:</div>
                                                <div class="val">
                                                    {{ booking.service.duration }}H
                                                </div>
                                            </li>

                                            <li v-for="item in booking.person_types">
                                                <div class="label">{{ item.name }}:</div>
                                                <div class="val">
                                                    {{ item.number }}
                                                </div>
                                            </li>
                                        </ul>
                                    </div>

                                    <div v-if="booking.object_model == 'hotel'" class="review-section">
                                        <ul class="review-list">
                                            <li>
                                                <div class="label">Check in:</div>
                                                <div class="val">
                                                    {{ formatDate(booking.start_date) }}
                                                </div>
                                            </li>
                                            <li>
                                                <div class="label">Check out:</div>
                                                <div class="val">
                                                    {{ formatDate(booking.end_date) }}
                                                </div>
                                            </li>
                                            <li>
                                                <div class="label">Nights:</div>
                                                <div class="val">
                                                    {{ booking.duration_nights }}
                                                </div>
                                            </li>
                                            <li>
                                                <div class="label">Adults:</div>
                                                <div class="val">
                                                    {{ booking.adults }}
                                                </div>
                                            </li>
                                            <li>
                                                <div class="label">Children:</div>
                                                <div class="val">
                                                    {{ booking.children }}
                                                </div>
                                            </li>
                                            <li class="flex-wrap">
                                                <div class="flex-grow-0 flex-shrink-0 w-100">
                                                    <p class="text-center"><a data-toggle="modal"
                                                            data-target="#detailBookingDatee734c933646df111a3b6517b811c12f9"
                                                            aria-expanded="false"
                                                            aria-controls="detailBookingDatee734c933646df111a3b6517b811c12f9">
                                                            Detail <i style="cursor: pointer;"
                                                                class="icofont-list"></i></a></p>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>

                                    <div v-if="booking.object_model == 'flight'" class="review-section">
                                        <ul class="review-list">
                                            <li>
                                                <div class="label">Start Date</div>
                                                <div class="val">
                                                    {{ formatDate(booking.start_date) }}
                                                </div>
                                            </li>
                                            <li>
                                                <div class="label">Duration</div>
                                                <div class="val">{{ booking.duration_hours }} hours</div>
                                            </li>
                                            <li v-for="item in flight_seats">
                                                <div class="label">{{ item.seat_type.name }}:</div>
                                                <div class="val">
                                                    {{ item.number }}
                                                </div>
                                            </li>
                                        </ul>
                                    </div>

                                    <div v-if="booking" class="review-section total-review">
                                        <ul class="review-list">
                                            <li
                                                v-if="type == '' && booking.object_model == 'car' || booking.object_model == 'boat' || booking.object_model == 'space'">
                                                <div class="label">Rental price
                                                </div>
                                                <div class="val">
                                                    ${{ booking.total_before_extra_price }}
                                                </div>
                                            </li>
                                            <li v-if="type == 'time_slot'">
                                                <div class="label">{{ booking.total_guests }} x {{ base_price }}
                                                </div>
                                                <div class="val">
                                                    {{ (base_price * booking.total_guests) }}
                                                </div>
                                            </li>

                                            <li v-if="type == 'ticket'" v-for="item in ticket_types">
                                                <div class="label">{{ item.name }}: {{ item.number }} * ${{
                                                    item.price }}</div>
                                                <div class="val">
                                                    ${{ item.number * item.price }}
                                                </div>
                                            </li>
                                            <li v-if="booking.object_model == 'tour'"
                                                v-for="item in booking.person_types">
                                                <div class="label">{{ item.name }}: {{ item.number }} * ${{
                                                    item.price }}</div>
                                                <div class="val">
                                                    ${{ (item.number * item.price) }}
                                                </div>
                                            </li>

                                            <li v-if="rooms.length > 0 && booking.object_model == 'hotel'"
                                                v-for="item in rooms" class="flex-wrap">
                                                <div class="label">{{ item.room.title }} * {{ item.number }}</div>
                                                <div class="val">
                                                    ${{ item.price }}
                                                </div>
                                            </li>

                                            <div v-if="extra_price && extra_price.length > 0">
                                                <li>
                                                    <div class="label-title"><strong>Extra Prices:</strong></div>
                                                </li>
                                                <li class="no-flex" v-for="item in extra_price">
                                                    <ul>
                                                        <li>
                                                            <div class="label">{{ item.name }}:</div>
                                                            <div class="val">${{ item.price }}</div>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </div>
                                            <li v-for="item in buyer_fees">
                                                <div class="label">
                                                    {{ item.name }}
                                                    <i data-toggle="tooltip" data-placement="top" title=""
                                                        class="icofont-info-circle"
                                                        data-original-title="This helps us run our platform and offer services like 24/7 support on your trip."></i>
                                                </div>
                                                <div class="val">
                                                    ${{ item.price }}
                                                </div>
                                            </li>

                                            <li v-if="booking.object_model == 'flight'" v-for="item in flight_seats">
                                                <div class="label">{{ item.seat_type.name }}: {{ item.number }} *
                                                    ${{ item.price }}</div>
                                                <div class="val">
                                                    ${{ (item.number * item.price) }}
                                                </div>
                                            </li>

                                            <li v-if="booking" class="final-total d-block">
                                                <div class="d-flex justify-content-between">
                                                    <div class="label">Total:</div>
                                                    <div class="val">${{ booking.total }}</div>
                                                </div>

                                                <div v-if="booking.status != 'draft'">
                                                    <div class="d-flex justify-content-between">
                                                        <div class="label">Paid:</div>
                                                        <div class="val">${{ booking.paid ? booking.paid : 0 }}</div>
                                                    </div>
                                                    <div v-if="booking.paid < booking.total"
                                                        class="d-flex justify-content-between">
                                                        <div class="label">Remain:</div>
                                                        <div class="val">
                                                            {{ booking.total - booking.paid }}
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <hr>
                                            <div v-if="booking.status == 'draft'" class="form-group-item">
                                                <h5 class="form-section-title">Credit want to pay?</h5>
                                                <div class="input-group mb-3">
                                                    <div class="input-group-prepend">
                                                        <span class="input-group-text">Credit {{ balance }}</span>
                                                    </div>
                                                    <input type="number" v-model="credit"
                                                        class="form-control deposit_amount">
                                                    <div class="input-group-append"><span
                                                            class="input-group-text convert_deposit_amount">$0</span>
                                                    </div>
                                                </div>
                                                <div v-if="booking" class="d-flex justify-content-between">
                                                    <h5 class="form-section-title">Pay now:</h5>
                                                    <div class="val convert_pay_now">${{ booking.deposit == null ?
                                                        booking.total : booking.deposit }}</div>
                                                </div>
                                            </div>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import breadcrumb from './breadcrumb';
import topbar from './topbar.vue';
export default {
    components: {
        breadcrumb,
        topbar
    },
    data() {
        return {
            type: "checkout",
            isLoading: false,
            bookingCode: null,
            gateway: null,
            country: null,
            customer_notes: null,
            term_conditions: false,
            booking: null,
            gateways: null,
            payment_gateway: '',
            service: null,
            user: null,
            countries: [],
            buyer_fees: null,
            ticket_types: [],
            base_price: null,
            time_slots: [],
            balance: 0,
            credit: 0,
            terms_url: '',
            coupon_code: "",
            errorMsg: "",
            showError: false,
            buttonLoading: false,
            showSuccess: false,
            successMsg: "",
            submitbuttonLoading: false,
            errors: {},
            rooms: [],
            flight_seats: [],
            image_url: '',
            message: '',
            breadcrumbData: [],
        }
    },
    mounted() {
        this.isLoading = true;
        this.bookingCode = this.$route.params.code;
        console.log("Booking Code in checkout success:", this.bookingCode);
        axios.get(`/api/booking/bookings/${this.bookingCode}`).then(({ data }) => {
            console.log("api booking detail data", data);
            this.booking = data.data.booking;
            this.gateway = data.data.gateway;
            if (data.error) {
                alert(data.error)
                window.location.href = "/";
            }
            this.booking = data.data.booking;
            this.gateways = data.data.gateways;
            this.service = data.data.service;
            this.user = data.data.user;
            this.country = data.data.user.country;
            this.countries = data.data.countries;
            this.buyer_fees = data.data.booking.buyer_fees ? JSON.parse(data.data.booking.buyer_fees) : [];
            this.ticket_types = data.data.ticket_types;
            this.type = data.data.type;
            this.extra_price = data.data.extra_price;
            this.base_price = data.data.base_price;
            this.time_slots = data.data.time_slots;
            this.balance = data.data.balance;
            this.terms_url = data.data.terms_url;
            this.rooms = data.data.rooms;
            this.flight_seats = data.data.flight_seat;
            this.image_url = data.data.image_url;
            this.isLoading = false;
        }).catch(error => {
            console.error("Can not get checkout:", error);
        });
    },
    methods: {
        formatDate(datetime) {
            const date = new Date(datetime);
            const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
            const day = date.getDate().toString().padStart(2, '0');
            const year = date.getFullYear();
            return `${month}/${day}/${year}`;
        },
        formatTime(startTime) {
            const date = new Date(startTime);
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            return `${hours}:${minutes}`;
        },
        formatOnlyTime(dateTimeStr) {
            const timeString = dateTimeStr.split('T')[1].split('.')[0];
            return timeString;
        },
    }
}
</script>

<style scoped>
.row.booking-success-notice img {
    height: auto;
    width: auto;
}
</style>