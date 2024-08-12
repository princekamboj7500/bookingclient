<template>
    <div id="main-div">
        <div class="item orderby">
            <div class="item-title">
                Sort by:
            </div>
            <input type="hidden" name="orderby" :value="selectedOrder">
            <div :class="['dropdown', { show: dropdownOpenRecomended }]">
                <span class="dropdown-toggle" @click="toggleDropdownRecomended" :aria-expanded="dropdownOpenRecomended">
                    {{ selectedLabel }}
                </span>
                <div :class="['dropdown-menu', 'dropdown-menu-right', { show: dropdownOpenRecomended }]">
                    <a v-for="option in options" :key="option.value" class="dropdown-item" href="#"
                        @click.prevent="selectOption(option)">
                        {{ option.label }}
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import common from './common';

export default {
    components: {
        
    },
    mixins: [common],
    props: ['type', 'priceRangeArray'],
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
    .item.orderby {
        border-left: solid 1px #a7a7a7 !important;
    }
</style>