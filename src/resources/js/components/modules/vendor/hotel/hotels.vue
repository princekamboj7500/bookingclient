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
                            <userbc :breadcrumbs="breadcrumbs"/>
                            <!-- @yield('content') -->
                            <div>
                                <h2 class="title-bar border-bottom">
                                    {{ title }}
                                    <router-link :to="{ name: 'vendorHotelCreate' }" v-if="canCreate && !isRecovery"
                                        class="btn-change-password">
                                        Add Hotel
                                    </router-link>
                                </h2>
                                <message-component v-if="message" :message="message"></message-component>
                                <div v-if="isLoading" id="loader"></div>
                                <div v-else-if="hotels.length">
                                    <div class="list-item">
                                        <div class="row">
                                            <div class="col-md-12" v-for="hotel in paginatedHotels" :key="hotel.id">
                                                <div class="item-list">
                                                    <div v-if="hotel.discount_percent" class="sale_info">{{
                                                        hotel.discount_percent }}</div>
                                                    <div class="row">
                                                        <div class="col-md-3">
                                                            <div v-if="hotel.is_featured == '1'" class="featured">
                                                                Featured
                                                            </div>
                                                            <div class="thumb-image">
                                                                <a href="javascript:void(0)" target="_blank">
                                                                    <img v-if="hotel.banner_image_id"
                                                                        :src="imageUrls[hotel.banner_image_id]"
                                                                        class="img-responsive" alt="" />
                                                                </a>
                                                                <div class="service-wishlist" :data-id="hotel.id"
                                                                    :data-type="hotel.type">
                                                                    <i class="fa fa-heart"></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-9">
                                                            <div class="item-title">
                                                                <a href="javascript:void(0)" target="_blank"
                                                                    style="color: #1A2B50;text-decoration: none;">
                                                                    {{ hotel.title }}
                                                                </a>
                                                            </div>
                                                            <div class="location"
                                                                v-if="hotel.location && hotel.location.name">
                                                                <i class="icofont-paper-plane"></i>
                                                                Location: <span>{{ hotel.location.name }}</span>
                                                            </div>
                                                            <div class="location">
                                                                <i class="icofont-money"></i>
                                                                Price: <span v-if="hotel.price" class="price">${{
                                                                    hotel.price }}</span>
                                                                <span v-else class="price">{{ hotel.display_price_admin
                                                                    }}</span>
                                                            </div>
                                                            <div class="location">
                                                                <i class="icofont-ui-settings"></i>
                                                                Status: <span
                                                                    :class="['badge', `badge-${hotel.status}`]">{{
                                                                        hotel.status }}</span>
                                                            </div>
                                                            <div class="location">
                                                                <i class="icofont-wall-clock"></i>
                                                                Last Updated: <span>{{ displayDateTime(hotel.updated_at
                                                                    ||
                                                                    hotel.created_at) }}</span>
                                                            </div>
                                                            <div class="control-action">
                                                                <template v-if="isRecovery">
                                                                    <button @click="restore(hotel.id)"
                                                                        class="btn btn-recovery btn-primary">
                                                                        Recovery
                                                                    </button>
                                                                    <button v-if="hasPermission('hotel_delete')"
                                                                        @click="permanentlyDelete(hotel.id)"
                                                                        class="btn btn-danger">
                                                                        Del
                                                                    </button>
                                                                </template>
                                                                <template v-else>
                                                                    <a :href="`/hotel/${hotel.slug}`" target="_blank"
                                                                        class="btn btn-info">View</a>
                                                                    <button v-if="hasPermission('hotel_update')"
                                                                        @click="edit(hotel.id)"
                                                                        class="btn btn-warning">Edit</button>
                                                                    <button v-if="hasPermission('hotel_create')"
                                                                        @click="clone(hotel.id)"
                                                                        class="btn btn-info">Clone</button>
                                                                    <button v-if="hasPermission('hotel_delete')"
                                                                        @click="deleteHotel(hotel.id)"
                                                                        class="btn btn-danger">Del</button>
                                                                    <button v-if="hotel.status == 'publish'"
                                                                        @click="makeHide(hotel.id)"
                                                                        class="btn btn-secondary">Make hide</button>
                                                                    <button v-if="hotel.status == 'draft'"
                                                                        @click="makePublish(hotel.id)"
                                                                        class="btn btn-success">Make publish</button>
                                                                </template>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="pagination">
                                        <button class="prevPage" :disabled="currentPage === 1">Previous</button>
                                        <button v-for="page in totalPages" :key="page" @click="changePage(page)"
                                            :class="{ active: currentPage === page }">
                                            {{ page }}
                                        </button>
                                        <button class="nextPage" @click="nextPage" :disabled="currentPage === totalPages">Next</button>
                                    </div>
                                </div>
                                <div v-else>
                                    No Hotels
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
import Sidebar from '../sidebar.vue';
import userbc from '../user-bc.vue';
import common from '../common';

