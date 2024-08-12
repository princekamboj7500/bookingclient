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
                            <h2 class="title-bar border-bottom">
                                Manage news
                                <router-link :to="{ name: 'vendorNewsCreate' }" class="btn-change-password">
                                    Add News
                                </router-link>
                            </h2>

                            <div class="filter-div filter-div-news d-flex justify-content-between  mb-3">
                                <div class="col-left">
                                    <form method="post" @submit.prevent="bulkAction"
                                        class="filter-form filter-form-left d-flex justify-content-start">
                                        <select v-model="action" class="form-control mr-3">
                                            <option value=""> Bulk Actions </option>
                                            <option value="publish"> Publish </option>
                                            <option value="pending">Move to Pending</option>
                                            <option value="draft"> Move to Draft </option>
                                            <option value="delete"> Delete </option>
                                        </select>
                                        <button data-confirm="Do you want to delete?"
                                            class="py-2 btn-info btn btn-icon dungdt-apply-form-btn"
                                            type="submit">Apply</button>
                                    </form>
                                </div>
                                <div class="col-left">
                                    <form method="get" action="http://127.0.0.1:8000/vendor/news "
                                        class="filter-form filter-form-right d-flex justify-content-end flex-column flex-sm-row"
                                        role="search">
                                        <input type="text" name="s" value="" placeholder="Search by name"
                                            class="form-control mr-3">
                                        <select v-model="formData.cat_id" class="form-control">
                                            <option value="">-- Please Select --</option>
                                            <option v-for="category in categories" :key="category.id"
                                                :value="category.id">
                                                {{ category.name }}
                                            </option>
                                        </select>
                                        <div class="flex-shrink-0">
                                            <button class="btn-info btn btn-icon btn_search py-2" type="submit">Search
                                                News</button>
                                        </div>

                                    </form>
                                </div>
                            </div>

                            <div class="text-right">
                                <p><i>Found 0 items</i></p>
                            </div>

                            <div class="row">
                                <div class="col-md-12">
                                    <div class="panel">
                                        <div class="panel-body">
                                            <form action="" class="bravo-form-item">
                                                <div class="table-responsive">
                                                    <table class="table table-hover">
                                                        <thead>
                                                            <tr>
                                                                <th width="60px"><input type="checkbox"
                                                                        class="check-all"></th>
                                                                <th class="title"> Name</th>
                                                                <th width="200px"> Category</th>
                                                                <th width="100px"> Date</th>
                                                                <th width="100px">Status</th>
                                                                <th width="100px"></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody v-for="row in rows">
                                                            <tr>
                                                                <td>
                                                                    <input type="checkbox" class="check-item" v-model="ids" :value="row.id">
                                                                </td>
                                                                <td class="title">
                                                                    <a href="javascript:void(0)" @click="editNews(row.id)" >{{ row.title }}</a>
                                                                </td>
                                                                <td>Adventure Travel</td>
                                                                <td> {{ row.created_at }}</td>
                                                                <td><span :class="row.status === 'draft' ? 'badge badge-draft' : 'badge badge-publish'">{{ row.status }}</span>
                                                                </td>
                                                                <td>
                                                                    <a href="javascript:void(0)"
                                                                        @click="editNews(row.id)" class="btn btn-primary btn-sm"><i
                                                                            class="fa fa-edit"></i> Edit</a>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </form>

                                        </div>
                                    </div>
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
import Sidebar from './sidebar.vue';
import userbc from './user-bc.vue';

export default {
    components: {
        Sidebar,
        userbc
    },
    data() {
        return {
            categories: [],
            rows: [],
            ids: [],
            formData: {
                cat_id: "",
            },
            action: '',
            breadcrumbs: []
        };
    },
    mounted() {
        // Fetch data here
        this.getData();
    },
    methods: {
        getData() {
            axios.get(`/api/vendor/news`).then(({ data }) => {
                console.log("get data", data.data.rows.data);
                console.log("categories", data.data.categories);
                this.rows = data.data.rows.data;
                this.breadcrumbs = data.data.breadcrumbs;
                this.categories = data.data.categories;
            }).catch(error => {
                console.error("Error fetching image data:", error.response ? error.response.data : error.message);
            });
        },
        editNews(id){
            this.$router.push({ name: 'vendorNewsCreate', params: { id } });
        },
        bulkAction(){
            console.log("action",this.action,"ids",this.ids);
            if(!this.action){
                alert("Please select action.");
                return;
            }
            if(this.ids.length == 0){
                alert("No items selected!");
                return;
            }
            var postData = {
                action: this.action,
                ids: this.ids
            };

            console.log("post data", postData);
            axios.post(`/api/vendor/news-bulk-edit`, postData).then(response => {
                console.log("api response => ", response.data);

                if (response.status == 200) {
                    console.log("success");
                    this.ids = [];
                    this.getData();
                }
            }).catch(({ response }) => {
                alert(response.data.message)
            }).finally(() => {

            })
        }
    }
}
</script>
