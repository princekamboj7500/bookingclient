<template>
    <div v-if="isLoading" id="loader"></div>
    <div v-else class="bravo_wrap">
        <div class="bravo_detail_space">
            <topbar></topbar>
            <breadcrumb :type="type" :breadcrumb-data="breadcrumbData" />
            <!-- <div class="bravo_banner"
                style="background-image: url('http://127.0.0.1:8000/uploads/demo/tour/banner-detail/banner-tour-6.jpg')">
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
                            <div class="g-space-feature">
                                <div class="row">
                                    <div class="col-xs-6 col-lg-3 col-md-6">
                                        <div class="item">
                                            <div class="icon">
                                                <i class="icofont-hotel"></i>
                                            </div>
                                            <div class="info">
                                                <h4 class="name">No. Bed</h4>
                                                <p class="value">
                                                    {{ data.bed }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xs-6 col-lg-3 col-md-6">
                                        <div class="item">
                                            <div class="icon">
                                                <i class="icofont-bathtub"></i>
                                            </div>
                                            <div class="info">
                                                <h4 class="name">No. Bathroom</h4>
                                                <p class="value">
                                                    {{ data.bathroom }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xs-6 col-lg-3 col-md-6">
                                        <div class="item">
                                            <div class="icon">
                                                <i class="icofont-ruler-compass-alt"></i>
                                            </div>
                                            <div class="info">
                                                <h4 class="name">Square</h4>
                                                <p class="value">
                                                    {{ data.square }} sqft
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xs-6 col-lg-3 col-md-6">
                                        <div class="item">
                                            <div class="icon">
                                                <i class="icofont-island-alt"></i>
                                            </div>
                                            <div class="info" v-if="data.location_id">
                                                <h4 class="name">Location</h4>
                                                <p class="value">
                                                    {{ data.location.name }}
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
                                <h3>Description</h3>
                                <div class="description">
                                    <div v-for="item in parsedContent" :key="item.content">
                                        <p v-if="item.type === 'paragraph'">{{ item.content }}</p>
                                        <h4 v-if="item.type === 'heading'">{{ item.content }}</h4>
                                        <ul v-if="item.type === 'list'">
                                            <li v-for="(listItem, index) in item.items" :key="index">{{ listItem }}</li>
                                        </ul>
                                    </div>
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
                            <div class="bravo_single_book_wrap ">
                                <div class="bravo_single_book">
                                    <div id="bravo_tour_book_app">
                                        <div class="tour-sale-box"><span
                                                class="sale_class box_sale sale_small">81%</span></div>
                                        <div class="form-head">
                                            <div class="price"><span class="label">
                                                    from
                                                </span> <span class="value"><span class="onsale">${{ data.price
                                                        }}</span> <span class="text-lg">${{ data.sale_price
                                                        }}</span></span></div>
                                        </div>
                                        <div class="nav-enquiry">
                                            <div class="enquiry-item active"><span>Book</span></div>
                                            <div data-toggle="modal" data-target="#enquiry_form_modal"
                                                class="enquiry-item"><span>Enquiry</span></div>
                                        </div>
                                        <div class="form-book">
                                            <div class="form-content">
                                                <div data-format="MM/DD/YYYY"
                                                    class="form-group form-date-field form-date-search clearfix ">
                                                    <div class="date-wrapper clearfix">
                                                        <div class="check-in-wrapper">
                                                            <label>Select Dates</label>
                                                            <date-picker v-model="dateFromTo" value-type="MM/DD/YYYY"
                                                                :disabled-date="notBeforeToday" type="date" range
                                                                placeholder="Select date range"
                                                                @focus="onDatePickerClick"
                                                                @change="dateChanged"></date-picker>
                                                                <i class="fa fa-spinner fa-spin" v-if="isShowCalLoading"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div class="form-group form-guest-search">
                                                        <div
                                                            class="guest-wrapper d-flex justify-content-between align-items-center">
                                                            <div class="flex-grow-1">
                                                                <label>Adults</label>
                                                                <div class="render check-in-render">Ages 12+</div>
                                                                <div class="render check-in-render">$1,000 per person
                                                                </div>
                                                            </div>
                                                            <div class="flex-shrink-0">
                                                                <div class="input-number-group">
                                                                    <i class="icon ion-ios-remove-circle-outline"
                                                                        @click="decrement('adults')"></i>
                                                                    <span class="input"><input type="number"
                                                                            v-model="adults" min="1"></span>
                                                                    <i class="icon ion-ios-add-circle-outline"
                                                                        @click="increment('adults')"></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="form-group form-guest-search">
                                                        <div
                                                            class="guest-wrapper d-flex justify-content-between align-items-center">
                                                            <div class="flex-grow-1">
                                                                <label>Children</label>
                                                                <div class="render check-in-render">Ages 2–12</div>
                                                                <div class="render check-in-render">$300 per person
                                                                </div>
                                                            </div>
                                                            <div class="flex-shrink-0">
                                                                <div class="input-number-group">
                                                                    <i class="icon ion-ios-remove-circle-outline"
                                                                        @click="decrement('children')"></i>
                                                                    <span class="input"><input type="number"
                                                                            v-model="children" min="1"></span>
                                                                    <i class="icon ion-ios-add-circle-outline"
                                                                        @click="increment('children')"></i>
                                                                </div>
                                                            </div>
                                                        </div>
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
                                                <p v-if="booking_data.max_guests"><i>{{ booking_data.max_guests }}
                                                        Guests in maximum</i></p>
                                                <a name="submit" class="btn btn-large btn-primary" @click="bookNow">
                                                    <span>BOOK NOW</span>
                                                    <i class="fa fa-spinner fa-spin" v-if="buttonLoading"></i>
                                                </a>
                                                <div class="alert-text mt10 danger" v-if="isRequired">{{ errorMsg }}
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
                    <div class="row end_tour_sticky">
                        <div class="bravo-list-space-related">
                            <h2>You might also like</h2>
                            <div class="row">
                                <div class="col-md-3" v-for="item in space_related" :key="item.id">
                                    <div class="item-loop item-loop-wrap ">
                                        <div class="featured" v-if="item.is_featured == 1">
                                            Featured
                                        </div>
                                        <div class="thumb-image ">
                                            <router-link :to="{ name: 'spaceDetail', params: { space: item.slug } }"
                                                class="btn btn-info">
                                                <img class="img-responsive lazy loaded" :src=item.feature_image_url
                                                    alt="LUXURY SINGLE">
                                            </router-link>
                                            <div class="price-wrapper">
                                                <div class="price">
                                                    <template v-if="item.sale_price == 0">
                                                        <span class="text-price">
                                                            ${{ formatPrice(item.price) }}
                                                            <span class="unit"
                                                                v-if="item.booking_type_shift == 'by_day'">/day</span>
                                                            <span class="unit" v-else>/night</span>
                                                        </span>
                                                    </template>
                                                    <template v-else>
                                                        <span class="onsale">${{ formatPrice(item.price) }}</span>
                                                        <span class="text-price">
                                                            ${{ formatPrice(item.sale_price) }}
                                                            <span class="unit"
                                                                v-if="item.booking_type_shift == 'by_day'">/day</span>
                                                            <span class="unit" v-else>/night</span>
                                                        </span>
                                                    </template>
                                                </div>
                                            </div>
                                            <div class="service-wishlist " data-id="9" data-type="space">
                                                <i class="fa fa-heart"></i>
                                            </div>
                                        </div>
                                        <div class="item-title">
                                            <a :href="`/${item.slug}`">
                                                <i class="fa fa-bolt d-none"></i>
                                                {{ item.title }}
                                            </a>
                                            <div class="sale_info" v-if="item.discount_percent">{{
                                                item.discount_percent }}</div>
                                        </div>
                                        <div class="location" v-if="item.location_id">
                                            {{ item.location.name }}
                                        </div>
                                        <div class="service-review">
                                            <span class="rate">{{ item.review_data.score_total }}/5
                                                <span class="rate-text">{{ item.review_data.score_text }}
                                                </span>
                                            </span>
                                            <span class="review">
                                                <span v-if="item.review_data.total_review > 1">
                                                    {{ item.review_data.total_review }} Reviews
                                                </span>
                                                <span v-else>
                                                    {{ item.review_data.total_review }} Review
                                                </span>
                                            </span>
                                        </div>
                                        <div class="amenities">
                                            <span v-if="item.max_guests" class="amenity total" data-toggle="tooltip"
                                                title="No. People" data-original-title="No. People">
                                                <i class="input-icon field-icon icofont-people  "></i> {{
                                                    item.max_guests }}
                                            </span>
                                            <span v-if="item.bed" class="amenity bed" data-toggle="tooltip"
                                                title="No. Bed" data-original-title="No. Bed">
                                                <i class="input-icon field-icon icofont-hotel"></i> {{ item.bed }}
                                            </span>
                                            <span v-if="item.bathroom" class="amenity bath" data-toggle="tooltip"
                                                title="No. Bathroom" data-original-title="No. Bathroom">
                                                <i class="input-icon field-icon icofont-bathtub"></i> {{
                                                    item.bathroom }}
                                            </span>
                                            <span v-if="item.square" class="amenity size" data-toggle="tooltip"
                                                title="Square" data-original-title="Square">
                                                <i class="input-icon field-icon icofont-ruler-compass-alt"></i> {{
                                                    item.square }} sqft
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
import moment from 'moment';
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
            type: 'Space',
            serviceType: "space",
            spaceName: this.$route.params.space || null,
            data: [],
            is_fixed_date: true,
            extra_price: [],
            guests: [],
            person_types: [],
            total_price: 0,
            enquiry_is_submit: false,
            breadcrumbData: [],
            recommend_percent: 0,
            includeTitle: '',
            translation: {},
            attributes: {},
            bottomData: {},
            isBottomData: false,
            review_data: {},
            space_related: [],
            booking_data: {},
            date: null,
            adults: 1,
            children: 0,
            previousDates: { startDate: null, endDate: null },
        }
    },
    mounted() {
        console.log('space detail Component mounted.');
        this.getData(this.spaceName);
    },
    computed: {

    },
    methods: {
        getData(space) {
            this.isLoading = true;
            console.log("space", space)
            axios.get(`/api/user/space/${space}`).then(({ data }) => {
                console.log("api space-detail-data", data);
                this.data = data.data.row;
                this.author = data.data.author;
                this.images = data.data.gallery_images;
                this.booking_data = data.data.booking_data;
                this.space_related = data.data.space_related;
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

            axios.get('/user/space/availability/loadDates', { params }).then(({ data }) => {
                //console.log("api availability data", data);
                this.allEvents = data;
                console.log("api availability data", this.allEvents);
                this.isShowCalLoading = false;
            }).catch(error => {
                this.isShowCalLoading = false;
                console.error("Can not get availability:", error);
            });
        },
        handleCheckboxChange(clickeditem) {
            //console.log(clickeditem.name, 'is checked:', clickeditem.enable);

            if (clickeditem.enable) {
                this.total_price += Number(clickeditem.price);
            } else {
                this.total_price -= Number(clickeditem.price);
            }
        },
        increment(type) {
            if (type === 'adults' && this.totalGuests() < this.booking_data.max_guests) {
                this.adults++;
            } else if (type === 'children' && this.totalGuests() < this.booking_data.max_guests) {
                this.children++;
            }
        },
        decrement(type) {
            if (type === 'adults' && this.adults > 1) {
                this.adults--;
            } else if (type === 'children' && this.children > 0) {
                this.children--;
            }
        },
        totalGuests() {
            return this.adults + this.children;
        },
        updateTotalPrice() {
            let startDate = this.formatCalenderDate(this.dateFromTo[0]);
            let endDate = this.formatCalenderDate(this.dateFromTo[1]);

            // Check if dates have changed
            if (this.previousDates.startDate === startDate && this.previousDates.endDate === endDate) {
                return; 
            }

            // Update previousDates with the new dates
            this.previousDates.startDate = startDate;
            this.previousDates.endDate = endDate;

            this.total_price = 0;
            console.log("totalprice", this.total_price, this.booking_data.booking_type);


            var isBook = true;
            var guests = parseInt(this.children) + parseInt(this.adults);

            if (this.booking_data.booking_type === "by_day") {
                for (var ix in this.allEvents) {
                    var item = this.allEvents[ix];
                    var cur_date = item.start;
                    if (startDate == endDate) {
                        if (cur_date >= startDate && cur_date <= endDate) {
                            this.total_price += parseFloat(item.price);
                            if (item.active === 0) {
                                isBook = false
                            }
                        }
                    } else {
                        if (cur_date >= startDate && cur_date <= endDate) {
                            this.total_price += parseFloat(item.price);
                            if (item.active === 0) {
                                isBook = false
                            }
                        }
                    }
                }
            }

            var duration_in_hour = moment(endDate).diff(moment(startDate), 'hours') + 24;
            var duration_in_day = moment(endDate).diff(moment(startDate), 'days') + 1;

            if (this.booking_data.booking_type === "by_night") {
                for (var ix in this.allEvents) {
                    var item = this.allEvents[ix];
                    var cur_date = item.start;
                    if (cur_date >= startDate && cur_date < endDate) {
                        this.total_price += parseFloat(item.price);
                        if (item.active === 0) {
                            isBook = false
                        }
                    }
                }
                duration_in_hour -= 24
                duration_in_day -= 1
            }
    
            const selectedExtras = this.booking_data.extra_price.filter(item => item.enable);
            console.log("selectedExtras",selectedExtras);
            selectedExtras.map((item) => {

                //if(!item.price) continue;
                var type_total = 0;
                if (item.enable == 1) {
                    switch (item.type) {
                        case "one_time":
                            //type_total += parseFloat(item.price);
                            type_total += parseFloat(item.price);
                            break;
                        case "per_hour":
                            type_total += parseFloat(item.price) * Math.max(duration_in_hour, 24);
                            break;
                        case "per_day":
                            type_total += parseFloat(item.price) * Math.max(1, duration_in_day);
                            break;
                    }
                    if (typeof item.per_person !== "undefined") {
                        type_total = type_total * guests;
                    }
                    //total_price += type_total;
                    this.total_price += type_total;
                }
            });
            var total_fee = 0;
            this.booking_data.buyer_fees.map((item) => {
                var fee_price = parseFloat(item.price);

                //for Percent
                if (typeof item.unit !== "undefined" && item.unit === "percent") {
                    fee_price = (this.total_price / 100) * fee_price;
                }

                if (typeof item.per_person !== "undefined") {
                    fee_price = fee_price * guests;
                }
                total_fee += fee_price;
            });
            this.total_price += total_fee;

        },
        bookNow() {
            if (this.dateFromTo.length == 0) {
                this.isRequired = true;
                this.errorMsg = "Please select Start and End date";
                return false;
            }
            this.isRequired = false;
            this.buttonLoading = true;
            this.updateTotalPrice();

            console.log("total price", this.total_price, this.data.booking_type_shift);

            const selectedExtras = this.booking_data.extra_price;
            const bookingDetails = {
                service_id: this.data.id,
                service_type: "space",
                start_date: this.formatStartDate(this.dateFromTo[0]),
                end_date: this.formatStartDate(this.dateFromTo[1]),
                extra_price: selectedExtras,
                adults: this.adults,
                children: this.children,
                //buyerFees: this.booking_data.buyer_fees,
            };

            console.log("total price", this.total_price);
            console.log('Booking Details:', bookingDetails);
            this.addToCart(bookingDetails);
        }
    }
}
</script>
<style scoped></style>