export default {
    components: {
        Sidebar,
        userbc
    },
    mixins: [common],
    data() {
        return {
            isRecovery: false,
            canCreate: false,
            message: null,
            hotels: [],
            //imageUrls: {},
            currentPage: 1,
            itemsPerPage: 5,
            breadcrumbs: [],
        };
    },
    computed: {
        title() {
            return this.isRecovery ? 'Recovery Hotels' : 'Manage Hotels';
        },
        totalPages() {
            return Math.ceil(this.hotels.length / this.itemsPerPage);
        },
        paginatedHotels() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.hotels.slice(start, end);
        },
    },
    mounted() {
        this.canCreate = true;
        this.checkRecoveryMode();
    },
    watch: {
        '$route.query.page': 'checkRecoveryMode'
    },
    methods: {
        checkRecoveryMode() {
            if (this.$route.query.page === 'recovery') {
                this.isRecovery = true;
                this.recoveryHotels();
            } else {
                this.isRecovery = false;
                this.fetchHotels();
            }
        },
        fetchHotels() {
            axios.get('/api/vendor/hotel').then(({ data }) => {
                console.log("api message data", data.data);
                this.hotels = data.data.rows.data;
                this.breadcrumbs = data.data.breadcrumbs;
                this.hotels.forEach(hotel => {
                    if (hotel.banner_image_id) {
                        this.getImageList(hotel.banner_image_id);
                    }
                });
                this.isLoading = false;
            }).catch(error => {
                this.isLoading = false;
                console.error("Error fetching in data:", error);
            });
        },
        recoveryHotels() {
            axios.get('/api/vendor/hotel-recovery').then(({ data }) => {
                console.log("api message data", data.data);
                this.hotels = data.data.rows.data;
                this.hotels.forEach(hotel => {
                    if (hotel.banner_image_id) {
                        this.getImageList(hotel.banner_image_id);
                    }
                });
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
        displayDateTime(date) {
            // Implement your datetime formatting function
            return new Date(date).toLocaleString();
        },
        hasPermission(permission) {
            // Implement your permission checking logic
            return true;
        },
        restore(id) {
            // hotel-restore
            axios.get(`/api/vendor/hotel-restore/${id}`).then((response) => {
                console.log("response", response.data);
                this.recoveryHotels();
            }).catch(error => {
                console.error("Error fetching image data:", error.response ? error.response.data : error.message);
            });
        },
        permanentlyDelete(id) {
            // ?permanently_delete=1
            console.log("in delete");
            axios.get(`/api/vendor/del/${id}?permanently_delete=1`).then((response) => {
                console.log("delete success", response);
                this.recoveryHotels();
            }).catch(error => {
                console.error("Error fetching image data:", error);
                return null;
            });
        },
        edit(id) {
            this.$router.push({ name: 'vendorHotelCreate', params: { id } });
        },
        clone(id) {

            console.log("post data", id);
            axios.post(`/api/vendor/bulkEdit/${id}?action=clone`).then(response => {
                console.log("api response => ", response.data);

                if (response.status == 200) {
                    this.fetchHotels();
                }
            }).catch(({ response }) => {
                alert(response.data.message)
            }).finally(() => {

            })
        },
        deleteHotel(id) {
            console.log("in delete");
            axios.get(`/api/vendor/del/${id}`).then(({ response }) => {
                console.log("delete success", response);
                this.fetchHotels();
            }).catch(error => {
                console.error("Error fetching image data:", error);
                return null;
            });
        },
        makeHide(id) {
            console.log("post data", id);
            axios.post(`/api/vendor/bulkEdit/${id}?action=make-hide`).then(response => {
                console.log("api response => ", response.data);

                if (response.status == 200) {
                    this.fetchHotels();
                }
            }).catch(({ response }) => {
                alert(response.data.message)
            }).finally(() => {

            })
        },
        makePublish(id) {
            console.log("post data", id);
            axios.post(`/api/vendor/bulkEdit/${id}?action=make-publish`).then(response => {
                console.log("api response => ", response.data);

                if (response.status == 200) {
                    this.fetchHotels();
                }
            }).catch(({ response }) => {
                alert(response.data.message)
            }).finally(() => {

            })
        },
    }
}
</script>
<style scoped>
.control-action {
    text-align: right;
    margin-right: 15px;
    position: absolute;
    right: 13px;
    bottom: 15px;
}

.item-list {
    border: 1px solid #dfdfdf;
    border-radius: 3px;
    overflow: hidden;
    position: relative;
    margin-bottom: 30px;
}

</style>
