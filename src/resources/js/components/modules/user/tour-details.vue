<template>
    <div v-if="isLoading" id="loader"></div>
    <div v-else class="bravo_wrap">
        <div class="bravo_detail_tour">
            <topbar></topbar>
            <breadcrumb :type="type" :breadcrumb-data="breadcrumbData" />
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
                                                <span class="head-rating">{{ review_data.review_text ?
                                                    review_data.review_text : 'Excellent' }}</span>
                                                <span class="text-rating">from {{ review_data.total_review }}
                                                    reviews</span>
                                            </div>
                                            <div class="score">{{ review_data.score_total }}<span>/5</span></div>
                                        </div>
                                        <div class="foot">{{ recommend_percent }}% of guests recommend</div>
                                    </div>
                                </div>
                            </div>
                            <div class="g-tour-feature">
                                <div class="row">
                                    <div class="col-xs-6 col-lg-3 col-md-6">
                                        <div class="item">
                                            <div class="icon">
                                                <i class="icofont-wall-clock"></i>
                                            </div>
                                            <div class="info">
                                                <h4 class="name">Duration</h4>
                                                <p class="value">{{ data.duration }} Hours</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xs-6 col-lg-3 col-md-6">
                                        <div class="item">
                                            <div class="icon">
                                                <i class="icofont-beach"></i>
                                            </div>
                                            <div class="info">
                                                <h4 class="name">Tour Type</h4>
                                                <p class="value">Escorted tour</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xs-6 col-lg-3 col-md-6">
                                        <div class="item">
                                            <div class="icon">
                                                <i class="icofont-travelling"></i>
                                            </div>
                                            <div class="info">
                                                <h4 class="name">Group Size</h4>
                                                <p v-if="data.max_people > 1" class="value">{{ data.max_people }}
                                                    persons</p>
                                                <p v-else class="value">{{ data.max_people }} person</p>
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
                                                <p class="value">{{ data.location.name }}</p>
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
                            <div class="g-itinerary">
                                <h3>Itinerary</h3>
                                <carousel :autoplay="false" :nav="true" :dots="true">
                                    <div v-for="(item, index) in data.itinerary" :key="index" class="item"
                                        style="margin-right: 10px;">
                                        <img src="http://127.0.0.1:8000/uploads/demo/location/location-5.jpg"
                                            alt="Itinerary Image">
                                        <div class="header overlay">
                                            <div class="item-title">{{ item.day }}</div>
                                            <div class="item-desc">{{ item.location }}</div>
                                        </div>
                                        <div class="body">
                                            <div class="item-title">{{ item.day }}</div>
                                            <div class="item-desc">{{ item.location }}</div>
                                            <div class="item-context">{{ item.description }}</div>
                                        </div>
                                    </div>
                                </carousel>
                            </div>
                            <div class="g-attributes travel-styles attr-1">
                                <h3>Travel Styles</h3>
                                <div class="list-attributes">
                                    <div class="item cultural term-1">
                                        <i class="icofont-check-circled icon-default"></i>
                                        Cultural
                                    </div>
                                    <div class="item nature-adventure term-2">
                                        <i class="icofont-check-circled icon-default"></i>
                                        Nature &amp; Adventure
                                    </div>
                                    <div class="item marine term-3">
                                        <i class="icofont-check-circled icon-default"></i>
                                        Marine
                                    </div>
                                    <div class="item independent term-4">
                                        <i class="icofont-check-circled icon-default"></i>
                                        Independent
                                    </div>
                                    <div class="item activities term-5">
                                        <i class="icofont-check-circled icon-default"></i>
                                        Activities
                                    </div>
                                    <div class="item festival-events term-6">
                                        <i class="icofont-check-circled icon-default"></i>
                                        Festival &amp; Events
                                    </div>
                                </div>
                            </div>
                            <div class="g-attributes facilities attr-2">
                                <h3>Facilities</h3>
                                <div class="list-attributes">
                                    <div class="item gymnasium term-9">
                                        <i class="icofont-check-circled icon-default"></i>
                                        Gymnasium
                                    </div>
                                    <div class="item mountain-bike term-10">
                                        <i class="icofont-check-circled icon-default"></i>
                                        Mountain Bike
                                    </div>
                                    <div class="item satellite-office term-11">
                                        <i class="icofont-check-circled icon-default"></i>
                                        Satellite Office
                                    </div>
                                    <div class="item staff-lounge term-12">
                                        <i class="icofont-check-circled icon-default"></i>
                                        Staff Lounge
                                    </div>
                                    <div class="item golf-cages term-13">
                                        <i class="icofont-check-circled icon-default"></i>
                                        Golf Cages
                                    </div>
                                    <div class="item aerobics-room term-14">
                                        <i class="icofont-check-circled icon-default"></i>
                                        Aerobics Room
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
                                                src="../../../../../assets/images/ico-vefified-1.svg" title=""
                                                alt="Verified" data-original-title="verified">
                                            <img v-else data-toggle="tooltip" data-placement="top"
                                                src="../../../../../assets/images/ico-not-vefified-1.svg" title=""
                                                alt="Verified" data-original-title="Not verified">
                                        </h4>
                                        <p>Member Since {{ formatDate(author.created_at) }}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="bravo_single_book_wrap ">
                                <div class="bravo_single_book">
                                    <div id="bravo_tour_book_app">
                                        <div class="tour-sale-box"><span class="sale_class box_sale sale_small">{{
                                            data.discount_percent }}</span></div>
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
                                                    class="form-group form-date-field form-date-search clearfix">
                                                    <div class="date-wrapper clearfix">
                                                        <div class="check-in-wrapper">
                                                            <label>Start Date</label>
                                                            <date-picker v-model="date" value-type="MM/DD/YYYY"
                                                                :disabled-date="notBeforeToday" type="date"
                                                                placeholder="Select start date"
                                                                @focus="onDatePickerClick"
                                                                @change="dateChanged"></date-picker>
                                                                <i class="fa fa-spinner fa-spin" v-if="isShowCalLoading"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div v-for="(item, index) in person_types" :key="index"
                                                        class="form-group form-guest-search">
                                                        <div
                                                            class="guest-wrapper d-flex justify-content-between align-items-center">
                                                            <div class="flex-grow-1">
                                                                <label>{{ item.name }}</label>
                                                                <div class="render check-in-render">{{ item.desc }}
                                                                </div>
                                                                <div class="render check-in-render">${{ item.price }}
                                                                    per person</div>
                                                            </div>
                                                            <div class="flex-shrink-0">
                                                                <div class="input-number-group">
                                                                    <i class="icon ion-ios-remove-circle-outline"
                                                                        @click="decrement(index)"></i>
                                                                    <span class="input"><input type="number"
                                                                            v-model="item.number" :min="item.min"
                                                                            :max="item.max"></span>
                                                                    <i class="icon ion-ios-add-circle-outline"
                                                                        @click="increment(index)"></i>
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
                        <div class="col-md-12">
                            <div class="bravo-list-tour-related">
                                <h2>You might also like</h2>
                                <div class="row">
                                    <div class="col-md-3" v-for="item in tour_related" :key="item.id">
                                        <div class="item-tour item-loop-wrap">
                                            <div class="featured" v-if="item.is_featured == 1">
                                                Featured
                                            </div>
                                            <div class="thumb-image">
                                                <div class="sale_info">{{ item.discount_percent }}</div>
                                                <router-link :to="{ name: 'tourDetail', params: { tour: item.slug } }"
                                                    class="btn btn-info">
                                                    <img class="img-responsive lazy loaded" :src=item.feature_image_url
                                                        alt="Eastern Discovery (Start New Orleans)">
                                                </router-link>
                                                <div class="service-wishlist " data-id="6" data-type="tour">
                                                    <i class="fa fa-heart"></i>
                                                </div>
                                            </div>
                                            <div class="location" v-if="item.location_id">
                                                <i class="icofont-paper-plane"></i>
                                                {{ item.location.name }}
                                            </div>
                                            <div class="item-title">
                                                <a :href="`/${item.slug}`">
                                                    {{ item.title }}
                                                </a>
                                            </div>
                                            <div :class="`service-review tour-review-${item.review_data.score_total}`">
                                                <div class="list-star">
                                                    <ul class="booking-item-rating-stars">
                                                        <li><i class="fa fa-star-o"></i></li>
                                                        <li><i class="fa fa-star-o"></i></li>
                                                        <li><i class="fa fa-star-o"></i></li>
                                                        <li><i class="fa fa-star-o"></i></li>
                                                        <li><i class="fa fa-star-o"></i></li>
                                                    </ul>
                                                    <div class="booking-item-rating-stars-active"
                                                        :style="{ width: `${item.review_data.score_total ? item.review_data.score_total * 2 * 10 : 0}%` }">
                                                        <ul class="booking-item-rating-stars">
                                                            <li><i class="fa fa-star"></i></li>
                                                            <li><i class="fa fa-star"></i></li>
                                                            <li><i class="fa fa-star"></i></li>
                                                            <li><i class="fa fa-star"></i></li>
                                                            <li><i class="fa fa-star"></i></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <span class="review">
                                                    <span v-if="item.review_data.total_review > 1">
                                                        {{ item.review_data.total_review }} Reviews
                                                    </span>
                                                    <span v-else>
                                                        {{ item.review_data.total_review }} Review
                                                    </span>
                                                </span>
                                            </div>
                                            <div class="info">
                                                <div class="duration">
                                                    <i class="icofont-wall-clock"></i>
                                                    {{ item.duration }}H
                                                </div>
                                                <div class="g-price">
                                                    <div class="prefix">
                                                        <i class="icofont-flash"></i>
                                                        <span class="fr_text">from</span>
                                                    </div>
                                                    <div class="price">
                                                        <span class="onsale">${{ formatPrice(item.price) }}</span>
                                                        <span class="text-price">${{ formatPrice(item.sale_price)
                                                            }}</span>
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
import Carousel from 'vue-owl-carousel';
import ImageSlider from './ImageSlider';
import loginmodal from './login-modal';
import enquiryModal from './enquiryModal';
import topbar from './topbar.vue';

