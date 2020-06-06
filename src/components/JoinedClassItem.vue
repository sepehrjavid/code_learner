<template>
  <q-card class="my-card">
    <q-card-section class="bg-primary">
      <div class="text-white text-h5 architects text-center">{{classroom.name}}</div>
      <div class="text-subtitle1 text-white architects text-center">by {{classroom.creator.name}}</div>
    </q-card-section>
    <q-separator/>
    <q-card-actions>
      <div class="row full-width">
        <div class="col-9 text-center q-pa-xs">
          <q-btn class="full-height full-width text-dark architects text-weight-bold" color="dark">
            Enter class
          </q-btn>
        </div>
        <div class="col-3 q-pa-xs text-center">
          <q-btn class="full-width full-height" color="accent" icon="description">
            <q-tooltip>
              My Quizzes
            </q-tooltip>
          </q-btn>
        </div>
      </div>
    </q-card-actions>
  </q-card>
</template>

<script>
    export default {
        props: ['classroom'],
        name: "JoinedClassItem"
    }
</script>

<style scoped>
  .my-card {
    width: 100%;
    max-width: 280px;
  }
</style>
