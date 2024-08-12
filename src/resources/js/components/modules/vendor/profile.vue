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
                            <userbc :breadcrumbs="breadcrumbs" />
                            <!-- @yield('content') -->
                            <h2 class="title-bar border-bottom">
                                Settings
                                <router-link :to="{ name: 'vendorChangePassword' }" class="btn-change-password">
                                    Change Password
                                </router-link>
                            </h2>
                            <div class="alert alert-success alert-block" v-if="isShowSuccess">
                                <button type="button" class="close" @click="hideAlert" data-dismiss="alert">×</button>
                                <strong>{{ successMsg }}</strong>
                            </div>
                            <form @submit.prevent="updateProfile">
                                <div v-if="isLoading" id="loader"></div>
                                <div v-else class="row">
                                    <div class="col-md-6">
                                        <div class="form-title">
                                            <strong>Personal Information</strong>
                                        </div>
                                        <div class="form-group">
                                            <label>Business name</label>
                                            <input type="text" v-model="userData.business_name" name="business_name"
                                                placeholder="Business name" class="form-control">
                                            <i class="fa fa-user input-icon"></i>
                                        </div>
                                        <div class="form-group">
                                            <label>User name <span class="text-danger">*</span></label>
                                            <input type="text" required="" minlength="4" name="user_name"
                                                v-model="userData.user_name" placeholder="User name"
                                                class="form-control">
                                            <i class="fa fa-user input-icon"></i>
                                        </div>
                                        <div class="form-group">
                                            <label>E-mail</label>
                                            <input type="text" v-model="userData.email" placeholder="E-mail"
                                                class="form-control">
                                            <i class="fa fa-envelope input-icon"></i>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label>First name</label>
                                                    <input type="text" v-model="userData.first_name" name="first_name"
                                                        placeholder="First name" class="form-control">
                                                    <i class="fa fa-user input-icon"></i>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label>Last name</label>
                                                    <input type="text" v-model="userData.last_name" name="last_name"
                                                        placeholder="Last name" class="form-control">
                                                    <i class="fa fa-user input-icon"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label>Phone Number</label>
                                            <input type="text" v-model="userData.phone" name="phone"
                                                placeholder="Phone Number" class="form-control">
                                            <i class="fa fa-phone input-icon"></i>
                                        </div>
                                        <div class="form-group">
                                            <label>Birthday</label>
                                            <input type="text" v-model="userData.birthday" name="birthday"
                                                placeholder="Birthday" class="form-control date-picker">
                                            <i class="fa fa-birthday-cake input-icon"></i>
                                        </div>
                                        <div class="form-group">
                                            <label>About Yourself</label>
                                            <textarea name="bio" v-model="userData.bio" rows="5"
                                                class="form-control">{{ userData.bio }}</textarea>
                                        </div>
                                        <div class="form-group">
                                            <label>Avatar</label>
                                            <div class="upload-btn-wrapper">
                                                <div class="input-group">
                                                    <span class="input-group-btn">
                                                        <span class="btn btn-default btn-file">
                                                            Browse… <input type="file" @change="handleFileUpload">
                                                        </span>
                                                    </span>
                                                    <input type="text" data-error="Error upload..."
                                                        data-loading="Loading..." class="form-control text-view"
                                                        readonly v-model="avatarName">
                                                </div>
                                                <input type="hidden" class="form-control" name="avatar_id" value="">
                                                <img class="image-demo" :src="imagePreview" alt="Avatar">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-title">
                                            <strong>Location Information</strong>
                                        </div>
                                        <div class="form-group">
                                            <label>Address Line 1</label>
                                            <input type="text" v-model="userData.address" name="address"
                                                placeholder="Address" class="form-control">
                                            <i class="fa fa-location-arrow input-icon"></i>
                                        </div>
                                        <div class="form-group">
                                            <label>Address Line 2</label>
                                            <input type="text" v-model="userData.address2" name="address2"
                                                placeholder="Address2" class="form-control">
                                            <i class="fa fa-location-arrow input-icon"></i>
                                        </div>
                                        <div class="form-group">
                                            <label>City</label>
                                            <input type="text" v-model="userData.city" name="city" placeholder="City"
                                                class="form-control">
                                            <i class="fa fa-street-view input-icon"></i>
                                        </div>
                                        <div class="form-group">
                                            <label>State</label>
                                            <input type="text" v-model="userData.state" name="state" placeholder="State"
                                                class="form-control">
                                            <i class="fa fa-map-signs input-icon"></i>
                                        </div>
                                        <div class="form-group">
                                            <label>Country</label>
                                            <select name="country" class="form-control">

                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label>Zip Code</label>
                                            <input type="text" v-model="userData.zip_code" name="zip_code"
                                                placeholder="Zip Code" class="form-control">
                                            <i class="fa fa-map-pin input-icon"></i>
                                        </div>

                                    </div>
                                    <div class="col-md-12">
                                        <hr>
                                        <button class="btn btn-primary" type="submit"><i class="fa fa-save"></i> Save
                                            Changes</button>
                                    </div>
                                </div>
                            </form>
                            <!-- end content-->
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

