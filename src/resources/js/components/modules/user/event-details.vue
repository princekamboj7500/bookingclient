<template>
    <div v-if="isLoading" id="loader"></div>
    <div v-else class="bravo_wrap">
        <div class="bravo_detail_event">
            <topbar></topbar>
            <breadcrumb :type="type" :breadcrumb-data="breadcrumbData" />
            <!-- <div class="bravo_banner"
                style="background-image: url('http://127.0.0.1:8000/uploads/demo/event/banner-detail/banner-event-3.jpg')">
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
                            <div class="g-event-feature">
                                <div class="row">
                                    <div class="col-xs-6 col-lg-3 col-md-6">
                                        <div class="item">
                                            <div class="icon">
                                                <i class="icofont-heart-beat"></i>
                                            </div>
                                            <div class="info">
                                                <h4 class="name">Wishlist</h4>
                                                <p class="value">
                                                    People interest: 0
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xs-6 col-lg-3 col-md-6">
                                        <div class="item">
                                            <div class="icon">
                                                <i class="icofont-wall-clock"></i>
                                            </div>
                                            <div class="info">
                                                <h4 class="name">Start Time</h4>
                                                <p class="value">
                                                    {{ data.start_time }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xs-6 col-lg-3 col-md-6">
                                        <div class="item">
                                            <div class="icon">
                                                <i class="icofont-infinite"></i>
                                            </div>
                                            <div class="info">
                                                <h4 class="name">Duration</h4>
                                                <p class="value">
                                                    {{ data.duration }}
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
                                    <div id="bravo_event_book_app">
                                        <div class="tour-sale-box"><span class="sale_class box_sale sale_small">{{
                                            data.discount_percent }}</span></div>
                                        <div class="form-head">
                                            <div class="price">
                                                <span class="label">from</span>
                                                 <span class="value">
                                                    <!-- <span class="onsale">${{ data.price
                                                        }}
                                                    </span> 
                                                    <span class="text-lg">${{ data.sale_price
                                                        }}
                                                    </span> -->
                                                    <span class="text-lg">${{ data.price
                                                        }}
                                                    </span>
                                                </span>
                                            </div>
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
                                                    <div v-for="(item, index) in ticket_types" :key="index"
                                                        class="form-group form-guest-search">
                                                        <div
                                                            class="guest-wrapper d-flex justify-content-between align-items-center">
                                                            <div class="flex-grow-1">
                                                                <label>{{ item.name }}</label>
                                                                <div class="render check-in-render"></div>
                                                                <div class="render check-in-render">{{
                                                                    item.display_price }} per ticket</div>
                                                            </div>
                                                            <div class="flex-shrink-0">
                                                                <div class="input-number-group">
                                                                    <i class="icon ion-ios-remove-circle-outline"
                                                                        @click="decrement(index)"></i>
                                                                    <span class="input"><input type="number"
                                                                            v-model="item.number" min="1"></span>
                                                                    <i class="icon ion-ios-add-circle-outline"
                                                                        @click="increment(index)"></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-section-group form-group" v-if="booking_time_slots">
                                                    <h4 class="form-section-title">Start Time:</h4>
                                                    <div class="slots-wrapper d-flex justify-content-start flex-wrap">
                                                        <div @click="selectStartTime(time)"
                                                            :class="{ 'btn-success': isInArray(time) == true }"
                                                            v-for="(time, index) in booking_time_slots"
                                                            class="btn btn-sm mr-2 mb-2 w-25">@{{ time }}</div>
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
            type: 'Event',
            serviceType: "event",
            eventName: this.$route.params.event || null,
            data: [],
            is_fixed_date: true,
            extra_price: [],
            guests: [],
            ticket_types: [],
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
            date: '',
            total_price: 0,
            booking_time_slots: "",
            select_start_time: [],
        }
    },
    mounted() {
        console.log('event detail Component mounted.');
        this.getData(this.eventName);
    },
    computed: {

    },
    methods: {
        getData(event) {
            this.isLoading = true;
            console.log(event, "event")
            axios.get(`/api/user/event/${event}`).then(({ data }) => {
                console.log("api event-detail-data", data);
                this.data = data.data.row;
                this.author = data.data.author;
                this.images = data.data.gallery_images;
                this.booking_data = data.data.booking_data;
                this.ticket_types = this.booking_data.ticket_types;
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
            for (let ix in this.ticket_types) {
                let person_type = this.ticket_types[ix];
                if (person_type.number > 0) {
                    person_type.number = 0;
                }
            }
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

            axios.get('/user/event/availability/loadDates', { params }).then(({ data }) => {
                //console.log("api availability data", data);
                this.allEvents = data;
                this.isShowCalLoading = false;
                console.log("api availability data", this.allEvents);
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
            this.ticket_types[index].number++;
            this.updateTotalPrice();
        },
        decrement(index) {
            if (this.ticket_types[index].number == 0) {
                this.ticket_types[index].number = 0;
            }
            this.ticket_types[index].number--;
            this.updateTotalPrice();
        },
        updateTotalPrice() {
            this.total_price = 0;
            let total_tickets = 0;
            let startDate = this.formatCalenderDate(this.date);

            if (this.booking_data.booking_type === "ticket") {
                if (this.ticket_types != null) {
                    for (let ix in this.ticket_types) {
                        let person_type = this.ticket_types[ix];
                        if (person_type.number > 0) {
                            this.total_price += parseFloat(person_type.price) * parseInt(person_type.number);
                            total_tickets += parseInt(person_type.number);
                        }
                    }
                }
            }

            if (this.booking_data.booking_type === "time_slot") {
                if (this.select_start_time.length < 1) {
                    return 0;
                }
                for (let ix in this.allEvents) {
                    let item = this.allEvents[ix];
                    let cur_date = item.start;
                    if (cur_date === startDate) {
                        this.total_price += parseFloat(item.price) * this.select_start_time.length;
                    }
                }
                total_tickets = this.select_start_time.length;
            }

            const selectedExtras = this.booking_data.extra_price.filter(item => item.enable);
            selectedExtras.map((item) => {
                //this.total_price += Number(item.price);
                var type_total = 0;
                if (item.enable == 1) {
                    switch (item.type) {
                        case "one_time":
                            type_total += parseFloat(item.price);
                            break;
                        case "per_hour":
                            if (this.data.duration > 0) {
                                type_total += parseFloat(item.price) * parseFloat(this.data.duration);
                            }
                            break;
                    }
                    if (typeof item.per_ticket !== "undefined") {
                        type_total = type_total * total_tickets;
                    }
                    this.total_price += type_total;
                }
            });
            var total_fee = 0;
            this.booking_data.buyer_fees.map((item) => {
                //for Fixed
                var fee_price = parseFloat(item.price);

                //for Percent
                if (typeof item.unit !== "undefined" && item.unit === "percent") {
                    fee_price = (total / 100) * fee_price;
                } else {
                    //for Fixed and per_ticket
                    if (typeof item.per_ticket !== "undefined") {
                        fee_price = fee_price * total_tickets;
                    }
                }

                total_fee += fee_price;
            });
            this.total_price += total_fee;
        },
        bookNow() {
            if (!this.date) {
                this.isRequired = true;
                this.errorMsg = "Please select Start date";
                return false;
            }
            this.isRequired = false;
            this.buttonLoading = true;
            this.updateTotalPrice();

            console.log("total price", this.total_price, this.ticket_types);
            var formatted_date = this.formatStartDate(this.date);
            const selectedExtras = this.booking_data.extra_price;
            const bookingDetails = {
                service_id: this.data.id,
                service_type: "event",
                start_date: formatted_date,
                ticket_types: this.booking_data.ticket_types,
                extra_price: selectedExtras,
                //buyerFees: this.booking_data.buyer_fees,
                step: 1
            };

            console.log("total price", this.total_price);
            console.log('Booking Details:', bookingDetails);
            this.addToCart(bookingDetails);
        }
    }
}
</script>