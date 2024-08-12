<template>
    <div class="blog-breadcrumb hidden-xs">
        <div class="container">
            <ol class="ul" itemscope itemtype="https://schema.org/BreadcrumbList">
                <li class="" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                    <a href="#" itemprop="item"><span itemprop="name">Home</span></a>
                    <meta itemprop="position" content="1" />
                </li>
                <li v-for="(item, index) in breadcrumbData" :key="index" :class="{ active: index === 2 }"
                    itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                    <a :href=item.url itemscope itemtype="https://schema.org/WebPage" itemprop="item"
                        itemid="/tours"><span itemprop="name">{{ item.name }}</span></a>
                    <meta itemprop="position" content="2" />
                </li>
            </ol>
            <!-- <li v-if="isLogin" @click.prevent="logout" style="list-style: none;cursor: pointer;">Logout</li> -->
        </div>
    </div>
</template>

<script>

export default {
    props: ['type', 'breadcrumbData'],
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
        // async logout() {
        //     try {
        //         const response = await axios.post('/api/auth/logout');
        //         console.log(response.data.message);
        //         if (response.data.message === 'Successfully logged out') {
        //             localStorage.removeItem('token');
        //             window.location.href = "/";
        //         }
        //     } catch (error) {
        //         console.error('Logout failed:', error.response.data.message);
        //         if(error.response.data.status == 0){
        //             window.location.href = "/";
        //         }
        //     }
        // },
    }
}
</script>

<style scoped>
.blog-breadcrumb ol li a,
.blog-breadcrumb .ul li a {
    display: block;
    font-weight: 500;
    color: #1A2B48;
    text-decoration: none;
    line-height: 21px;
}

.blog-breadcrumb ol,
.blog-breadcrumb .ul {
    background: unset !important;
}

.blog-breadcrumb .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.ul {
    display: flex;
    margin: 0;
    padding: 0;
    list-style: none;
}
</style>