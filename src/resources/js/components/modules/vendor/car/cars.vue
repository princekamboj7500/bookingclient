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
                                    <router-link :to="{ name: 'vendorCarsCreate' }" v-if="canCreate && !isRecovery"
                                        @click="addCar" class="btn-change-password">
                                        Add Car
                                    </router-link>
                                </h2>
                                <message-component v-if="message" :message="message"></message-component>
                                <div v-if="isLoading" id="loader"></div>
                                <div v-else-if="cars.length">
                                    <div class="list-item">
                                        <div class="row">
                                            <div class="col-md-12" v-for="car in paginatedCars" :key="car.id">
                                                <div class="item-list">
                                                    <div class="row">
                                                        <div class="col-md-3">
                                                            <div class="thumb-image">
                                                                <a :href="`/car/${car.slug}`" target="_blank">
                                                                    <img :src="imageUrls[car.banner_image_id]" alt="car Image">
                                                                </a>
                                                                <div class="service-wishlist" :data-id="car.id"
                                                                    data-type="car">
                                                                    <i class="fa fa-heart"></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-9">
                                                            <div class="item-title">
                                                                <a :href="`/car/${car.slug}`" target="_blank">
                                                                    {{ car.title }}
                                                                </a>
                                                            </div>
                                                            <div class="location" v-if="car.location_id">
                                                                <i class="icofont-paper-plane"></i>
                                                                Location: {{ car.location.name }}
                                                            </div>
                                                            <div class="location">
                                                                <i class="icofont-money"></i>
                                                                Price: <span class="sale-price">${{ car.price
                                                                    }}</span> <span class="price">${{ car.sale_price
                                                                    }}</span>
                                                            </div>
                                                            <div class="location">
                                                                <i class="icofont-ui-settings"></i>
                                                                Status: <span class="badge badge-publish">{{ car.status
                                                                    }}</span>
                                                            </div>
                                                            <div class="location">
                                                                <i class="icofont-wall-clock"></i>
                                                                Last Updated: {{ car.updated_at }}
                                                            </div>
                                                            <div class="control-action">
                                                                <template v-if="isRecovery">
                                                                    <button @click="restore(car.id)"
                                                                        class="btn btn-recovery btn-primary">
                                                                        Recovery
                                                                    </button>
                                                                    <button @click="permanentlyDelete(car.id)"
                                                                        class="btn btn-danger">
                                                                        Del
                                                                    </button>
                                                                </template>
                                                                <template v-else>

                                                                <a :href="`/car/${car.slug}`" target="_blank"
                                                                    class="btn btn-info">View</a>
                                                                <button @click="edit(car.id)"
                                                                    class="btn btn-warning">Edit</button>
                                                                <button @click="deleteCar(car.id)"
                                                                    class="btn btn-danger">Del</button>
                                                                <button v-if="car.status === 'publish'"
                                                                    @click="makeHide(car.id)"
                                                                    class="btn btn-secondary">Make hide</button>
                                                                <button v-if="car.status === 'draft'"
                                                                    @click="makePublish(car.id)"
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
                                    No cars
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
            cars: [],
            currentPage: 1,
            itemsPerPage: 5,
            breadcrumbs: [],
        };
    },
    computed: {
        title() {
            return this.isRecovery ? 'Recovery Cars' : 'Manage Cars';
        },
        totalPages() {
            return Math.ceil(this.cars.length / this.itemsPerPage);
        },
        paginatedCars() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.cars.slice(start, end);
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
                this.recoveryCars();
            } else {
                this.isRecovery = false;
                this.fetchCars();
            }
        },
        fetchCars() {
            axios.get('/api/vendor/cars').then(({ data }) => {
                console.log("api message data", data.data);
                this.cars = data.data.rows;
                this.breadcrumbs = data.data.breadcrumbs;
                this.cars.forEach(car => {
                    if (car.banner_image_id) {
                        this.getImageList(car.banner_image_id);
                    }
                });
                this.isLoading = false;
            }).catch(error => {
                this.isLoading = false;
                console.error("Error fetching in data:", error);
            });
        },
        addCar() {
            // Navigate to the add tour page
            this.$router.push({ name: 'vendorCarsCreate' });
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
            this.$router.push({ name: 'vendorCarsCreate', params: { id } });
        },
        deleteCar(id) {
            console.log("in delete");
            axios.get(`/api/vendor/del-car/${id}`).then(({ response }) => {
                console.log("delete success", response);
                this.fetchCars();
            }).catch(error => {
                console.error("Error fetching image data:", error);
                return null;
            });
        },
        makeHide(id) {
            console.log("post data", id);
            axios.get(`/api/vendor/bulk-edit-car/${id}?action=make-hide`).then(response => {
                console.log("api response => ", response.data);

                if (response.status == 200) {
                    this.fetchCars();
                }
            }).catch(({ response }) => {
                alert(response.data.message)
            }).finally(() => {

            })
        },
        makePublish(id) {
            console.log("post data", id);
            axios.get(`/api/vendor/bulk-edit-car/${id}?action=make-publish`).then(response => {
                console.log("api response => ", response.data);

                if (response.status == 200) {
                    this.fetchCars();
                }
            }).catch(({ response }) => {
                alert(response.data.message)
            }).finally(() => {

            })
        },
        recoveryCars() {
            axios.get('/api/vendor/car-recovery').then(({ data }) => {
                console.log("api message data", data.data);
                this.cars = data.data.rows;
                this.cars.forEach(car => {
                    if (car.banner_image_id) {
                        this.getImageList(car.banner_image_id);
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
            axios.get(`/api/vendor/car-restore/${id}`).then((response) => {
                console.log("response", response.data);
                this.recoveryCars();
            }).catch(error => {
                console.error("Error fetching image data:", error.response ? error.response.data : error.message);
            });
        },
        permanentlyDelete(id) {
            // ?permanently_delete=1
            console.log("in delete");
            axios.get(`/api/vendor/del-car/${id}?permanently_delete=1`).then((response) => {
                console.log("delete success", response);
                this.recoveryCars();
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
</style>
