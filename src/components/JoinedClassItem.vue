<template>
  <div class="my-card">
    <q-card>
      <q-card-section class="bg-primary">
        <div class="text-white text-h5 architects text-center">{{classroom.name}}</div>
        <div class="text-subtitle1 text-white architects text-center">by {{classroom.creator.name}}</div>
      </q-card-section>
      <q-separator/>
      <q-card-actions>
        <div class="row full-width">
          <div class="col-6 text-center q-pa-xs">
            <q-btn class="full-height full-width text-dark architects text-weight-bold" color="dark">
              Enter class
            </q-btn>
          </div>
          <div class="col-3 text-center q-pa-xs">
            <q-btn class="full-width full-height" color="negative" icon="delete" :loading="disenrollLoading"
                   @click="disenroll">
              <q-tooltip>
                Disenroll
              </q-tooltip>
              <template v-slot:loading>
                <q-spinner-hourglass class="on-left"/>
                Loading...
              </template>
            </q-btn>
          </div>
          <div class="col-3 q-pa-xs text-center">
            <q-btn class="full-width full-height" color="accent" icon="description" @click="showQuizzes"
                   :loading="quizShowLoading">
              <template v-slot:loading>
                <q-spinner-hourglass class="on-center"/>
              </template>
              <q-tooltip>
                My Quizzes
              </q-tooltip>
            </q-btn>
          </div>
        </div>
      </q-card-actions>
    </q-card>
    <q-dialog v-model="quizDialog">
      <q-card class="bg-warning full-width">
        <div class="row justify-center q-pa-lg text-h4 text-weight-bold text-dark architects">Quizzes</div>
        <div class="architects text-center text-dark text-weight-bold text-h5 q-pa-lg"
             v-if="getMyQuizzes.not_answered.length === 0 && getMyQuizzes.answered.length === 0">
          There are no quizzes yet!
        </div>
        <q-list separator v-else>
          <q-item v-for="quiz in getMyQuizzes.not_answered" :key="quiz.id"
                  class="architects text-dark text-h6 text-weight-bold q-pa-sm">
            <q-item-section class="q-pa-md">
              <q-item-label>{{quiz.name}}</q-item-label>
            </q-item-section>
            <q-item-section style="max-width: 100px">
              <div class="text-center">
                <q-btn round class="bg-dark text-white" icon="create">
                  <q-tooltip>
                    Start Quiz
                  </q-tooltip>
                </q-btn>
              </div>
            </q-item-section>
          </q-item>
          <q-item v-for="quizAnswer in getMyQuizzes.answered" :key="quizAnswer.id"
                  class="architects text-dark text-h6 text-weight-bold q-pa-sm">
            <q-item-section class="q-pa-md" style="max-width: 140px">
              <q-item-label>{{quizAnswer.quiz.name}}</q-item-label>
            </q-item-section>
            <q-item-section v-if="isOverdue(quizAnswer.sent_date ,quizAnswer.quiz.deadline)">
              <q-item-label class="bg-negative text-center">
                {{quizAnswer.sent_date}}
                <q-tooltip>
                  Overdue
                </q-tooltip>
              </q-item-label>
            </q-item-section>
            <q-item-section v-else>
              <q-item-label>
                {{quizAnswer.sent_date}}
                <q-tooltip>
                  In time
                </q-tooltip>
              </q-item-label>
            </q-item-section>
            <q-item-section style="max-width: 100px">
              <div class="text-center">
                <q-btn round class="bg-dark text-white" icon="visibility">
                  <q-tooltip>
                    View Quiz Answer
                  </q-tooltip>
                </q-btn>
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";
    import moment from 'moment';

    export default {
        props: ['classroom'],
        name: "JoinedClassItem",
        data() {
            return {
                disenrollLoading: false,
                quizDialog: false,
                quizShowLoading: false
            }
        },
        computed: {
            ...mapGetters('quiz', ['getMyQuizzes']),
        },
        methods: {
            ...mapActions('classroom', ['toggleEnrolled']),
            ...mapActions('quiz', ['fetchMyQuizzesAndAnswers']),
            disenroll() {
                this.disenrollLoading = true;
                this.toggleEnrolled(this.classroom.id).then(() => {
                    this.disenrollLoading = false;
                })
            },
            showQuizzes() {
                this.quizShowLoading = true;
                this.fetchMyQuizzesAndAnswers(this.classroom.id).then(() => {
                    this.quizShowLoading = false;
                    this.quizDialog = true;
                });
            },
            isOverdue(sentDate, deadline) {
                return moment(sentDate, 'MMMM D YYYY, HH:mm').isAfter(moment(deadline, 'MMMM D YYYY, HH:mm'));
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