export default {
    components: {
        breadcrumb,
        detailBottom,
        detailFooter,
        Carousel,
        ImageSlider,
        loginmodal,
        enquiryModal,
        topbar
    },
    mixins: [common],
    data() {
        return {
            type: 'Tour',
            serviceType: "tour",
            tourName: this.$route.params.tour || null,
            data: [],
            enquiry_type: 'enquiry',
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
            tour_related: [],
            booking_data: {},
            date: null,
            total_guests: 0,
        }
    },
    mounted() {
        console.log('tour detail Component mounted.');
        this.getData(this.tourName);
    },
    computed: {

    },
    methods: {
        getData(tour) {
            this.isLoading = true;
            console.log(tour, "tour")
            axios.get(`/api/user/tour/${tour}`).then(({ data }) => {
                console.log("api tour-detail-data", data);
                this.data = data.data.row;
                this.author = data.data.author;
                this.images = data.data.gallery_images;
                this.person_types = data.data.row.meta.person_types.map(person => ({
                    ...person,
                    number: person.name.toLowerCase() === 'adult' ? 1 : 0,
                }));
                this.booking_data = data.data.booking_data;
                this.tour_related = data.data.tour_related;
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
            if (this.person_types) {
                this.person_types.forEach((person_type) => {
                    person_type.number = person_type.name.toLowerCase() === 'adult' ? 1 : 0;
                    this.total_price += parseInt(person_type.price) * parseInt(person_type.number);
                });
            }
            this.updateTotalPrice();
        },
        onDatePickerClick() {
            console.log('Datepicker clicked!');
            // Add your custom logic here
            const currentDate = new Date();
            console.log("currentDate",currentDate);
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

            axios.get('/user/tour/availability/loadDates', { params }).then(({ data }) => {
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

            if (clickeditem.enable) {
                this.total_price += Number(clickeditem.price);
            } else {
                this.total_price -= Number(clickeditem.price);
            }
        },
        increment(index) {
            const item = this.person_types[index];
            if (item.number < item.max) {
                item.number++;
                this.updateTotalPrice();
            }
        },
        decrement(index) {
            const item = this.person_types[index];
            if (item.number > item.min) {
                item.number--;
                this.updateTotalPrice();
            }
        },
        updateTotalPrice() {
            this.total_price = 0;
            let total_guests = 0;

            // Calculate total price for person types
            if (this.person_types) {
                this.person_types.forEach((person_type) => {
                    this.total_price += parseInt(person_type.price) * parseInt(person_type.number);
                    total_guests += parseInt(person_type.number);
                });
            }

            // Calculate total price for selected extras
            const selectedExtras = this.booking_data.extra_price.filter((item) => item.enable);
            selectedExtras.forEach((item) => {
                let type_total = 0;
                switch (item.type) {
                    case 'one_time':
                        type_total += parseFloat(item.price);
                        break;
                    case 'per_hour':
                        if (this.duration > 0) {
                            type_total += parseFloat(item.price) * parseFloat(this.duration);
                        }
                        break;
                    case 'per_day':
                        if (this.duration > 0) {
                            type_total += parseFloat(item.price) * Math.ceil(parseFloat(this.duration) / 24);
                        }
                        break;
                }
                if (typeof item.per_person !== 'undefined') {
                    type_total *= total_guests;
                }
                this.total_price += type_total;
            });

            // Calculate total fee
            let total_fee = 0;
            this.booking_data.buyer_fees.forEach((item) => {
                let fee_price = parseFloat(item.price);
                if (typeof item.unit !== 'undefined' && item.unit === 'percent') {
                    fee_price = (this.total_price / 100) * fee_price;
                }
                if (typeof item.per_person !== 'undefined') {
                    fee_price *= total_guests;
                }
                total_fee += fee_price;
            });
            this.total_price += total_fee;
            this.total_guests = total_guests;
        },
        bookNow() {
            if (!this.date) {
                this.isRequired = true;
                this.errorMsg = 'Please select Start date';
                return false;
            }
            this.isRequired = false;
            this.buttonLoading = true;
            this.updateTotalPrice();  // Ensure total price is updated

            console.log('Total price', this.total_price);
            console.log('Person types', this.person_types);

            const selectedExtras = this.booking_data.extra_price;
            const bookingDetails = {
                service_id: this.data.id,
                service_type: 'tour',
                start_date: this.formatStartDate(this.date),
                person_types: this.person_types,
                extra_price: selectedExtras,
                guests: this.total_guests,
                //buyerFees: this.booking_data.buyer_fees,
            };

            console.log('Booking Details:', bookingDetails);
            this.addToCart(bookingDetails);
        },
    }
}
</script>

<style scoped>
.owl-next {
    position: absolute;
    left: 0;
    top: 25%;
}

.owl-prev {
    position: absolute;
    right: 0;
    top: 25%;
}
</style>