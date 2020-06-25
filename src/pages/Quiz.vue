<template>
  <q-page>
    <q-card class="bg-warning" style="width: 70%; margin: auto">
      <q-card-section class="q-pb-none q-mb-none">
        <div class="text-h4 text-dark text-center q-pb-sm">{{quiz.name}}</div>
        <template v-if="!isPreview">
          <div class="text-body1 text-dark text-center bg-negative" v-if="isOverdue">Deadline: {{quiz.deadline}}</div>
          <div class="text-body1 text-dark text-center" v-else>Deadline: {{quiz.deadline}}</div>
        </template>
        <div class="col-12 row justify-center q-mt-md full-width">
          <div style="width: 70%">
            <q-separator style="width: 100%; height: 2px;" color="dark"/>
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <div v-for="(question, index) in quiz.questions" :key="index" class="q-py-sm">
          <div class="text-h5 text-dark q-pa-md">{{index + 1}}. {{question.text}}
            <q-toggle
              v-model="answers[index]"
              v-if="question.type === 3"
              checked-icon="check"
              color="green"
              unchecked-icon="clear"
            />
          </div>
          <q-input v-if="question.type === 1" v-model="answers[index]" outlined type="textarea" class="q-pa-md"/>
          <div v-else-if="question.type === 2" class="q-pb-md">
            <q-radio v-for="(choice, choiceIndex) in question.choices" v-model="answers[index]" :val="choice"
                     :label="choice" :key="choiceIndex" class="q-mx-lg"/>
          </div>
        </div>
      </q-card-section>
      <q-card-actions v-if="!isPreview">
        <div class="row justify-center full-width q-pb-sm">
          <q-btn rounded flat class="bg-dark text-white text-weight-bold q-pa-xs" @click="sendAnswer"
                 :loading="submitLoading">
            Submit Answers
            <template v-slot:loading>
              <q-spinner-hourglass class="on-left"/>
              Loading...
            </template>
          </q-btn>
        </div>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
    import moment from 'moment';
    import {mapActions} from "vuex"

    export default {
        name: "Quiz",
        props: ['quiz', 'isPreview', 'answerSet'],
        data() {
            return {
                answers: [],
                submitLoading: false
            }
        },
        computed: {
            isOverdue() {
                return moment().isAfter(moment(this.quiz.deadline, 'MMMM D YYYY, HH:mm'));
            }
        },
        methods: {
            ...mapActions('quiz', ['sendQuizAnswer']),
            sendAnswer() {
                if (!this.isPreview) {
                    this.submitLoading = true;
                    this.sendQuizAnswer({body: {answers: this.answers}, id: this.quiz.id}).then(() => {
                        this.submitLoading = false;
                        this.$q.notify({
                            message: "Your answers were successfully submitted",
                            type: "dark",
                            classes: "architects text-weight-bold"
                        });
                        this.$router.replace({name: "DashboardHome"})
                    })
                }
            }
        },
        mounted() {
            if (this.isPreview) {
                this.answerSet.forEach((answer) => {
                    this.answers.push(answer);
                })
            } else {
                this.quiz.questions.forEach((question) => {
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
