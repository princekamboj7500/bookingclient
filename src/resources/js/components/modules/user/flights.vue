<template>
    <div class="bravo_search_flight">
        <topbar></topbar>
        <breadcrumb :type="type" :breadcrumb-data="breadcrumbData" />
        <div class="bravo_banner" style="background-image: url(/uploads/demo/hotel/banner-search-hotel.jpg)">
            <div class="container">
                <h1>
                    Search for Flights
                </h1>
            </div>
        </div>
        <div class="bravo_form_search">
            <div class="container" v-if="list_location">
                <searchwidget :location-list="list_location" :type="type" :price-range-array="priceRange"
                    @search="updateSearchParams"></searchwidget>
            </div>
        </div>
        <div class="container">
            <div v-if="isLoading" id="loader"></div>
            <div v-else class="row">
                <div class="col-lg-3 col-md-12">
                    <filterwidget :filter-attributes="attributes" :type="type" :min-price="minPrice"
                        :min-price-range="minPrice" :max-price-range="maxPrice" :price-range-array="priceRange"
                        @filter="updateFilterParams" />
                </div>
                <div class="col-lg-9 col-md-12">

                    <div class="bravo-list-item">
                        <div class="topbar-search">
                            <h2 class="text result-count">
                                {{ total }} Flights found
                            </h2>
                            <div class="control bc-form-order">
                                <div class="item">
                                    <a href="/flight?_layout=map">Show on the map</a>
                                </div>
                                <div>
                                    <orderby :price-range-array="priceRange" @orderby="updateOrderParams"></orderby>
                                </div>
                            </div>
                        </div>
                        <div class="ajax-search-result">
                            <div class="list-item">
                                <div class="row">
                                    <div v-for="item in paginatedData" :key="item.id" class="col-md-6 col-xl-4">
                                        <div class="card w-100 shadow-hover-3 mb-4 item-loop-wrap has-skeleton">
                                            <a href="#" tabindex="0" class="d-block mb-0 px-1 mt-1 m-3 has-loading"><img
                                                    :src=item.feature_image_url alt="Claraburgh"
                                                    class="card-img-top"></a>
                                            <div class="card-body mx-3 pt-0 mb-3 my-0 px-1  has-loading">
                                                <div class="row">
                                                    <div class="col-7"><a href="#" tabindex="0"
                                                            class="card-title text-dark font-size-17 font-weight-bold">{{
                                                                item.airport_from.name
                                                            }}</a></div>
                                                    <div class="col-5">
                                                        <div class="text-right">
                                                            <h6 class="font-weight-bold font-size-17 text-gray-3 mb-0">
                                                                ${{
                                                                    formatPrice(item.min_price) }}</h6> <span
                                                                class="font-weight-normal font-size-12 d-block text-color-1">avg/person</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="border-bottom pb-3 mb-3 mx-3">
                                                <div>
                                                    <div class="d-flex mx-1  has-loading"><i
                                                            class="icofont-airplane font-size-30 text-primary mr-3"></i>
                                                        <div class="d-flex flex-column"><span
                                                                class="font-weight-normal text-gray-5">Take off</span>
                                                            <span class="font-size-14 text-gray-1">{{
                                                                formatDepartureTime(item.departure_time) }}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="border-bottom pb-3 mb-3 mx-3">
                                                <div>
                                                    <div class="d-flex mx-1  has-loading"><i
                                                            class="d-block rotate-90 icofont-airplane-alt font-size-30 text-primary mr-3"></i>
                                                        <div class="d-flex flex-column"><span
                                                                class="font-weight-normal text-gray-5">Landing</span>
                                                            <span class="font-size-14 text-gray-1">{{
                                                                formatDepartureTime(item.arrival_time) }}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="d-flex justify-content-center mx-3 mb-3">
                                                <div class=" has-loading"><a data-id="60" href="#"
                                                        @click="showBokkingModal(item.id)"
                                                        class="btn btn-primary text-white btn-choose w-100 btn-choose-flight">Choose</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="pagination">
                                    <button @click="changePage(currentPage - 1)"
                                        :disabled="currentPage === 1">Previous</button>
                                    <button v-for="page in totalPages" :key="page" @click="changePage(page)">{{ page
                                        }}</button>
                                    <button @click="changePage(currentPage + 1)"
                                        :disabled="currentPage === totalPages">Next</button>
                                </div>
                                <span class="count-string">Showing {{ startItem }} - {{ endItem }} of {{ total }}
                                    Flights</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="flightFormBookModal" v-if="isShowBookingModal" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" class="modal fade show" aria-modal="true"
            style="padding-right: 17px; display: block;">
            <div role="document" class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-body">
                        <button @click="hideModal()" type="button" data-dismiss="modal" aria-label="Close"
                            class="close"><span aria-hidden="true">×</span>
                        </button>
                        <div v-if="isLoadingModal">
                            <div class="icon-loading d-flex flex-horizontal-center flex-content-center"><i
                                class="fa fa-spin icofont-spinner-alt-6"></i></div>
                        </div>
                        <div class="card" v-if="!isLoadingModal">
                            <header class="card-header">
                                <div class="row text-center">
                                    <div class="col-md-4">
                                        <div class="d-block d-lg-flex flex-horizontal-center"><img
                                                :src="booking_data.airline.image_url"
                                                alt="Image-Description" class="img-fluid mr-3 mb-3 mb-lg-0">
                                            <div class="font-size-14">{{ booking_data.title }} | {{ booking_data.code }}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="flex-content-center align-items-start d-block d-lg-flex">
                                            <div class="mr-lg-3 mb-1 mb-lg-0"><i
                                                    class="icofont-airplane font-size-30 text-primary"></i></div>
                                            <div class="text-lg-left">
                                                <h6 class="font-weight-bold font-size-21 text-gray-5 mb-0">{{
                                                    booking_data.departure_time_html }}</h6>
                                                <div class="font-size-14 text-gray-5">{{
                                                    booking_data.departure_date_html }}</div> <span
                                                    class="font-size-14 text-gray-1">{{ booking_data.airport_from.name
                                                    }}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-2 flex-content-center flex-horizontal-center">
                                        <div class="flex-column">
                                            <h6 class="font-size-14 font-weight-bold text-gray-5 mb-0">{{
                                                booking_data.duration }} hrs</h6>
                                            <div class="width-60 border-top border-primary border-width-2 my-1"></div>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div
                                            class="mx-2 mx-xl-3 flex-content-center align-items-start d-block d-lg-flex">
                                            <div class="mr-lg-3 mb-1 mb-lg-0"><i
                                                    class="d-block rotate-90 icofont-airplane-alt font-size-30 text-primary"></i>
                                            </div>
                                            <div class="text-lg-left">
                                                <h6 class="font-weight-bold font-size-21 text-gray-5 mb-0">{{
                                                    booking_data.arrival_time_html }}</h6>
                                                <div class="font-size-14 text-gray-5">{{ booking_data.arrival_date_html
                                                    }}</div> <span class="font-size-14 text-gray-1">{{
                                                        booking_data.airport_to.name }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </header>
                            <div class="card-body py-4">
                                <div class="row">
                                    <div class="col-12 mb-3">
                                        <ul v-for="(item, index) in booking_data.flight_seat" :key="index"
                                            class="d-block d-md-flex justify-content-between list-group list-group-borderless list-group-horizontal list-group-flush no-gutters border-bottom">
                                            <li
                                                class="mr-md-8 mr-lg-8 mb-3 mt-3 d-flex d-md-block justify-content-between list-group-item py-0 border-0">
                                                <div class="font-weight-bold text-dark">Seat type</div> <span
                                                    class="text-gray-1 text-capitalize">{{ item.seat_type.name }}</span>
                                            </li>
                                            <li
                                                class="mr-md-8 mr-lg-8 mb-3 mt-3 d-flex d-md-block justify-content-between list-group-item py-0 border-0">
                                                <div class="font-weight-bold text-dark">Baggage</div> <span
                                                    class="text-gray-1 text-capitalize">{{ item.person }}</span>
                                            </li>
                                            <li
                                                class="mr-md-8 mr-lg-8 mb-3 mt-3 d-flex d-md-block justify-content-between list-group-item py-0 border-0">
                                                <div class="font-weight-bold text-dark">Check-in</div> <span
                                                    class="text-gray-1">{{ item.baggage_check_in }} Kgs</span>
                                            </li>
                                            <li
                                                class="mr-md-8 mr-lg-8 mb-3 mt-3 d-flex d-md-block justify-content-between list-group-item py-0 border-0">
                                                <div class="font-weight-bold text-dark">Cabin</div> <span
                                                    class="text-gray-1">{{ item.baggage_cabin }} Kgs</span>
                                            </li>
                                            <li
                                                class="mr-md-8 mr-lg-8 mb-3 mt-3 d-flex d-md-block justify-content-between list-group-item py-0 border-0">
                                                <div class="font-weight-bold text-dark">Price</div> <span
                                                    class="text-gray-1">{{ item.price_html }}</span>
                                            </li>
                                            <li
                                                class="mr-md-8 mr-lg-8 mb-3 mt-3 d-flex d-md-block justify-content-between list-group-item py-0 border-0">
                                                <div class="font-weight-bold text-dark">Number</div>
                                                <div class="flex-horizontal-center">
                                                    <a href="javascript:;" class="font-size-10 text-dark"
                                                        @click="decrement(index)">
                                                        <i class="fa fa-chevron-down"></i>
                                                    </a>
                                                    <input type="number" v-model="item.number" min="1"
                                                        class="form-control h-auto width-30 d-inline-block font-weight-bold shadow-none border-0 rounded p-0 mx-1 text-center">
                                                    <a href="javascript:;" class="font-size-10 text-dark"
                                                        @click="increment(index)">
                                                        <i class="fa fa-chevron-up"></i>
                                                    </a>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="col-12  col-lg-6 offset-lg-3">
                                        <div class="alert-text mt-3 text-left danger" style="display: none;"></div>
                                        <div class="min-width-250" v-if="total_price > 0">
                                            <ul class="list-unstyled font-size-1 mb-0 font-size-16">
                                                <li class="d-flex justify-content-between py-2"><span
                                                        class="font-weight-medium">Pay Amount</span> 
                                                        <span
                                                        class="font-weight-medium">${{ total_price }}</span></li>
                                                <li
                                                    class="d-flex justify-content-center py-2 font-size-17 font-weight-bold">
                                                    <a class="btn btn-primary text-white" @click="bookNow">
                                                        Book Now
                                                        <i class="fa fa-spinner fa-spin" v-if="buttonLoading"></i></a>
                                                </li>
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
    </div>
</template>

<script>
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css';
import common from './common';
import filterwidget from './filter-widget.vue';
import searchwidget from './search-widget.vue';
import orderby from './order-by.vue';
import breadcrumb from './breadcrumb';
import topbar from './topbar.vue';

export default {
    components: {
        VueSlider,
        filterwidget,
        searchwidget,
        orderby,
        breadcrumb,
        topbar
    },
    mixins: [common],
    data() {
        return {
            type: "flight",
            showDropdown: false,
            selected: {},
            dropdownOpenRecomended: false,
            isShowBookingModal: false,
            booking_data: {},
            isLoadingModal: false,
            buttonLoading: false,
            total_price: 0,
            currentFlightId: null,
            breadcrumbData: [],
        }
    },
    mounted() {
        this.getFlightData();
        //console.log('flight Component mounted.');
    },
    computed: {
        
    },
    watch: {
        data(newData) {
            this.totalPages = Math.ceil(newData.length / this.pageSize);
        }
    },
    methods: {
        getFlightData(params = {}) {
            this.isLoading = true;
            axios.get('/api/user/flight-list', { params }).then(({ data }) => {
                console.log("api flight-list data", data.data);
                this.data = data.data.rows;
                this.attributes = data.data.attributes;
                this.list_location = data.data.list_location;
                this.total = data.data.rows.length;
                if (data.data.flight_min_max_price.length > 0) {
                    // Update min and max prices
                    this.minPrice = parseFloat(data.data.flight_min_max_price[0]);
                    this.maxPrice = parseFloat(data.data.flight_min_max_price[1]);

                    // Update price range after min and max are set
                    this.priceRange = [this.minPrice, this.maxPrice];
                }
                this.isLoading = false;
            }).catch(error => {
                console.error("Error fetching in data:", error);
            });
        },
        formatDepartureTime(dateStr) {
            const date = new Date(dateStr);
            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            const dayOfWeek = days[date.getDay()];
            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const month = monthNames[date.getMonth()];
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const period = hours >= 12 ? 'PM' : 'AM';

            return `${dayOfWeek} ${month} ${date.getDate()} ${hours}:${minutes} ${period}`;
        },
        onSearch(params) {
            console.log("params in event component", params);
            this.getFlightData(params);
        },
        updateSearchParams(params) {
            this.searchParams = { ...this.searchParams, ...params };
            this.onSearch(this.searchParams);
        },
        updateFilterParams(params) {
            this.searchParams = { ...this.searchParams, ...params };
            this.onSearch(this.searchParams);
        },
        updateOrderParams(params) {
            this.searchParams = { ...this.searchParams, ...params };
            this.onSearch(this.searchParams);
        },
        showBokkingModal(id) {
            this.isShowBookingModal = true;
            this.isLoadingModal = true;
            this.currentFlightId = id;
            axios.post(`/flight/getData/${id}`).then(response => {
                console.log("api response => ", response.data);

                if (response.status == 200) {
                    this.booking_data = response.data.data;
                    this.isLoadingModal = false;
                    console.log("success");
                }

            }).catch(({ response }) => {
                alert(response.data.message)
            });
        },
        hideModal() {
            this.total_price = 0;
            this.isShowBookingModal = false;
        },
        increment(index) {
            this.booking_data.flight_seat[index].number++;
            this.updateTotalPrice();
        },
        decrement(index) {
            if (this.booking_data.flight_seat[index].number > 0) {
                this.booking_data.flight_seat[index].number--;
            }
            this.updateTotalPrice();
        },
        updateTotalPrice(){
            var me = this;
            var total = 0;
            if(typeof me.booking_data.flight_seat !='undefined'){
                me.booking_data.flight_seat.map((item) => {
                    if(item.number >0){
                        total += parseInt(item.number) * parseInt(item.price);
                    }
                });
            }
            this.total_price = total;
            console.log("total price in update", this.total_price);
        },
        bookNow() {
            this.updateTotalPrice();
            this.buttonLoading = true;
            console.log("in book now");
            const bookingDetails = {
                service_id: this.currentFlightId,
                service_type: "flight",
                flight_seat: this.booking_data.flight_seat
            };

            console.log("flight_seat",this.booking_data.flight_seat);

            console.log("total price", this.total_price);
            console.log('Booking Details:', bookingDetails);
            this.addToCart(bookingDetails);
        },
        addToCart(bookingDetails){
            //this.buttonLoading = true;
            var formData = bookingDetails;

            console.log("post data", formData);
            axios.post(`/api/booking/addToCart`, formData).then(response => {
                console.log("api response => ", response.data);

                if (response.status == 200) {
                    console.log("add to cart success");
                    console.log("status",response.data.status);
                    console.log("message",response.data.message);
                    if(response.data.status == 0){
                        this.isRequired = true;
                        this.buttonLoading = false;
                        this.errorMsg = response.data.message;
                        return false;
                    }
                    console.log("checkout url",response.data.booking_code);
                    //window.location.href = response.data.url;
                    var code = response.data.booking_code;
                    if(code){
                        this.$router.push({ name: 'checkout', params: { code: response.data.booking_code } });
                    }
                }
                this.buttonLoading = false;
            }).catch(({ response }) => {
                this.buttonLoading = false;
                if(response.status == 401){
                    this.isShowLoginModal = true;
                    //alert(response.data.message)
                    //window.location.href = "/";
                }else{
                    alert(response.data.message)
                }
            }).finally(() => {

            })
        }
    }
}
</script>

<style scoped>
span.count-string {
    float: right;
    padding-top: 20px;
}

button.btn.btn-link.btn-apply-price-range {
    margin-top: 30px !important;
}

input.form-control.h-auto.width-30.d-inline-block.font-weight-bold.shadow-none.border-0.rounded.p-0.mx-1.text-center {
    width: 30px;
}
</style>
