<template>
  <div v-if="!loading">
    <my-classes :classes="this.user.created_classes"/>
    <owned-classes :classes="this.user.owned_classes"/>
    <joined-classes :classes="this.user.joined_classes"/>
    <my-chats/>
  </div>
  <LoadingCircle v-else/>
</template>

<script>

    import MyClasses from "../components/MyClasses";
    import JoinedClasses from "../components/JoinedClasses";
    import MyChats from "../components/MyChats";
    import {mapActions, mapGetters} from 'vuex'
    import LoadingCircle from "../components/LoadingCircle";
    import OwnedClasses from "../components/OwnedClasses";


    export default {
        name: "DashboardHome",
        components: {OwnedClasses, LoadingCircle, MyChats, JoinedClasses, MyClasses},
        data() {
            return {
                user: {},
                loading: false
            }
        },
        methods: {
            ...mapActions('auth', ['fetchUserData'])
        },
        computed: {
            ...mapGetters('auth', ['getUserData', 'isUserFetched'])
        },
        async mounted() {
            this.loading = true;
            this.user = await this.fetchUserData();
            this.loading = false;
        }
    }
</script>

<style scoped>

</style>
