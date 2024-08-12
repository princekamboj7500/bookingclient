<template>
    <div class="bravo_wrap">
        <!-- @include('Layout::parts.topbar')
        @include('Layout::parts.header') -->
        <div class="bravo_user_profile">
            <div class="container-fluid">
                <div class="row row-eq-height">
                    <div class="col-md-3">
                        <Sidebar />
                    </div>
                    <div class="col-md-9">
                        <div class="user-form-settings">
                            <userbc :breadcrumbs="breadcrumbs"/>
                            <!-- @yield('content') -->
                            <h2 class="title-bar border-bottom">
                                Dashboard
                            </h2>
                            <div class="bravo-user-dashboard">
                                <div class="row dashboard-price-info row-eq-height">
                                    <div v-for="(item, index) in cardsReport" :key="index" class="col-lg-3 col-md-3">
                                        <div class="dashboard-item">
                                            <div class="wrap-box">
                                                <div class="title">{{ item.title }}</div>
                                                <div class="details">
                                                    <div class="number">{{ item.amount }}</div>
                                                </div>
                                                <div class="desc">{{ item.desc }}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="bravo-user-chart">
                                <div class="chart-title">
                                    {{ "Earning statistics" }}
                                    <div class="action-control">
                                        <div id="reportrange">
                                            <i class="fa fa-calendar"></i>&nbsp;
                                            <span @click="toggleDropdown">{{ selectedOption }}</span>
                                            <i class="fa fa-caret-down" @click="toggleDropdown"></i>
                                            <ul :class="{ 'true': isDropdownOpen }" v-if="isDropdownOpen"
                                                class="dropdown-menu">
                                                <li v-for="option in options" :key="option"
                                                    @click="selectOption(option)">
                                                    {{ option }}
                                                </li>
                                            </ul>
                                            <div v-if="selectedDate">
                                                {{ fromDate }} - {{ toDate }}
                                            </div>
                                            <div v-if="showDatePicker && selectedDate === 'Custom'"
                                                class="date-picker-class">
                                                <div>
                                                    <date-picker v-model="customFromDate" class="full-width" type="date"
                                                        format="YYYY-MM-DD" :inline="true"></date-picker>
                                                    <date-picker v-model="customToDate" class="full-width" type="date"
                                                        format="YYYY-MM-DD" :inline="true"></date-picker>
                                                </div>
                                                <div class="apply_con">
                                                    <button @click="getSelectedValues" class="apply_btn">Apply</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <canvas id="planet-chart"></canvas>
                                </div>
                            </div>
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
import Chart from 'chart.js';
export default {
    components: {
        Sidebar,
        userbc
    },
    data() {
        return {
            breadcrumbs: [
                {
                    name: 'Dashboard',
                    url: '#'
                }
            ],
            cardsReport: [],
            earningChartData: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                data: [65, 59, 80, 81, 56, 55, 40]
            },
            token: null,
            isDropdownOpen: false,
            selectedOption: '',
            options: [
                'Today',
                'Yesterday',
                'Last 30 days',
                'This Month',
                'Last Month',
                'This Year',
                'This Week',
                'Custom'
            ],
            FromDate: null,
            ToDate: null,
            selectedDate: null,
            fromDate: null,
            toDate: null,
            customFromDate: null,
            customToDate: null,
            datavalue: null,
            Pending: null,
            Earning: null,
            showDatePicker: true,
        };
    },
    mounted() {
        // Fetch data here
        this.FromDate = new Date().toLocaleString();
        this.ToDate = new Date().toLocaleString();
        this.fetchData();
        this.renderChart(); // Call renderChart here to display static data
        this.fetchChartData(this.FromDate, this.ToDate);
    },
    watch: {
        customFromDate(newDate) {
            if (newDate > this.customToDate) {
                this.customToDate = newDate;
            }
        },
        customToDate(newDate) {
            if (newDate < this.customFromDate) {
                this.customToDate = this.customFromDate;
            }
        }
    },
    methods: {
        formatDate(dateString) {
            const date = new Date(dateString);
            const month = date.getMonth() + 1; // Months are zero-based
            const day = date.getDate();
            const year = date.getFullYear();
            return `${month}/${day}/${year}`;
        },
        getSelectedValues() {
            const formattedFromDate = this.customFromDate ? this.formatDate(this.customFromDate) : 'No Date Selected';
            const formattedToDate = this.customToDate ? this.formatDate(this.customToDate) : 'No Date Selected';
            console.log('Custom From Date:', formattedFromDate);
            console.log('Custom To Date:', formattedToDate);
            this.fromDate = formattedFromDate;
            this.toDate = formattedToDate;
            this.fetchChartData(this.fromDate, this.toDate);
            this.showDatePicker = false;
            // You can perform further operations with these values here
        },
        selectOption(option) {
            const today = new Date();
            let fromDate, toDate;
            switch (option) {
                case 'Today':
                    fromDate = toDate = today.toLocaleDateString();
                    this.isDropdownOpen = false;
                    break;
                case 'Yesterday':
                    const yesterday = new Date(today);
                    yesterday.setDate(today.getDate() - 1);
                    fromDate = toDate = yesterday.toLocaleDateString();
                    this.isDropdownOpen = false;
                    break;
                case 'Last 30 days':
                    const last30Days = new Date(today);
                    last30Days.setDate(today.getDate() - 30);
                    fromDate = last30Days.toLocaleDateString();
                    toDate = today.toLocaleDateString();
                    this.isDropdownOpen = false;
                    break;
                case 'This Month':
                    fromDate = new Date(today.getFullYear(), today.getMonth(), 1).toLocaleDateString();
                    toDate = new Date(today.getFullYear(), today.getMonth() + 1, 0).toLocaleDateString();
                    this.isDropdownOpen = false;
                    break;
                case 'Last Month':
                    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
                    fromDate = lastMonth.toLocaleDateString();
                    toDate = new Date(today.getFullYear(), today.getMonth(), 0).toLocaleDateString();
                    this.isDropdownOpen = false;
                    break;
                case 'This Week':
                    const firstDayOfWeek = today.getDate() - today.getDay();
                    fromDate = new Date(today.setDate(firstDayOfWeek)).toLocaleDateString();
                    toDate = new Date(today.setDate(firstDayOfWeek + 6)).toLocaleDateString();
                    this.isDropdownOpen = false;
                    break;
                case 'This Year':
                    fromDate = new Date(today.getFullYear(), 0, 1).toLocaleDateString();
                    toDate = new Date(today.getFullYear(), 11, 31).toLocaleDateString();
                    this.isDropdownOpen = false;
                    break;
                case 'Custom':
                    this.isDropdownOpen = false;
                    console.log(this.customFromDate, "customFromDate");
                    console.log(this.customToDate, "customToDate");
                    this.showDatePicker = true;
                    break;
                default:
                    fromDate = toDate = option;
                    break;
            }
            this.selectedDate = option;
            this.fromDate = fromDate;
            this.toDate = toDate;
            console.log(this.fromDate, "this.fromDate");
            console.log(this.toDate, "this.toDate");
            console.log(this.customFromDate, "customFromDate")
            this.fetchChartData(this.fromDate, this.toDate);
        },
        toggleDropdown() {
            this.isDropdownOpen = !this.isDropdownOpen;
        },
        formatDatetoYear(date) {
            if (!date) return null;
            const validDate = new Date(date);
            if (isNaN(validDate)) return null;
            const year = validDate.getFullYear();
            const month = (validDate.getMonth() + 1).toString().padStart(2, '0');
            const day = validDate.getDate().toString().padStart(2, '0');
            return `${year}-${month}-${day}`;
        },
        fetchData() {
            axios.get('/api/vendor/dashboard').then(({ data }) => {
                this.cardsReport = data.data.cards_report;
                this.earningChartData = data.data.earning_chart_data;
                this.renderChart(); // Call the chart rendering method here
            }).catch(error => {
                console.error("Error fetching data:", error);
            });
        },
        fetchChartData(from, to) {
            const formattedFromDate = this.formatDatetoYear(from);
            const formattedToDate = this.formatDatetoYear(to);
            console.log(formattedFromDate, "formattedFromDate___")
            console.log(formattedToDate, "formattedToDate")
            axios.post('/api/vendor/statistic/reloadChart', {
                from: formattedFromDate,
                to: formattedToDate,
                chart: 'earning'
            }).then(({ data }) => {
                this.datavalue = data.data.labels;
                this.Pending = data.data.datasets[1].data;
                this.Earning = data.data.datasets[0].data;
                //console.log(this.Pending, this.Earning, this.datavalue)
                this.renderChart()
            }).catch(error => {
                console.error("Error fetching chart data:", error);
            });
        },
        renderChart() {
            if (!this.earningChartData) return;
            const ctx = document.getElementById('planet-chart').getContext('2d');
            new Chart(ctx, {
                type: 'bar', // Change the chart type to 'bar'
                data: {
                    labels: this.datavalue,
                    datasets: [
                        {
                            label: 'Total Earnings',
                            data: this.Earning,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        },
                        {
                            label: 'Total Pending', // Change the label for the new dataset
                            data: this.Pending, // The new data array
                            backgroundColor: 'rgba(153, 102, 255, 0.2)', // New background color
                            borderColor: 'rgba(153, 102, 255, 1)', // New border color
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
        }
    }
}
</script>
<style scoped>
.dropdown {
    display: inline-block;
    position: relative;
    cursor: pointer;
}

.dropdown-menu {
    display: block;
    list-style: none;
    padding: 0;
    margin: 0;
    position: absolute;
    left: -85px;
    background-color: white;
    border: 1px solid #ccc;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    /* Make sure dropdown is above other content */
}

.dropdown-menu li {
    padding: 10px;
    cursor: pointer;
}

.dropdown-menu li:hover {
    background-color: #f0f0f0;
}

.date-picker-class {
    display: flex;
    justify-content: center;
    flex-direction: column;
}

.apply_con {
    text-align: center;
    padding: 18px;
}

.apply_btn {
    width: 112px;
}

.bravo_wrap .bravo_user_profile .bravo-user-chart .chart-title .action-control #reportrange {
    background: #fff;
    cursor: pointer;
    display: flex;
    padding: 0px 15px;
    border: 1px solid #ccc;
    font-weight: normal;
}

.bravo_wrap .bravo_user_profile .bravo-user-chart .chart-title .action-control #reportrange .fa {
    margin-left: 5px;
    margin-top: 10px;
    margin-right: 10px;
}
</style>