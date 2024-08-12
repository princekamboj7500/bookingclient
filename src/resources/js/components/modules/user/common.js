export default {
    data() {
        return {
            currentPage: 1,
            pageSize: 9,
            totalPages: 0,
            data: [],
            total: 0,
            search: {
                location_id: null,
                start: null,
                end: null,
                date: null,
                price_range: null
            },
            attributes: [],
            list_location: [],
            selectedLocation: "",
            selectedLocationId: null,
            showDropdown: false,
            isLoading: false,
            selected: {},
            selectedStars: [],
            selectedScores: [],
            feature_image_imageUrl: "",
            title: "Guests", // Replace with dynamic title if needed
            rooms: this.getQueryParameter("room", 1),
            adults: this.getQueryParameter("adults", 1),
            children: this.getQueryParameter("children", 0),
            showDropdownGuest: false,
            dropdownOpenRecomended: false,
            selectedOrder: "",
            selectedLabel: "Recommended",
            options: [
                { value: "", label: "Recommended" },
                { value: "price_low_high", label: "Price (Low to high)" },
                { value: "price_high_low", label: "Price (High to low)" },
                { value: "rate_high_low", label: "Rating (High to low)" },
            ],
            minPrice: 0,
            maxPrice: 0,
            priceRange: [],
            selectedCategories: [],
            dateFromTo: [new Date(), new Date()],
            locationPlaceholder: "Where are you going?",
            showDropdownToLocation: false,
            locationPlaceholderTo: "Where are you going?",
            dropdownOpenTravel: false,
            seat_type: {
                vip: 0,
                eco: 0,
                premium: 0,
                business: 0,
                first_class: 0,
            },
            seatLabels: {
                vip: "Vip",
                eco: "Economy",
                premium: "Premium",
                business: "Business",
                fist_class: "First Class",
            },
            selectedCategories: [],
            starRates: [],
            params: {},
            searchParams: {},
            boat_start_date: '',
        };
    },
    mounted() {
        if(window.location.pathname === "/hotels"){
            this.search.room = this.rooms;
            this.search.adults = this.adults;
            this.search.children = this.children;
        }   
        localStorage.removeItem('location_id');
        //console.log("priceRange in mounted",this.priceRangeArray);
    },
    computed: {
        paginatedData() {
            const start = (this.currentPage - 1) * this.pageSize;
            const end = start + this.pageSize;
            return this.data.slice(start, end);
        },
        startItem() {
            return (this.currentPage - 1) * this.pageSize + 1;
        },
        endItem() {
            return Math.min(this.currentPage * this.pageSize, this.total);
        },
        priceMarks() {
            return {
                [this.minPrice]: this.minPrice,
                [Math.round(this.maxPrice / 4)]: Math.round(this.maxPrice / 4),
                [Math.round(this.maxPrice / 2)]: Math.round(this.maxPrice / 2),
                [Math.round((3 * this.maxPrice) / 4)]: Math.round(
                    (3 * this.maxPrice) / 4
                ),
                [this.maxPrice]: this.maxPrice,
            };
        },
    },
    methods: {
        getSearchResult() {
            //console.log("dateFromTo", this.dateFromTo);
            if (this.dateFromTo.length > 0 && window.location.pathname != "/boats") {
                this.search.start = this.dateFromTo[0];
                this.search.end = this.dateFromTo[1];
                this.search.date = `${this.formatDate(this.search.start)} - ${this.formatDate(this.search.end)}`;
            }
            console.log("priceRange in getSearchResult",this.priceRangeArray);
            if(this.priceRangeArray){
                this.search.price_range = `${this.priceRangeArray[0]};${this.priceRangeArray[1]}`;
            }

            var params = this.search || {};
            if (window.location.pathname == "/boats") {
                console.log("boat_start_date",this.boat_start_date);
                params = {
                    start: this.boat_start_date,
                    location_id: this.search.location_id,
                    price_range: this.search.price_range
                }
            }
            if (window.location.pathname == "/flights") {
                params = {
                    from_where: this.search.location_id,
                    to_where: this.search.to_where,
                    'seat_type[vip]': this.seat_type.vip,
                    'seat_type[eco]': this.seat_type.eco,
                    'seat_type[premium]': this.seat_type.premium,
                    'seat_type[business]': this.seat_type.business,
                    'seat_type[first_class]': this.seat_type.first_class,
                }
                this.$emit('search', params);
            }
            if (window.location.pathname == "/cars" || window.location.pathname == "/events") {
                params = params;
                this.$emit('search', params);
            }
            console.log("in getSearchResult params", params);
            localStorage.setItem('location_id',this.search.location_id);
            this.$emit('search', params);
        },
        formatDate(dateStr) {
            const [month, day, year] = dateStr.split("/");
            return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
        },
        notBeforeToday(date) {
            return date < new Date(new Date().setHours(0, 0, 0, 0));
        },
        changePage(page) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
            }
        },
        formatTooltip(value) {
            return `$${value}`;
        },
        applyPriceRange() {
            // You can handle the price range application logic here
            console.log("Applied price range:", this.priceRangeArray);
            this.priceRangeArray = this.priceRangeArray;
        },
        formatPrice(price) {
            return Math.round(price);
        },
        toggleDropdown() {
            //console.log("in toggleDropdown");
            this.showDropdown = !this.showDropdown;
        },
        toggleDropdownToLocation() {
            //console.log("in toggleDropdown");
            this.showDropdownToLocation = !this.showDropdownToLocation;
        },
        selectLocation(location) {
            this.selectedLocation = location.title;
            this.locationPlaceholder = location.name;
            this.search.location_id = location.id;
            this.showDropdown = false;
        },
        selectLocationTo(location) {
            this.selectedLocation = location.title;
            this.locationPlaceholderTo = location.name;
            this.search.to_where = location.id;
            this.showDropdown = false;
        },
        toggleDropdownGuest() {
            this.showDropdownGuest = !this.showDropdownGuest;
        },
        increment(type) {
            this[type]++;
            //console.log("increment =>","rooms",this.rooms,"adults",this.adults,"children",this.children);
            this.search.room = this.rooms;
            this.search.adults = this.adults;
            this.search.children = this.children;
        },
        decrement(type) {
            if (type === "rooms" && this.rooms > 1) this.rooms--;
            if (type === "adults" && this.adults > 1) this.adults--;
            if (type === "children" && this.children > 0) this.children--;
            //console.log("decrement =>","rooms",this.rooms,"adults",this.adults,"children",this.children);
            this.search.room = this.rooms;
            this.search.adults = this.adults;
            this.search.children = this.children;
        },
        toggleDropdownTravel() {
            this.dropdownOpenTravel = !this.dropdownOpenTravel;
        },
        incrementTravel(key) {
            this.seat_type[key]++;
            console.log("seat_type", this.seat_type);
        },
        decrementTravel(key) {
            if (this.seat_type[key] > 0) {
                this.seat_type[key]--;
            }
        },
        getQueryParameter(name, defaultValue) {
            const urlParams = new URLSearchParams(window.location.search);
            return parseInt(urlParams.get(name)) || defaultValue;
        },
        toggleDropdownRecomended() {
            this.dropdownOpenRecomended = !this.dropdownOpenRecomended;
        },
        selectOption(option) {
            this.selectedOrder = option.value;
            this.selectedLabel = option.label;
            console.log("selectedOrder",this.selectedOrder);
            this.dropdownOpenRecomended = false;

            console.log("priceRange in selectOption",this.priceRangeArray);
            var price_range = '';
            if(this.priceRangeArray){
                price_range = `${this.priceRangeArray[0]};${this.priceRangeArray[1]}`;
            }

            const formatDate = (date) => {
                const month = ("0" + (date.getMonth() + 1)).slice(-2);
                const day = ("0" + date.getDate()).slice(-2);
                const year = date.getFullYear();
                return `${month}/${day}/${year}`;
            };

            let today = new Date();
            let tomorrow = new Date();
            tomorrow.setDate(today.getDate() + 1);

            let startDate = formatDate(today);
            let endDate = formatDate(tomorrow);
            let date = `${this.formatDate(startDate)} - ${this.formatDate(endDate)}`;
            let params = {};
            if(window.location.pathname == '/hotels' || window.location.pathname == '/spaces'){
                params = {
                    start: startDate,
                    end: endDate,
                    date: date,
                    room: 1,
                    adults: 1,
                    children: 0,
                    price_range: price_range,
                    orderby: this.selectedOrder
                }
            }else if(window.location.pathname == '/flights'){
                params = {
                    start: startDate,
                    end: endDate,
                    date: date,
                    'seat_type[vip]': this.seat_type.vip,
                    'seat_type[eco]': this.seat_type.eco,
                    'seat_type[premium]': this.seat_type.premium,
                    'seat_type[business]': this.seat_type.business,
                    'seat_type[first_class]': this.seat_type.first_class,
                    price_range: price_range,
                    orderby: this.selectedOrder
                }
            }else if(window.location.pathname == '/boats'){
                params = {
                    start: startDate,
                    date: this.formatDate(startDate),
                    price_range: price_range,
                    orderby: this.selectedOrder
                }
            }else{
                params = {
                    start: startDate,
                    end: endDate,
                    date: date,
                    price_range: price_range,
                    orderby: this.selectedOrder
                }
            }
            
            this.$emit('orderby', params);
        },
        convertDateFormat(dateStr) {
            const parts = dateStr.split("/");
            if (parts.length === 3) {
                const year = parts[2];
                const month = parts[0].padStart(2, "0");
                const day = parts[1].padStart(2, "0");
                return `${year}-${month}-${day}`;
            }
            return dateStr; // Return input if format is unexpected
        },
        handleStarChange() {
            // Emit search event with updated params
            this.emitSearch();
        },

        getStarRates() {
            return this.selectedStars.map((star) => `${star}`);
        },

        handleReviewChange() {
            // Emit search event with updated params
            this.emitSearch();
        },
        getReviewRates() {
            return this.selectedScores.map((score) => `${score}`);
        },
        toggleSelection(attributeId, termSlug) {
            const attributeKey = `attr[${attributeId}]`;

            if (!this.search[attributeKey]) {
                this.search[attributeKey] = [];
            }

            if (this.search[attributeKey].includes(termSlug)) {
                this.search[attributeKey] = this.search[attributeKey].filter(
                    (slug) => slug !== termSlug
                );
            } else {
                this.search[attributeKey].push(termSlug);
            }

            // Emit search event with updated params
            this.emitSearch();
        },
        handleCategorieChange(id, slug) {
            const categoryKey = "cat_id";

            if (!this.search[categoryKey]) {
                this.search[categoryKey] = [];
            }

            if (this.search[categoryKey].includes(slug)) {
                this.search[categoryKey] = this.search[categoryKey].filter(
                    (category) => category !== slug
                );
            } else {
                this.search[categoryKey].push(slug);
            }

            // Emit search event with updated params
            this.emitSearch();
        },
        emitSearch() {
            const formatDate = (date) => {
                const month = ("0" + (date.getMonth() + 1)).slice(-2);
                const day = ("0" + date.getDate()).slice(-2);
                const year = date.getFullYear();
                return `${month}/${day}/${year}`;
            };

            let today = new Date();
            let tomorrow = new Date();
            tomorrow.setDate(today.getDate() + 1);

            let startDate = formatDate(today);
            let endDate = formatDate(tomorrow);

            const ReviewRates = this.getReviewRates();

            if(this.priceRangeArray){
                var price_range = `${this.priceRangeArray[0]};${this.priceRangeArray[1]}`;
            }

            let params = {};
            var location_id = localStorage.getItem('location_id');
            console.log("location_id",location_id);
            if(location_id){
                params = {
                    review_score: ReviewRates,
                    price_range: price_range,
                };
            }else{
                params = {
                    review_score: ReviewRates,
                    price_range: price_range,
                    start: startDate,
                    end: endDate
                };
            }

            if (window.location.pathname == "/boats") {
                params = {
                    review_score: ReviewRates,
                    price_range: price_range,
                    start: startDate,
                };
            }

            this.params = params;

            console.log("starRates",this.getStarRates());

            if (window.location.pathname == "/hotels") {
                this.params = {
                    ...params,
                    star_rate: this.getStarRates(),
                    review_score: this.getReviewRates(),
                };
            }

            if (window.location.pathname == "/tours") {
                this.params = {
                    ...params,
                    review_score: this.getReviewRates(),
                };
            }

            if (window.location.pathname == "/spaces") {
                this.params = {
                    ...params,
                    review_score: this.getReviewRates(),
                };
            }
            if (window.location.pathname == "/cars") {
                this.params = {
                    ...params,
                    review_score: this.getReviewRates(),
                };
            }
            if (window.location.pathname == "/events") {
                this.params = {
                    ...params,
                    review_score: this.getReviewRates(),
                };
            }
            if (window.location.pathname == "/flights") {
                this.params = {
                    ...params,
                    review_score: this.getReviewRates(),
                };
            }

            // Add all selected attributes and categories to params
            for (const key in this.search) {
                if (key.startsWith("attr[") || key === "cat_id") {
                    this.params[key] = this.search[key];
                }
            }
            this.$emit("filter", this.params);
        },
    },
};
