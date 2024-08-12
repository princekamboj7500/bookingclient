<template>
    <div class="bravo_wrap">
        <topbar></topbar>
        <breadcrumb :type="type" :breadcrumb-data="breadcrumbData" />
        <div v-if="isLoading" id="loader"></div>
        <div v-else class="bravo-booking-page padding-content">
            <div class="container">
                <div id="bravo-checkout-page">
                    <div class="row" v-if="booking">
                        <div class="col-md-8">
                            <h3 class="form-title">Booking Submission</h3>
                            <div class="booking-form">
                                <div id="form-checkout" class="form-checkout"><input type="hidden" name="code"
                                        value="04486656f2f916ab4d4418908b0be520">
                                    <div class="form-section">
                                        <div v-if="user" class="row">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label>
                                                        First Name <span class="required">*</span>
                                                    </label>
                                                    <input type="text" placeholder="First Name"
                                                        v-model="user.first_name" class="form-control" required>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group"><label>Last Name <span
                                                            class="required">*</span></label>
                                                    <input type="text" placeholder="Last Name" v-model="user.last_name"
                                                        class="form-control" required>
                                                </div>
                                            </div>
                                            <div class="col-md-6 field-email">
                                                <div class="form-group"><label>Email <span
                                                            class="required">*</span></label>
                                                    <input type="email" placeholder="email@domain.com"
                                                        v-model="user.email" class="form-control" required>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group"><label>Phone <span
                                                            class="required">*</span></label>
                                                    <input type="text" placeholder="Your Phone" v-model="user.phone"
                                                        class="form-control" required>
                                                </div>
                                            </div>
                                            <div class="col-md-6 field-address-line-1">
                                                <div class="form-group"><label>Address line 1 </label> <input
                                                        type="text" placeholder="Address line 1" v-model="user.address"
                                                        name="address_line_1" class="form-control"></div>
                                            </div>
                                            <div class="col-md-6 field-address-line-2">
                                                <div class="form-group"><label>Address line 2 </label> <input
                                                        type="text" placeholder="Address line 2" v-model="user.address2"
                                                        name="address_line_2" class="form-control"></div>
                                            </div>
                                            <div class="col-md-6 field-city">
                                                <div class="form-group"><label>City </label> <input type="text"
                                                        v-model="user.city" name="city" placeholder="Your City"
                                                        class="form-control"></div>
                                            </div>
                                            <div class="col-md-6 field-state">
                                                <div class="form-group"><label>State/Province/Region </label> <input
                                                        type="text" v-model="user.state" name="state"
                                                        placeholder="State/Province/Region" class="form-control"></div>
                                            </div>
                                            <div class="col-md-6 field-zip-code">
                                                <div class="form-group"><label>ZIP code/Postal code </label> <input
                                                        type="text" v-model="user.zip_code" name="zip_code"
                                                        placeholder="ZIP code/Postal code" class="form-control"></div>
                                            </div>
                                            <div class="col-md-6 field-country">
                                                <div class="form-group"><label>Country
                                                        <span class="required">*</span></label>
                                                    <select v-model="country" class="form-control">
                                                        <option value="">-- Select --</option>
                                                        <option v-for="country in countries" :key="country.code"
                                                            :value="country.code">
                                                            {{ country.name }}
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-md-12"><label>Special Requirements </label> <textarea
                                                    v-model="customer_notes" name="customer_notes" cols="30" rows="6"
                                                    placeholder="Special Requirements" class="form-control"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-section">
                                        <h4 class="form-section-title">Select Payment Method</h4>
                                        <div id="accordionExample" class="gateways-table accordion">
                                            <div class="card">
                                                <div v-if="gateways" class="card-header">
                                                    <h4 class="mb-0">
                                                        <label data-toggle="collapse"
                                                            data-target="#gateway_offline_payment">
                                                            <input type="radio" v-model="payment_gateway"
                                                                :value="gateways.offline_payment.name">
                                                            {{ gateways.offline_payment.name }}
                                                        </label>
                                                    </h4>
                                                </div>
                                                <div id="gateway_offline_payment" aria-labelledby="headingOne"
                                                    data-parent="#accordionExample" class="collapse">
                                                    <div class="card-body">
                                                        <div class="gateway_name">
                                                            Offline Payment
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="term-conditions-checkbox">
                                            <input type="checkbox" v-model="term_conditions"> I have read and accept the
                                            <a target="_blank" :href="terms_url">terms and conditions</a>
                                        </label>
                                    </div>
                                    <div class="html_before_actions"></div>
                                    <p v-if="Object.keys(errors).length > 0" class="alert-text mt10 danger"
                                        v-html="formatErrors"></p>
                                    <p v-if="message" class="alert-text mt10 danger">{{ message }}</p>
                                    <div class="form-actions">
                                        <button @click="doCheckout" class="btn btn-danger">Submit
                                            <i class="fa fa-spin fa-spinner" v-if="submitbuttonLoading"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
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
                                                <div v-if="service.vendor" class="mt-2"><i
                                                        class="icofont-info-circle"></i>
                                                    Vendor: <a :href="`/profile/${service.vendor.id}`"
                                                        target="_blank">{{ service.vendor.name }}</a>
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

                                                <li v-if="booking.object_model == 'flight'"
                                                    v-for="item in flight_seats">
                                                    <div class="label">{{ item.seat_type.name }}: {{ item.number }} *
                                                        ${{ item.price }}</div>
                                                    <div class="val">
                                                        ${{ (item.number * item.price) }}
                                                    </div>
                                                </li>

                                                <li class="d-flex flex-column border-0 mb-0">
                                                    <div class="section-coupon-form">
                                                        <div class="input-group group-form mb-3"><input type="text"
                                                                v-model="coupon_code" placeholder="Coupon code"
                                                                class="form-control">
                                                            <div class="input-group-append">
                                                                <button @click="applyCoupan" type="button"
                                                                    class="btn btn-primary bravo_apply_coupon">
                                                                    Apply
                                                                    <i class="fa fa-spinner fa-spin"
                                                                        v-if="buttonLoading"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <ul class="p-0 mb-3 list-coupons"></ul>
                                                        <div v-if="showError" class="message alert-text mt-2">
                                                            <div class="alert alert-danger">{{ errorMsg }}</div>
                                                        </div>
                                                        <div v-if="showSuccess" class="message alert-text mt-2">
                                                            <div class="alert alert-success">{{ successMsg }}</div>
                                                        </div>
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
                                                            <div class="val">{{ booking.paid }}</div>
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


        <div id="detailBookingDatee734c933646df111a3b6517b811c12f9" tabindex="-1" role="dialog"
            aria-labelledby="modelTitleId" class="modal fade" style="padding-right: 17px;" aria-modal="true">
            <div role="document" class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title text-center">Detail</h5> <button type="button" data-dismiss="modal"
                            aria-label="Close" class="close"><span aria-hidden="true">×</span></button>
                    </div>
                    <div v-if="booking" class="modal-body">
                        <ul class="review-list list-unstyled">
                            <li v-if="booking.object_model != 'hotel'" class="mb-3 pb-1 border-bottom">
                                <h6 class="label text-center font-weight-bold mb-1"></h6>
                                <div>
                                    <div class="table-responsive">
                                        <table class="table table-striped table-inverse mb-1">
                                            <tbody>
                                                <tr v-if="booking">
                                                    <td>{{ formatDate(booking.start_date) }} <i
                                                            class="fa fa-long-arrow-right"></i> {{
                                                                formatDate(booking.end_date) }}
                                                    </td>
                                                    <td class="text-right">${{ base_price }} * {{ booking.duration_days
                                                        }}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between font-weight-bold px-2"><span>Total:</span>
                                    <span v-if="booking">${{ booking.total_before_extra_price }}</span>
                                </div>
                            </li>

                            <li v-if="booking.object_model == 'hotel'" v-for="item in rooms"
                                class="mb-3 pb-1 border-bottom">
                                <h6 class="label text-center font-weight-bold mb-1">{{ item.room.title }} * {{
                                    item.number }}</h6>
                                <div>
                                    <div class="table-responsive">
                                        <table class="table table-striped table-inverse mb-1">
                                            <tbody>
                                                <tr>
                                                    <td>{{ formatDate(booking.start_date) }} <i
                                                            class="fa fa-long-arrow-right"></i> {{
                                                                formatDate(booking.end_date) }}
                                                    </td>
                                                    <td class="text-right">${{ item.room.price }}*{{ item.number }}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between font-weight-bold px-2"><span>Total:</span>
                                    <span>${{ (item.price * item.number) }}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { apply } from 'core-js/fn/reflect';
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
    computed: {
        formatErrors() {
            let messages = [];
            for (let key in this.errors) {
                messages.push(this.errors[key].join("<br>"));
            }
            return messages.join("<br>");
        },
    },
    mounted() {
        this.isLoading = true;
        this.bookingCode = this.$route.params.code;
        console.log("Booking Code:", this.bookingCode);
        axios.get(`/api/booking/checkout/${this.bookingCode}`).then(({ data }) => {
            console.log("api checkout data", data);
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
            this.isLoading = false;
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
        applyCoupan() {
            this.buttonLoading = true;
            var data = {
                coupon_code: this.coupon_code
            }
            axios.post(`/api/booking/apply-coupon/${this.bookingCode}`, data).then(response => {
                console.log("apply-coupon", response.data.status);
                if (response.data.error) {
                    this.showError = true;
                    this.showSuccess = false;
                    this.errorMsg = response.data.error;
                    this.buttonLoading = false;
                }
                if (response.data.status == 0) {
                    this.showError = true;
                    this.showSuccess = false;
                    this.errorMsg = response.data.message;
                    this.buttonLoading = false;
                }
                if (response.data.status == 1) {
                    this.showError = false;
                    this.showSuccess = true;
                    this.successMsg = response.data.message;
                    this.buttonLoading = false;
                }

            }).catch(({ error }) => {
                console.log("apply-coupon error", error);
            })
        },
        removeCoupan() {
            this.buttonLoading = true;
            var data = {
                coupon_code: this.coupon_code
            }
            axios.post(`/api/booking/remove-coupon/${this.bookingCode}`, data).then(response => {
                console.log("apply-coupon", response);
                if (response.data.error) {
                    this.showError = true;
                    this.errorMsg = response.data.error;
                    this.buttonLoading = false;
                }
            }).catch(({ error }) => {
                console.log("apply-coupon error", error);
            })
        },
        formatOnlyTime(dateTimeStr) {
            const timeString = dateTimeStr.split('T')[1].split('.')[0];
            return timeString;
        },
        doCheckout() {
            this.submitbuttonLoading = true;
            if (this.payment_gateway == "Offline Payment") {
                this.payment_gateway = "offline_payment";
            }
            var formData = {
                code: this.bookingCode,
                first_name: this.user.first_name,
                last_name: this.user.last_name,
                email: this.user.email,
                phone: this.user.phone,
                address_line_1: this.user.address ? this.user.address : '',
                address_line_2: this.user.address2 ? this.user.address2 : '',
                city: this.user.city ? this.user.city : '',
                state: this.user.state ? this.user.state : '',
                zip_code: this.zip_code ? this.user.zip_code : '',
                country: this.country,
                customer_notes: this.customer_notes ? this.customer_notes : '',
                coupon_code: this.coupon_code,
                credit: this.credit,
                payment_gateway: this.payment_gateway,
                term_conditions: this.term_conditions ? 'on' : null,
            }

            console.log("payment_gateway", this.payment_gateway, "term_conditions", this.term_conditions);

            axios.post(`/api/booking/doCheckout`, formData).then(response => {
                console.log("doCheckout response", response);
                this.submitbuttonLoading = false;
                if (response.data.status == 0 && response.data.errors) {
                    this.errors = response.data.errors;
                    this.message = '';
                }
                if (response.data.status == 0 && response.data.message) {
                    this.message = response.data.message
                }
                if (response.data.url && response.status == 200) {
                    this.$router.push({ name: 'checkoutSuccess', params: { code: this.bookingCode } });
                }
            }).catch(({ error }) => {
                this.submitbuttonLoading = false;
                console.log("doCheckout error", error);
            })
        }
    }
}
</script>

<style scoped>


</style>