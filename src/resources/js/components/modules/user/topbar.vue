<template>
    <div class="bravo_header ">
        <div class="container">
            <div class="content">
                <div class="header-left">
                    <a href="#" class="bravo-logo">
                        <img src="../../../../../assets/images/logo.svg" alt="Booking Core">
                    </a>
                    <div class="bravo-menu">
                        <ul class="main-menu menu-generated">
                            <li class=" depth-0"><a target="" href="#">Home <i class="caret fa fa-angle-down"></i></a>
                            </li>
                            <li class=" depth-0">
                                <a target="" href="/hotels">Hotel <i
                                        class="caret fa fa-angle-down"></i>
                                </a>
                                <ul class="subnav children-menu menu-dropdown">
                                    <li class=" depth-1"><a target="" href="/hotels">Hotel List</a></li>
                                    <li class=" depth-1"><a target="" href="#">Hotel
                                            Detail</a></li>
                                </ul>
                            </li>
                            <li class=" depth-0"><a target="" href="/tours">Tours <i
                                        class="caret fa fa-angle-down"></i></a>
                                <ul class="subnav children-menu menu-dropdown">
                                    <li class=" depth-1"><a target="" href="/tours">Tour List</a></li>
                                    <li class=" depth-1"><a target="" href="#">Tour Detail</a>
                                    </li>
                                </ul>
                            </li>
                            <li class=" depth-0"><a target="" href="/spaces">Space <i
                                        class="caret fa fa-angle-down"></i></a>
                                <ul class="subnav children-menu menu-dropdown">
                                    <li class=" depth-1"><a target="" href="/spaces">Space List</a></li>
                                    <li class=" depth-1"><a target="" href="#">Space
                                            Detail</a></li>
                                </ul>
                            </li>
                            <li class=" depth-0"><a target="" href="/cars">Car <i class="caret fa fa-angle-down"></i></a>
                                <ul class="subnav children-menu menu-dropdown">
                                    <li class=" depth-1"><a target="" href="/cars">Car List</a></li>
                                    <li class=" depth-1"><a target="" href="#">Car Detail</a>
                                    </li>
                                </ul>
                            </li>
                            <li class=" depth-0"><a target="" href="/events">Event <i
                                        class="caret fa fa-angle-down"></i></a>
                                <ul class="subnav children-menu menu-dropdown">
                                    <li class=" depth-1"><a target="" href="/events">Event List</a></li>
                                    <li class=" depth-1"><a target="" href="#">Event
                                            Detail</a></li>
                                </ul>
                            </li>
                            <li class=" depth-0"><a target="" href="/flights">Flight</a></li>
                            <li class=" depth-0"><a target="" href="/boats">Boat <i
                                        class="caret fa fa-angle-down"></i></a>
                                <ul class="subnav children-menu menu-dropdown">
                                    <li class=" depth-1"><a target="" href="/boats">Boat List</a></li>
                                    <li class=" depth-1"><a target="" href="#">Boat Detail</a></li>
                                </ul>
                            </li>
                            <li v-if="isLogin" @click.prevent="logout" style="list-style: none;cursor: pointer; margin-left: 50px;">Logout</li>
                        </ul>
                    </div>
                </div>
                <div class="header-right">
                    <button class="bravo-more-menu">
                        <i class="fa fa-bars"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isLogin: false
        }
    },
    mounted() {
        //console.log('breadcrumb Component mounted.');
        const token = localStorage.getItem('token');
        if(token){
            this.isLogin = true;
        }else{
            this.isLogin = false;
        }
    },
    computed: {

    },
    methods: {
        async logout() {
            try {
                const response = await axios.post('/api/auth/logout');
                console.log(response.data.message);
                if (response.data.message === 'Successfully logged out') {
                    localStorage.removeItem('token');
                    window.location.href = "/login-vue";
                }
            } catch (error) {
                console.error('Logout failed:', error.response.data.message);
                if(error.response.data.status == 0){
                    window.location.href = "/login-vue";
                }
            }
        },
    }
}
</script>