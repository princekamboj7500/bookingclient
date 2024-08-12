<template>
    <div class="bravo_wrap">
        <!-- @include('Layout::parts.topbar')
        @include('Layout::parts.header') -->
        <div class="bravo_user_profile">
            <div class="container-fluid">
                <div class="row row-eq-height">
                    <div class="col-md-3">
                        <sidebar />
                    </div>
                    <div class="col-md-9">
                        <div class="user-form-settings">
                            <userbc :breadcrumbs="breadcrumbs" />
                            <!-- @yield('content') -->
                            <h2 class="title-bar">
                                Booking Report
                            </h2>
                            <div v-if="isLoading" id="loader"></div>
                            <div v-else class="booking-history-manager">
                                <div class="tabbable">
                                    <ul class="nav nav-tabs ht-nav-tabs">
                                        <li v-for="(tab, index) in tabs" :key="index"
                                            :class="{ active: currentTab === tab.status }"
                                            @click="selectTab(tab.status)">
                                            <a href="#">{{ tab.name }}</a>
                                        </li>
                                    </ul>
                                </div>
                                <!-- Modal code-->

                                <div class="modal" tabindex="-1" id="modal_booking_detail" aria-hidden="true">
                                    <div class="modal-dialog modal-lg">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title">Booking ID: # <span class="user_id"></span></h5>
                                                <button type="button" class="close" data-dismiss="modal"
                                                    aria-label="Close">
                                                    <span aria-hidden="true">×</span>
                                                </button>
                                            </div>
                                            <div class="modal-body">
                                                <ul class="nav nav-tabs">
                                                    <li class="nav-item">
                                                        <a class="nav-link active" data-toggle="tab"
                                                            href="#booking-detail-9">Booking Detail</a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a class="nav-link" data-toggle="tab"
                                                            href="#booking-customer-9">
                                                            Personal Information
                                                        </a>
                                                    </li>
                                                </ul>
                                                <div class="tab-content">
                                                    <div id="booking-detail-9" class="tab-pane active">
                                                        <div class="booking-review">
                                                            <div class="booking-review-content">
                                                                <div class="review-section">
                                                                    <div class="info-form">
                                                                        <ul>
                                                                            <li>
                                                                                <div class="label">Booking Status</div>
                                                                                <div class="val capitalize">{{
                                                                                    modalBooking.status }}</div>
                                                                            </li>
                                                                            <li>
                                                                                <div class="label">Booking Date</div>
                                                                                <div class="val">{{
                                                                                    formatDate(modalBooking.created_at)
                                                                                    }}</div>
                                                                            </li>
                                                                            <li>
                                                                                <div class="label">Payment Method</div>
                                                                                <div class="val" v-if="modalBooking">{{ payment_method
                                                                                    }}</div>
                                                                            </li>
                                                                            <li>
                                                                                <div class="label">Vendor</div>
                                                                                <div class="val">
                                                                                    <a :href="`/profile/${modalAuthor.id}`"
                                                                                        target="_blank">
                                                                                        {{ modalAuthor.first_name }} {{
                                                                                        modalAuthor.last_name }}
                                                                                    </a>
                                                                                </div>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="more-booking-review">
                                                            <div class="booking-review">
                                                                <h4 class="booking-review-title">Your Booking</h4>
                                                                <div class="booking-review-content">
                                                                    <div class="review-section">
                                                                        <div class="service-info">
                                                                            <div>
                                                                                <h3 class="service-name"><a
                                                                                        href="http://127.0.0.1:8000/space/paris-greenwich-villa">PARIS
                                                                                        GREENWICH VILLA</a></h3>
                                                                                <p class="address"><i
                                                                                        class="fa fa-map-marker"></i>
                                                                                    Porte de Vanves
                                                                                </p>
                                                                            </div>
                                                                            <div>
                                                                                <img class="img-responsive lazy"
                                                                                    data-src="http://127.0.0.1:8000/uploads/demo/space/space-8.jpg"
                                                                                    alt="PARIS GREENWICH VILLA">
                                                                            </div>
                                                                            <div class="mt-2">
                                                                                <i class="icofont-info-circle"></i>
                                                                                Vendor: <a
                                                                                    href="http://127.0.0.1:8000/profile/5"
                                                                                    target="_blank">Lynne Victoria</a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="review-section">
                                                                        <ul class="review-list">
                                                                            <li>
                                                                                <div class="label">Start date:</div>
                                                                                <div class="val">
                                                                                    {{
                                                                                    formatDate(modalBooking.start_date)
                                                                                    }}
                                                                                </div>
                                                                            </li>
                                                                            <li>
                                                                                <div class="label">End date:</div>
                                                                                <div class="val">
                                                                                    {{ formatDate(modalBooking.end_date)
                                                                                    }}
                                                                                </div>
                                                                            </li>
                                                                            <li>
                                                                                <div class="label">Duration:</div>
                                                                                <div class="val">
                                                                                    {{
                                                                                    calculateDuration(modalBooking.start_date,
                                                                                    modalBooking.end_date) }}
                                                                                </div>
                                                                            </li>
                                                                            <li v-if="modalBooking.adults > 0">
                                                                                <div class="label">Adults:</div>
                                                                                <div class="val">
                                                                                    {{ modalBooking.adults }}
                                                                                </div>
                                                                            </li>
                                                                            <li v-if="modalBooking.children > 0">
                                                                                <div class="label">Children:</div>
                                                                                <div class="val">
                                                                                    {{ modalBooking.children }}
                                                                                </div>
                                                                            </li>

                                                                            <li class="flex-wrap">
                                                                                <div
                                                                                    class="flex-grow-0 flex-shrink-0 w-100">
                                                                                    <p class="text-center">
                                                                                        <a data-toggle="modal"
                                                                                            data-target="#detailBookingDate6f3e175ad770a382b1d36efc3e9cea5c"
                                                                                            aria-expanded="false"
                                                                                            aria-controls="detailBookingDate6f3e175ad770a382b1d36efc3e9cea5c">
                                                                                            Detail <i
                                                                                                class="icofont-list"></i>
                                                                                        </a>
                                                                                    </p>
                                                                                </div>
                                                                            </li>

                                                                        </ul>
                                                                    </div>
                                                                    <div class="review-section total-review">
                                                                        <ul class="review-list">
                                                                            <li>
                                                                                <div class="label">Rental price
                                                                                </div>
                                                                                <div class="val">
                                                                                    ${{
                                                                                    modalBooking.total_before_discount
                                                                                    }}
                                                                                </div>
                                                                            </li>
                                                                            <li v-for="item in buyer_fees">
                                                                                <div class="label">
                                                                                    {{ item.name }}
                                                                                    <i class="icofont-info-circle"
                                                                                        data-toggle="tooltip"
                                                                                        data-placement="top"
                                                                                        title="One-time fee charged by host to cover the cost of cleaning their space."></i>
                                                                                </div>
                                                                                <div class="val">
                                                                                    ${{ item.price }}
                                                                                </div>
                                                                            </li>

                                                                            <li
                                                                                class="d-flex flex-column border-0 mb-0">
                                                                                <div class="section-coupon-form">
                                                                                    <ul class="p-0 mb-3 list-coupons">
                                                                                    </ul>
                                                                                    <div
                                                                                        class="message alert-text mt-2">
                                                                                    </div>
                                                                                </div>
                                                                            </li>
                                                                            <li class="final-total d-block">
                                                                                <div
                                                                                    class="d-flex justify-content-between">
                                                                                    <div class="label">Total:</div>
                                                                                    <div class="val">${{
                                                                                        modalBooking.total }}</div>
                                                                                </div>
                                                                                <div
                                                                                    class="d-flex justify-content-between">
                                                                                    <div class="label">Paid:</div>
                                                                                    <div v-if="modalBooking.paid"
                                                                                        class="val">${{
                                                                                        modalBooking.paid }}</div>
                                                                                    <div v-else class="val">$0</div>
                                                                                </div>
                                                                                <div
                                                                                    class="d-flex justify-content-between">
                                                                                    <div class="label">Remain:</div>
                                                                                    <div class="val">${{
                                                                                        modalBooking.total -
                                                                                        modalBooking.paid }}</div>
                                                                                </div>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div class="modal fade"
                                                                id="detailBookingDate6f3e175ad770a382b1d36efc3e9cea5c"
                                                                tabindex="-1" role="dialog"
                                                                aria-labelledby="modelTitleId" aria-hidden="true">
                                                                <div class="modal-dialog modal-dialog-centered"
                                                                    role="document">
                                                                    <div class="modal-content">
                                                                        <div class="modal-header">
                                                                            <h5 class="modal-title text-center">Detail
                                                                            </h5>
                                                                            <button type="button" class="close"
                                                                                data-dismiss="modal" aria-label="Close">
                                                                                <span aria-hidden="true">×</span>
                                                                            </button>
                                                                        </div>
                                                                        <div class="modal-body">
                                                                            <ul class="review-list list-unstyled">
                                                                                <li class="mb-3 pb-1 border-bottom">
                                                                                    <h6
                                                                                        class="label text-center font-weight-bold mb-1">
                                                                                    </h6>
                                                                                    <div>
                                                                                        <div class="table-responsive">
                                                                                            <table
                                                                                                class="table table-striped table-inverse mb-1">
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td>07/10/2024
                                                                                                            <i
                                                                                                                class="fa fa-long-arrow-right"></i>
                                                                                                            07/13/2024
                                                                                                        </td>
                                                                                                        <td
                                                                                                            class="text-right">
                                                                                                            $500*4</td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div
                                                                                        class="d-flex justify-content-between font-weight-bold px-2">
                                                                                        <span>Total:</span>
                                                                                        <span>$2.000</span>
                                                                                    </div>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div id="booking-customer-9" class="tab-pane fade">
                                                        <div class="booking-review">
                                                            <h4 class="booking-review-title">Your Information</h4>
                                                            <div class="booking-review-content">
                                                                <div class="review-section">
                                                                    <div class="info-form">
                                                                        <ul>
                                                                            <li class="info-first-name">
                                                                                <div class="label">First name</div>
                                                                                <div class="val">{{
                                                                                    modalBooking.first_name }}</div>
                                                                            </li>
                                                                            <li class="info-last-name">
                                                                                <div class="label">Last name</div>
                                                                                <div class="val">{{
                                                                                    modalBooking.last_name }}</div>
                                                                            </li>
                                                                            <li class="info-email">
                                                                                <div class="label">Email</div>
                                                                                <div class="val">
                                                                                    {{ modalBooking.email }}
                                                                                </div>
                                                                            </li>
                                                                            <li class="info-phone">
                                                                                <div class="label">Phone</div>
                                                                                <div class="val">{{ modalBooking.phone
                                                                                    }}</div>
                                                                            </li>
                                                                            <li class="info-address">
                                                                                <div class="label">Address line 1</div>
                                                                                <div class="val">{{ modalBooking.address
                                                                                    }}</div>
                                                                            </li>
                                                                            <li class="info-address2">
                                                                                <div class="label">Address line 2</div>
                                                                                <div class="val">{{
                                                                                    modalBooking.address2 }}</div>
                                                                            </li>
                                                                            <li class="info-city">
                                                                                <div class="label">City</div>
                                                                                <div class="val">{{ modalBooking.city }}
                                                                                </div>
                                                                            </li>
                                                                            <li class="info-state">
                                                                                <div class="label">State/Province/Region
                                                                                </div>
                                                                                <div class="val">{{ modalBooking.state }}</div>
                                                                            </li>
                                                                            <li class="info-zip-code">
                                                                                <div class="label">ZIP code/Postal code
                                                                                </div>
                                                                                <div class="val">{{ modalBooking.zip_code }}</div>
                                                                            </li>
                                                                            <li class="info-country">
                                                                                <div class="label">Country</div>
                                                                                <div class="val">{{ modalBooking.country
                                                                                    }}</div>
                                                                            </li>
                                                                            <li class="info-notes">
                                                                                <div class="label">Special Requirements
                                                                                </div>
                                                                                <div class="val">{{ modalBooking.customer_notes }}</div>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div id="booking-guests-9" class="tab-pane fade">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary"
                                                    data-dismiss="modal">Close</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="currentTab === 'all'">
                                    <!-- Content for All Booking -->
                                    <div v-if="bookingData.length > 0" class="tab-content">
                                        <div class="table-responsive">
                                            <table class="table table-bordered table-striped table-booking-history">
                                                <thead>
                                                    <tr>
                                                        <th width="2%">Type</th>
                                                        <th>Title</th>
                                                        <th class="a-hidden">Order Date</th>
                                                        <th class="a-hidden">Execution Time</th>
                                                        <th width="15%">Payment Detail</th>
                                                        <th>Commission</th>
                                                        <th class="a-hidden">Status</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="item in paginatedData" :key="item.id">
                                                        <td class="booking-history-type">
                                                            <span
                                                                v-if="paginatedData.length > 0 && item.object_model == 'space'">
                                                                <i class="icofont-building-alt"></i>
                                                                <small>{{ item.object_model }}</small>
                                                            </span>
                                                            <span
                                                                v-if="paginatedData.length > 0 && item.object_model == 'tour'">
                                                                <i class="icofont-island-alt"></i>
                                                                <small>{{ item.object_model }}</small>
                                                            </span>
                                                            <span
                                                                v-if="paginatedData.length > 0 && item.object_model == 'boat'">
                                                                <i class="icofont-ship"></i>
                                                                <small>{{ item.object_model }}</small>
                                                            </span>
                                                            <span
                                                                v-if="paginatedData.length > 0 && item.object_model == 'hotel'">
                                                                <i class="fa fa-building-o"></i>
                                                                <small>{{ item.object_model }}</small>
                                                            </span>
                                                            <span
                                                                v-if="paginatedData.length > 0 && item.object_model == 'event'">
                                                                <i class="icofont-ticket"></i>
                                                                <small>{{ item.object_model }}</small>
                                                            </span>
                                                            <span
                                                                v-if="paginatedData.length > 0 && item.object_model == 'flight'">
                                                                <i class="icofont-ui-flight"></i>
                                                                <small>{{ item.object_model }}</small>
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <a target="_blank" :href="`/${item.object_model}/${item.service.slug}`">
                                                                {{ item.service.title }}
                                                            </a>
                                                            <small>
                                                                <div>Customer Info</div>
                                                                <div>
                                                                    First Name: {{ item.first_name }}
                                                                </div>
                                                                <div>
                                                                    Last Name: {{ item.last_name }}
                                                                </div>
                                                            </small>
                                                        </td>
                                                        <td class="a-hidden">{{ formatDate(item.created_at) }}</td>
                                                        <td class="a-hidden">
                                                            Start date : {{ formatDate(item.start_date) }} <br>
                                                            End date : {{ formatDate(item.end_date) }} <br>
                                                            Duration : {{ calculateDuration(item.start_date,
                                                                item.end_date) }}
                                                        </td>
                                                        <td>
                                                            <div>Total: ${{ item.total }}</div>
                                                            <div v-if="item.paid">Paid: ${{ item.paid }}</div>
                                                            <div v-else>Paid: $0</div>
                                                            <div>Remain: ${{ item.total - item.paid }}</div>
                                                        </td>
                                                        <td>
                                                            ${{ item.commission }}
                                                        </td>
                                                        <td class="processing a-hidden capitalize">{{ item.status }}
                                                        </td>
                                                        <td width="2%">
                                                            <a @click="bookingDetail(item.id)"
                                                                class="btn btn-xs btn-primary btn-info-booking"
                                                                data-toggle="modal" data-id="9"
                                                                data-target="#modal_booking_detail">
                                                                <i class="fa fa-info-circle"></i>Details
                                                            </a>
                                                            <a :href="`/user/booking/${item.code}/invoice`"
                                                                class="btn btn-xs btn-primary btn-info-booking open-new-window mt-1"
                                                                onclick="window.open(this.href); return false;">
                                                                <i class="fa fa-print"></i>Invoice
                                                            </a>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="pagination">
                                            <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
                                            <button v-for="page in totalPages" :key="page" @click="changePage(page)"
                                                :class="{ active: currentPage === page }">
                                                {{ page }}
                                            </button>
                                            <button @click="nextPage"
                                                :disabled="currentPage === totalPages">Next</button>
                                        </div>
                                    </div>
                                    <div v-else class="tab-content">
                                        No Booking History
                                    </div>
                                </div>
                                <div v-if="currentTab === 'completed'">
                                    <!-- Content for Completed -->
                                    <div v-if="bookingData.length > 0" class="tab-content">
                                        <div class="table-responsive">
                                            <table class="table table-bordered table-striped table-booking-history">
                                                <thead>
                                                    <tr>
                                                        <th width="2%">Type</th>
                                                        <th>Title</th>
                                                        <th class="a-hidden">Order Date</th>
                                                        <th class="a-hidden">Execution Time</th>
                                                        <th width="15%">Payment Detail</th>
                                                        <th>Commission</th>
                                                        <th class="a-hidden">Status</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="item in paginatedData" :key="item.id">
                                                        <td class="booking-history-type">
                                                            <span
                                                                v-if="paginatedData.length > 0 && item.object_model == 'space'">
                                                                <i class="icofont-building-alt"></i>
                                                                <small>{{ item.object_model }}</small>
                                                            </span>
                                                            <span
                                                                v-if="paginatedData.length > 0 && item.object_model == 'tour'">
                                                                <i class="icofont-island-alt"></i>
                                                                <small>{{ item.object_model }}</small>
                                                            </span>
                                                            <span
                                                                v-if="paginatedData.length > 0 && item.object_model == 'boat'">
                                                                <i class="icofont-ship"></i>
                                                                <small>{{ item.object_model }}</small>
                                                            </span>
                                                            <span
                                                                v-if="paginatedData.length > 0 && item.object_model == 'hotel'">
                                                                <i class="fa fa-building-o"></i>
                                                                <small>{{ item.object_model }}</small>
                                                            </span>
                                                            <span
                                                                v-if="paginatedData.length > 0 && item.object_model == 'event'">
                                                                <i class="icofont-ticket"></i>
                                                                <small>{{ item.object_model }}</small>
                                                            </span>
                                                            <span
                                                                v-if="paginatedData.length > 0 && item.object_model == 'flight'">
                                                                <i class="icofont-ui-flight"></i>
                                                                <small>{{ item.object_model }}</small>
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <a target="_blank" :href="`/${item.object_model}/${item.service.slug}`">
                                                                {{ item.service.title }}
                                                            </a>
                                                            <small>
                                                                <div>Customer Info</div>
                                                                <div>
                                                                    First Name: {{ item.first_name }}
                                                                </div>
                                                                <div>
                                                                    Last Name: {{ item.last_name }}
                                                                </div>
                                                            </small>
                                                        </td>
                                                        <td class="a-hidden">{{ formatDate(item.created_at) }}</td>
                                                        <td class="a-hidden">
                                                            Start date : {{ formatDate(item.start_date) }} <br>
                                                            End date : {{ formatDate(item.end_date) }} <br>
                                                            Duration : {{ calculateDuration(item.start_date,
                                                                item.end_date) }}
                                                        </td>
                                                        <td>
                                                            <div>Total: ${{ item.total }}</div>
                                                            <div v-if="item.paid">Paid: ${{ item.paid }}</div>
                                                            <div v-else>Paid: $0</div>
                                                            <div>Remain: ${{ item.total - item.paid }}</div>
                                                        </td>
                                                        <td>
                                                            ${{ item.commission }}
                                                        </td>
                                                        <td class="processing a-hidden capitalize">{{ item.status }}
                                                        </td>
                                                        <td width="2%">
                                                            <a @click="bookingDetail(item.id)"
                                                                class="btn btn-xs btn-primary btn-info-booking"
                                                                data-toggle="modal" data-id="9"
                                                                data-target="#modal_booking_detail">
                                                                <i class="fa fa-info-circle"></i>Details
                                                            </a>
                                                            <a :href="`/user/booking/${item.code}/invoice`"
                                                                class="btn btn-xs btn-primary btn-info-booking open-new-window mt-1"
                                                                onclick="window.open(this.href); return false;">
                                                                <i class="fa fa-print"></i>Invoice
                                                            </a>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="pagination">
                                            <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
                                            <button v-for="page in totalPages" :key="page" @click="changePage(page)"
                                                :class="{ active: currentPage === page }">
                                                {{ page }}
                                            </button>
                                            <button @click="nextPage"
                                                :disabled="currentPage === totalPages">Next</button>
                                        </div>
                                    </div>
                                    <div v-else class="tab-content">
                                        No Booking History
                                    </div>
                                </div>
                                <div v-if="currentTab === 'processing'">
                                    <!-- Content for Processing -->
                                    <div v-if="bookingData.length > 0" class="tab-content">
                                        <div class="table-responsive">
                                            <table class="table table-bordered table-striped table-booking-history">
                                                <thead>
                                                    <tr>
                                                        <th width="2%">Type</th>
                                                        <th>Title</th>
                                                        <th class="a-hidden">Order Date</th>
                                                        <th class="a-hidden">Execution Time</th>
                                                        <th width="15%">Payment Detail</th>
                                                        <th>Commission</th>
                                                        <th class="a-hidden">Status</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="item in paginatedData" :key="item.id">
                                                        <td class="booking-history-type">
                                                            <span
                                                                v-if="paginatedData.length > 0 && item.object_model == 'space'">
                                                                <i class="icofont-building-alt"></i>
                                                                <small>{{ item.object_model }}</small>
                                                            </span>
                                                            <span
                                                                v-if="paginatedData.length > 0 && item.object_model == 'tour'">
                                                                <i class="icofont-island-alt"></i>
                                                                <small>{{ item.object_model }}</small>
                                                            </span>
                                                            <span
                                                                v-if="paginatedData.length > 0 && item.object_model == 'boat'">
                                                                <i class="icofont-ship"></i>
                                                                <small>{{ item.object_model }}</small>
                                                            </span>
                                                            <span
                                                                v-if="paginatedData.length > 0 && item.object_model == 'hotel'">
                                                                <i class="fa fa-building-o"></i>
                                                                <small>{{ item.object_model }}</small>
                                                            </span>
                                                            <span
                                                                v-if="paginatedData.length > 0 && item.object_model == 'event'">
                                                                <i class="icofont-ticket"></i>
                                                                <small>{{ item.object_model }}</small>
                                                            </span>
                                                            <span
                                                                v-if="paginatedData.length > 0 && item.object_model == 'flight'">
                                                                <i class="icofont-ui-flight"></i>
                                                                <small>{{ item.object_model }}</small>
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <a target="_blank" :href="`/${item.object_model}/${item.service.slug}`">
                                                                {{ item.service.title }}
                                                            </a>
                                                            <small>
                                                                <div>Customer Info</div>
                                                                <div>
                                                                    First Name: {{ item.first_name }}
                                                                </div>
                                                                <div>
                                                                    Last Name: {{ item.last_name }}
                                                                </div>
                                                            </small>
                                                        </td>
                                                        <td class="a-hidden">{{ formatDate(item.created_at) }}</td>
                                                        <td class="a-hidden">
                                                            Start date : {{ formatDate(item.start_date) }} <br>
                                                            End date : {{ formatDate(item.end_date) }} <br>
                                                            Duration : {{ calculateDuration(item.start_date,
                                                                item.end_date) }}
                                                        </td>
                                                        <td>
                                                            <div>Total: ${{ item.total }}</div>
                                                            <div v-if="item.paid">Paid: ${{ item.paid }}</div>
                                                            <div v-else>Paid: $0</div>
                                                            <div>Remain: ${{ item.total - item.paid }}</div>
                                                        </td>
                                                        <td>
                                                            ${{ item.commission }}
                                                        </td>
                                                        <td class="processing a-hidden capitalize">{{ item.status }}
                                                        </td>
                                                        <td width="2%">
                                                            <a @click="bookingDetail(item.id)"
                                                                class="btn btn-xs btn-primary btn-info-booking"
                                                                data-toggle="modal" data-id="9"
                                                                data-target="#modal_booking_detail">
                                                                <i class="fa fa-info-circle"></i>Details
                                                            </a>
                                                            <a :href="`/user/booking/${item.code}/invoice`"
                                                                class="btn btn-xs btn-primary btn-info-booking open-new-window mt-1"
                                                                onclick="window.open(this.href); return false;">
                                                                <i class="fa fa-print"></i>Invoice
                                                            </a>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="pagination">
                                            <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
                                            <button v-for="page in totalPages" :key="page" @click="changePage(page)"
                                                :class="{ active: currentPage === page }">
                                                {{ page }}
                                            </button>
                                            <button @click="nextPage"
                                                :disabled="currentPage === totalPages">Next</button>
                                        </div>
                                    </div>
                                    <div v-else class="tab-content">
                                        No Booking History
                                    </div>
                                </div>
                                <div v-if="currentTab === 'confirmed'">
                                    <!-- Content for Confirmed -->
                                    <div v-if="bookingData.length > 0" class="tab-content">
                                        <div class="table-responsive">
                                            <table class="table table-bordered table-striped table-booking-history">
                                                <thead>
                                                    <tr>
                                                        <th width="2%">Type</th>
                                                        <th>Title</th>
                                                        <th class="a-hidden">Order Date</th>
                                                        <th class="a-hidden">Execution Time</th>
                                                        <th width="15%">Payment Detail</th>
                                                        <th>Commission</th>
                                                        <th class="a-hidden">Status</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="item in paginatedData" :key="item.id">
                                                        <td class="booking-history-type">
                                                            <span
                                                                v-if="paginatedData.length > 0 && item.object_model == 'space'">
                                                                <i class="icofont-building-alt"></i>
                                                                <small>{{ item.object_model }}</small>
                                                            </span>
                                                            <span
                                                                v-if="paginatedData.length > 0 && item.object_model == 'tour'">
                                                                <i class="icofont-island-alt"></i>
                                                                <small>{{ item.object_model }}</small>
                                                            </span>
                                                            <span
                                                                v-if="paginatedData.length > 0 && item.object_model == 'boat'">
                                                                <i class="icofont-ship"></i>
                                                                <small>{{ item.object_model }}</small>
                                                            </span>
                                                            <span
                                                                v-if="paginatedData.length > 0 && item.object_model == 'hotel'">
                                                                <i class="fa fa-building-o"></i>
                                                                <small>{{ item.object_model }}</small>
                                                            </span>
                                                            <span
                                                                v-if="paginatedData.length > 0 && item.object_model == 'event'">
                                                                <i class="icofont-ticket"></i>
                                                                <small>{{ item.object_model }}</small>
                                                            </span>
                                                            <span
                                                                v-if="paginatedData.length > 0 && item.object_model == 'flight'">
                                                                <i class="icofont-ui-flight"></i>
                                                                <small>{{ item.object_model }}</small>
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <a target="_blank" :href="`/${item.object_model}/${item.service.slug}`">
                                                                {{ item.service.title }}
                                                            </a>
                                                            <small>
                                                                <div>Customer Info</div>
                                                                <div>
                                                                    First Name: {{ item.first_name }}
                                                                </div>
                                                                <div>
                                                                    Last Name: {{ item.last_name }}
                                                                </div>
                                                            </small>
                                                        </td>
                                                        <td class="a-hidden">{{ formatDate(item.created_at) }}</td>
                                                        <td class="a-hidden">
                                                            Start date : {{ formatDate(item.start_date) }} <br>
                                                            End date : {{ formatDate(item.end_date) }} <br>
                                                            Duration : {{ calculateDuration(item.start_date,
                                                                item.end_date) }}
                                                        </td>
                                                        <td>
                                                            <div>Total: ${{ item.total }}</div>
                                                            <div v-if="item.paid">Paid: ${{ item.paid }}</div>
                                                            <div v-else>Paid: $0</div>
                                                            <div>Remain: ${{ item.total - item.paid }}</div>
                                                        </td>
                                                        <td>
                                                            ${{ item.commission }}
                                                        </td>
                                                        <td class="processing a-hidden capitalize">{{ item.status }}
                                                        </td>
                                                        <td width="2%">
                                                            <a @click="bookingDetail(item.id)"
                                                                class="btn btn-xs btn-primary btn-info-booking"
                                                                data-toggle="modal" data-id="9"
                                                                data-target="#modal_booking_detail">
                                                                <i class="fa fa-info-circle"></i>Details
                                                            </a>
                                                            <a :href="`/user/booking/${item.code}/invoice`"
                                                                class="btn btn-xs btn-primary btn-info-booking open-new-window mt-1"
                                                                onclick="window.open(this.href); return false;">
                                                                <i class="fa fa-print"></i>Invoice
                                                            </a>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="pagination">
                                            <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
                                            <button v-for="page in totalPages" :key="page" @click="changePage(page)"
                                                :class="{ active: currentPage === page }">
                                                {{ page }}
                                            </button>
                                            <button @click="nextPage"
                                                :disabled="currentPage === totalPages">Next</button>
                                        </div>
                                    </div>
                                    <div v-else class="tab-content">
                                        No Booking History
                                    </div>
                                </div>
                                <div v-if="currentTab === 'cancelled'">
                                    <!-- Content for Cancelled -->
                                    <div v-if="bookingData.length > 0" class="tab-content">
                                        <div class="table-responsive">
                                            <table class="table table-bordered table-striped table-booking-history">
                                                <thead>
                                                    <tr>
                                                        <th width="2%">Type</th>
                                                        <th>Title</th>
                                                        <th class="a-hidden">Order Date</th>
                                                        <th class="a-hidden">Execution Time</th>
                                                        <th width="15%">Payment Detail</th>
                                                        <th>Commission</th>
                                                        <th class="a-hidden">Status</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="item in paginatedData" :key="item.id">
                                                        <td class="booking-history-type">
                                                            <span
                                                                v-if="paginatedData.length > 0 && item.object_model == 'space'">
                                                                <i class="icofont-building-alt"></i>
                                                                <small>{{ item.object_model }}</small>
                                                            </span>
                                                            <span
                                                                v-if="paginatedData.length > 0 && item.object_model == 'tour'">
                                                                <i class="icofont-island-alt"></i>
                                                                <small>{{ item.object_model }}</small>
                                                            </span>
                                                            <span
                                                                v-if="paginatedData.length > 0 && item.object_model == 'boat'">
                                                                <i class="icofont-ship"></i>
                                                                <small>{{ item.object_model }}</small>
                                                            </span>
                                                            <span
                                                                v-if="paginatedData.length > 0 && item.object_model == 'hotel'">
                                                                <i class="fa fa-building-o"></i>
                                                                <small>{{ item.object_model }}</small>
                                                            </span>
                                                            <span
                                                                v-if="paginatedData.length > 0 && item.object_model == 'event'">
                                                                <i class="icofont-ticket"></i>
                                                                <small>{{ item.object_model }}</small>
                                                            </span>
                                                            <span
                                                                v-if="paginatedData.length > 0 && item.object_model == 'flight'">
                                                                <i class="icofont-ui-flight"></i>
                                                                <small>{{ item.object_model }}</small>
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <a target="_blank" :href="`/${item.object_model}/${item.service.slug}`">
                                                                {{ item.service.title }}
                                                            </a>
                                                            <small>
                                                                <div>Customer Info</div>
                                                                <div>
                                                                    First Name: {{ item.first_name }}
                                                                </div>
                                                                <div>
                                                                    Last Name: {{ item.last_name }}
                                                                </div>
                                                            </small>
                                                        </td>
                                                        <td class="a-hidden">{{ formatDate(item.created_at) }}</td>
                                                        <td class="a-hidden">
                                                            Start date : {{ formatDate(item.start_date) }} <br>
                                                            End date : {{ formatDate(item.end_date) }} <br>
                                                            Duration : {{ calculateDuration(item.start_date,
                                                                item.end_date) }}
                                                        </td>
                                                        <td>
                                                            <div>Total: ${{ item.total }}</div>
                                                            <div v-if="item.paid">Paid: ${{ item.paid }}</div>
                                                            <div v-else>Paid: $0</div>
                                                            <div>Remain: ${{ item.total - item.paid }}</div>
                                                        </td>
                                                        <td>
                                                            ${{ item.commission }}
                                                        </td>
                                                        <td class="processing a-hidden capitalize">{{ item.status }}
                                                        </td>
                                                        <td width="2%">
                                                            <a @click="bookingDetail(item.id)"
                                                                class="btn btn-xs btn-primary btn-info-booking"
                                                                data-toggle="modal" data-id="9"
                                                                data-target="#modal_booking_detail">
                                                                <i class="fa fa-info-circle"></i>Details
                                                            </a>
                                                            <a :href="`/user/booking/${item.code}/invoice`"
                                                                class="btn btn-xs btn-primary btn-info-booking open-new-window mt-1"
                                                                onclick="window.open(this.href); return false;">
                                                                <i class="fa fa-print"></i>Invoice
                                                            </a>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="pagination">
                                            <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
                                            <button v-for="page in totalPages" :key="page" @click="changePage(page)"
                                                :class="{ active: currentPage === page }">
                                                {{ page }}
                                            </button>
                                            <button @click="nextPage"
                                                :disabled="currentPage === totalPages">Next</button>
                                        </div>
                                    </div>
                                    <div v-else class="tab-content">
                                        No Booking History
                                    </div>
                                </div>
                                <div v-if="currentTab === 'paid'">
                                    <!-- Content for Paid -->
                                    <div v-if="bookingData.length > 0" class="tab-content">
                                        <div class="table-responsive">
                                            <table class="table table-bordered table-striped table-booking-history">
                                                <thead>
                                                    <tr>
                                                        <th width="2%">Type</th>
                                                        <th>Title</th>
                                                        <th class="a-hidden">Order Date</th>
                                                        <th class="a-hidden">Execution Time</th>
                                                        <th width="15%">Payment Detail</th>
                                                        <th>Commission</th>
                                                        <th class="a-hidden">Status</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="item in paginatedData" :key="item.id">
                                                        <td class="booking-history-type">
                                                            <span
                                                                v-if="paginatedData.length > 0 && item.object_model == 'space'">
                                                                <i class="icofont-building-alt"></i>
                                                                <small>{{ item.object_model }}</small>
                                                            </span>
                                                            <span
                                                                v-if="paginatedData.length > 0 && item.object_model == 'tour'">
                                                                <i class="icofont-island-alt"></i>
                                                                <small>{{ item.object_model }}</small>
                                                            </span>
                                                            <span
                                                                v-if="paginatedData.length > 0 && item.object_model == 'boat'">
                                                                <i class="icofont-ship"></i>
                                                                <small>{{ item.object_model }}</small>
                                                            </span>
                                                            <span
                                                                v-if="paginatedData.length > 0 && item.object_model == 'hotel'">
                                                                <i class="fa fa-building-o"></i>
                                                                <small>{{ item.object_model }}</small>
                                                            </span>
                                                            <span
                                                                v-if="paginatedData.length > 0 && item.object_model == 'event'">
                                                                <i class="icofont-ticket"></i>
                                                                <small>{{ item.object_model }}</small>
                                                            </span>
                                                            <span
                                                                v-if="paginatedData.length > 0 && item.object_model == 'flight'">
                                                                <i class="icofont-ui-flight"></i>
                                                                <small>{{ item.object_model }}</small>
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <a target="_blank" :href="`/${item.object_model}/${item.service.slug}`">
                                                                {{ item.service.title }}
                                                            </a>
                                                            <small>
                                                                <div>Customer Info</div>
                                                                <div>
                                                                    First Name: {{ item.first_name }}
                                                                </div>
                                                                <div>
                                                                    Last Name: {{ item.last_name }}
                                                                </div>
                                                            </small>
                                                        </td>
                                                        <td class="a-hidden">{{ formatDate(item.created_at) }}</td>
                                                        <td class="a-hidden">
                                                            Start date : {{ formatDate(item.start_date) }} <br>
                                                            End date : {{ formatDate(item.end_date) }} <br>
                                                            Duration : {{ calculateDuration(item.start_date,
                                                                item.end_date) }}
                                                        </td>
                                                        <td>
                                                            <div>Total: ${{ item.total }}</div>
                                                            <div v-if="item.paid">Paid: ${{ item.paid }}</div>
                                                            <div v-else>Paid: $0</div>
                                                            <div>Remain: ${{ item.total - item.paid }}</div>
                                                        </td>
                                                        <td>
                                                            ${{ item.commission }}
                                                        </td>
                                                        <td class="processing a-hidden capitalize">{{ item.status }}
                                                        </td>
                                                        <td width="2%">
                                                            <a @click="bookingDetail(item.id)"
                                                                class="btn btn-xs btn-primary btn-info-booking"
                                                                data-toggle="modal" data-id="9"
                                                                data-target="#modal_booking_detail">
                                                                <i class="fa fa-info-circle"></i>Details
                                                            </a>
                                                            <a :href="`/user/booking/${item.code}/invoice`"
                                                                class="btn btn-xs btn-primary btn-info-booking open-new-window mt-1"
                                                                onclick="window.open(this.href); return false;">
                                                                <i class="fa fa-print"></i>Invoice
                                                            </a>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="pagination">
                                            <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
                                            <button v-for="page in totalPages" :key="page" @click="changePage(page)"
                                                :class="{ active: currentPage === page }">
                                                {{ page }}
                                            </button>
                                            <button @click="nextPage"
                                                :disabled="currentPage === totalPages">Next</button>
                                        </div>
                                    </div>
                                    <div v-else class="tab-content">
                                        No Booking History
                                    </div>
                                </div>
                                <div v-if="currentTab === 'unpaid'">
                                    <!-- Content for Unpaid -->
                                    <div v-if="bookingData.length > 0" class="tab-content">
                                        <div class="table-responsive">
                                            <table class="table table-bordered table-striped table-booking-history">
                                                <thead>
                                                    <tr>
                                                        <th width="2%">Type</th>
                                                        <th>Title</th>
                                                        <th class="a-hidden">Order Date</th>
                                                        <th class="a-hidden">Execution Time</th>
                                                        <th width="15%">Payment Detail</th>
                                                        <th>Commission</th>
                                                        <th class="a-hidden">Status</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="item in paginatedData" :key="item.id">
                                                        <td class="booking-history-type">
                                                            <span
                                                                v-if="paginatedData.length > 0 && item.object_model == 'space'">
                                                                <i class="icofont-building-alt"></i>
                                                                <small>{{ item.object_model }}</small>
                                                            </span>
                                                            <span
                                                                v-if="paginatedData.length > 0 && item.object_model == 'tour'">
                                                                <i class="icofont-island-alt"></i>
                                                                <small>{{ item.object_model }}</small>
                                                            </span>
                                                            <span
                                                                v-if="paginatedData.length > 0 && item.object_model == 'boat'">
                                                                <i class="icofont-ship"></i>
                                                                <small>{{ item.object_model }}</small>
                                                            </span>
                                                            <span
                                                                v-if="paginatedData.length > 0 && item.object_model == 'hotel'">
                                                                <i class="fa fa-building-o"></i>
                                                                <small>{{ item.object_model }}</small>
                                                            </span>
                                                            <span
                                                                v-if="paginatedData.length > 0 && item.object_model == 'event'">
                                                                <i class="icofont-ticket"></i>
                                                                <small>{{ item.object_model }}</small>
                                                            </span>
                                                            <span
                                                                v-if="paginatedData.length > 0 && item.object_model == 'flight'">
                                                                <i class="icofont-ui-flight"></i>
                                                                <small>{{ item.object_model }}</small>
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <a target="_blank" :href="`/${item.object_model}/${item.service.slug}`">
                                                                {{ item.service.title }}
                                                            </a>
                                                            <small>
                                                                <div>Customer Info</div>
                                                                <div>
                                                                    First Name: {{ item.first_name }}
                                                                </div>
                                                                <div>
                                                                    Last Name: {{ item.last_name }}
                                                                </div>
                                                            </small>
                                                        </td>
                                                        <td class="a-hidden">{{ formatDate(item.created_at) }}</td>
                                                        <td class="a-hidden">
                                                            Start date : {{ formatDate(item.start_date) }} <br>
                                                            End date : {{ formatDate(item.end_date) }} <br>
                                                            Duration : {{ calculateDuration(item.start_date,
                                                                item.end_date) }}
                                                        </td>
                                                        <td>
                                                            <div>Total: ${{ item.total }}</div>
                                                            <div v-if="item.paid">Paid: ${{ item.paid }}</div>
                                                            <div v-else>Paid: $0</div>
                                                            <div>Remain: ${{ item.total - item.paid }}</div>
                                                        </td>
                                                        <td>
                                                            ${{ item.commission }}
                                                        </td>
                                                        <td class="processing a-hidden capitalize">{{ item.status }}
                                                        </td>
                                                        <td width="2%">
                                                            <a @click="bookingDetail(item.id)"
                                                                class="btn btn-xs btn-primary btn-info-booking"
                                                                data-toggle="modal" data-id="9"
                                                                data-target="#modal_booking_detail">
                                                                <i class="fa fa-info-circle"></i>Details
                                                            </a>
                                                            <a :href="`/user/booking/${item.code}/invoice`"
                                                                class="btn btn-xs btn-primary btn-info-booking open-new-window mt-1"
                                                                onclick="window.open(this.href); return false;">
                                                                <i class="fa fa-print"></i>Invoice
                                                            </a>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="pagination">
                                            <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
                                            <button v-for="page in totalPages" :key="page" @click="changePage(page)"
                                                :class="{ active: currentPage === page }">
                                                {{ page }}
                                            </button>
                                            <button @click="nextPage"
                                                :disabled="currentPage === totalPages">Next</button>
                                        </div>
                                    </div>
                                    <div v-else class="tab-content">
                                        No Booking History
                                    </div>
                                </div>
                                <div v-if="currentTab === 'partial_payment'">
                                    <!-- Content for Partial Payment -->
                                    <div v-if="bookingData.length > 0" class="tab-content">
                                        <div class="table-responsive">
                                            <table class="table table-bordered table-striped table-booking-history">
                                                <thead>
                                                    <tr>
                                                        <th width="2%">Type</th>
                                                        <th>Title</th>
                                                        <th class="a-hidden">Order Date</th>
                                                        <th class="a-hidden">Execution Time</th>
                                                        <th width="15%">Payment Detail</th>
                                                        <th>Commission</th>
                                                        <th class="a-hidden">Status</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="item in paginatedData" :key="item.id">
                                                        <td class="booking-history-type">
                                                            <span
                                                                v-if="paginatedData.length > 0 && item.object_model == 'space'">
                                                                <i class="icofont-building-alt"></i>
                                                                <small>{{ item.object_model }}</small>
                                                            </span>
                                                            <span
                                                                v-if="paginatedData.length > 0 && item.object_model == 'tour'">
                                                                <i class="icofont-island-alt"></i>
                                                                <small>{{ item.object_model }}</small>
                                                            </span>
                                                            <span
                                                                v-if="paginatedData.length > 0 && item.object_model == 'boat'">
                                                                <i class="icofont-ship"></i>
                                                                <small>{{ item.object_model }}</small>
                                                            </span>
                                                            <span
                                                                v-if="paginatedData.length > 0 && item.object_model == 'hotel'">
                                                                <i class="fa fa-building-o"></i>
                                                                <small>{{ item.object_model }}</small>
                                                            </span>
                                                            <span
                                                                v-if="paginatedData.length > 0 && item.object_model == 'event'">
                                                                <i class="icofont-ticket"></i>
                                                                <small>{{ item.object_model }}</small>
                                                            </span>
                                                            <span
                                                                v-if="paginatedData.length > 0 && item.object_model == 'flight'">
                                                                <i class="icofont-ui-flight"></i>
                                                                <small>{{ item.object_model }}</small>
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <a target="_blank" :href="`/${item.object_model}/${item.service.slug}`">
                                                                {{ item.service.title }}
                                                            </a>
                                                            <small>
                                                                <div>Customer Info</div>
                                                                <div>
                                                                    First Name: {{ item.first_name }}
                                                                </div>
                                                                <div>
                                                                    Last Name: {{ item.last_name }}
                                                                </div>
                                                            </small>
                                                        </td>
                                                        <td class="a-hidden">{{ formatDate(item.created_at) }}</td>
                                                        <td class="a-hidden">
                                                            Start date : {{ formatDate(item.start_date) }} <br>
                                                            End date : {{ formatDate(item.end_date) }} <br>
                                                            Duration : {{ calculateDuration(item.start_date,
                                                                item.end_date) }}
                                                        </td>
                                                        <td>
                                                            <div>Total: ${{ item.total }}</div>
                                                            <div v-if="item.paid">Paid: ${{ item.paid }}</div>
                                                            <div v-else>Paid: $0</div>
                                                            <div>Remain: ${{ item.total - item.paid }}</div>
                                                        </td>
                                                        <td>
                                                            ${{ item.commission }}
                                                        </td>
                                                        <td class="processing a-hidden capitalize">{{ item.status }}
                                                        </td>
                                                        <td width="2%">
                                                            <a @click="bookingDetail(item.id)"
                                                                class="btn btn-xs btn-primary btn-info-booking"
                                                                data-toggle="modal" data-id="9"
                                                                data-target="#modal_booking_detail">
                                                                <i class="fa fa-info-circle"></i>Details
                                                            </a>
                                                            <a :href="`/user/booking/${item.code}/invoice`"
                                                                class="btn btn-xs btn-primary btn-info-booking open-new-window mt-1"
                                                                onclick="window.open(this.href); return false;">
                                                                <i class="fa fa-print"></i>Invoice
                                                            </a>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="pagination">
                                            <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
                                            <button v-for="page in totalPages" :key="page" @click="changePage(page)"
                                                :class="{ active: currentPage === page }">
                                                {{ page }}
                                            </button>
                                            <button @click="nextPage"
                                                :disabled="currentPage === totalPages">Next</button>
                                        </div>
                                    </div>
                                    <div v-else class="tab-content">
                                        No Booking History
                                    </div>
                                </div>
                            </div>

                            <!-- end content-->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Sidebar from './sidebar.vue';
