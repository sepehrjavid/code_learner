<template>
  <div class="row justify-center full-width q-ma-xl">
    <div
      class="col-12 text-center full-width architects text-weight-bold text-dark text-h2 q-my-lg">
      Owned classes
    </div>
    <div class="col-12 row justify-center q-my-md full-width">
      <div style="width: 60%">
        <q-separator style="width: 100%; height: 2px;" color="dark"/>
      </div>
    </div>
    <div class="row justify-center full-width">
      <OwnedClassItem class="q-ma-sm" v-for="classroom in classes" :key="classroom.id" :classroom="classroom"/>
    </div>
  </div>
</template>

<script>
    import OwnedClassItem from "./OwnedClassItem";

    export default {
        components: {OwnedClassItem},
        props: ['classes'],
        name: "OwnedClasses"
    }
</script>

<style scoped>

</style>
