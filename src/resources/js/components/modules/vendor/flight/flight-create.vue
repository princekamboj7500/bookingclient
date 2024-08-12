<template>
    <div class="bravo_wrap">
        <!-- @include('Layout::parts.topbar') @include('Layout::parts.header') -->
        <div class="bravo_user_profile">
            <div class="container-fluid">
                <div class="row row-eq-height">
                    <div class="col-md-3">
                        <sidebar />
                    </div>
                    <div v-if="isLoading" id="loader"></div>
                    
                    <div v-else class="col-md-9">
                        <div class="user-form-settings">
                            <userbc :breadcrumbs="breadcrumbs"/>
                            <!-- @yield('content') -->
                            <h2 class="title-bar no-border-bottom">
                                Add new flight
                            </h2>

                            <div class="lang-content-box">
                                <form @submit.prevent="handleSubmit">
                                    <div class="form-add-service">
                                        <div class="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                            <a data-toggle="tab" href="#nav-space-content" aria-selected="true"
                                                :class="{ active: activeTab === 'content' }" @click="activeTab = 'content'">1.
                                                Content</a>
                                            <a data-toggle="tab" href="#nav-attribute" aria-selected="false"
                                                :class="{ active: activeTab === 'attributes' }"
                                                @click="activeTab = 'attributes'">2. Attributes</a>
                                        </div>
                                        <div class="tab-content" id="nav-tabContent">
                                            <div v-if="activeTab === 'content'" class="tab-pane fade show active"
                                                id="nav-space-content">
                                                <!-- Content tab content here -->
                                                <div class="panel">
                                                    <div class="panel-title"><strong>Content</strong></div>
                                                    <div class="panel-body">
                                                        <div class="row">
                                                            <div class="form-group col-lg-6">
                                                                <label>Name</label>
                                                                <input type="text" v-model="formData.title"
                                                                    placeholder="Name" name="title"
                                                                    class="form-control">
                                                            </div>
                                                            <div class="form-group col-lg-6">
                                                                <label>Code</label>
                                                                <input type="text" v-model="formData.code"
                                                                    placeholder="Code" name="code"
                                                                    class="form-control">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="panel">
                                                    <div class="panel-title"><strong>Airport</strong></div>
                                                    <div class="panel-body">
                                                        <div class="row">
                                                            <div class="col-lg-6">
                                                                <div class="form-group">
                                                                    <label for="">From</label>
                                                                    <select v-model="airport_from"
                                                                        class="form-control">
                                                                        <option v-for="airport in AirportFrom"
                                                                            :value="airport.id">
                                                                            {{ airport.text }}</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6">
                                                                <div class="form-group">
                                                                    <label for="">To</label>
                                                                    <select v-model="airport_to"
                                                                        class="form-control"
                                                                        :options="airportOptions">
                                                                        <option value="" disabled selected>--
                                                                            Select Airport to --</option>
                                                                        <option v-for="airport in AirportFrom"
                                                                            :value="airport.id">
                                                                            {{ airport.text }}</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="panel">
                                                    <div class="panel-title"><strong>Airline and time</strong>
                                                    </div>
                                                    <div class="panel-body">
                                                        <div class="row">
                                                            <div class="col-lg-12">
                                                                <div class="form-group">
                                                                    <label for="">Airline</label>
                                                                    <select v-model="airline_id"
                                                                        class="form-control"
                                                                        :options="airlineOptions">
                                                                        <option value="" disabled selected>--
                                                                            Select Airline --</option>
                                                                        <option v-for="airline in airlineOptions"
                                                                            :value="airline.id">
                                                                            {{ airline.text }}</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6">
                                                                <div class="form-group">
                                                                    <label class="control-label">Departure time</label>
                                                                    <date-picker v-model="departuretime"  class="full-width" type="datetime" format="YYYY-MM-DD HH:mm"></date-picker>
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6">
                                                                <div class="form-group">
                                                                    <label class="control-label">Arrival time</label>
                                                                    <date-picker v-model="arrival_time"  class="full-width" type="datetime" format="YYYY-MM-DD HH:mm"></date-picker>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div v-if="activeTab === 'attributes'" class="tab-pane fade show active"
                                                id="nav-attribute">
                                                <!-- Attributes tab content here -->
                                                <div v-for="(attribute, index) in attributess" :key="index">
                                                    <div class="panel">
                                                        <div class="panel-title"><strong>Attribute: {{ attribute.name }}</strong></div>
                                                        <div class="panel-body">
                                                            <div class="terms-scrollable">
                                                                <label v-for="term in attribute.terms" :key="term.id"
                                                                    class="term-item">
                                                                    <input v-model="formData.terms" :value="term.id"
                                                                        type="checkbox" name="terms[]">
                                                                    <span class="term-name">{{ term.name

                                                                        }}</span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="d-flex justify-content-between">
                                        <button class="btn btn-primary" type="submit"><i class="fa fa-save"></i> Save
                                            Changes</button>
                                    </div>
                                </form>
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
import axios from 'axios';

