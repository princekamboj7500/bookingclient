<template>
    <div class="breadcrumb-page-bar" aria-label="breadcrumb" v-if="breadcrumbs.length > 0">
      <ul class="page-breadcrumb">
        <li>
          <a href="/"><i class="fa fa-home"></i> {{ ('Home') }}</a>
          <i class="fa fa-angle-right"></i>
        </li>
        <li v-for="(breadcrumb, index) in breadcrumbs" :key="index" :class="breadcrumb.class">
          <a v-if="breadcrumb.url" :href="breadcrumb.url">{{ breadcrumb.name }}</a>
          <span v-else>{{ breadcrumb.name }}</span>
          <i v-if="index < breadcrumbs.length - 1" class="fa fa-angle-right"></i>
        </li>
      </ul>
  
      <div class="dropdown dropdown-notifications float-right" style="min-width: 0" v-if="notifications.length > 0">
        <a data-toggle="dropdown" class="user-dropdown d-flex align-items-center" aria-haspopup="true" aria-expanded="false">
          <i class="fa fa-bell m-1 p-1"></i>
          <span class="badge badge-danger notification-icon">{{ countUnread }}</span>
        </a>
        <div class="dropdown-menu overflow-auto notify-items dropdown-container dropdown-menu-right dropdown-large" aria-labelledby="dropdownMenuButton">
          <div class="dropdown-toolbar">
            <div class="dropdown-toolbar-actions">
              <a href="#" class="markAllAsRead">{{ ('Mark all as read') }}</a>
            </div>
            <h3 class="dropdown-toolbar-title">{{ ('Notifications') }} (<span class="notif-count">{{ countUnread }}</span>)</h3>
          </div>
          <ul class="dropdown-list-items p-0">
            <li v-for="(notification, index) in notifications" :key="index" :class="{ 'notification': true, 'active': !notification.read_at }">
              <div class="media">
                <div class="media-left">
                  <div class="media-object">
                    <img v-if="notification.avatar" class="image-responsive" :src="notification.avatar" :alt="notification.name">
                    <span v-else class="avatar-text">{{ notification.name[0].toUpperCase() }}</span>
                  </div>
                </div>
                <div class="media-body">
                  <a :class="{ 'markAsRead': !notification.read_at }" :data-id="notification.data.id" :href="notification.data.link">{!! notification.data.message !!}</a>
                  <div class="notification-meta">
                    <small class="timestamp">{{ formatInterval(notification.created_at) }}</small>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <div class="dropdown-footer text-center">
            <a :href="notificationRoute">{{ ('View More') }}</a>
          </div>
        </div>
      </div>
      <div class="bravo-more-menu-user">
        <i class="icofont-settings"></i>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['breadcrumbs'],
    data() {
      return {
        notifications: [],
        countUnread: 0,
        notificationRoute: ''
      };
    },
    mounted() {
      // Assuming you fetch breadcrumbs, notifications, and countUnread from an API
      this.fetchData();
    },
    methods: {
      fetchData() {
  
        this.notifications = [
          { avatar: '', name: 'John Doe', read_at: null, created_at: new Date(), data: { id: 1, link: '/notification1', message: 'Notification Message 1' } },
          { avatar: '', name: 'Jane Smith', read_at: new Date(), created_at: new Date(), data: { id: 2, link: '/notification2', message: 'Notification Message 2' } },
          // Add more notifications as needed
        ];
  
        this.countUnread = this.notifications.filter(notification => !notification.read_at).length;
  
        this.notificationRoute = '/notifications';
      },
      formatInterval(date) {
        // Format date interval logic here
        return '1 hour ago'; // Placeholder
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add your component-specific styles here */
  </style>
  