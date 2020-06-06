<template>
  <q-card class="my-card">
    <q-card-section class="bg-primary">
      <div class="text-white text-h5 architects text-center">{{classroom.name}}</div>
      <div class="text-subtitle1 text-white architects text-center">by {{classroom.creator.name}}</div>
    </q-card-section>
    <q-separator/>
    <q-card-actions>
      <div class="row full-width">
        <div class="col text-center q-pa-xs">
          <q-btn class="full-height architects text-weight-bold" text-color="primary" color="warning">
            Start class
          </q-btn>
        </div>
        <div class="col">
          <div class="row justify-center">
            <div class="row q-pa-xs">
              <q-btn color="negative" icon="delete">
                <q-tooltip>
                  Delete class
                </q-tooltip>
              </q-btn>
            </div>
            <div class="row q-pa-xs">
              <q-btn color="dark" icon="edit">
                <q-tooltip>
                  Edit name
                </q-tooltip>
              </q-btn>
            </div>
          </div>
          <div class="row justify-center">
            <div class="row q-pa-xs">
              <q-btn color="accent" icon="description">
                <q-tooltip>
                  Quizzes
                </q-tooltip>
              </q-btn>
            </div>
            <div class="row q-pa-xs">
              <q-btn color="primary" icon="person">
                <q-tooltip>
                  Owners
                </q-tooltip>
              </q-btn>
            </div>
          </div>
        </div>
      </div>
    </q-card-actions>
  </q-card>
</template>

<script>
    export default {
        name: "MyClassItem",
        props: ['classroom'],
        data() {
            return {}
        }
    }
</script>

<style scoped>
  .my-card {
    width: 100%;
    max-width: 280px;
  }
</style>
