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
    <div v-if="classes.length !== 0" class="row justify-center full-width">
      <OwnedClassItem class="q-ma-sm" v-for="classroom in classes" :key="classroom.id" :classroom="classroom"/>
    </div>
    <div v-else class="text-dark text-h4 text-weight-bold architects q-pa-xl">You don't own any classes yet</div>
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
