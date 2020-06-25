<template>
  <q-card class="my-card">
    <q-card-section class="bg-primary">
      <div class="text-white text-h5 architects text-center">{{classroom.name}}</div>
      <div class="text-subtitle1 text-white architects text-center">by {{classroom.creator.name}}</div>
    </q-card-section>
    <q-separator/>
    <q-card-actions>
      <div class="row full-width">
        <div class="col-6 text-center q-pa-xs">
          <q-btn class="full-height full-width architects text-weight-bold" text-color="primary" color="warning">
            Start class
          </q-btn>
        </div>
        <div class="col-3 text-center q-pa-xs">
          <q-btn class="full-width full-height" color="negative" icon="delete" @click="quitOwnership(classroom.id)">
            <q-tooltip>
              Quit Ownership
            </q-tooltip>
            <template v-slot:loading>
              <q-spinner-hourglass class="on-left"/>
              Loading...
            </template>
          </q-btn>
        </div>
        <div class="col-3 q-pa-xs text-center">
          <q-btn class="full-width full-height" color="accent" icon="description" @click="routeToQuizManagement">
            <q-tooltip>
              Quizzes
            </q-tooltip>
          </q-btn>
        </div>
      </div>
    </q-card-actions>
  </q-card>
</template>

<script>
    import {mapActions, mapMutations} from "vuex";

    export default {
        props: ['classroom'],
        name: "OwnedClassItem",
        methods: {
            ...mapActions('classroom', ['quitOwnership']),
            ...mapMutations('quiz', ['setClassroomIdToFetchQuizzes']),
            routeToQuizManagement() {
                this.setClassroomIdToFetchQuizzes(this.classroom.id);
                this.$router.replace({name: "ManageQuiz"});
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
