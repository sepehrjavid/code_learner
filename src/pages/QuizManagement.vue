<template>
  <q-page>
    <div class="row full-width justify-center" v-if="!loading">
      <div class="column col-12 items-center justify-center q-pa-md">
        <div class="architects text-h3 text-weight-bold q-my-lg text-dark">Quiz Management</div>
      </div>
      <div class="col-12 row justify-center architects q-mx-md q-my-md">
        <div class="row justify-center">
          <q-tabs
            v-model="quizId"
            @input="injectSelectedQuiz"
            inline-label
            style="width: 1000px; max-width: 100vw; border-radius: 20px"
            class=" bg-dark text-white shadow-2 col-12 architects q-mt-md">
            <q-tab
              v-for="quiz in getAllQuizzes" :name="quiz.id" :label="quiz.name" :key="quiz.id"/>
          </q-tabs>
        </div>
        <q-tab-panels v-model="quizId" animated class="architects full-width bg-transparent q-pa-lg"
                      @input="injectSelectedQuiz" swipeable>
          <q-tab-panel v-for="quiz in getAllQuizzes" :name="quiz.id" :key="quiz.id">
            <div v-if="getSelectedQuiz.answers.length !== 0" class="full-width">
              <div class="row justify-center irFont q-mx-md q-my-md">
                <QuizManagementItem class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2"
                                    v-for="answer in getSelectedQuiz.answers"
                                    :answer="answer"
                                    :key="answer.id"
                                    :deadline="quiz.deadline"/>
              </div>
            </div>
            <div class="col-12" v-else>
              <div class="column items-center justify-center text-grey-8">
                <q-icon name="description" size="200px"/>
                <p class="text-faded architects q-my-xl text-h4 text-weight-bold text-center">
                  No answers yet!
                </p>
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
        <q-page-sticky position="bottom-right" :offset="[30, 30]">
          <q-btn fab icon="add" color="dark" @click="showDialog=true">
            <q-tooltip>
              Create Quiz
            </q-tooltip>
          </q-btn>
        </q-page-sticky>
      </div>
      <q-dialog v-model="showDialog">
        <AddQuiz @close="showDialog = false"/>
      </q-dialog>
    </div>
    <LoadingCircle v-else/>
  </q-page>
</template>

<script>
    import {mapActions, mapGetters} from "vuex"
    import LoadingCircle from "../components/LoadingCircle"
    import QuizManagementItem from "../components/QuizManagementItem"
    import AddQuiz from "../components/AddQuiz";

    export default {
        components: {LoadingCircle, QuizManagementItem, AddQuiz},
        name: "QuizManagement",
        props: ['classroomId'],
        data() {
            return {
                showDialog: false,
                loading: true,
                quizId: null,
            }
        },
        computed: {
            ...mapGetters('quiz', ['getAllQuizzes', 'getSelectedQuiz'])
        },
        methods: {
            ...mapActions('quiz', ['fetchAllQuizzes', 'injectSelectedQuiz'])
        },
        mounted() {
            this.fetchAllQuizzes(this.classroomId).finally(() => {
                this.injectSelectedQuiz(this.getAllQuizzes[0].id);
                this.quizId = this.getAllQuizzes[0].id;
                this.loading = false;

            })
        }
    }
</script>

<style scoped>

</style>
