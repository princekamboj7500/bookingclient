<template>
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content relative">
            <div class="modal-header">
                <h4 class="modal-title">Log In</h4>
            </div>
            <div class="modal-body relative">
                <div class="alert alert-danger alert-block" v-if="isShowSuccess">
                    <button type="button" class="close" @click="hideAlert" data-dismiss="alert">×</button>
                    <strong>{{ successMsg }}</strong>
                </div>
                <form class="bravo-form-login" @submit.prevent="login">
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
                    <div class="error message-error invalid-feedback"></div>
                    <div class="form-group">
                        <button class="btn btn-primary form-submit" :disabled="isDisabled" type="submit">
                            Login
                            <span class="spinner-grow spinner-grow-sm icon-loading" role="status"
                                aria-hidden="true"></span>
                                <i class="fa fa-spinner fa-spin" v-if="buttonLoading"></i>
                        </button>
                    </div>
                    <div class="c-grey font-medium f14 text-center"> Do not have an account? 
                        <router-link :to="{ name: 'register' }">
                            Sign Up    
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
                email: '',
                password: "",
                device_name: "android",
            },
            isShowSuccess: false,
            successMsg: '',
            isDisabled: false,
            buttonLoading: false,
        }
    },
    mounted() {
        console.log('Component mounted.')
    },
    methods: {
        login() {
            this.isDisabled = true;
            this.buttonLoading = true;
            var postData = this.formData;
            //console.log("post data", postData);
            axios.post('/api/auth/login', postData).then(response => {
                console.log("login api response => ", response.data);
                if(response.data.message){
                    this.isShowSuccess = true;
                    this.successMsg = response.data.message
                }
                if (response.status == 200) {
                    console.log("token", response.data.access_token);
                    if (response.data.access_token) {
                        localStorage.setItem('token', response.data.access_token);
                        //this.$router.push({ name: 'vendorDashboard' });
                        if(response.data.user.role_id == 2){
                            window.location.href = "/user/dashboard-vue";
                        }else if(response.data.user.role_id == 3){
                            window.location.href = "/tours";
                        }
                        
                    }else{
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
        hideAlert(){
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
.modal-content{
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
i.input-icon.icofont-mail, i.input-icon.icofont-ui-password {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    font-size: 1.2em;
}
</style>
