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
                            <form class="needs-validation" @submit.prevent="handleSubmit">
                                <input type="hidden" name="_token" value="KOqbVuLwUaG4oZSLguEEgX5tIqJ3uCtfkEqIahtC"
                                    autocomplete="off">
                                <div class="container-fluid">
                                    <div class="d-flex justify-content-between mb20">
                                        <div>
                                            <h2 class="title-bar no-border-bottom">Add new coupon</h2>
                                        </div>
                                    </div>
                                    <div class="lang-content-box">
                                        <div class="row">
                                            <div class="col-md-9">
                                                <div class="panel">
                                                    <div class="panel-title"><strong>General</strong></div>
                                                    <div class="panel-body">
                                                        <div class="row">
                                                            <div class="col-md-6">
                                                                <div class="form-group">
                                                                    <label>Coupon Code <span
                                                                            class="text-danger">*</span></label>
                                                                    <input type="text" maxlength="50" required
                                                                        placeholder="Unique Code" v-model="form.code"
                                                                        class="form-control">
                                                                </div>
                                                            </div>
                                                            <div class="col-md-6">
                                                                <div class="form-group">
                                                                    <label>Coupon Name </label>
                                                                    <input type="text" placeholder="Name"
                                                                        v-model="form.name" class="form-control">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-md-6">
                                                                <div class="form-group">
                                                                    <label>Coupon Amount <span
                                                                            class="text-danger">*</span></label>
                                                                    <input type="number" required step="0.1" min="0"
                                                                        placeholder="0" v-model="form.amount"
                                                                        class="form-control">
                                                                </div>
                                                            </div>
                                                            <div class="col-md-6">
                                                                <div class="form-group">
                                                                    <label>Discount Type </label>
                                                                    <select class="form-control"
                                                                        v-model="form.discount_type">
                                                                        <option value="fixed">Amount</option>
                                                                        <option value="percent">Percent</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-md-6">
                                                                <div class="form-group">
                                                                    <label>End Date</label>
                                                                    <input type="text" placeholder="2021-12-12 00:00:00"
                                                                        v-model="form.end_date"
                                                                        class="form-control has-datetimepicker">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="panel">
                                                    <div class="panel-title"><strong>Usage Restriction</strong></div>
                                                    <div class="panel-body">
                                                        <div class="row">
                                                            <div class="col-md-6">
                                                                <div class="form-group">
                                                                    <label>Minimum Spend</label>
                                                                    <input type="text" placeholder="No Minimum"
                                                                        v-model="form.min_total" class="form-control">
                                                                    <small>The Minimum Spend does not include any
                                                                        Booking fee</small>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-6">
                                                                <div class="form-group">
                                                                    <label>Maximum Spend</label>
                                                                    <input type="text" placeholder="No Maximum"
                                                                        v-model="form.max_total" class="form-control">
                                                                    <small>The Maximum Spend does not include any
                                                                        Booking fee</small>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-md-6">
                                                                <div class="form-group">
                                                                    <label>only for Services</label>
                                                                    <select multiple
                                                                        class="form-control dungdt-select2-field"
                                                                        v-model="form.services">
                                                                        <option v-for="option in serviceOptions"
                                                                            :key="option.id" :value="option.id">
                                                                            {{ option.text }}
                                                                        </option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="panel">
                                                    <div class="panel-title"><strong>Usage Limits</strong></div>
                                                    <div class="panel-body">
                                                        <div class="row">
                                                            <div class="col-md-6">
                                                                <div class="form-group">
                                                                    <label>Usage Limit per Coupon</label>
                                                                    <input type="number" placeholder="Unlimited Usage"
                                                                        v-model="form.quantity_limit"
                                                                        class="form-control">
                                                                </div>
                                                            </div>
                                                            <div class="col-md-6">
                                                                <div class="form-group">
                                                                    <label>Usage Limit Per User</label>
                                                                    <input type="number" placeholder="Unlimited Usage"
                                                                        v-model="form.limit_per_user"
                                                                        class="form-control">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-3">
                                                <div class="panel">
                                                    <div class="panel-title"><strong>Publish</strong></div>
                                                    <div class="panel-body">
                                                        <div>
                                                            <label>
                                                                <input type="radio" name="status" value="publish"
                                                                    v-model="form.status"> Publish
                                                            </label>
                                                        </div>
                                                        <div>
                                                            <label>
                                                                <input type="radio" name="status" value="draft"
                                                                    v-model="form.status"> Draft
                                                            </label>
                                                        </div>
                                                        <div class="text-right">
                                                            <button class="btn btn-primary" type="submit"><i
                                                                    class="fa fa-save"></i> Save Changes</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="panel">
                                                    <div class="panel-title"><strong>Feature Image</strong></div>
                                                    <div class="panel-body">
                                                        <div class="form-group">
                                                            <div class="dungdt-upload-box dungdt-upload-box-normal ">
                                                                <input type="file" ref="fileInputFeature"
                                                                    style="display: none;"
                                                                    @change="handleFileChangeFeature">
                                                                <div class="upload-box" v-if="!feature_image_imageUrl">
                                                                    <input type="hidden" name="image_id"
                                                                        v-model="form.image_id" value="">
                                                                    <div class="text-center">
                                                                        <SVGComponent />
                                                                    </div>
                                                                    <div class="text-center">
                                                                        <span class="btn btn-primary btn-field-upload"
                                                                            @click="triggerFeatureFileInput">Upload
                                                                            image</span>
                                                                    </div>
                                                                </div>
                                                                <div v-if="feature_image_imageUrl">
                                                                    <div class="attach-demo-feature"
                                                                        title="Change file">
                                                                        <img :src="feature_image_imageUrl"
                                                                            alt="Uploaded Image" />
                                                                    </div>
                                                                    <div class="upload-actions justify-content-between">
                                                                        <a class="edit-img btn btn-sm btn-primary edit-single"
                                                                            @click="editImage('feature')"><i
                                                                                class="fa fa-edit"></i></a>
                                                                        <a class="delete btn btn-sm btn-danger"
                                                                            @click="deleteImage('feature')"><i
                                                                                class="fa fa-trash"></i></a>
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
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Sidebar from './sidebar.vue';
import userbc from './user-bc.vue';
import SVGComponent from './SVGComponent.vue';

