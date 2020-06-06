<template>
  <div class="row justify-center full-width q-ma-xl">
    <div
      class="col-12 text-center architects full-width text-dark text-h2 q-my-lg text-weight-bold">
      Joined classes
    </div>
    <div class="col-12 row justify-center q-my-md full-width">
      <div style="width: 60%">
        <q-separator style="width: 100%; height: 2px;" color="dark"/>
      </div>
    </div>
    <div class="row justify-center full-width">
      <JoinedClassItem class="q-ma-sm" v-for="classroom in classes" :key="classroom.id" :classroom="classroom"/>
    </div>
  </div>
</template>

<script>
    import JoinedClassItem from "./JoinedClassItem";

    export default {
        props: ['classes'],
        components: {JoinedClassItem},
        name: "JoinedClasses",
        data() {
            return {}
        }
    }
</script>

<style scoped>

</style>
