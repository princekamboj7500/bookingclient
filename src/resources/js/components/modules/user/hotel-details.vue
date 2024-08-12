<template>
    <div v-if="isLoading" id="loader"></div>
    <div v-else class="bravo_wrap">
        <div class="bravo_detail_hotel">
            <topbar></topbar>
            <breadcrumb :type="type" :breadcrumb-data="breadcrumbData" />
            <!-- <div class="bravo_banner"
                style="background-image: url('http://127.0.0.1:8000/uploads/demo/hotel/hotel-featured-4.jpg')">
                <div class="container">
                    
                </div>
            </div> -->

            <div class="bravo_content">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12 col-lg-9">
                            <div class="g-header">
                                <div class="left">
                                    <div class="star-rate">
                                        <div v-for="n in data.star_rate">
                                            <i class="fa fa-star"></i>
                                        </div>
                                    </div>
                                    <h1>{{ data.title }}</h1>
                                    <h2 class="address"><i class="fa fa-map-marker"></i>
                                        {{ data.address }}
                                    </h2>
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
                                        <div class="foot">
                                            {{ recommend_percent }}% of guests recommend
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
                                                    href="https://www.facebook.com/sharer/sharer.php?u=http://127.0.0.1:8000/hotel/dylan-hotel&amp;title=Dylan Hotel"
                                                    target="_blank" rel="noopener" original-title="Facebook">
                                                    <i class="fa fa-facebook fa-lg"></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a class="twitter"
                                                    href="https://twitter.com/share?url=http://127.0.0.1:8000/hotel/dylan-hotel&amp;title=Dylan Hotel"
                                                    target="_blank" rel="noopener" original-title="Twitter">
                                                    <i class="fa fa-twitter fa-lg"></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="service-wishlist " data-id="10" data-type="hotel">
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
                            <div id="hotel-rooms" class="hotel_rooms_form">
                                <h3 class="heading-section">Available Rooms</h3>
                                <div class="nav-enquiry">
                                    <div class="enquiry-item active">
                                        <span>Book</span>
                                    </div>
                                    <div class="enquiry-item" data-toggle="modal" data-target="#enquiry_form_modal">
                                        <span>Enquiry</span>
                                    </div>
                                </div>
                                <div class="form-book">
                                    <div class="form-search-rooms">
                                        <div class="d-flex form-search-row">
                                            <div class="col-md-4">
                                                <div class="form-group form-date-field form-date-search ">
                                                    <i class="fa fa-angle-down arrow"></i>
                                                    <input type="text" class="start_date" ref="start_date"
                                                        style="height: 1px; visibility: hidden">
                                                    <div class="date-wrapper form-content">
                                                        <label class="form-label">Check In - Out</label>
                                                        <date-picker v-model="dateFromTo" value-type="MM/DD/YYYY"
                                                            :disabled-date="notBeforeToday" type="date" range
                                                            placeholder="Select date range"></date-picker>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <i class="fa fa-angle-down arrow"></i>
                                                    <div class="form-content dropdown-toggle" data-toggle="dropdown">
                                                        <label class="form-label">Guests</label>
                                                        <div class="render">
                                                            <span class="adults">
                                                                <span class="one">{{ adults }}
                                                                    <span>Adult</span>
                                                                </span>
                                                            </span>
                                                            -
                                                            <span class="children">
                                                                <span class="one">{{ children }}
                                                                    <span>Child</span>
                                                                </span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div class="dropdown-menu select-guests-dropdown">
                                                        <div class="dropdown-item-row">
                                                            <div class="label">Adults</div>
                                                            <div class="val">
                                                                <span class="btn-minus2" data-input="adults"
                                                                    @click="decrement('adults')"><i
                                                                        class="icon ion-md-remove"></i></span>
                                                                <span class="count-display"><input type="number"
                                                                        v-model="adults" min="1" /></span>
                                                                <span class="btn-add2" data-input="adults"
                                                                    @click="increment('adults')"><i
                                                                        class="icon ion-ios-add"></i></span>
                                                            </div>
                                                        </div>
                                                        <div class="dropdown-item-row">
                                                            <div class="label">Children</div>
                                                            <div class="val">
                                                                <span class="btn-minus2" data-input="children"
                                                                    @click="decrement('children')"><i
                                                                        class="icon ion-md-remove"></i></span>
                                                                <span class="count-display"><input type="number"
                                                                        v-model="children" min="0" /></span>
                                                                <span class="btn-add2" data-input="children"
                                                                    @click="increment('children')"><i
                                                                        class="icon ion-ios-add"></i></span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                            <div class="col-md-4 col-btn">
                                                <div class="g-button-submit">
                                                    <button @click="checkAvailability"
                                                        class="btn btn-primary btn-search">
                                                        Check Availability 
                                                        <i class="fa fa-spinner fa-spin" v-if="buttonLoading"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="start_room_sticky"></div>
                                    <div class="hotel_list_rooms">
                                        <div class="row">
                                            <div class="col-md-12" :class="data.address">
                                                <div class="room-item" v-for="(room, index) in rooms" :key="index">
                                                    <div class="col-md-12">
                                                        <div class="room-item">
                                                            <div class="row">
                                                                <div class="col-xs-12 col-md-3">
                                                                    <div class="image">
                                                                        <img :src=room.room_image_url alt="">
                                                                    </div>
                                                                </div>
                                                                <div class="col-xs-12 col-md-6">
                                                                    <div class="hotel-info">
                                                                        <h3 class="room-name">{{ room.title }}</h3>
                                                                        <ul class="room-meta">
                                                                            <li>
                                                                                <div data-toggle="tooltip"
                                                                                    data-placement="top" title=""
                                                                                    data-original-title="Room Footage"
                                                                                    class="item"><i
                                                                                        class="input-icon field-icon icofont-ruler-compass-alt"></i>
                                                                                    <span>{{ room.size }}</span>
                                                                                </div>
                                                                            </li>
                                                                            <li>
                                                                                <div data-toggle="tooltip"
                                                                                    data-placement="top" title=""
                                                                                    data-original-title="No. Beds"
                                                                                    class="item"><i
                                                                                        class="input-icon field-icon icofont-hotel"></i>
                                                                                    <span>x{{ room.beds }}</span>
                                                                                </div>
                                                                            </li>
                                                                            <li>
                                                                                <div data-toggle="tooltip"
                                                                                    data-placement="top" title=""
                                                                                    data-original-title="No. Adults"
                                                                                    class="item"><i
                                                                                        class="input-icon field-icon icofont-users-alt-4"></i>
                                                                                    <span>x{{ room.adults }}</span>
                                                                                </div>
                                                                            </li>
                                                                            <li>
                                                                                <div data-toggle="tooltip"
                                                                                    data-placement="top" title=""
                                                                                    data-original-title="No. Children"
                                                                                    class="item"><i
                                                                                        class="input-icon field-icon fa-child fa"></i>
                                                                                    <span>x{{ room.children }}</span>
                                                                                </div>
                                                                            </li>
                                                                        </ul>
                                                                        <div class="room-attribute-item">
                                                                            <ul>
                                                                                <li><i data-toggle="tooltip"
                                                                                        data-placement="top"
                                                                                        title="Wake-up call"
                                                                                        class="input-icon field-icon icofont-wall-clock"></i>
                                                                                </li>
                                                                                <li><i data-toggle="tooltip"
                                                                                        data-placement="top"
                                                                                        title="Flat Tv"
                                                                                        class="input-icon field-icon icofont-imac"></i>
                                                                                </li>
                                                                                <li><i data-toggle="tooltip"
                                                                                        data-placement="top"
                                                                                        title="Laundry and dry cleaning"
                                                                                        class="input-icon field-icon icofont-recycle-alt"></i>
                                                                                </li>
                                                                                <li><i data-toggle="tooltip"
                                                                                        data-placement="top"
                                                                                        title="Coffee and tea"
                                                                                        class="input-icon field-icon icofont-tea"></i>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-3"
                                                                    v-if="rooms_booking_data.length > 0">
                                                                    <div class="col-price clear">
                                                                        <div class="text-center">
                                                                            <span class="price">{{
                                                                                rooms_booking_data[index].price_text
                                                                            }}</span>
                                                                        </div>
                                                                        <select class="custom-select" v-model="rooms_booking_data[index].number_selected" @change="onRoomSelect(index)">
                                                                            <option value="0">0</option>
                                                                            <option
                                                                                v-for="i in rooms_booking_data[index].tmp_number"
                                                                                :key="i" :value="i">{{ i }} room (${{ i
                                                                                    * rooms_booking_data[index].price }})
                                                                            </option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="total_rooms > 0" class="hotel_room_book_status" style="width: auto;">
                                        <div class="row row_extra_service">
                                            <div class="col-md-12">
                                                <div class="form-section-group"><label>Extra prices:</label>
                                                    <div class="row">
                                                        <div v-for="(item, index) in booking_data.extra_price" :key="index" class="col-md-6 extra-item">
                                                            <div
                                                                class="extra-price-wrap d-flex justify-content-between">
                                                                <div class="flex-grow-1">
                                                                    <label>
                                                                    <input type="checkbox" v-model="item.enable"
                                                                        :true-value="1" :false-value="0"
                                                                        @change="handleCheckboxChange(item)"> {{
                                                                            item.name
                                                                        }}
                                                                </label>
                                                                </div>
                                                                <div class="flex-shrink-0">{{ item.price_html }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row row_total_price">
                                            <div class="col-md-6">
                                                <div class="extra-price-wrap d-flex justify-content-between">
                                                    <div class="flex-grow-1"><label>
                                                            Total Room:
                                                        </label></div>
                                                    <div class="flex-shrink-0">
                                                        {{ total_rooms }}
                                                    </div>
                                                </div>
                                                <div  v-for="(item, index) in booking_data.buyer_fees" :key="index" class="extra-price-wrap d-flex justify-content-between">
                                                    <div class="flex-grow-1">
                                                        <label>{{ item.type_name }}
                                                            <i data-toggle="tooltip" data-placement="top"
                                                                title="" class="icofont-info-circle"
                                                                data-original-title="This helps us run our platform and offer services like 24/7 support on your trip."></i>
                                                        </label>
                                                    </div>
                                                    <div class="flex-shrink-0">
                                                        <div class="unit">
                                                            ${{ item.price }}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="extra-price-wrap d-flex justify-content-between is_mobile">
                                                    <div class="flex-grow-1"><label>
                                                            Total Price:
                                                        </label></div>
                                                    <div class="total-room-price">${{ total_price }}</div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="control-book">
                                                    <div class="total-room-price"><span> Total Price:</span> ${{ total_price }}
                                                    </div> 
                                                    <button @click="bookNow" type="button" name="submit"
                                                        class="btn btn-primary"><span>Book Now</span> <i
                                                            class="fa fa-spinner fa-spin" v-if="buttonLoading"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <enquiryModal :service-id="data.id" :service-type="serviceType"></enquiryModal>
                                <div class="g-all-attribute is_mobile" style="display: none;">
                                    <div class="g-attributes property-type attr-5" v-for="attr in datas.attributes">
                                        <h3 class="testrrr">{{ attr.name }}</h3>
                                        <div class="list-attributes" v-for="term in attr.terms">
                                            <div class="item apartments term-32">
                                                <i class="icofont-check-circled icon-default"></i>
                                                {{ term.name }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="g-rules">
                                    <h3>Rules</h3>
                                    <div class="description">
                                        <div class="row">
                                            <div class="col-lg-4">
                                                <div class="key">Check In</div>
                                            </div>
                                            <div class="col-lg-8">
                                                <div class="value">{{ data.check_in_time }} </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-lg-4">
                                                <div class="key">Check Out</div>
                                            </div>
                                            <div class="col-lg-8">
                                                <div class="value">{{ data.check_out_time }} </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-lg-4">
                                                <div class="key">Hotel Policies</div>
                                            </div>
                                            <div class="col-lg-8">
                                                <div class="item" v-for="(line, index) in data.policy">
                                                    <div class="strong">{{ line.title }}</div>
                                                    <div class="context">{{ line.content }}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="bravo-hr"></div>

                                <div v-if="isBottomData">
                                    <detailBottom :type="type" :bottom-data="bottomData" />
                                </div>

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
                            <div class="bravo-list-hotel-related-widget">
                                <h3 class="heading">Related Hotel</h3>
                                <div class="list-item" v-for="item in hotel_related">
                                    <div class="item">
                                        <div class="media">
                                            <div class="media-left">
                                                <a :href="`/hotels/${item.slug}`">
                                                    <img class='img-responsive'
                                                        :src="item.hotel_image_url"
                                                        alt='Crowne Plaza Hotel'>
                                                </a>
                                            </div>
                                            <div class="media-body">
                                                <div class="star-rate">
                                                    <i class="fa fa-star" v-for="rate in item.star_rate"></i>
                                                </div>
                                                <h4 class="media-heading">
                                                    <a :href="`/hotels/${item.slug}`">
                                                        {{ item.title }}
                                                    </a>
                                                </h4>
                                                <div class="price-wrapper">
                                                    from
                                                    <span class="price">${{ item.price }}</span>
                                                    <span class="unit">/night</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="g-all-attribute is_pc">
                                <div class="g-attributes property-type attr-5" v-for="attr in datas.attributes">
                                    <h3>{{ attr.name }}</h3>
                                    <div class="list-attributes" v-for="term in attr.terms">
                                        <div class="item apartments term-32">
                                            <i v-if="term.name === 'Wake-up call'" class="icofont-wall-clock"></i>
                                            <i v-else-if="term.name === 'Car hire'" class="icofont-car-alt-3"></i>
                                            <i v-else-if="term.name === 'Flat Tv'" class="icofont-imac"></i>
                                            <i v-else-if="term.name === 'Laundry and dry cleaning'"
                                                class="icofont-recycle-alt"></i>
                                            <i v-else-if="term.name === 'Internet – Wifi'" class="icofont-wifi-alt"></i>
                                            <i v-else-if="term.name === 'Coffee and tea'" class="icofont-tea"></i>
                                            <i v-else-if="term.name === 'Bicycle hire'" class="icofont-bicycle"></i>
                                            <i v-else class="icofont-check-circled icon-default"></i>
                                            {{ term.name }}
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
import breadcrumb from './breadcrumb';
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css';
import common from './detail-common';
import * as VueGoogleMaps from 'vue2-google-maps';
import ImageSlider from './ImageSlider';
import detailBottom from './detail-bottom';
import enquiryModal from './enquiryModal';
import topbar from './topbar.vue';

export default {
    components: {
        VueSlider,
        'GmapMap': VueGoogleMaps.Map,
        'GmapMarker': VueGoogleMaps.Marker,
        breadcrumb,
        ImageSlider,
        detailBottom,
        enquiryModal,
        topbar
    },
    mixins: [common],
    props: ['hotelData'],
    data() {
        return {
            type: 'Hotel',
            serviceType: "hotel",
            hotelName: this.$route.params.hotel || null,
            data: [],
            datas: [],
            totalStars: 5,
            zoom: 12,
            center: { lat: null, lng: null },
            markers: [
                { position: { lat: null, lng: null } },
            ],
            breadcrumbData: [],
            recommend_percent: 0,
            review_data: {},
            parsedContent: [],
            bottomData: {},
            isBottomData: false,
            hotel_related: [],
            rooms: [],
            hotel_id: null,
            adults: 1,
            children: 0,
            rooms_booking_data: [],
            booking_data: {},
            total_price: 0,
            isRequired: false
        }
    },
    watch: {
        '$route.params.id': function (newId) {
            this.hotelName = newId;
            console.log('Hotel ID changed to:', newId);
        }
    },

    mounted() {
        console.log('Hotel ID on creation:', this.hotelName);
        console.log('loop grid Component mounted.');
        this.getData(this.hotelName)
    },

    computed: {
        total_rooms:function(){
            if (this.dateFromTo[0] !== "") {
                var t = 0;
                this.rooms_booking_data.map(item => {
                    if(item.number_selected){
                        t += parseInt(item.number_selected);
                    }
                })
                return t;
            }
            return 0;
        }
    },
    methods: {
        getData(hotel) {
            this.isLoading = true;
            console.log(hotel, "hotel")
            axios.get(`/api/user/hotel/${hotel}`).then(({ data }) => {
                console.log("api hotel-detail-data", data);
                console.log("data.row.star_rate__:", data.row.star_rate)
                this.datas = data;
                this.rooms = data.row.rooms;
                this.booking_data = data.booking_data;
                this.hotel_id = data.row.id;
                this.data = data.row;
                this.hotel_related = data.hotel_related;
                this.author = data.author;
                this.images = data.gallery_images;
                this.parsedContent = this.parseHTML(this.data.content);
                this.recommend_percent = data.recommend_percent;
                this.review_data = data.review_data;
                this.breadcrumbData = data.breadcrumbs;
                this.markers[0].position.lat = parseFloat(data.row.map_lat);
                this.markers[0].position.lng = parseFloat(data.row.map_lng);
                this.center.lat = parseFloat(data.row.map_lat);
                this.center.lng = parseFloat(data.row.map_lng);
                this.bottomData = {
                    faqs: [],
                    review_list: data.review_list,
                    review_data: this.review_data,
                    map_lat: data.row.map_lat,
                    map_lng: data.row.map_lng,
                    //cancel_policy: data.data.translation.cancel_policy,
                    //terms_information: this.parseHTML(data.data.translation.terms_information)
                }
                this.isBottomData = true;
                this.isLoading = false;
            }).catch(error => {
                this.isLoading = false;
                console.error("Error fetching in data:", error);
            });
        },
        stripHTMLTags(html) {
            const doc = new DOMParser().parseFromString(html, 'text/html');
            return doc.body.textContent || "";
        },
        formatDateTime(dateTime) {
            let date = new Date(dateTime);
            // Extract date components
            let month = date.getMonth() + 1;
            let day = date.getDate();
            let year = date.getFullYear();
            let hours = date.getHours();
            let minutes = date.getMinutes();
            // Ensure two-digit formatting where necessary
            month = month < 10 ? '0' + month : month;
            day = day < 10 ? '0' + day : day;
            hours = hours < 10 ? '0' + hours : hours;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            // Return formatted string
            return `${month}/${day}/${year} ${hours}:${minutes}`;
        },
        increment(type) {
            if (type === 'adults') {
                this.adults++;
            } else if (type === 'children') {
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
        handleCheckboxChange(clickeditem) {
            //console.log(clickeditem.name, 'is checked:', clickeditem.enable);

            if (clickeditem.enable) {
                this.total_price += Number(clickeditem.price);
            } else {
                this.total_price -= Number(clickeditem.price);
            }
        },
        checkAvailability() {
            //console.log("dateFromTo", this.dateFromTo);
            //console.log("start_date",this.formatStartDate(this.dateFromTo[0]));
            //console.log("adults",this.adults,"children",this.children);
            //return false;
            this.buttonLoading = true;
            var formData = {
                hotel_id: this.hotel_id,
                start_date: this.formatStartDate(this.dateFromTo[0]),
                end_date: this.formatStartDate(this.dateFromTo[1]),
                firstLoad: false,
                adults: this.adults,
                children: this.children,
            }

            axios.post(`/hotel/checkAvailability`, formData).then(response => {
                console.log("api response => ", response.data);

                if (response.status == 200) {
                    this.rooms_booking_data = response.data.rooms;
                    console.log("data =>", response.data.rooms);
                }
                this.buttonLoading = false;
            }).catch(({ response }) => {
                this.buttonLoading = false;
                alert(response.data.message)
            });

        },
        onRoomSelect(index) {
            const selectedValue = this.rooms_booking_data[index].number_selected;
            console.log(`Room index: ${index}, Selected number: ${selectedValue}`);
            //console.log("rooms data",this.rooms_booking_data);
            //this.total_rooms = selectedValue;
            this.updateTotalPrice();
        },
        updateTotalPrice() {
            var me = this;
            if (me.dateFromTo[0] !== "" && me.total_rooms > 0) {
                var guests = me.children + me.adults;
                var total_price = 0;
                var startDate = this.formatStartDate(this.dateFromTo[0]);
                var endDate = this.formatStartDate(this.dateFromTo[1]);
                console.log("startDate",startDate);
                console.log("endDate",endDate);
              
                this.rooms_booking_data.map(item => {
                    if(item.number_selected){
                        total_price += item.price* parseInt(item.number_selected);
                    }
                });

                //var duration_in_day = moment(endDate).diff(moment(startDate), 'days');
                const start = new Date(startDate);
                const end = new Date(endDate);
                const timeDifference = end - start; // difference in milliseconds
                var duration_in_day = timeDifference / (1000 * 3600 * 24); // convert milliseconds to days
                console.log("duration_in_day",duration_in_day);
                for (var ix in me.booking_data.extra_price) {
                    var item = me.booking_data.extra_price[ix];
                    if(!item.price) continue;
                    var type_total = 0;
                    if (item.enable == 1) {
                        switch (item.type) {
                            case "one_time":
                                type_total += parseFloat(item.price);
                                break;
                            case "per_day":
                                type_total += parseFloat(item.price) * Math.max(1,duration_in_day);
                                break;
                        }
                        if (typeof item.per_person !== "undefined") {
                            type_total = type_total * guests;
                        }
                        total_price += type_total;
                    }
                }
                this.total_price = total_price;

                var total_fee = 0;
                for (var ix in me.booking_data.buyer_fees) {
                    var item = me.booking_data.buyer_fees[ix];

                    if(!item.price) continue;

                    //for Fixed
                    var fee_price = parseFloat(item.price);

                    //for Percent
                    if (typeof item.unit !== "undefined" && item.unit === "percent" ) {
                        fee_price = ( total_price / 100 ) * fee_price;
                    }

                    if (typeof item.per_person !== "undefined") {
                        fee_price = fee_price * guests;
                    }
                    total_fee += fee_price;
                }
                total_price += total_fee;
                this.total_price = total_price;

                console.log("total price in update",this.total_price);
            }else{
                this.total_price = 0;
            }

        },
        bookNow() {
            this.isRequired = false;
            this.buttonLoading = true;
            this.updateTotalPrice();

            console.log("total price", this.total_price);
            const selectedExtras = this.booking_data.extra_price;
            const rooms = this.rooms_booking_data.map(room => {
                return {
                    id: room.id,
                    number_selected: room.number_selected
                };
            });
            var bookingDetails = {
                service_id: this.data.id,
                service_type: "hotel",
                start_date: this.formatStartDate(this.dateFromTo[0]),
                end_date: this.formatStartDate(this.dateFromTo[1]),
                extra_price: selectedExtras,
                adults: this.adults,
                children: this.children,
                rooms: rooms,
                //buyerFees: this.booking_data.buyer_fees,
            };

            console.log('Booking Details:', bookingDetails, "total_price", this.total_price);
            this.addToCart(bookingDetails);
        }
    }
}
</script>
<style scoped>
.mx-datepicker-range {
    width: 280px !important;
}

.media-heading img {
    height: 62%;
    width: 8% !important;
}

.star-rate {
    display: flex;
}

.nav-enquiry {
    background: #F9F9F9;
    padding: 20px;
    border-bottom: solid 1px #d7dce3;
    display: flex;
    border-top: solid 5px #5191fa;
    border-left: solid 1px #d7dce3;
    border-right: solid 1px #d7dce3;
}

.enquiry-item {
    flex: 0 0 50%;
    text-align: center;
}

.enquiry-item.active span {
    border-bottom: solid 1px #5191FA;
    color: #5191FA;
}

.form-search-rooms {
    border: 1px solid #D7DCE3;
    border-bottom: 5px solid #5191FA;
    margin-bottom: 25px;
}

button.btn.btn-primary.btn-search {
    width: 100%;
    height: 100%;
    border-radius: 0;
}

.col-md-4.col-btn {
    padding: 0;
    border-radius: 0;
}

.room-item .row {
    width: 100%;
    position: relative;
    left: 12px;
}

.hotel_rooms_form .hotel_list_rooms .room-item {
    border: none;
}

.room-item .col-md-12 {
    padding-right: 0px;
    padding-left: 0px;
}

.room-attribute-item ul {
    padding-left: 0rem;
}
</style>
