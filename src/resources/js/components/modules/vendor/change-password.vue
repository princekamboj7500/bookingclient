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
                                Change Password
                            </h2>
                            <div v-if="isPasswordUpdate == 1" class="alert alert-warning">
                               For security, please change your password to continue.
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Current Password</label>
                                        <input v-model="currentPassword" type="password" required=""
                                            name="current-password" placeholder="Current Password" class="form-control">
                                    </div>
                                    <div class="form-group">
                                        <label>New Password</label>
                                        <input v-model="newPassword" type="password" required="" name="new-password"
                                            minlength="8" placeholder="New Password" class="form-control">
                                        <p><i>* Require at least one uppercase, one lowercase letter, one number and one
                                                symbol.</i></p>
                                    </div>
                                    <div class="form-group">
                                        <label>New Password Again</label>
                                        <input v-model="newPasswordConfirmation" type="password" required=""
                                            name="new-password_confirmation" minlength="8"
                                            placeholder="New Password Again" class="form-control">
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <hr>
                                    <button @click="handleChangePassword" class="btn btn-primary">Change
                                        Password</button>
                                    <a href="http://127.0.0.1:8000/user/profile" class="btn btn-default">Cancel</a>
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
import axios from 'axios';
import Sidebar from './sidebar.vue';
import userbc from './user-bc.vue';

export default {
    components: {
        Sidebar,
        userbc
    },
    data() {
        return {
            isPasswordUpdate: this.$route.query.need_update_pw,
            currentPassword: '',
            newPassword: '',
            newPasswordConfirmation: '',
            breadcrumbs: [
                {
                    "name": 'Change Password',
                    "url": "#"
                }
            ]
        };
    },
    created() {
        const needUpdatePw = this.isPasswordUpdate;
        if (needUpdatePw) {
            console.log('Password update needed:', needUpdatePw);
            // Handle the need for password update
        }
    },
    methods: {
        handleChangePassword() {
            axios.post('/api/auth/change-password', {
                'current_password': this.currentPassword,
                'new_password': this.newPassword,
                //'password_confirmation': this.newPasswordConfirmation
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(response => {
                    console.log(response.data);
                    if(response.data.status == 1){
                        window.location.href = "/";
                    }
                })
                .catch(error => {
                    console.error(error);
                    if (error.response && error.response.data) {
                        console.log(error.response.data);
                        localStorage.removeItem('token')
                        window.location.href = window.location.origin;
                    } else {
                        console.log("An error occurred. Please try again.");
                    }
                });
        }
    }
}
</script>