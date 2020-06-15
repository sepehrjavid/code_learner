<template>
  <div v-if="!loading && user !== null">
    <search-classroom/>
    <my-classes :classes="this.user.created_classes"/>
    <owned-classes :classes="this.user.owned_classes"/>
    <joined-classes :classes="this.user.joined_classes"/>
  </div>
  <LoadingCircle v-else/>
</template>

<script>
    import MyClasses from "../components/MyClasses";
    import JoinedClasses from "../components/JoinedClasses";
    import {mapActions, mapGetters} from 'vuex'
    import LoadingCircle from "../components/LoadingCircle";
    import OwnedClasses from "../components/OwnedClasses";
    import SearchClassroom from "../components/SearchClassroom";

    export default {
        name: "DashboardHome",
        components: {SearchClassroom, OwnedClasses, LoadingCircle, JoinedClasses, MyClasses},
        data() {
            return {
                user: null,
                loading: false,
                showDialog: true
            }
        },
        methods: {
            ...mapActions('profile', ['fetchUserData'])
        },
        computed: {
            ...mapGetters('profile', ['getUserData', 'isUserFetched'])
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
