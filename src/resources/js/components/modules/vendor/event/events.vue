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
                                    <router-link :to="{ name: 'vendorEventsCreate' }" v-if="canCreate && !isRecovery"
                                        @click="addEvent" class="btn-change-password">
                                        Add Event
                                    </router-link>
                                </h2>
                                <message-component v-if="message" :message="message"></message-component>
                                <div v-if="isLoading" id="loader"></div>
                                <div v-else-if="events.length">
                                    <div class="list-item">
                                        <div class="row">
                                            <div class="col-md-12" v-for="event in paginatedEvents" :key="event.id">
                                                <div class="item-list">
                                                    <div class="row">
                                                        <div class="col-md-3">
                                                            <div class="thumb-image">
                                                                <a :href="`/event/${event.slug}`" target="_blank">
                                                                    <img :src="imageUrls[event.banner_image_id]" alt="event Image">
                                                                </a>
                                                                <div class="service-wishlist" :data-id="event.id"
                                                                    data-type="event">
                                                                    <i class="fa fa-heart"></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-9">
                                                            <div class="item-title">
                                                                <a :href="`/event/${event.slug}`" target="_blank">
                                                                    {{ event.title }}
                                                                </a>
                                                            </div>
                                                            <div class="location" v-if="event.location_id">
                                                                <i class="icofont-paper-plane"></i>
                                                                Location: {{ event.location.name }}
                                                            </div>
                                                            <div class="location">
                                                                <i class="icofont-money"></i>
                                                                Price: <span class="sale-price">${{ event.sale_price
                                                                    }}</span> <span class="price">${{ event.price
                                                                    }}</span>
                                                            </div>
                                                            <div class="location">
                                                                <i class="icofont-ui-settings"></i>
                                                                Status: <span class="badge badge-publish">{{
                                                                    event.status
                                                                    }}</span>
                                                            </div>
                                                            <div class="location">
                                                                <i class="icofont-wall-clock"></i>
                                                                Last Updated: {{ event.updated_at }}
                                                            </div>
                                                            <div class="control-action">
                                                                <template v-if="isRecovery">
                                                                    <button @click="restore(event.id)"
                                                                        class="btn btn-recovery btn-primary">
                                                                        Recovery
                                                                    </button>
                                                                    <button @click="permanentlyDelete(event.id)"
                                                                        class="btn btn-danger">
                                                                        Del
                                                                    </button>
                                                                </template>
                                                                <template v-else>
                                                                <a :href="`/event/${event.slug}`" target="_blank"
                                                                    class="btn btn-info">View</a>
                                                                <button @click="edit(event.id)"
                                                                    class="btn btn-warning">Edit</button>
                                                                <button @click="deleteEvent(event.id)"
                                                                    class="btn btn-danger">Del</button>
                                                                <button v-if="event.status === 'publish'"
                                                                    @click="makeHide(event.id)"
                                                                    class="btn btn-secondary">Make hide</button>
                                                                <button v-if="event.status === 'draft'"
                                                                    @click="makePublish(event.id)"
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
                                        <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
                                        <button v-for="page in totalPages" :key="page" @click="changePage(page)"
                                            :class="{ active: currentPage === page }">
                                            {{ page }}
                                        </button>
                                        <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
                                    </div>
                                </div>
                                <div v-else>
                                    No events
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
            events: [],
            currentPage: 1,
            itemsPerPage: 5,
            breadcrumbs: [],
        };
    },
    computed: {
        title() {
            return this.isRecovery ? 'Recovery Events' : 'Manage Events';
        },
        totalPages() {
            return Math.ceil(this.events.length / this.itemsPerPage);
        },
        paginatedEvents() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.events.slice(start, end);
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
                this.recoveryEvents();
            } else {
                this.isRecovery = false;
                this.fetchEvents();
            }
        },
        fetchEvents() {
            axios.get('/api/vendor/events').then(({ data }) => {
                console.log("api message data", data.data);
                this.events = data.data.rows;
                this.breadcrumbs = data.data.breadcrumbs;
                this.events.forEach(event => {
                    if (event.banner_image_id) {
                        this.getImageList(event.banner_image_id);
                    }
                });
                this.isLoading = false;
            }).catch(error => {
                this.isLoading = false;
                console.error("Error fetching in data:", error);
            });
        },
        addEvent() {
            // Navigate to the add tour page
            this.$router.push({ name: 'tourCreate' });
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
        edit(id) {
            this.$router.push({ name: 'vendorEventsCreate', params: { id } });
        },
        deleteEvent(id) {
            console.log("in delete");
            axios.get(`/api/vendor/del-event/${id}`).then(response => {
                console.log("delete success", response);
                this.fetchEvents();
            }).catch(error => {
                console.error("Error fetching image data:", error);
                return null;
            });
        },
        makeHide(id) {
            console.log("post data", id);
            axios.get(`/api/vendor/bulk-edit-event/${id}?action=make-hide`).then(response => {
                console.log("api response => ", response.data);

                if (response.status == 200) {
                    this.fetchEvents();
                }
            }).catch(({ response }) => {
                alert(response.data.message)
            }).finally(() => {

            })
        },
        makePublish(id) {
            console.log("post data", id);
            axios.get(`/api/vendor/bulk-edit-event/${id}?action=make-publish`).then(response => {
                console.log("api response => ", response.data);

                if (response.status == 200) {
                    this.fetchEvents();
                }
            }).catch(({ response }) => {
                alert(response.data.message)
            }).finally(() => {

            })
        },
        recoveryEvents() {
            axios.get('/api/vendor/event-recovery').then(({ data }) => {
                console.log("api message data", data.data);
                this.events = data.data.rows;
                this.events.forEach(event => {
                    if (event.banner_image_id) {
                        this.getImageList(event.banner_image_id);
                    }
                });
                this.isLoading = false;
            }).catch(error => {
                this.isLoading = false;
                console.error("Error fetching in data:", error);
            });
        },
        restore(id) {
            // tour-restore
            axios.get(`/api/vendor/event-restore/${id}`).then((response) => {
                console.log("response", response.data);
                this.recoveryEvents();
            }).catch(error => {
                console.error("Error fetching image data:", error.response ? error.response.data : error.message);
            });
        },
        permanentlyDelete(id) {
            // ?permanently_delete=1
            console.log("in delete");
            axios.get(`/api/vendor/del-event/${id}?permanently_delete=1`).then((response) => {
                console.log("delete success", response);
                this.recoveryEvents();
            }).catch(error => {
                console.error("Error :", error);
                return null;
            });
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
.sale-price {
    margin-right: 3px;
    text-decoration: line-through;
    font-size: 14px;
    color: #cc0033 !important;
    font-weight: 400;
}
</style>
