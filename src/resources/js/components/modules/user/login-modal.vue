<template>
    <div class="modal fade login show" id="login" tabindex="-1" role="dialog" aria-modal="true"
        style="padding-right: 17px; display: block;">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content relative">
                <div class="modal-header">
                    <h4 class="modal-title">Log In</h4>
                    <span @click=closeModal() class="c-pointer" data-dismiss="modal" aria-label="Close">
                        <i class="input-icon field-icon fa">
                            <img src="http://127.0.0.1:8000/images/ico_close.svg" alt="close">
                        </i>
                    </span>
                </div>
                <div class="modal-body relative">
                    <div class="alert alert-danger alert-block" v-if="isShowSuccess">
                        <button type="button" class="close" data-dismiss="alert">×</button>
                        <strong>{{ successMsg }}</strong>
                    </div>
                    <form class="bravo-form-login">
                        <input type="hidden" name="redirect" value="">
                        <div style="display: none !important;"
                            class="alert alert-danger d-flex align-items-center login-error" role="alert">
                            <p>Please fill the required fields.</p>
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" v-model="formData.email" autocomplete="off"
                                placeholder="Email address">
                            <i class="input-icon icofont-mail"></i>
                            <span class="invalid-feedback error error-email"></span>
                        </div>
                        <div class="form-group">
                            <input type="password" class="form-control" v-model="formData.password" autocomplete="off"
                                placeholder="Password">
                            <i class="input-icon icofont-ui-password"></i>
                            <span class="invalid-feedback error error-password"></span>
                        </div>
                        <div class="form-group">
                            <div class="d-flex justify-content-between">
                                <label for="remember-me" class="mb0">
                                    <input type="checkbox" v-model="formData.remember" id="remember-me" value="1">
                                    Remember me <span class="checkmark fcheckbox"></span>
                                </label>
                                <a href="/forgot-password">Forgot Password?</a>
                            </div>
                        </div>
                        <div class="error message-error invalid-feedback"></div>
                        <div class="form-group">
                            <button @click="handleSubmit" class="btn btn-primary form-submit" type="button">
                                Login
                                <span class="spinner-grow spinner-grow-sm icon-loading" role="status"
                                    aria-hidden="true"></span>
                            </button>
                        </div>
                        <div class="c-grey font-medium f14 text-center"> Do not have an account? <a href=""
                                data-target="#register" data-toggle="modal">Sign Up</a></div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import common from './detail-common';

export default {
    mixins: [common],
    data() {
        return {
            formData: {
                email: '',
                password: '',
                remember: false,
                device_name: 'Desktop',
            },
            csrfToken: '',
            errorMessage: '',
            isSubmitting: false,
            isShowSuccess: false,
            successMsg: "",
            isDisabled: false,
            buttonLoading: false
        }
    },
    mounted() {
        this.csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('value');
    },
    methods: {
        async handleSubmit() {
            this.isSubmitting = true;
            console.log("csrfToken", this.csrfToken);
            //return false;
            // try {
            //     const response = await axios.post('/login', this.formData, {
            //         headers: {
            //             'X-CSRF-TOKEN': this.csrfToken,
            //         },
            //     });

            //     // Handle successful login response
            //     console.log(response.data);
            //     if(response.data.two_factor){
            //         return window.location.href = bookingCore.url + '/two-factor-challenge';
            //     }

            //     if (response.data.error === true) {

            //     }else{
            //         window.location.reload();
            //     }

            // } catch (error) {
            //     // Handle login error
            //     if (error.response && error.response.status === 422) {
            //         this.errorMessage = "Please fill the required fields.";
            //     } else {
            //         this.errorMessage = "An error occurred. Please try again.";
            //     }
            // } finally {
            //     this.isSubmitting = false;
            // }

            axios.post('/api/auth/login', this.formData).then(response => {
                console.log("login api response => ", response.data);
                if (response.data.message) {
                    this.isShowSuccess = true;
                    this.successMsg = response.data.message
                }
                if (response.status == 200) {
                    console.log("token", response.data.access_token);
                    if (response.data.access_token && response.data.user.role_id == 3) {
                        localStorage.setItem('token', response.data.access_token);
                        window.location.reload();
                    } else {
                        this.isShowSuccess = true;
                        this.successMsg = "Please enter valid credientials";
                        this.isDisabled = false;
                        this.buttonLoading = false;
                    }
                }
            }).catch(({ response }) => {
                //alert(response.data.message)
                this.isShowSuccess = true;
                this.successMsg = response.data.message;
                this.isDisabled = false;
                this.buttonLoading = false;
            }).finally(() => {

            })
        },
        closeModal() {
            this.$emit('close');
        }
    }
}
</script>

<style scoped>
.form-group {
    margin-bottom: 20px;
    position: relative;
}

.form-group i.input-icon {
    position: absolute;
    top: 22px;
    right: 15px;
    font-size: 20px;
    transform: translateY(-50%);
    color: #acb5be;
    line-height: 0px;
}
</style>