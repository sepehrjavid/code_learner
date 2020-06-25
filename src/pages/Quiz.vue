<template>
  <q-page>
    <q-card class="bg-warning" style="width: 70%; margin: auto">
      <q-card-section class="q-pb-none q-mb-none">
        <div class="text-h4 text-dark text-center q-pb-sm">{{getQuizSettings.quiz.name}}</div>
        <template v-if="!getQuizSettings.isPreview">
          <div class="text-body1 text-dark text-center bg-negative" v-if="isOverdue">Deadline: {{getQuizSettings.quiz.deadline}}</div>
          <div class="text-body1 text-dark text-center" v-else>Deadline: {{getQuizSettings.quiz.deadline}}</div>
        </template>
        <div class="col-12 row justify-center q-mt-md full-width">
          <div style="width: 70%">
            <q-separator style="width: 100%; height: 2px;" color="dark"/>
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <div v-for="(question, index) in getQuizSettings.quiz.questions" :key="index" class="q-py-sm">
          <div class="text-h5 text-dark q-pa-md">{{index + 1}}. {{question.text}}
            <q-toggle
              :disable="getQuizSettings.isPreview"
              v-model="answers[index]"
              v-if="question.type === 3"
              checked-icon="check"
              color="green"
              unchecked-icon="clear"
            />
          </div>
          <q-input v-if="question.type === 1" v-model="answers[index]" outlined type="textarea" class="q-pa-md"
                   :disable="getQuizSettings.isPreview"/>
          <div v-else-if="question.type === 2" class="q-pb-md">
            <q-radio v-for="(choice, choiceIndex) in question.choices" v-model="answers[index]" :val="choice"
                     :label="choice" :key="choiceIndex" class="q-mx-lg" :disable="getQuizSettings.isPreview"/>
          </div>
        </div>
      </q-card-section>
      <q-card-actions>
        <div class="row justify-center full-width q-pb-sm">
          <q-btn rounded flat class="bg-dark text-white text-weight-bold q-pa-xs" @click="sendAnswer"
                 :loading="submitLoading" v-if="!getQuizSettings.isPreview">
            Submit Answers
            <template v-slot:loading>
              <q-spinner-hourglass class="on-left"/>
              Loading...
            </template>
          </q-btn>
          <q-btn rounded flat class="bg-dark text-white text-weight-bold q-py-none q-px-md q-mx-sm"
                 v-if="getQuizSettings.isCorrecting" @click="scoreDialog=true">
            Grade
          </q-btn>
          <q-btn rounded flat class="bg-warning text-dark text-weight-bold q-py-none q-px-md q-mx-sm"
                 @click="$router.go(-1)">
            Back
          </q-btn>
        </div>
      </q-card-actions>
    </q-card>
    <q-dialog v-model="scoreDialog">
      <q-card class="full-width bg-warning">
        <div class="row justify-center q-pa-lg q-ma-md text-h4 text-dark">Grade Quiz</div>
        <q-input class="q-mx-lg q-mb-md" v-model="userInput.score" type="number" rounded outlined label="grade"/>
        <div class="row justify-center q-my-md q-pt-md">
          <q-btn class="text-white bg-dark q-px-lg" label="Submit" rounded fab @click="submitGrade"
                 :loading="gradeLoading">
            <template v-slot:loading>
              <q-spinner-hourglass class="on-left"/>
              Loading...
            </template>
          </q-btn>
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
    import moment from 'moment';
    import {mapActions, mapGetters} from "vuex"

    export default {
        name: "Quiz",
        data() {
            return {
                answers: [],
                scoreDialog: false,
                submitLoading: false,
                gradeLoading: false,
                userInput: {
                    score: null
                }
            }
        },
        computed: {
            ...mapGetters('quiz', ['getQuizSettings']),
            isOverdue() {
                return moment().isAfter(moment(this.getQuizSettings.quiz.deadline, 'MMMM D YYYY, HH:mm'));
            }
        },
        methods: {
            ...mapActions('quiz', ['sendQuizAnswer', 'gradeQuizAnswer']),
            sendAnswer() {
                if (!this.getQuizSettings.isPreview) {
                    this.submitLoading = true;
                    this.sendQuizAnswer({body: {answers: this.answers}, id: this.getQuizSettings.quiz.id}).then(() => {
                        this.submitLoading = false;
                        this.$q.notify({
                            message: "Your answers were successfully submitted",
                            type: "dark",
                            classes: "architects text-weight-bold"
                        });
                        this.$router.replace({name: "DashboardHome"})
                    })
                }
            },
            submitGrade() {
                this.gradeLoading = true;
                this.gradeQuizAnswer({
                    id: this.getQuizSettings.answer.id,
                    body: {score: this.userInput.score}
                }).then(() => {
                    this.gradeLoading = false;
                    this.userInput.score = 0;
                    this.scoreDialog = false;
                })
            }
        },
        mounted() {
            if (this.getQuizSettings.isPreview) {
                this.getQuizSettings.answer.answers.forEach((answer) => {
                    this.answers.push(answer);
                })
            } else {
                this.getQuizSettings.questions.forEach((question) => {
                    if (question.type === 1) {
                        this.answers.push("")
                    } else if (question.type === 2) {
                        this.answers.push("")
                    } else if (question.type === 3) {
                        this.answers.push(null)
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