import userbc from './user-bc.vue';

export default {
    components: {
        Sidebar,
        userbc
    },
    data() {
        return {
            breadcrumbs: [],
            currentTab: 'all',
            tabs: [
                { name: 'All Booking', status: 'all' },
                { name: 'Completed', status: 'completed' },
                { name: 'Processing', status: 'processing' },
                { name: 'Confirmed', status: 'confirmed' },
                { name: 'Cancelled', status: 'cancelled' },
                { name: 'Paid', status: 'paid' },
                { name: 'Unpaid', status: 'unpaid' },
                { name: 'Partial Payment', status: 'partial_payment' }
            ],
            bookingData: [],
            currentPage: 1,
            itemsPerPage: 5,
            modalBooking: {},
            modalService: {},
            modalAuthor: {},
            payment_method: '',
            buyer_fees: [],
            isLoading: false
        };
    },
    computed: {
        totalPages() {
            return Math.ceil(this.bookingData.length / this.itemsPerPage);
        },
        paginatedData() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.bookingData.slice(start, end);
        },
    },
    mounted() {
        // Fetch data here
        this.getData();
    },
    methods: {
        selectTab(status) {
            this.currentTab = status;
            this.getData(status);
        },
        getData(status) {
            this.isLoading = true;
            console.log("status", status);
            //booking-report
            let url = '/api/vendor/booking-report';
            if (status != undefined && status !== 'all') {
                url += `?status=${status}`;
            }
            axios.get(url).then(({ data }) => {
                console.log("api booking-report data", data.data);
                console.log("booking array", data.data.bookings.data);
                this.bookingData = data.data.bookings.data;
                this.breadcrumbs = data.data.breadcrumbs;
                this.isLoading = false;
            }).catch(error => {
                this.isLoading = false;
                console.error("Error fetching in data:", error);
            });
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        changePage(page) {
            this.currentPage = page;
        },
        formatDate(value) {
            if (value) {
                const date = new Date(value);
                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const year = date.getFullYear();
                return `${month}/${day}/${year}`;
            }
        },
        calculateDuration(startDate, endDate) {
            if (startDate && endDate) {
                const start = new Date(startDate);
                const end = new Date(endDate);

                // Calculate the difference in milliseconds
                const diffTime = end - start;
                const diffDays = diffTime / (1000 * 60 * 60 * 24);

                if (diffDays >= 1) {
                    // Round down to the nearest whole day
                    const roundedDays = Math.floor(diffDays);
                    // Add 1 day if roundedDays is greater than 1
                    const adjustedDays = roundedDays > 1 ? roundedDays + 1 : roundedDays;
                    const dayLabel = adjustedDays === 1 ? 'day' : 'days';
                    return `${adjustedDays} ${dayLabel}`;
                } else {
                    // Calculate the difference in hours
                    const diffHours = diffTime / (1000 * 60 * 60);
                    const roundedHours = Math.ceil(diffHours);
                    const hourLabel = roundedHours === 1 ? 'hour' : 'hours';
                    return `${roundedHours} ${hourLabel}`;
                }
            }
            return '';
        },
        calculatePaid(total, pay_now) {
            if (total == pay_now) {
                return 0;
            }
            return total - pay_now;
        },
        bookingDetail(id) {
            //http://127.0.0.1:8000/booking/modal/9
            axios.get(`/api/vendor/booking/modal/${id}`).then(({ data }) => {
                console.log("api modal data", data.data);
                this.modalBooking = data.data.bookings;
                this.buyer_fees = JSON.parse(this.modalBooking.buyer_fees);
                console.log("buyer_fees",this.buyer_fees);
                this.payment_method = this.modalBooking.gateway_name.name;
                this.modalService = data.data.service;
                this.modalAuthor = data.data.author;
            }).catch(error => {
                console.error("Error fetching in data:", error);
            });
        }
    }
}
</script>
<style scoped>
.capitalize {
    text-transform: capitalize;
}
</style>
