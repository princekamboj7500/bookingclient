<template>
    <div class="bravo_search_car">
        <topbar></topbar>
        <breadcrumb :type="type" :breadcrumb-data="breadcrumbData" />
        <div class="bravo_banner" style="background-image: url(/uploads/demo/hotel/banner-search-hotel.jpg)">
            <div class="container">
                <h1>
                    Search for Car
                </h1>
            </div>
        </div>
        <div class="bravo_form_search">
            <div class="container" v-if="list_location">
                <searchwidget :location-list="list_location" :type="type" :price-range-array="priceRange" @search="updateSearchParams"></searchwidget>
            </div>
        </div>
        <div class="container">
            <div v-if="isLoading" id="loader"></div>
            <div v-else class="row">
                <div class="col-lg-3 col-md-12">
                    <filterwidget :filter-attributes="attributes" :is-tour="false" :type="type"
                        :min-price-range="minPrice" :max-price-range="maxPrice" :price-range-array="priceRange" @filter="updateFilterParams"/>
                </div>
                <div class="col-lg-9 col-md-12">

                    <div class="bravo-list-item">
                        <div class="topbar-search">
                            <h2 class="text result-count">
                                {{ total }} cars found
                            </h2>
                            <div class="control bc-form-order">
                                <div class="item">
                                    <a href="/car?_layout=map">Show on the map</a>
                                </div>
                                <div>
                                    <orderby :price-range-array="priceRange" @orderby="updateOrderParams"></orderby>
                                </div>
                            </div>
                        </div>
                        <div class="ajax-search-result">
                            <div class="list-item">
                                <div class="row">
                                    <div v-for="item in paginatedData" :key="item.id" class="col-lg-4 col-md-6">
                                        <div class="item-loop item-loop-wrap">
                                            <div class="featured" v-if="item.is_featured == 1">
                                                Featured
                                            </div>
                                            <div class="thumb-image ">
                                                <router-link :to="{ name: 'carDetail', params:{car :item.slug} }" class="btn btn-info">
                                                    <img class="img-responsive lazy loaded" :src=item.feature_image_url
                                                    alt="LUXURY SINGLE">
                                                  </router-link>
                                                <div class="service-wishlist " data-id="9" data-type="car">
                                                    <i class="fa fa-heart-o"></i>
                                                </div>
                                            </div>
                                            <div class="item-title">
                                                <a :href="`/${item.slug}`">
                                                    <i class="fa fa-bolt d-none"></i>
                                                    {{ item.title }}
                                                </a>
                                            </div>
                                            <div class="location" v-if="item.location_id">
                                                {{ item.location.name }}
                                            </div>
                                            <div class="amenities">
                                                <span v-if="item.passenger" class="amenity total" data-toggle="tooltip"
                                                    title="" data-original-title="Passenger">
                                                    <i class="input-icon field-icon icon-passenger  "></i>
                                                    <span class="text">
                                                        {{ item.passenger }}
                                                    </span>
                                                </span>
                                                <span v-if="item.gear" class="amenity bed" data-toggle="tooltip"
                                                    title="" data-original-title="Gear Shift">
                                                    <i class="input-icon field-icon icon-gear"></i>
                                                    <span class="text">
                                                        {{ item.gear }}
                                                    </span>
                                                </span>
                                                <span v-if="item.baggage" class="amenity bath" data-toggle="tooltip"
                                                    title="" data-original-title="Baggage">
                                                    <i class="input-icon field-icon icon-baggage"></i>
                                                    <span class="text">
                                                        {{ item.baggage }}
                                                    </span>
                                                </span>
                                                <span v-if="item.door" class="amenity size" data-toggle="tooltip"
                                                    title="" data-original-title="Door">
                                                    <i class="input-icon field-icon icon-door"></i>
                                                    <span class="text">
                                                        {{ item.door }}
                                                    </span>
                                                </span>
                                            </div>
                                            <div class="info">
                                                <div class="g-price">
                                                    <div class="prefix">
                                                        <span class="fr_text">from</span>
                                                    </div>
                                                    <div class="price">
                                                        <template v-if="item.sale_price == 0">
                                                            <span class="text-price">
                                                                ${{ formatPrice(item.price) }}
                                                                <span class="unit">/day</span>
                                                            </span>
                                                        </template>
                                                        <template v-else>
                                                            <span class="onsale">${{ formatPrice(item.price) }}</span>
                                                            <span class="text-price">
                                                                ${{ formatPrice(item.sale_price) }}
                                                                <span class="unit">/day</span>
                                                            </span>
                                                        </template>
                                                    </div>
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
                                    Cars</span>
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
            type: "car",
            showDropdown: false,
            isLoading: false,
            selected: {},
            dropdownOpenRecomended: false,
            selectedLabel: 'Recommended',
            options: [
                { value: '', label: 'Recommended' },
                { value: 'price_low_high', label: 'Price (Low to high)' },
                { value: 'price_high_low', label: 'Price (High to low)' },
                { value: 'rate_high_low', label: 'Rating (High to low)' }
            ],
            breadcrumbData: [],
        }
    },
    mounted() {
        this.getCarData();
        //console.log('car Component mounted.');
    },
    computed: {

    },
    watch: {
        data(newData) {
            this.totalPages = Math.ceil(newData.length / this.pageSize);
        }
    },
    methods: {
        getCarData(params = {}) {
            this.isLoading = true;
            axios.get('/api/user/car-list', { params }).then(({ data }) => {
                console.log("api car-list data", data.data);
                this.data = data.data.rows;
                this.attributes = data.data.attributes;
                this.list_location = data.data.list_location;
                this.total = data.data.rows.length;
                if (data.data.car_min_max_price.length > 0) {
                    // Update min and max prices
                    this.minPrice = parseFloat(data.data.car_min_max_price[0]);
                    this.maxPrice = parseFloat(data.data.car_min_max_price[1]);

                    // Update price range after min and max are set
                    this.priceRange = [this.minPrice, this.maxPrice];
                }
                this.isLoading = false;
            }).catch(error => {
                console.error("Error fetching in data:", error);
            });
        },
        onSearch(params) {
            console.log("params in event component",params);
            this.getCarData(params);
        },
        updateSearchParams(params) {
            this.searchParams = { ...this.searchParams, ...params };
            this.onSearch(this.searchParams);
        },
        updateFilterParams(params) {
            this.searchParams = { ...this.searchParams, ...params };
            this.onSearch(this.searchParams);
        },
        updateOrderParams(params){
            this.searchParams = { ...this.searchParams, ...params };
            this.onSearch(this.searchParams);
        }
    }
}
</script>

<style scoped>
.bravo-autocomplete {
    opacity: 1 !important;
    visibility: unset !important;
}

span.count-string {
    float: right;
    padding-top: 20px;
}

button.btn.btn-link.btn-apply-price-range {
    margin-top: 30px !important;
}
</style>
