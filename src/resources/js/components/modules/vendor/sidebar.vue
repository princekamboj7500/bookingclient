<template>
  <div class="sidebar-user">
    <div class="bravo-close-menu-user">
      <i class="icofont-scroll-left"></i>
    </div>
    <div class="logo">
      <div class="avatar avatar-cover" v-if="isImage">
        <img :src=user.avatarUrl alt="User Avatar" class="avatar-image">
      </div>
      
    </div>
    <div class="user-profile-avatar">
      <div class="info-new">
        <span class="role-name badge badge-info">{{ displayName }}</span>
        <h5>{{ user.business_name }}</h5>
        <p>Member Since {{ formattedDate }}</p>
      </div>
    </div>
    <div class="user-profile-plan" v-if="!hasVendorAccess && vendorEnabled">
      <a :href="routes.upgradeVendor">{{ $t('Become a vendor') }}</a>
    </div>
    <div class="sidebar-menu">
      <ul class="main-menu">
        <li v-for="(menuItem, index) in sortedMenus" :key="menuItem.title"
          :class="[{ active: isActive(menuItem) || isChildActive(menuItem) }, { active_child: isChildActive(menuItem) }, menuItem.class]"
          :position="menuItem.position">
          <router-link :to="`/user/${menuItem.url}`">
            <span v-if="menuItem.icon" class="icon text-center"><i :class="menuItem.icon"></i></span>
            <span v-html="menuItem.title"></span>
          </router-link>
          <i v-if="menuItem.children" class="caret"></i>
          <ul v-if="menuItem.children" class="children">
            <li v-for="(child, childIndex) in menuItem.children" :key="child.title"
              :class="{ active: isActive(child) }">
              <router-link :to="`/user/${child.url}`">
                <i v-if="child.icon" :class="child.icon"></i>
                {{ child.title }}
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="logout">
      <a href="#" @click.prevent="logout"><i class="fa fa-sign-out"></i>logout</a>
    </div>
    <div class="logout">
      <a href="/" style="color: #1ABC9C"><i class="fa fa-long-arrow-left"></i> {{ 'Back to Homepage'
        }}</a>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      csrfToken: document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
      user: {
        avatarUrl: '', // fetch from user data
        displayName: '', // fetch from user data
        roleName: '', // fetch from user data
        created_at: '', // fetch from user data
        business_name: '',
      },
      isImage: false,
      menus: {
        dashboard: {
          url: 'dashboard-vue',
          title: 'Dashboard',
          icon: 'fa fa-home',
          permission: 'dashboard_vendor_access',
          position: 10,
        },
        booking_history: {
          url: 'booking-history-vue',
          title: 'Booking History',
          icon: 'fa fa-clock-o',
          position: 20,
        },
        wishlist: {
          url: 'wishlist-vue',
          title: 'Wishlist',
          icon: 'fa fa-heart-o',
          position: 21,
        },
        profile: {
          url: 'profile-vue',
          title: 'My Profile',
          icon: 'fa fa-cogs',
          position: 22,
        },
        manage_hotel: {
          url: "hotel-vue",
          title: "Manage Hotel",
          icon: 'fa fa-building-o',
          class: 'has-children',
          children: [
            {
              title: 'All Hotels',
              url: 'hotel-vue',  // Add URL for the child item if available
              class: '',
              icon: '',
            },
            {
              title: 'Add Hotel',
              url: 'hotel-create-vue',  // Add URL for the child item if available
              class: '',
              icon: '',
            },
            {
              title: 'Recovery',
              url: 'hotel-vue?page=recovery',  // Add URL for the child item if available
              class: '',
              icon: '',
            }
          ],
          position: 30,
        },
        manage_tour: {
          url: "tours-vue",
          title: "Manage Tour",
          icon: 'icofont-island-alt',
          class: 'has-children',
          children: [
            {
              title: 'All Tours',
              url: 'tours-vue',  // Add URL for the child item if available
              class: '',
              icon: '',
            },
            {
              title: 'Add Tour',
              url: 'tour-create-vue',  // Add URL for the child item if available
              class: '',
              icon: '',
            },
            {
              title: 'Availability',
              url: 'tour-availability-vue',  // Add URL for the child item if available
              class: '',
              icon: '',
            },
            {
              title: 'Recovery',
              url: 'tours-vue?page=recovery',  // Add URL for the child item if available
              class: '',
              icon: '',
            }
          ],
          position: 40,
        },
        manage_space: {
          url: "space-vue",
          title: "Manage Space",
          icon: 'icofont-building-alt',
          class: 'has-children',
          children: [
            {
              title: 'All Spaces',
              url: 'space-vue',  // Add URL for the child item if available
              class: '',
              icon: '',
            },
            {
              title: 'Add Spaces',
              url: 'space-create-vue',  // Add URL for the child item if available
              class: '',
              icon: '',
            },
            {
              title: 'Availability',
              url: 'space-availability-vue',  // Add URL for the child item if available
              class: '',
              icon: '',
            },
            {
              title: 'Recovery',
              url: 'space-vue?page=recovery',  // Add URL for the child item if available
              class: '',
              icon: '',
            }
          ],
          position: 50,
        },
        manage_flight: {
          url: "flight-vue",
          title: "Manage Flight",
          icon: 'icofont-ui-flight',
          class: 'has-children',
          children: [
            {
              title: 'All Flights',
              url: 'flight-vue',  // Add URL for the child item if available
              class: '',
              icon: '',
            },
            {
              title: 'Add Flights',
              url: 'flight-create-vue',  // Add URL for the child item if available
              class: '',
              icon: '',
            }
          ],
          position: 60,
        },
        manage_car: {
          url: "cars-vue",
          title: "Manage Car",
          icon: 'icofont-car',
          class: 'has-children',
          children: [
            {
              title: 'All Cars',
              url: 'cars-vue',  // Add URL for the child item if available
              class: '',
              icon: '',
            },
            {
              title: 'Add Car',
              url: 'car-create-vue',  // Add URL for the child item if available
              class: '',
              icon: '',
            },
            {
              title: 'Availability',
              url: 'car-availability-vue',  // Add URL for the child item if available
              class: '',
              icon: '',
            },
            {
              title: 'Recovery',
              url: 'cars-vue?page=recovery',  // Add URL for the child item if available
              class: '',
              icon: '',
            }
          ],
          position: 70,
        },
        manage_boat: {
          url: "boats-vue",
          title: "Manage Boat",
          icon: 'icofont-ship',
          class: 'has-children',
          children: [
            {
              title: 'All Boats',
              url: 'boats-vue',  // Add URL for the child item if available
              class: '',
              icon: '',
            },
            {
              title: 'Add Boat',
              url: 'boat-create-vue',  // Add URL for the child item if available
              class: '',
              icon: '',
            },
            {
              title: 'Availability',
              url: 'boat-availability-vue',  // Add URL for the child item if available
              class: '',
              icon: '',
            },
            {
              title: 'Recovery',
              url: 'boats-vue?page=recovery',  // Add URL for the child item if available
              class: '',
              icon: '',
            }
          ],
          position: 80,
        },
        manage_event: {
          url: "events-vue",
          title: "Manage event",
          icon: 'icofont-ticket',
          class: 'has-children',
          children: [
            {
              title: 'All Events',
              url: 'events-vue',  // Add URL for the child item if available
              class: '',
              icon: '',
            },
            {
              title: 'Add Event',
              url: 'event-create-vue',  // Add URL for the child item if available
              class: '',
              icon: '',
            },
            {
              title: 'Availability',
              url: 'event-availability-vue',  // Add URL for the child item if available
              class: '',
              icon: '',
            },
            {
              title: 'Recovery',
              url: 'events-vue?page=recovery',  // Add URL for the child item if available
              class: '',
              icon: '',
            }
          ],
          position: 80,
        },
        copouns: {
          url: 'copouns-vue',
          title: 'Copons',
          icon: 'fa fa-ticket',
          position: 80.1,
        },
        news: {
          url: 'news-vue',
          title: 'Manage News',
          icon: 'ion-md-bookmarks',
          position: 80.2,
        },
        booking_report: {
          url: 'booking-report-vue',
          title: 'Booking Report',
          icon: 'icon ion-ios-pie',
          position: 81,
        },
        enquiry_report: {
          url: 'enquiry-report-vue',
          title: 'Enquiry Report',
          icon: 'icofont-ebook',
          position: 82,
        },
        Verification: {
          url: 'verification-vue',
          title: 'Verification',
          icon: 'fa fa-handshake-o',
          position: 85,
        },
        payouts: {
          url: 'payouts-vue',
          title: 'Payouts',
          icon: 'icon ion-md-card',
          position: 90,
        },
        my_plans: {
          url: 'my-plans-vue',
          title: 'My Plans',
          icon: 'fa fa-list-alt',
          position: 95,
        },
        password: {
          url: 'change-password-vue',
          title: 'Change Password',
          icon: 'fa fa-lock',
          position: 100,
        },
        admin: {
          url: 'admin-vue',
          title: 'Admin Dashboard',
          icon: 'icon ion-ios-ribbon',
          permission: 'dashboard_access',
          position: 110,
        },
      },
      routes: {
        upgradeVendor: this.$router.resolve('user.upgrade_vendor'),
        logout: this.$router.resolve('logout')
      },
      vendorEnabled: false, // fetch from settings
      activeIndex: null,
      activeChildIndex: null,
    };
  },
  computed: {
    displayName() {
      return this.user.first_name;
    },
    roleName() {
      return this.user.roleName;
    },
    hasVendorAccess() {
      if (this.user.permissions) {
        return this.user.permissions.includes('dashboard_vendor_access');
      } else {
        return [];
      }
    },
    sortedMenus() {
      return Object.values(this.menus).sort((a, b) => a.position - b.position);
    },
    capitalizedDisplayName() {
      if (this.user.displayName && this.user.displayName.length > 0) {
        return this.user.displayName[0].toUpperCase() + this.user.displayName.slice(1);
      } else {
        return ''; // or any default value you want to provide
      }
    },
    formattedDate() {
      return this.formatDate(this.user.created_at);
    }
  },
  created() {
    this.profileData();
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Invalid date';
      }
      const options = { year: 'numeric', month: 'long' };
      return new Intl.DateTimeFormat('en-US', options).format(date);
    },
    profileData() {
      axios.get('/api/vendor/profile').then(({ data }) => {
        //console.log("api profile data", data);
        if (data.status == 0 && data.code == "need_update_pw") {
          this.$router.push({ name: 'vendorChangePassword', query: { need_update_pw: 1 }  });
        } else {
          this.user = data.data.dataUser;
          if (data.data.dataUser.avatar_id) {
            this.getImage(data.data.dataUser.avatar_id);
          } else {
            this.isImage = false;
          }
        }
      }).catch(error => {
        console.error("Error fetching in data:", error);
      });
    },
    getImage(id) {
      axios.get(`/api/vendor/get-file/${id}`).then(({ data }) => {
        //console.log("image data", data);
        this.user.avatarUrl = `${window.location.protocol}//${window.location.host}/${data.driver}/${data.file_path}`;
        //console.log("avatarUrl", this.user.avatarUrl);
        this.isImage = true;
      }).catch(error => {
        console.error("Error fetching image data:", error.response ? error.response.data : error.message);
      });
    },
    async logout() {
      try {
        const response = await axios.post('/api/auth/logout');
        console.log(response.data.message);
        if (response.data.message === 'Successfully logged out') {
          localStorage.removeItem('token');
          this.$router.push({ 'name': 'vendorLogin' }); // Redirect to login page
          //window.location.href = window.location.origin;
        }
      } catch (error) {
        console.error('Logout failed:', error.response.data.message);
      }
    },
    isActive(menuItem) {
      const menuItemUrl = "/user/" + menuItem.url;
      return this.$route.path === menuItemUrl;
    },
    isChildActive(menuItem) {
      if (!menuItem.children) return false;
      return menuItem.children.some(child => this.isActive(child));
    }
  }
};
</script>

<style>
.pagination {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  /* Add spacing between buttons */
  margin-top: 20px;
}

.pagination button {
  color: #000;
  background-color: #0dcaf0;
  border: none;
  padding: 2px 6px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.pagination button:hover:not(:disabled) {
  background-color: #0bb2d6;
  transform: scale(1.05);
}

.pagination button:disabled {
  background-color: #e0e0e0;
  cursor: not-allowed;
}

.pagination .active {
  background-color: #0056b3;
  color: #fff;
  font-weight: bold;
}

span.sale-price {
  margin-right: 3px;
  text-decoration: line-through;
  font-size: 14px;
  color: #cc0033 !important;
  font-weight: 400;
}

span.price {
  font-size: 15px;
  font-weight: bold;
  color: #000;
}

img {
  height: 100%;
  width: 100%;
}
</style>