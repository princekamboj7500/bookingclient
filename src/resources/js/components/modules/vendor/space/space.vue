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
                                    <router-link :to="{ name: 'vendorSpaceCreate' }" v-if="canCreate && !isRecovery"
                                        @click="addSpace" class="btn-change-password">
                                        Add Space
                                    </router-link>
                                </h2>
                                <message-component v-if="message" :message="message"></message-component>
                                <div v-if="isLoading" id="loader"></div>
                                <div v-else-if="spaces.length">
                                    <div class="list-item">
                                        <div class="row">
                                            <div class="col-md-12" v-for="space in paginatedSpaces" :key="space.id">
                                                <div class="item-list">
                                                    <div class="row">
                                                        <div class="col-md-3">
                                                            <div class="thumb-image">
                                                                <a :href="`/space/${space.slug}`" target="_blank">
                                                                    <img :src="imageUrls[space.banner_image_id]" alt="space Image">
                                                                </a>
                                                                <div class="service-wishlist" :data-id="space.id"
                                                                    data-type="space">
                                                                    <i class="fa fa-heart"></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-9">
                                                            <div class="item-title">
                                                                <a :href="`/space/${space.slug}`" target="_blank">
                                                                    {{ space.title }}
                                                                </a>
                                                            </div>
                                                            <div class="location" v-if="space.location_id">
                                                                <i class="icofont-paper-plane"></i>
                                                                Location: {{ space.location.name }}
                                                            </div>
                                                            <div class="location">
                                                                <i class="icofont-money"></i>
                                                                Price: <span class="sale-price">${{ space.price
                                                                    }}</span> 
                                                                    <span class="price">${{ space.sale_price
                                                                    }}</span>
                                                            </div>
                                                            <div class="location">
                                                                <i class="icofont-ui-settings"></i>
                                                                Status: <span class="badge badge-publish">{{
                                                                    space.status
                                                                    }}</span>
                                                            </div>
                                                            <div class="location">
                                                                <i class="icofont-wall-clock"></i>
                                                                Last Updated: {{ space.updated_at }}
                                                            </div>
                                                            <div class="control-action">
                                                                <template v-if="isRecovery">
                                                                    <button @click="restore(space.id)"
                                                                        class="btn btn-recovery btn-primary">
                                                                        Recovery
                                                                    </button>
                                                                    <button @click="permanentlyDelete(space.id)"
                                                                        class="btn btn-danger">
                                                                        Del
                                                                    </button>
                                                                </template>
                                                                <template v-else>
                                                                    <button @click="clone(space.id)"
                                                                        class="btn btn-primary">Clone</button>
                                                                    <a :href="`/space/${space.slug}`" target="_blank"
                                                                        class="btn btn-info">View</a>
                                                                    <button @click="edit(space.id)"
                                                                        class="btn btn-warning">Edit</button>
                                                                    <button @click="deleteSpace(space.id)"
                                                                        class="btn btn-danger">Del</button>
                                                                    <button v-if="space.status === 'publish'"
                                                                        @click="makeHide(space.id)"
                                                                        class="btn btn-secondary">Make hide</button>
                                                                    <button v-if="space.status === 'draft'"
                                                                        @click="makePublish(space.id)"
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
                                    No Spaces
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
            spaces: [],
            currentPage: 1,
            itemsPerPage: 5,
            breadcrumbs: [],
        };
    },
    computed: {
        title() {
            return this.isRecovery ? 'Recovery Spaces' : 'Manage Spaces';
        },
        totalPages() {
            return Math.ceil(this.spaces.length / this.itemsPerPage);
        },
        paginatedSpaces() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.spaces.slice(start, end);
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
                this.recoverySpaces();
            } else {
                this.isRecovery = false;
                this.fetchSpaces();
            }
        },
        fetchSpaces() {
            axios.get('/api/vendor/space').then(({ data }) => {
                console.log("api message data", data.data);
                this.spaces = data.data.rows;
                this.breadcrumbs = data.data.breadcrumbs;
                this.spaces.forEach(space => {
                    if (space.banner_image_id) {
                        this.getImageList(space.banner_image_id);
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
        addSpace() {
            // Navigate to the add space page
            this.$router.push({ name: 'spaceCreate' });
        },
        edit(id) {
            this.$router.push({ name: 'vendorSpaceCreate', params: { id } });
        },
        clone(id) {

            console.log("post data", id);
            axios.get(`/api/vendor/space-clone/${id}`).then(response => {
                console.log("api response => ", response.data);

                if (response.status == 200) {
                    this.fetchSpaces();
                }
            }).catch(({ response }) => {
                alert(response.data.message)
            }).finally(() => {

            })
        },
        deleteSpace(id) {
            console.log("in delete");
            axios.get(`/api/vendor/del-space/${id}`).then(({ response }) => {
                console.log("delete success", response);
                this.fetchSpaces();
            }).catch(error => {
                console.error("Error fetching image data:", error);
                return null;
            });
        },
        makeHide(id) {
            console.log("post data", id);
            axios.get(`/api/vendor/bulk-edit-space/${id}?action=make-hide`).then(response => {
                console.log("api response => ", response.data);

                if (response.status == 200) {
                    this.fetchSpaces();
                }
            }).catch(({ response }) => {
                alert(response.data.message)
            }).finally(() => {

            })
        },
        makePublish(id) {
            console.log("post data", id);
            axios.get(`/api/vendor/bulk-edit-space/${id}?action=make-publish`).then(response => {
                console.log("api response => ", response.data);

                if (response.status == 200) {
                    this.fetchSpaces();
                }
            }).catch(({ response }) => {
                alert(response.data.message)
            }).finally(() => {

            })
        },
        recoverySpaces() {
            axios.get('/api/vendor/space-recovery').then(({ data }) => {
                console.log("api message data", data.data);
                this.spaces = data.data.rows;
                this.spaces.forEach(space => {
                    if (space.banner_image_id) {
                        this.getImageList(space.banner_image_id);
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
            axios.get(`/api/vendor/space-restore/${id}`).then((response) => {
                console.log("response", response.data);
                this.recoverySpaces();
            }).catch(error => {
                console.error("Error fetching image data:", error.response ? error.response.data : error.message);
            });
        },
        permanentlyDelete(id) {
            // ?permanently_delete=1
            console.log("in delete");
            axios.get(`/api/vendor/del-space/${id}?permanently_delete=1`).then((response) => {
                console.log("delete success", response);
                this.recoverySpaces();
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