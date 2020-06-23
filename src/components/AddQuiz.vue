<template>
  <q-card class="bg-warning full-width q-pa-sm">
    <q-stepper
      v-model="step"
      ref="stepper"
      class="bg-warning"
      color="primary"
      animated
    >
      <q-step
        :name="1"
        title="General Settings"
        icon="settings"
        :done="step > 1"
      >
        <q-input
          rounded
          outlined
          v-model="userInput.name"
          label="Quiz name"
          class="q-pa-md"
          :rules="[ val => val && val.length > 0 || 'Please type something']"/>

        <q-input v-model="userInput.starDate" label="Start date & time" rounded outlined class="q-pa-md">
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-date v-model="userInput.starDate" mask="YYYY-MM-DD HH:mm"/>
              </q-popup-proxy>
            </q-icon>
          </template>

          <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-time v-model="userInput.starDate" mask="YYYY-MM-DD HH:mm" format24h/>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <q-input v-model="userInput.deadline" label="Deadline" rounded outlined class="q-pa-md">
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-date v-model="userInput.deadline" mask="YYYY-MM-DD HH:mm"/>
              </q-popup-proxy>
            </q-icon>
          </template>

          <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-time v-model="userInput.deadline" mask="YYYY-MM-DD HH:mm" format24h/>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </q-step>

      <q-step
        :name="2"
        title="Add questions"
        icon="help"
        :done="step > 2"
      >
        <q-input
          rounded
          outlined
          v-model="userInput.questionText"
          label="Question text"
          class="q-pa-md"
          type="textarea"
        />
        <q-select class="q-pa-md" rounded outlined v-model="userInput.questionType" :options="questionTypes"
                  label="Question type"/>

        <div class="row q-my-md" v-if="isMultiChoice">
          <q-input label="Choice" v-for="(choice, index) in userInput.questionChoices" :key="index"
                   :placeholder="choice"
                   rounded
                   outlined class="col-12 col-sm-6 q-mb-md q-pr-md q-pl-md"
                   v-model="userInput.questionChoices[index]">
            <template v-slot:append>
              <q-icon name="delete" class="cursor-pointer" @click="removeChoice(index)"/>
            </template>
          </q-input>
        </div>
        <div class="row q-my-md" v-if="isMultiChoice">
          <q-input label="Choice" rounded outlined class="col-sm-8 col-12 q-pr-md q-pl-md q-pb-md"
                   v-model="userInput.choiceText"/>
          <div class="col-4 row justify-center">
            <q-btn icon="add" fab color="primary" class="q-mb-md" :disable="userInput.choiceText === ''"
                   @click="addChoice"/>
          </div>
        </div>
        <q-btn class="architects text-weight-bold bg-dark q-ma-sm text-white" rounded flat label="Add question"
               @click="addQuestion" :disable="isAddQuestionDisabled"/>
      </q-step>

      <q-step
        :name="3"
        title="Preview Quiz"
        icon="description"
      >
        <div v-for="(question, index) in questions" :key="index">
          <q-input v-model="questions[index].text" rounded outlined label="Question text" class="q-pa-md"
                   type="textarea">
            <template v-slot:append>
              <q-icon name="delete" class="cursor-pointer" @click="removeQuestion(index)"/>
            </template>
          </q-input>
          <div class="row q-my-md" v-if="questions[index].type === 2">
            <q-input label="Choice" v-for="(choice, choiceIndex) in questions[index].choices" :key="choiceIndex"
                     :placeholder="choice" rounded outlined class="col-12 col-sm-6 q-mb-md q-pr-md q-pl-md"
                     v-model="questions[index].choices[choiceIndex]">
              <template v-slot:append>
                <q-icon name="delete" class="cursor-pointer" @click="removeChoice(index)"/>
              </template>
            </q-input>
          </div>
          <q-separator inset/>
        </div>
      </q-step>
      <template v-slot:navigation>
        <q-stepper-navigation>
          <q-btn @click="$refs.stepper.next()" color="dark" :label="step === 3 ? 'Finish' : 'Continue'"
                 class="architects text-weight-bold" rounded/>
          <q-btn v-if="step > 1" flat color="dark" @click="$refs.stepper.previous()" label="Back"
                 class="q-ml-sm architects text-weight-bold" rounded/>
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </q-card>
</template>

<script>
    export default {
        name: "AddQuiz",
        data() {
            return {
                questions: [],
                createLoading: false,
                step: 1,
                userInput: {
                    deadline: "",
                    starDate: "",
                    name: "",
                    questionText: "",
                    questionType: null,
                    questionChoices: [],
                    choiceText: ""
                },
                questionTypes: [
                    {value: 1, label: "Descriptive"},
                    {value: 2, label: "Multiple choice"},
                    {value: 3, label: "True or False"}
                ]
            }
        },
        computed: {
            isMultiChoice() {
                return this.userInput.questionType !== null && this.userInput.questionType.value === 2;
            },
            isAddQuestionDisabled() {
                return this.userInput.questionText === '' || this.userInput.questionType === null || (this.userInput.questionType.value === 2 && this.userInput.questionChoices.length === 0)
            }
        },
        methods: {
            addChoice() {
                this.userInput.questionChoices.push(this.userInput.choiceText);
                this.userInput.choiceText = "";
            },
            removeChoice(choiceIndex) {
                this.userInput.questionChoices = this.userInput.questionChoices.filter((choice, index) => {
                    return index !== choiceIndex
                })
            },
            addQuestion() {
                let question = {
                    text: this.userInput.questionText,
                    type: this.userInput.questionType.value
                };
                if (this.userInput.questionType.value === 2) {
                    question.choices = this.userInput.questionChoices
                }
                this.questions.push(question);
                this.userInput.questionText = "";
                this.userInput.questionType = null;
                this.userInput.choiceText = "";
                this.userInput.questionChoices = [];
                this.$q.notify({
                    message: "Question added! you can preview your questions in the next step",
                    type: "dark",
                    classes: "architects text-weight-bold"
                });
                console.log(this.questions)
            },
            removeQuestion(questionIndex) {
                this.questions = this.questions.filter((choice, index) => {
                    return index !== questionIndex
                })
            }
        }
    }
</script>

<style scoped>

</style>