export default {
    components: {
        Sidebar,
        userbc,
        SVGComponent
    },
    data() {
        return {
            couponId: this.$route.params.id || null,
            feature_image_imageUrl: '',
            form: {
                code: '',
                name: '',
                amount: 0,
                discount_type: 'fixed',
                end_date: '',
                min_total: '',
                max_total: '',
                services: [],
                quantity_limit: 0,
                limit_per_user: 0,
                status: 'draft',
                image_id: ''
            },
            serviceOptions: [],
            breadcrumbs: [],
        };
    },
    computed: {

    },
    mounted() {
        this.getData();
        this.getServices();
        if (this.couponId) {
            console.log("is edit true");
            axios.get(`/api/vendor/edit-coupan/${this.couponId}`).then(({ data }) => {
                console.log("data", data);
                this.form = data.data.row;
                this.breadcrumbs = data.data.breadcrumbs;
                if(data.data.row.image_id){
                    this.getImage(data.data.row.image_id, 'feature');
                }
                // this.formData.start_date = new Date(this.formData.start_date);
                // this.formData.end_date = new Date(this.formData.end_date);
            }).catch(error => {
                console.error("Error fetching image data:", error.response ? error.response.data : error.message);
            });
        }
    },
    methods: {
        getData() {
            //create-coupon
            axios.get(`/api/vendor/create-coupon`).then(({ data }) => {
                console.log("get data", data);
            }).catch(error => {
                console.error("Error fetching image data:", error.response ? error.response.data : error.message);
            });
        },
        getServices() {
            axios.get(`/api/vendor/get_services`).then(({ data }) => {
                console.log("get_services data", data.results);
                this.serviceOptions = data.results;
            }).catch(error => {
                console.error("Error fetching image data:", error.response ? error.response.data : error.message);
            });
        },
        handleSubmit() {
            // Form submission logic coupan-store
            console.log(this.form);
            var postData = this.form;

            var id = -1;
            if (this.couponId) {
                id = this.couponId;
            }
            console.log("post data", postData);
            axios.post(`/api/vendor/coupan-store/${id}`, postData).then(response => {
                console.log("api response => ", response.data);

                if (response.status == 200) {
                    console.log("success");
                    this.$router.push({ name: 'vendorCoupons' });
                }
            }).catch(({ response }) => {
                alert(response.data.message)
            }).finally(() => {

            })
        },
        getImage(id, type) {
            axios.get(`/api/vendor/get-file/${id}`).then(({ data }) => {
                const imageUrl = `${window.location.protocol}//${window.location.host}/${data.driver}/${data.file_path}`;

                if (type === 'banner') {
                    this.banner_image_imageUrl = imageUrl;
                } else if (type === 'feature') {
                    this.feature_image_imageUrl = imageUrl;
                }
                console.log("id", id, "imageUrl", imageUrl);

                // Select all elements with the class 'upload-actions'
                var demoDiv = document.querySelector('.upload-actions');
                console.log("demoDiv",demoDiv);
                if (demoDiv) {
                    demoDiv.style.display = 'block';
                }
            }).catch(error => {
                console.error("Error fetching image data:", error.response ? error.response.data : error.message);
            });
        },
        removeImage() {
            this.form.image_id = '';
        },
        triggerFeatureFileInput() {
            this.$refs.fileInputFeature.click();
        },
        handleFileChangeFeature(event) {
            const file = event.target.files[0];
            if (file) {
                this.uploadFeatureImage(file, 'image');
            }
        },
        uploadFeatureImage(file, type) {
            console.log("File", file);
            if (!file) return;

            const formData = new FormData();
            formData.append('file', file);
            formData.append('type', type);

            axios.post('/api/vendor/media/store', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                console.log("API media response => ", response.data.data.id);
                console.log("API media file_path => ", response.data.data.file_path);

                if (response.status === 200) {
                    this.form.image_id = response.data.data.id;
                    this.feature_image_imageUrl = window.location.origin + '/uploads/' + response.data.data.file_path;
                    var demoDiv = document.querySelector('.attach-demo-feature');

                    // Set the display property to 'none'
                    demoDiv.style.display = 'block';
                }
            }).catch(({ response }) => {
                console.log("attach demo feature error");
                alert(response.data.message);
            }).finally(() => {
                // Optionally perform any cleanup or final actions
            });
        },
    }
}
</script>

<style scoped>
img {
    height: 100%;
    width: 100%;
}
</style>
