<template>
  <div class="row justify-center full-width q-ma-xl">
    <div
      class="col-12 text-center full-width architects text-dark text-h2 text-weight-bold q-my-lg">
      My classes
    </div>
    <div class="col-12 row justify-center q-my-md full-width">
      <div style="width: 60%">
        <q-separator style="width: 100%; height: 2px;" color="dark"/>
      </div>
    </div>
    <div class="row justify-center full-width">
      <q-card class="q-ma-sm my-card bg-primary text-center">
        <q-icon name="add_circle" class="full-height full-width cursor-pointer" color="warning" @click="createClass"
                size="xl">
          <q-tooltip>
            Add classroom
          </q-tooltip>
        </q-icon>
      </q-card>
      <MyClassItem class="q-ma-sm" v-for="classroom in classes" :key="classroom.id" :classroom="classroom"/>
    </div>
  </div>
</template>

<script>
    import MyClassItem from "./MyClassItem";

    export default {
        name: "MyClasses",
        props: ['classes'],
        components: {MyClassItem},
        data() {
            return {}
        },
        methods: {
            createClass() {
                console.log("slm")
            }
        }
    }
</script>

<style scoped>
  .my-card {
    width: 100%;
    max-width: 280px;
  }
</style>
