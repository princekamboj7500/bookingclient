<template>
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content relative">
            <div class="modal-header">
                <h4 class="modal-title">Sign Up</h4>
            </div>
            <div class="modal-body relative">
                <div class="alert alert-danger alert-block" v-if="isShowSuccess">
                    <button type="button" class="close" @click="hideAlert" data-dismiss="alert">×</button>
                    <strong>
                        <div v-for="(messages, key) in message" :key="key">
                            <div v-for="(error, index) in messages" :key="index">
                                {{ error }}
                            </div>
                        </div>
                    </strong>
                </div>

                <form class="bravo-form-login" @submit.prevent="signup">
                    <div class="form-group">
                        <input type="text" class="form-control" v-model="formData.first_name" autocomplete="off"
                            placeholder="First Name">
                        <i class="input-icon field-icon icofont-waiter-alt"></i>
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-control" v-model="formData.last_name" autocomplete="off"
                            placeholder="Last Name">
                        <i class="input-icon field-icon icofont-waiter-alt"></i>
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-control" v-model="formData.phone" autocomplete="off"
                            placeholder="Phone">
                        <i class="input-icon field-icon icofont-ui-touch-phone"></i>
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-control" v-model="formData.email" autocomplete="off"
                            placeholder="Email address">
                        <i class="input-icon icofont-mail"></i>
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-control" v-model="formData.password" autocomplete="off"
                            placeholder="Password">
                        <i class="input-icon icofont-ui-password"></i>
                    </div>
                    <div class="error message-error invalid-feedback"></div>
                    <div class="form-group">
                        <button class="btn btn-primary form-submit" :disabled="isDisabled" type="submit">
                            Sign Up
                            <span class="spinner-grow spinner-grow-sm icon-loading" role="status"
                                aria-hidden="true"></span>
                            <i class="fa fa-spinner fa-spin" v-if="buttonLoading"></i>
                        </button>
                    </div>
                    <div class="c-grey font-medium f14 text-center"> Already have an account? 
                        <router-link :to="{ name: 'vendorLogin' }">
                            Login    
                        </router-link>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            formData: {
                first_name: "",
                last_name: "",
                phone: "",
                email: '',
                password: "",
                device_name: "android",
                term: true,
            },
            isShowSuccess: false,
            successMsg: '',
            message: "",
            isDisabled: false,
            buttonLoading: false,
        }
    },
    mounted() {
        console.log('Component mounted.')
    },
    methods: {
        signup() {
            this.isDisabled = true;
            this.buttonLoading = true;
            var postData = this.formData;
            //console.log("post data", postData);
            axios.post('/api/auth/register', postData).then(response => {
                console.log("register response => ", response.data);
                if (response.status == 200) {
                    console.log("token", response.data.access_token);
                    if (response.data.status) {
                        this.$router.push({ name: 'vendorLogin' });
                    } else if (response.data.status == 0) {
                        this.isShowSuccess = true;
                        this.message = response.data.message
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
        hideAlert() {
            this.isShowSuccess = false;
        }
    }
}
</script>
<style scoped>
.modal-dialog {
    max-width: var(--bs-modal-width);
    margin-right: auto;
    margin-left: auto;
    width: 30%;
}

.modal-header {
    margin-bottom: 15px;
}

.modal-content {
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    padding: 20px;
}

.form-group {
    margin-bottom: 1.5rem;
    position: relative;
}

input.form-control {
    height: 40px;
    width: 100%;
    padding-right: 30px;
}

i.input-icon {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    font-size: 1.2em;
}
</style>
