<template>
    <div v-if="isLoading" id="loader"></div>
    <div v-else class="bravo_wrap">
        <div class="bravo_detail_boat">
            <topbar></topbar>
            <breadcrumb :type="type" :breadcrumb-data="breadcrumbData" />
            <!-- <div class="bravo_banner"
                style="background-image: url('http://127.0.0.1:8000/uploads/demo/boat/banner-single.jpg')">
                <div class="container">
                    
                </div>
            </div> -->
            <div class="bravo_content">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12 col-lg-9">
                            <div class="g-header">
                                <div class="left">
                                    <h1>{{ translation.title }}</h1>
                                    <p class="address">
                                        <i class="fa fa-map-marker"></i>
                                        {{ translation.address }}
                                    </p>
                                </div>
                                <div class="right">
                                    <div class="review-score">
                                        <div class="head">
                                            <div class="left">
                                                <span class="head-rating">{{ review_data.review_text }}</span>
                                                <span class="text-rating">from {{ review_data.total_review }}
                                                    reviews</span>
                                            </div>
                                            <div class="score">{{ review_data.score_total }}<span>/5</span></div>
                                        </div>
                                        <div class="foot">{{ recommend_percent }}% of guests recommend</div>
                                    </div>
                                </div>
                            </div>
                            <div class="g-boat-feature">
                                <div class="row">
                                    <div class="col-xs-6 col-lg-3 col-md-6">
                                        <div class="item">
                                            <div class="icon">
                                                <i class="icofont-ui-user-group"></i>
                                            </div>
                                            <div class="info">
                                                <h4 class="name">Max Guests</h4>
                                                <p class="value">
                                                    {{ data.max_guest }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xs-6 col-lg-3 col-md-6">
                                        <div class="item">
                                            <div class="icon">
                                                <i class="icofont-sail-boat-alt-2"></i>
                                            </div>
                                            <div class="info">
                                                <h4 class="name">Cabin</h4>
                                                <p class="value">
                                                    {{ data.cabin }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xs-6 col-lg-3 col-md-6">
                                        <div class="item">
                                            <div class="icon">
                                                <i class="icofont-yacht"></i>
                                            </div>
                                            <div class="info">
                                                <h4 class="name">Length Boat</h4>
                                                <p class="value">
                                                    {{ data.length }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xs-6 col-lg-3 col-md-6">
                                        <div class="item">
                                            <div class="icon">
                                                <i class="icofont-ship"></i>
                                            </div>
                                            <div class="info">
                                                <h4 class="name">Speed</h4>
                                                <p class="value">
                                                    {{ data.speed }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="g-gallery">

                                <div class="fotorama" data-width="100%" data-thumbwidth="135" data-thumbheight="135"
                                    data-thumbmargin="15" data-nav="thumbs" data-allowfullscreen="true">
                                    <ImageSlider :images="images" />
                                </div>
                                <div class="social">
                                    <div class="social-share">
                                        <span class="social-icon">
                                            <i class="icofont-share"></i>
                                        </span>
                                        <ul class="share-wrapper">
                                            <li>
                                                <a class="facebook"
                                                    href="https://www.facebook.com/sharer/sharer.php?u=http://127.0.0.1:8000/tour/eastern-discovery-start-new-orleans&amp;title=Eastern Discovery (Start New Orleans)"
                                                    target="_blank" rel="noopener" original-title="Facebook">
                                                    <i class="fa fa-facebook fa-lg"></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a class="twitter"
                                                    href="https://twitter.com/share?url=http://127.0.0.1:8000/tour/eastern-discovery-start-new-orleans&amp;title=Eastern Discovery (Start New Orleans)"
                                                    target="_blank" rel="noopener" original-title="Twitter">
                                                    <i class="fa fa-twitter fa-lg"></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="service-wishlist" data-id="6" data-type="tour">
                                        <i class="fa fa-heart-o"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="g-overview">
                                <h3>Overview</h3>
                                <div class="description">
                                    <p>
                                    <div v-for="item in parsedContent" :key="item.content">
                                        <p v-if="item.type === 'paragraph'">{{ item.content }}</p>
                                        <h4 v-if="item.type === 'heading'">{{ item.content }}</h4>
                                        <ul v-if="item.type === 'list'">
                                            <li v-for="(listItem, index) in item.items" :key="index">{{ listItem }}</li>
                                        </ul>
                                    </div>
                                    </p>
                                </div>
                            </div>
                            <div v-if="includeTitle" class="g-include-exclude">
                                <h3>{{ includeTitle }}</h3>
                                <div class="row">
                                    <div v-if="translation.include" class="col-lg-6 col-md-6">
                                        <div class="item" v-for="itme in translation.include">
                                            <i class="icofont-check-alt icon-include"></i>
                                            {{ itme.title }}
                                        </div>
                                    </div>
                                    <div v-if="translation.exclude" class="col-lg-6 col-md-6">
                                        <div class="item" v-for="itme in translation.exclude">
                                            <i class="icofont-close-line icon-exclude"></i>
                                            {{ itme.title }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="g-specs" v-if="translation.specs">
                                <h3> Specs & Details </h3>
                                <div class="list-item">
                                    <div class="item" v-for="item in translation.specs">
                                        <div class="text">
                                            <i class="fa fa-dot-circle-o" aria-hidden="true"></i> {{ item.title }}:
                                            <strong>{{ item.content }}</strong>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-for="attribute in attributes"
                                v-if="attributes && attribute.parent.hide_in_single == null"
                                :class="['g-attributes', attribute.parent.slug, `attr-${attribute.parent.id}`]">
                                <h3>{{ attribute.parent.name }}</h3>
                                <div class="list-attributes ">
                                    <div v-for="term in attribute.child"
                                        :class="['item', term.slug, `term-${term.id}`]">
                                        <img v-if="term.image_id" :src=term.attribute_image_url
                                            class="img-responsive attri-img" :alt=term.name>
                                        <i v-else
                                            :class="term.icon ? term.icon : 'icofont-check-circled icon-default'"></i>
                                        {{ term.name }}
                                    </div>
                                </div>
                            </div>
                            <div v-if="isBottomData">
                                <detailBottom :type="type" :bottom-data="bottomData" />
                            </div>
                        </div>
                        <div class="col-md-12 col-lg-3">
                            <div v-if="author.id" class="owner-info widget-box">
                                <div class="media">
                                    <div class="media-left">
                                        <!-- <a :href="`/profile/${author.id}`" class="avatar-cover"
                                            style="background-image: url(/assets/images/avatar.png)">
                                        </a> -->
                                        <img src="../../../../../assets/images/avatar.png">
                                    </div>

                                    <div class="media-body">
                                        <h4 class="media-heading"><a class="author-link" href="#">{{ author.name }}</a>

                                            <img v-if="author.is_verified" data-toggle="tooltip" data-placement="top"
                                                src="/icon/ico-vefified-1.svg" title=""
                                                alt="Verified" data-original-title="verified">
                                            <img v-else data-toggle="tooltip" data-placement="top"
                                                src="/icon/ico-not-vefified-1.svg" title=""
                                                alt="Verified" data-original-title="Not verified">
                                        </h4>
                                        <p>Member Since {{ formatDate(author.created_at) }}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="bravo_single_book_wrap">
                                <div class="bravo_single_book">
                                    <div id="bravo_boat_book_app">
                                        <div class="form-head">
                                            <div class="price flex-wrap"><span class="value">
                                                    <div>${{ data.price_per_hour }}<small> / per hour</small></div>
                                                    <div>${{ data.price_per_day }}<small> / per day</small></div>
                                                </span></div>
                                        </div>
                                        <div class="nav-enquiry">
                                            <div class="enquiry-item active"><span>Book</span></div>
                                            <div data-toggle="modal" data-target="#enquiry_form_modal"
                                                class="enquiry-item"><span>Enquiry</span></div>
                                        </div>
                                        <div class="form-book">
                                            <div class="form-content">
                                                <div class="form-group form-guest-search flex-wrap">
                                                    <div class="d-flex guest-wrapper">
                                                        <label>Return on same-day</label>
                                                    </div>
                                                    <div
                                                        class="guest-wrapper d-flex justify-content-between align-items-center">
                                                        <div class="flex-grow-1">Hours</div>
                                                        <div class="flex-shrink-0">
                                                            <div class="input-number-group">
                                                                <i class="icon ion-ios-remove-circle-outline"
                                                                    @click="decrement('hours')"></i>
                                                                <span class="input"><input type="number"
                                                                        v-model.number="hours" min="0"></span>
                                                                <i class="icon ion-ios-add-circle-outline"
                                                                    @click="increment('hours')"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="d-flex guest-wrapper">
                                                        <label>Return on another day</label>
                                                    </div>
                                                    <div
                                                        class="guest-wrapper d-flex justify-content-between align-items-center">
                                                        <div class="flex-grow-1">Days</div>
                                                        <div class="flex-shrink-0">
                                                            <div class="input-number-group">
                                                                <i class="icon ion-ios-remove-circle-outline"
                                                                    @click="decrement('days')"></i>
                                                                <span class="input"><input type="number"
                                                                        v-model.number="days" min="0"></span>
                                                                <i class="icon ion-ios-add-circle-outline"
                                                                    @click="increment('days')"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-group form-guest-search">
                                                    <div
                                                        class="guest-wrapper d-flex justify-content-between align-items-center">
                                                        <div class="flex-grow-1"><label>Start Time</label></div>
                                                        <div class="flex-shrink-0">
                                                            <div class="input-number-group">
                                                                <select v-model="startTime" class="form-control">
                                                                    <option v-for="time in times" :key="time"
                                                                        :value="time">{{ time }}</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div data-format="MM/DD/YYYY"
                                                    class="form-group form-date-field form-date-search clearfix">
                                                    <div class="date-wrapper clearfix align-items-start">
                                                        <div class="check-in-wrapper">
                                                            <label>Select Dates</label>
                                                            <date-picker v-model="date" value-type="MM/DD/YYYY"
                                                                :disabled-date="notBeforeToday" type="date"
                                                                placeholder="Select start date"
                                                                @focus="onDatePickerClick"
                                                                @change="dateChanged">
                                                            </date-picker>
                                                            <i class="fa fa-spinner fa-spin" v-if="isShowCalLoading"></i>
                                                        </div>
                                                        <i class="fa fa-angle-down arrow"></i>
                                                    </div>
                                                </div>
                                                <div class="form-section-group form-group">
                                                    <h4 class="form-section-title">Extra prices:</h4>
                                                    <div class="form-group"
                                                        v-for="(item, index) in booking_data.extra_price" :key="index">
                                                        <div class="extra-price-wrap d-flex justify-content-between">
                                                            <div class="flex-grow-1">
                                                                <label>
                                                                    <input type="checkbox" v-model="item.enable"
                                                                        :true-value="1" :false-value="0"
                                                                        @change="handleCheckboxChange(item)"> {{
                                                                            item.name
                                                                        }}
                                                                </label>
                                                            </div>
                                                            <div class="flex-shrink-0">{{ item.price_html }}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-section-group form-group-padding">
                                                    <div v-for="(item, index) in booking_data.buyer_fees" :key="index"
                                                        class="extra-price-wrap d-flex justify-content-between">
                                                        <div class="flex-grow-1">
                                                            <label>{{ item.type_name }}
                                                                <i data-toggle="tooltip" data-placement="top" title=""
                                                                    class="icofont-info-circle"
                                                                    data-original-title="One-time fee charged by host to cover the cost of cleaning their space."></i>
                                                            </label>
                                                        </div>
                                                        <div class="flex-shrink-0">
                                                            <div class="unit">${{ item.price }}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <ul class="form-section-total list-unstyled">
                                                <li>
                                                    <label>Total</label>
                                                    <span class="price">${{ total_price }}</span>
                                                </li>
                                            </ul>
                                            <div></div>
                                            <div class="submit-group">
                                                <a name="submit" class="btn btn-large btn-primary" @click="bookNow">
                                                    <span>BOOK NOW</span>
                                                    <i class="fa fa-spinner fa-spin" v-if="buttonLoading"></i>
                                                </a>
                                                <div class="alert-text mt10 danger" v-if="isRequired">Please select date
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-send-enquiry" style="display: none;"><button
                                                data-toggle="modal" data-target="#enquiry_form_modal"
                                                class="btn btn-primary">
                                                Contact Now
                                            </button></div>
                                    </div>
                                </div>
                            </div>
                            <loginmodal v-if="isShowLoginModal" @close="handleCloseModal" />
                            <enquiryModal :service-id="data.id" :service-type="serviceType"></enquiryModal>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bravo-more-book-mobile">
                <div class="container">
                    <div class="left">
                        <div class="g-price">
                            <div class="prefix">
                                <span class="fr_text">from</span>
                            </div>
                            <div class="price">
                                <span class="onsale">$2.100</span>
                                <span class="text-price">$390</span>
                            </div>
                        </div>
                        <div class="service-review tour-review-4.5">
                            <div class="list-star">
                                <ul class="booking-item-rating-stars">
                                    <li><i class="fa fa-star-o"></i></li>
                                    <li><i class="fa fa-star-o"></i></li>
                                    <li><i class="fa fa-star-o"></i></li>
                                    <li><i class="fa fa-star-o"></i></li>
                                    <li><i class="fa fa-star-o"></i></li>
                                </ul>
                                <div class="booking-item-rating-stars-active" style="width: 90%">
                                    <ul class="booking-item-rating-stars">
                                        <li><i class="fa fa-star"></i></li>
                                        <li><i class="fa fa-star"></i></li>
                                        <li><i class="fa fa-star"></i></li>
                                        <li><i class="fa fa-star"></i></li>
                                        <li><i class="fa fa-star"></i></li>
                                    </ul>
                                </div>
                            </div>
                            <span class="review"> 4 Reviews </span>
                        </div>
                    </div>
                    <div class="right">
                        <a class="btn btn-primary bravo-button-book-mobile">Book Now</a>
                    </div>
                </div>
            </div>
        </div>
        <detailFooter />
    </div>
</template>

<script>
import breadcrumb from './breadcrumb';
import detailBottom from './detail-bottom';
import detailFooter from './detail-footer';
import common from './detail-common';
import ImageSlider from './ImageSlider';
import loginmodal from './login-modal';
import enquiryModal from './enquiryModal';
import topbar from './topbar.vue';

export default {
    components: {
        breadcrumb,
        detailBottom,
        detailFooter,
        ImageSlider,
        loginmodal,
        enquiryModal,
        topbar
    },
    mixins: [common],
    data() {
        return {
            type: 'Boat',
            serviceType: "boat",
            boatName: this.$route.params.boat || null,
            data: [],
            extra_price: [],
            guests: [],
            person_types: [],
            enquiry_is_submit: false,
            breadcrumbData: [],
            recommend_percent: 0,
            includeTitle: '',
            translation: {},
            attributes: {},
            bottomData: {},
            isBottomData: false,
            review_data: {},
            booking_data: {},
            times: [
                '00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30',
                '04:00', '04:30', '05:00', '05:30', '06:00', '06:30', '07:00', '07:30',
                '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
                '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
                '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
                '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30'
            ],
            hours: 1,
            days: 0,
            startTime: '00:00',
            date: '',
            total_price: 0,
            allEvents: [],
            number: 1,
        }
    },
    mounted() {
        console.log('boat detail Component mounted.');
        this.getData(this.boatName);
    },
    computed: {

    },
    methods: {
        getData(boat) {
            this.isLoading = true;
            console.log("boat", boat)
            axios.get(`/api/user/boat/${boat}`).then(({ data }) => {
                console.log("api boat-detail-data", data);
                //console.log("data.row.star_rate__:", data.row.star_rate)
                this.data = data.data.row;
                this.author = data.data.author;
                this.images = data.data.gallery_images;
                //console.log("this.images", this.images);
                this.booking_data = data.data.booking_data;
                this.parsedContent = this.parseHTML(data.data.row.content);
                this.recommend_percent = data.data.recommend_percent;
                this.translation = data.data.translation;
                this.attributes = data.data.attributes;
                this.review_data = data.data.review_data;
                this.bottomData = {
                    faqs: data.data.translation.faqs,
                    review_list: data.data.review_list,
                    review_data: this.review_data,
                    map_lat: data.data.row.map_lat,
                    map_lng: data.data.row.map_lng,
                    cancel_policy: data.data.translation.cancel_policy,
                    terms_information: this.parseHTML(data.data.translation.terms_information)
                }
                //console.log("this.bottomData",this.bottomData);
                if (this.translation.include) {
                    this.includeTitle = "Included";
                }
                if (this.translation.exclude) {
                    this.includeTitle = "Excluded";
                }
                if (this.translation.include && this.translation.exclude) {
                    this.includeTitle = "Included/Excluded";
                }
                this.breadcrumbData = data.data.breadcrumbs;
                this.isBottomData = true;
                this.isLoading = false;
            }).catch(error => {
                this.isLoading = false;
                console.error("Error fetching in data:", error);
            });
        },
        dateChanged() {
            console.log("selected date", this.date);
            this.updateTotalPrice();
        },
        onDatePickerClick() {
            console.log('Datepicker clicked!');
            // Add your custom logic here
            const currentDate = new Date();
            currentDate.setMonth(currentDate.getMonth() - 1);

            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // months are 0-based
            const day = String(currentDate.getDate()).padStart(2, '0');

            var start =  `${year}-${month}-${day}`;

            const endDate = new Date();
            endDate.setMonth(currentDate.getMonth() + 2);
            const endYear = endDate.getFullYear();
            const endMonth = String(endDate.getMonth() + 1).padStart(2, '0'); // months are 0-based
            const endDay = String(endDate.getDate()).padStart(2, '0');
            
            var end = `${endYear}-${endMonth}-${endDay}`;
            this.isShowCalLoading = true;
            this.fetchEvents(start, end);
        },
        fetchEvents(start, end) {

            var params = {
                start: start,
                end: end,
                id: this.data.id,
                for_single: 1
            };

            axios.get('/user/boat/availability/loadDates', { params }).then(({ data }) => {
                //console.log("api availability data", data);
                this.allEvents = data;
                console.log("api availability data", this.allEvents);
                this.isShowCalLoading = false;
                this.updateTotalPrice();
            }).catch(error => {
                this.isShowCalLoading = false;
                console.error("Can not get availability:", error);
            });
        },
        increment(type) {
            if (type === 'hours') {
                this.hours++;
                if (this.hours > 0) {
                    this.days = 0;
                }
            } else if (type === 'days') {
                this.days++;
                if (this.days > 0) {
                    this.hours = 0;
                }
            }
            this.updateTotalPrice();
        },
        decrement(type) {
            if (type === 'hours' && this.hours > 0) {
                this.hours--;
            } else if (type === 'days' && this.days > 0) {
                this.days--;
            }
            this.updateTotalPrice();
        },
        handleCheckboxChange(clickeditem) {
            //console.log(clickeditem.name, 'is checked:', clickeditem.enable);

            if (clickeditem.enable) {
                this.total_price += Number(clickeditem.price);
            } else {
                this.total_price -= Number(clickeditem.price);
            }
        },
        formatStartDate(dateString) {
            const parts = dateString.split('/');
            const formattedDate = `${parts[2]}-${parts[0].padStart(2, '0')}-${parts[1].padStart(2, '0')}`;
            return formattedDate;
        },
        updateTotalPrice() {
            var me = this;
            var type = 'hour';
            var duration = me.hours;
            if (me.days > 0) {
                duration = me.days;
                type = 'day';
            }
            console.log("duration",duration);
            if (duration < 1) {
                return 0;
            }
            if (me.date !== "") {
                var total_price = 0;
                if (type == 'hour') {
                    var startDate = this.formatStartDate(me.date);
                    var isBook = true;
                    for (var ix in me.allEvents) {
                        var item = me.allEvents[ix];
                        var cur_date = item.start;
                        if (cur_date == startDate) {
                            total_price += parseFloat(item.price_per_hour);
                            if (item.active === 0) {
                                isBook = false
                            }
                        }
                    }
                    total_price = me.number * total_price * duration;
                }
                if (type == 'day') {
                    var startDate = this.formatStartDate(me.date);
                    //var endDate = new Date(startDate + (86400000 * duration)).getTime();
                    var isBook = true;
                    for (var ix in me.allEvents) {
                        var item = me.allEvents[ix];
                        var cur_date = item.start;
                        //cur_date >= startDate && cur_date < endDate
                        console.log("item.price_per_day",item.price_per_day);
                        if (cur_date == startDate) {
                            total_price += parseInt(item.price_per_day);
                            if (item.active === 0) {
                                isBook = false
                            }
                        }
                    }
                    total_price = me.number * total_price * duration;
                    console.log("total_price in day",total_price);
                }
              

                for (var ix in me.booking_data.extra_price) {
                    var item = me.booking_data.extra_price[ix];
                    if (!item.price) continue;
                    var type_total = 0;
                    if (item.enable == 1) {
                        switch (item.type) {
                            case "one_time":
                                type_total += parseFloat(item.price) * me.number;
                                break;
                        }
                        total_price += type_total;
                    }
                }
                this.total_price = total_price;

                var total_fee = 0;
                for (var ix in me.booking_data.buyer_fees) {
                    var item = me.booking_data.buyer_fees[ix];
                    if (!item.price) continue;

                    //for Fixed
                    var fee_price = parseFloat(item.price);

                    //for Percent
                    if (typeof item.unit !== "undefined" && item.unit === "percent") {
                        fee_price = (total_price / 100) * fee_price;
                    }

                    total_fee += fee_price;
                }
                total_price += total_fee;
                this.total_price = total_price;
            }
            console.log("total price in update", this.total_price);
        },
        bookNow() {
            if (!this.date) {
                this.isRequired = true;
                return false;
            }
            this.isRequired = false;
            this.buttonLoading = true;
            this.updateTotalPrice();

            console.log("total price", this.total_price);
            var formatted_date = this.formatStartDate(this.date);
            const selectedExtras = this.booking_data.extra_price;

            var bookingDetails = {
                service_id: this.data.id,
                service_type: "boat",
                start_date: formatted_date,
                hour: this.hours,
                day: this.days,
                start_time: this.startTime,
                number: 1,
                extra_price: selectedExtras,
                //buyerFees: this.booking_data.buyer_fees,
            };

            console.log('Booking Details:', bookingDetails, "total_price", this.total_price);
            this.addToCart(bookingDetails);
        }
    }
}
</script>