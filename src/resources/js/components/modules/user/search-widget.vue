<template>
    <div id="main-div">
        <div v-if="type == 'hotel' || type == 'space'" class="row">
            <div class="col-lg-12 col-md-12">
                <form @submit.prevent="getSearchResult()" class="form bravo_form">
                    <div class="g-field-search">
                        <div class="row">
                            <div class="col-md-4 border-right">
                                <div class="form-group">
                                    <i class="field-icon fa icofont-map"></i>
                                    <div class="form-content">
                                        <label> Location </label>
                                        <div class="smart-search">
                                            <input type="text" class="smart-search-location parent_text form-control"
                                                readonly="" :placeholder=locationPlaceholder v-model="selectedLocation"
                                                @click="toggleDropdown" data-default="">
                                            <div class="bravo-autocomplete" v-show="showDropdown">
                                                <div v-for="location in locationList" :key="location.id"
                                                    class="list-item" @click="selectLocation(location)">
                                                    <div class="item" :data-id="location.id" :data-text="location.name">
                                                        <i class="icofont-location-pin"></i> {{ location.name
                                                        }}
                                                    </div>
                                                </div>
                                                <div class="message" v-if="isLoading">Loading...</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4 border-right">
                                <div class="form-group">
                                    <i class="field-icon icofont-wall-clock"></i>
                                    <div class="form-content">
                                        <div class="form-date-search-hotel">
                                            <div class="date-wrapper">
                                                <div class="check-in-wrapper">
                                                    <label v-if="type == 'space'">From - To</label>
                                                    <label v-if="type == 'hotel'">Check In - Out</label>
                                                    <!-- <div class="render check-in-render">06/04/2024</div>
                                                    <span> - </span>
                                                    <div class="render check-out-render">06/05/2024</div> -->
                                                    <date-picker v-model="dateFromTo" :disabled-date="notBeforeToday"
                                                        value-type="MM/DD/YYYY" type="date" range
                                                        placeholder="Select date range"></date-picker>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4 border-right">
                                <div class="form-select-guests">
                                    <div class="form-group">
                                        <i class="field-icon icofont-travelling"></i>
                                        <div class="form-content dropdown-toggle" @click="toggleDropdownGuest">
                                            <div class="wrapper-more">
                                                <label>{{ title }}</label>
                                                <div class="render">
                                                    <span class="adults">
                                                        <span class="one" v-if="adults === 1">{{ `1 Adult`
                                                            }}</span>
                                                        <span class="multi" v-if="adults > 1">{{ `${adults}
                                                            Adults` }}</span>
                                                    </span>
                                                    -
                                                    <span class="children">
                                                        <span class="one" v-if="children === 0">{{ `0 Child`
                                                            }}</span>
                                                        <span class="multi" v-if="children > 0">{{ `${children}
                                                            Children` }}</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            :class="['dropdown-menu', 'select-guests-dropdown', { show: showDropdownGuest }]">
                                            <div class="dropdown-item-row" v-if="type == 'hotel'">
                                                <div class="label">{{ 'Rooms' }}</div>
                                                <div class="val">
                                                    <span class="btn-minus" @click="decrement('rooms')"><i
                                                            class="icon ion-md-remove"></i></span>
                                                    <span class="count-display"><input type="number"
                                                            v-model.number="rooms" min="1"></span>
                                                    <span class="btn-add" @click="increment('rooms')"><i
                                                            class="icon ion-ios-add"></i></span>
                                                </div>
                                            </div>
                                            <div class="dropdown-item-row">
                                                <div class="label">{{ 'Adults' }}</div>
                                                <div class="val">
                                                    <span class="btn-minus" @click="decrement('adults')"><i
                                                            class="icon ion-md-remove"></i></span>
                                                    <span class="count-display"><input type="number"
                                                            v-model.number="adults" min="1"></span>
                                                    <span class="btn-add" @click="increment('adults')"><i
                                                            class="icon ion-ios-add"></i></span>
                                                </div>
                                            </div>
                                            <div class="dropdown-item-row">
                                                <div class="label">{{ 'Children' }}</div>
                                                <div class="val">
                                                    <span class="btn-minus" @click="decrement('children')"><i
                                                            class="icon ion-md-remove"></i></span>
                                                    <span class="count-display"><input type="number"
                                                            v-model.number="children" min="0"></span>
                                                    <span class="btn-add" @click="increment('children')"><i
                                                            class="icon ion-ios-add"></i></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="g-button-submit">
                        <button class="btn btn-primary btn-search" type="submit">Search</button>
                    </div>
                </form>
            </div>
        </div>
        <div v-if="type === 'tour' || type === 'car' || type == 'event' || type == 'boat'" class="row">
            <div class="col-lg-12 col-md-12">
                <form @submit.prevent="getSearchResult()" class="form bravo_form">
                    <div class="g-field-search">
                        <div class="row">
                            <div class="col-md-6 border-right">
                                <div class="form-group">
                                    <i class="field-icon fa icofont-map"></i>
                                    <div class="form-content">
                                        <label> Location </label>
                                        <div class="smart-search">
                                            <input type="text" class="smart-search-location parent_text form-control"
                                                readonly="" :placeholder=locationPlaceholder v-model="selectedLocation"
                                                @click="toggleDropdown" data-default="">
                                            <div class="bravo-autocomplete" v-show="showDropdown">
                                                <div v-for="location in locationList" :key="location.id"
                                                    class="list-item" @click="selectLocation(location)">
                                                    <div class="item" :data-id="location.id" :data-text="location.name">
                                                        <i class="icofont-location-pin"></i> {{
                                                            location.name
                                                        }}
                                                    </div>
                                                </div>
                                                <div class="message" v-if="isLoading">Loading...</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-if="type == 'boat'" class="col-md-6 border-right">
                                <div class="form-group">
                                    <i class="field-icon icofont-wall-clock"></i>
                                    <div class="form-content">
                                        <div class="form-date-search-hotel">
                                            <div class="date-wrapper">
                                                <div class="check-in-wrapper">
                                                    <label>Start Date</label>
                                                    <date-picker v-model="boat_start_date" value-type="MM/DD/YYYY"
                                                        :disabled-date="notBeforeToday" type="date"
                                                        placeholder="Select start date"></date-picker>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-else class="col-md-6 border-right">
                                <div class="form-group">
                                    <i class="field-icon icofont-wall-clock"></i>
                                    <div class="form-content">
                                        <div class="form-date-search-hotel">
                                            <div class="date-wrapper">
                                                <div class="check-in-wrapper">
                                                    <label>From - To</label>
                                                    <date-picker v-model="dateFromTo" value-type="MM/DD/YYYY"
                                                        :disabled-date="notBeforeToday" type="date" range
                                                        placeholder="Select date range"></date-picker>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="g-button-submit">
                        <button class="btn btn-primary btn-search" type="submit">Search</button>
                    </div>
                </form>
            </div>
        </div>
        <div v-if="type == 'flight'" class="row">
            <div class="col-lg-12 col-md-12">
                <form @submit.prevent="getSearchResult()" class="form bravo_form">
                    <div class="g-field-search">
                        <div class="row">
                            <div class="col-md-3 border-right">
                                <div class="form-group">
                                    <i class="field-icon icofont-paper-plane"></i>
                                    <div class="form-content">
                                        <label> From where </label>
                                        <div class="smart-search">
                                            <input type="text" class="smart-search-location parent_text form-control"
                                                readonly="" :placeholder=locationPlaceholder v-model="selectedLocation"
                                                @click="toggleDropdown" data-default="">
                                            <div class="bravo-autocomplete" v-show="showDropdown">
                                                <div v-for="location in locationList" :key="location.id"
                                                    class="list-item" @click="selectLocation(location)">
                                                    <div class="item" :data-id="location.id" :data-text="location.name">
                                                        <i class="icofont-location-pin"></i> {{ location.name
                                                        }}
                                                    </div>
                                                </div>
                                                <div class="message" v-if="isLoading">Loading...</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3 border-right">
                                <div class="form-group">
                                    <i class="field-icon icofont-paper-plane"></i>
                                    <div class="form-content">
                                        <label> To where </label>
                                        <div class="smart-search">
                                            <input type="text" class="smart-search-location parent_text form-control"
                                                readonly="" :placeholder=locationPlaceholderTo
                                                v-model="selectedLocation" @click="toggleDropdownToLocation"
                                                data-default="">
                                            <div class="bravo-autocomplete" v-show="showDropdownToLocation">
                                                <div v-for="location in locationList" :key="location.id"
                                                    class="list-item" @click="selectLocationTo(location)">
                                                    <div class="item" :data-id="location.id" :data-text="location.name">
                                                        <i class="icofont-location-pin"></i> {{ location.name
                                                        }}
                                                    </div>
                                                </div>
                                                <div class="message" v-if="isLoading">Loading...</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3 border-right">
                                <div class="form-group">
                                    <i class="field-icon icofont-wall-clock"></i>
                                    <div class="form-content">
                                        <div class="form-date-search-hotel">
                                            <div class="date-wrapper">
                                                <div class="check-in-wrapper">
                                                    <label>Depart</label>
                                                    <date-picker v-model="dateFromTo" value-type="MM/DD/YYYY"
                                                        :disabled-date="notBeforeToday" type="date" range
                                                        placeholder="Select date range"></date-picker>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3 border-right">
                                <div class="form-select-seat-type">
                                    <div class="form-group">
                                        <i class="field-icon icofont-ticket"></i>
                                        <div class="form-content dropdown-toggle" @click="toggleDropdownTravel">
                                            <div class="wrapper-more">
                                                <label> Travelers </label>
                                                <div class="render font-size-14">
                                                    <span v-for="(seat, key) in seat_type" :key="key" class="">
                                                        <span class="one">{{ seat }} {{ seatLabels[key] }}</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            :class="['dropdown-menu', 'select-seat-type-dropdown', { show: dropdownOpenTravel }]">
                                            <div v-for="(seat, key) in seat_type" :key="key" class="dropdown-item-row">
                                                <div class="label">Adults {{ seatLabels[key] }}</div>
                                                <div class="val">
                                                    <span class="btn-minus" @click="decrementTravel(key)"><i
                                                            class="icon ion-md-remove"></i></span>
                                                    <span class="count-display">
                                                        <input :id="key" type="number" :name="'seat_type[' + key + ']'"
                                                            v-model="seat_type[key]" min="0">
                                                    </span>
                                                    <span class="btn-add" @click="incrementTravel(key)"><i
                                                            class="icon ion-ios-add"></i></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="g-button-submit">
                        <button class="btn btn-primary btn-search" type="submit">Search</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css';
import common from './common';

export default {
    components: {
        VueSlider
    },
    mixins: [common],
    props: ['locationList', 'type', 'priceRangeArray'],
    data() {
        return {

        }
    },
    mounted() {
        console.log('filter Component mounted.');
    },
    computed: {

    },
    methods: {

    }
}
</script>

<style scoped>
.bravo-autocomplete {
    opacity: 1 !important;
    visibility: unset !important;
}
.mx-input-wrapper {
    position: relative;
    width: max-content !important;
}
</style>