export default {
    components: {
        Sidebar,
        userbc
    },
    data() {
        return {
            breadcrumbs: [
                {
                    name: 'Setting',
                    url: '#'
                }
            ],
            isLoading: true,
            selectedFile: null,
            avatarName: '',
            imagePreview: null,
            userData: {
                "name": null,
                "first_name": null,
                "last_name": null,
                "business_name": null,
                "email": null,
                "email_verified_at": null,
                "two_factor_secret": null,
                "two_factor_recovery_codes": null,
                "address": null,
                "address2": null,
                "phone": "112 666 888",
                "birthday": null,
                "city": "New York",
                "state": null,
                "country": "US",
                "zip_code": null,
                "last_login_at": null,
                "avatar_id": null,
                "bio": null,
                "status": null,
                "review_score": null,
                "create_user": null,
                "update_user": null,
                "vendor_commission_amount": null,
                "vendor_commission_type": null,
                "need_update_pw": 0,
                "role_id": null,
                "payment_gateway": null,
                "total_guests": null,
                "locale": null,
                "user_name": null,
                "verify_submit_status": null,
                "is_verified": null,
                "active_status": 0,
                "dark_mode": 0,
                "messenger_color": null,
                "stripe_customer_id": null,
                "total_before_fees": null,
                "credit_balance": null,
            },
            role: {
                "id": null,
                "name": null,
                "code": null,
                "commission": null,
                "commission_type": null,
                "create_user": null,
                "update_user": null,
                "status": null,
                "created_at": null,
                "updated_at": null
            },
            is_vendor_access: false,
            isShowSuccess: false,
            successMsg: '',
        };
    },
    mounted() {
        this.profileData()
    },
    methods: {
        profileData() {
            axios.get('/api/vendor/profile').then(({ data }) => {
                console.log("api message data", data);
                if (data.status == 0 && data.code == "need_update_pw") {
                    this.$router.push({ name: 'vendorChangePassword' });
                } else {
                    this.userData = data.data.dataUser;
                    this.is_vendor_access = data.data.is_vendor_access;
                    if (data.data.dataUser.avatar_id) {
                        this.getImage(data.data.dataUser.avatar_id);
                    }
                }
                this.isLoading = false;
            }).catch(error => {
                this.isLoading = false;
                console.error("Error fetching in data:", error);
            });
        },
        hideAlert() {
            this.isShowSuccess = false;
        },
        getImage(id) {
            axios.get(`/api/vendor/get-file/${id}`).then(({ data }) => {
                this.imagePreview = `${window.location.protocol}//${window.location.host}/${data.driver}/${data.file_path}`;
                this.avatarName = `${window.location.protocol}//${window.location.host}/${data.driver}/${data.file_path}`;
                //console.log("imagePreview", this.imagePreview);
            }).catch(error => {
                console.error("Error fetching image data:", error.response ? error.response.data : error.message);
            });
        },
        updateProfile() {
            //console.log("in update profile", this.userData.avatar_id);
            var postData = this.userData;
            //console.log("post data", postData);
            axios.post('/api/vendor/profile', postData).then(response => {
                console.log("api response => ", response.data);

                if (response.status == 200) {
                    this.profileData();
                    if (response.data.success) {
                        this.successMsg = response.data.success;
                        this.isShowSuccess = true;
                    }
                }
                this.isLoading = false;
            }).catch(({ response }) => {
                this.isLoading = false;
                alert(response.data.message)
            }).finally(() => {

            })
        },
        handleFileUpload(event) {
            const file = event.target.files[0];
            this.selectedFile = file;
            this.avatarName = file.name;

            // Update image preview
            const reader = new FileReader();
            reader.onload = (e) => {
                this.imagePreview = e.target.result;
            };
            reader.readAsDataURL(file);
            this.updateImage();
        },
        updateImage() {
            if (!this.selectedFile) {
                alert('Please select a file first.');
                return;
            }

            const formData = new FormData();

            formData.append('file', this.selectedFile);
            formData.append('type', "image");

            axios.post('/api/vendor/media/store', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                //console.log("API media response => ", response.data.data.id);
                //console.log("API media file_path => ", response.data.data.file_path);

                if (response.status === 200) {
                    this.userData.avatar_id = response.data.data.id;
                    this.avatarName = window.location.host + '/uploads/' + response.data.data.file_path;
                }
            }).catch(({ response }) => {
                alert(response.data.message);
            }).finally(() => {
                // Optionally perform any cleanup or final actions
            });
        }
    }
}
</script>
<style scoped>
.bravo_wrap .bravo_user_profile input.form-control {
    height: 35px;
    padding: 0 15px;
    border-radius: 0;
    padding-left: 30px;
}
</style>
