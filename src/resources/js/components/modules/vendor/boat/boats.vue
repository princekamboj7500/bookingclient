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
                                    <router-link :to="{ name: 'vendorBoatsCreate' }" v-if="canCreate && !isRecovery"
                                        @click="addBoat" class="btn-change-password">
                                        Add Boat
                                    </router-link>
                                </h2>
                                <message-component v-if="message" :message="message"></message-component>
                                <div v-if="isLoading" id="loader"></div>
                                <div v-else-if="boats.length">
                                    <div class="list-item">
                                        <div class="row">
                                            <div class="col-md-12" v-for="boat in paginatedBoats" :key="boat.id">
                                                <div class="item-list">
                                                    <div class="row">
                                                        <div class="col-md-3">
                                                            <div class="thumb-image">
                                                                <a :href="`/boat/${boat.slug}`" target="_blank">
                                                                    <img :src="imageUrls[boat.banner_image_id]" alt="boat Image">
                                                                </a>
                                                                <div class="service-wishlist" :data-id="boat.id"
                                                                    data-type="boat">
                                                                    <i class="fa fa-heart"></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-9">
                                                            <div class="item-title">
                                                                <a :href="`/boat/${boat.slug}`" target="_blank">
                                                                    {{ boat.title }}
                                                                </a>
                                                            </div>
                                                            <div class="location" v-if="boat.location_id">
                                                                <i class="icofont-paper-plane"></i>
                                                                Location: {{ boat.location.name }}
                                                            </div>
                                                            <div class="location">
                                                                <i class="icofont-money"></i>
                                                                Price per hour: <span class="price">${{ boat.price_per_hour }}</span> -
                                                                Price per day: <span class="price">${{ boat.price_per_day }}</span>
                                                            </div>

                                                            <div class="location">
                                                                <i class="icofont-ui-settings"></i>
                                                                Status: <span class="badge badge-publish">{{ boat.status
                                                                    }}</span>
                                                            </div>
                                                            <div class="location">
                                                                <i class="icofont-wall-clock"></i>
                                                                Last Updated: {{ boat.updated_at }}
                                                            </div>
                                                            <div class="control-action">
                                                                <template v-if="isRecovery">
                                                                    <button @click="restore(boat.id)"
                                                                        class="btn btn-recovery btn-primary">
                                                                        Recovery
                                                                    </button>
                                                                    <button @click="permanentlyDelete(boat.id)"
                                                                        class="btn btn-danger">
                                                                        Del
                                                                    </button>
                                                                </template>
                                                                <template v-else>
                                                                <a :href="`/boat/${boat.slug}`" target="_blank"
                                                                    class="btn btn-info">View</a>
                                                                <button @click="edit(boat.id)"
                                                                    class="btn btn-warning">Edit</button>
                                                                <button @click="deleteboat(boat.id)"
                                                                    class="btn btn-danger">Del</button>
                                                                <button v-if="boat.status === 'publish'"
                                                                    @click="makeHide(boat.id)"
                                                                    class="btn btn-secondary">Make hide</button>
                                                                <button v-if="boat.status === 'draft'"
                                                                    @click="makePublish(boat.id)"
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
                                    No boats
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
            boats: [],
            currentPage: 1,
            itemsPerPage: 5,
            breadcrumbs: [],
        };
    },
    computed: {
        title() {
            return this.isRecovery ? 'Recovery Boats' : 'Manage Boats';
        },
        totalPages() {
            return Math.ceil(this.boats.length / this.itemsPerPage);
        },
        paginatedBoats() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.boats.slice(start, end);
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
                this.recoveryBoats();
            } else {
                this.isRecovery = false;
                this.fetchBoats();
            }
        },
        fetchBoats() {
            axios.get('/api/vendor/boats').then(({ data }) => {
                console.log("api message data", data.data);
                this.boats = data.data.rows;
                this.breadcrumbs = data.data.breadcrumbs;
                this.boats.forEach(boat => {
                    if (boat.banner_image_id) {
                        this.getImageList(boat.banner_image_id);
                    }
                });
                this.isLoading = false;
            }).catch(error => {
                this.isLoading = false;
                console.error("Error fetching in data:", error);
            });
        },
        addBoat() {
            // Navigate to the add tour page
            this.$router.push({ name: 'vendorBoatsCreate' });
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
            this.$router.push({ name: 'vendorBoatsCreate', params: { id } });
        },
        deleteboat(id) {
            console.log("in delete");
            axios.get(`/api/vendor/del-boat/${id}`).then(response => {
                console.log("delete success", response);
                this.fetchBoats();
            }).catch(error => {
                console.error("Error fetching image data:", error);
                return null;
            });
        },
        makeHide(id) {
            console.log("post data", id);
            axios.get(`/api/vendor/bulk-edit-boat/${id}?action=make-hide`).then(response => {
                console.log("api response => ", response.data);

                if (response.status == 200) {
                    this.fetchBoats();
                }
            }).catch(({ response }) => {
                alert(response.data.message)
            }).finally(() => {

            })
        },
        makePublish(id) {
            console.log("post data", id);
            axios.get(`/api/vendor/bulk-edit-boat/${id}?action=make-publish`).then(response => {
                console.log("api response => ", response.data);

                if (response.status == 200) {
                    this.fetchBoats();
                }
            }).catch(({ response }) => {
                alert(response.data.message)
            }).finally(() => {

            })
        },
        recoveryBoats() {
            axios.get('/api/vendor/boat-recovery').then(({ data }) => {
                console.log("api message data", data.data);
                this.boats = data.data.rows;
                this.boats.forEach(boat => {
                    if (boat.banner_image_id) {
                        this.getImageList(boat.banner_image_id);
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
            axios.get(`/api/vendor/boat-restore/${id}`).then((response) => {
                console.log("response", response.data);
                this.recoveryBoats();
            }).catch(error => {
                console.error("Error fetching image data:", error.response ? error.response.data : error.message);
            });
        },
        permanentlyDelete(id) {
            // ?permanently_delete=1
            console.log("in delete");
            axios.get(`/api/vendor/del-boat/${id}?permanently_delete=1`).then((response) => {
                console.log("delete success", response);
                this.recoveryBoats();
            }).catch(error => {
                console.error("Error fetching image data:", error);
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
