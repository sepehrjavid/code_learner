<template>
  <div class="row justify-center full-width">
    <div
      class="col-12 text-center full-width architects text-dark text-h3 q-my-lg">
      My classes
    </div>
    <div class="col-12 row justify-center q-my-md full-width">
      <div style="width: 60%">
        <q-separator style="width: 100%; height: 2px;" color="dark"/>
      </div>
    </div>
    <div class="row justify-center full-width" v-if="!loading">

    </div>
    <LoadingCircle v-else/>
  </div>
</template>

<script>
    import LoadingCircle from "./LoadingCircle";

    export default {
        name: "MyClasses",
        components: {LoadingCircle},
        data() {
            return {
                loading: true
            }
        }

    }
</script>

<style scoped>

</style>
