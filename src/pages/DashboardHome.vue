<template>
  <div>
    <my-classes/>
    <joined-classes/>
    <my-chats/>
  </div>
</template>

<script>

    import MyClasses from "../components/MyClasses";
    import JoinedClasses from "../components/JoinedClasses";
    import MyChats from "../components/MyChats";

    export default {
        name: "DashboardHome",
        components: {MyChats, JoinedClasses, MyClasses}
    }
</script>

<style scoped>

</style>