export default {
    components: {
        Sidebar,
        userbc
    },
    data() {
        return {
            activeTab: 'content',
            params : this.$route.params.id || null,
            formData: {
                title: '',
                code: '',
                terms: [],
            },
            airport_from: null,
            AirportFrom: [],
            airport_to: null,
            airline_id: null,
            airportOptions: [],
            airlineOptions: [],
            attributes: [],
            attributess: [],
            selectedTerms: [],
            editVariables : [],
            departuretime :'',
            arrival_time : '',
        };
    },
    mounted() {
        if (!isNaN(this.params) && !isNaN(parseFloat(this.params))) {
            axios.get(`/api/vendor/edit/${this.params}`).then(({ data }) => {
                console.log(data.data.row,"data");
                this.formData = data.data.row;
                this.breadcrumbs = data.data.breadcrumbs;
                this.airport_from = data.data.row.airport_from.id;
                this.airport_to = data.data.row.airport_to.id;
                this.airline_id = data.data.row.airline.id;
                this.departuretime = new Date(data.data.row.departure_time);
                this.arrival_time = new Date(data.data.row.arrival_time);
                this.formData.terms = data.data.selected_terms;
                console.log(data.data.row.departure_time ,"kkkkkk");
                this.isLoading = false;
            }).catch(error => {
                this.isLoading = false;
                console.error("Error fetching airport data:", error);
            });
        }
        axios.get('/api-admin/airport/getForSelect2?_type=query').then(({ data }) => {
            this.AirportFrom = data.results;
        }).catch(error => {
            console.error("Error fetching airport data:", error);
        });
        
        axios.get('/api-admin/airline/getForSelect2?_type=query').then(({ data }) => {
            this.airlineOptions = data.results;
        }).catch(error => {
            console.error("Error fetching airline data:", error);
        });

        axios.get('/api-admin/attributes/getForSelect2?_type=query').then(({ data }) => {
            this.attributes = data.results;
        }).catch(error => {
            console.error("Error fetching attributes data:", error);
        });
        
        axios.get('/api/vendor/flight-create/').then(({ data }) => {
            console.log('ggggg', data.attributes);
            this.attributess = data.attributes;
            this.breadcrumbs = data.data.breadcrumbs;
            console.log("this.attributess",this.attributess);
            this.isLoading = false;
        }).catch(error => {
            this.isLoading = false;
            console.error("Error fetching attributes data:", error);
        });
    },
    methods: {
        setActiveTab(tab) {
            this.activeTab = tab;
        },
        getTranslation(item, field) {
            const locale = this.getLocale();
            return item.translations[locale][field];
        },
        getLocale() {
            return 'en';
        },
        handleSubmit() {
            const formData = {
                ...this.formData,
                airport_from: this.airport_from,
                airport_to: this.airport_to,
                airline_id: this.airline_id,
                selectedTerms: this.selectedTerms,
                departure_time: this.departuretime,
                arrival_time: this.arrival_time,
                duration: 0
            };
            if (!isNaN(this.params) && !isNaN(parseFloat(this.params))) {
                axios.post(`/api/vendor/flight-create/${this.params}`, formData)
                .then(response => {
                    console.log('ggggg', response);
                    if (response.data.message === 'Flight updated') {
                        this.$router.push({ name: 'vendorFlight' });
                    }
                })
                .catch(error => {
                    console.error('Error submitting form:', error);
                });
            } else {
                axios.post('/api/vendor/flight-create/-1', formData)
                .then(response => {
                    console.log('Form submitted successfully:', response.data);
                    if (response.data.message === 'Flight created') {
                        this.$router.push({ name: 'vendorFlight' });
                    } 
                })
                .catch(error => {
                    console.error('Error submitting form:', error);
                });
            }
        },
    }
}
</script>
<style>
.panel {
    background-color: #fff;
    box-shadow: 0 0 0 1px rgba(63, 63, 68, 0.05), 0 1px 3px 0 rgba(63, 63, 68, 0.15);
    border-radius: 3px;
    margin-bottom: 20px!important;
}
</style>