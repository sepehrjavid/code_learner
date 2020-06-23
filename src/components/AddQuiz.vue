<template>
  <q-card class="bg-warning full-width q-pa-sm">
    <q-card-section class="q-pa-none" style="height: 450px">
      <q-tabs
        v-model="tab"
        dense
        align="justify"
        class="bg-primary text-white shadow-2"
        :breakpoint="0"
      >
        <q-tab name="basicInfo" icon="info">
          <q-tooltip>
            Basic information
          </q-tooltip>
        </q-tab>
        <q-tab name="questions" icon="help_outlined">
          <q-tooltip>
            Questions
          </q-tooltip>
        </q-tab>
        <q-tab name="preview" icon="view_compact">
          <q-tooltip>
            Question Preview
          </q-tooltip>
        </q-tab>
      </q-tabs>
      <q-tab-panels
        v-model="tab"
        animated
        transition-prev="jump-up"
        transition-next="jump-down"
        class="bg-warning text-white text-center"
      >
        <q-tab-panel name="basicInfo">
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
        </q-tab-panel>

        <q-tab-panel name="questions">
          <q-scroll-area style="max-height: 350px; height: 350px" class="scroll-y">
            <q-input
              rounded
              outlined
              v-model="userInput.questionText"
              label="Question text"
              class="q-pa-md"
            />
            <q-select class="q-pa-md" rounded outlined v-model="userInput.questionType" :options="questionTypes"
                      label="Question type"/>

            <div class="row q-my-md" v-if="isMultiChoice">
              <q-input label="Choice" v-for="(choice, index) in userInput.questionChoices" :key="index"
                       :placeholder="choice"
                       rounded
                       outlined class="col-12 col-sm-6 q-mb-md q-pr-md q-pl-md"
                       v-model="userInput.questionChoices[index]"/>
            </div>
            <div class="row q-my-md" v-if="isMultiChoice">
              <q-input label="Choice" rounded outlined class="col-sm-8 col-12 q-pr-md q-pl-md q-pb-md"
                       v-model="userInput.choiceText"/>
              <div class="col-4 row justify-center">
                <q-btn icon="add" fab color="primary" class="q-mb-md" :disable="userInput.choiceText === ''"
                       @click="addChoice"/>
              </div>
            </div>
            <q-btn class="architects text-weight-bold bg-dark q-ma-sm" rounded flat label="Add question"
                   @click="addQuestion" :disable="isAddQuestionDisabled"/>
          </q-scroll-area>
        </q-tab-panel>

      </q-tab-panels>
    </q-card-section>
    <q-card-actions class="row justify-center text-center">
      <q-btn class="row justify-center bg-dark text-weight-bold text-white architects" flat rounded
             :loading="createLoading" style="width: 100px" type="submit">
        Create
        <template v-slot:loading>
          <q-spinner-hourglass class="on-left"/>
          Loading...
        </template>
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
    export default {
        name: "AddQuiz",
        data() {
            return {
                questions: [],
                createLoading: false,
                tab: "basicInfo",
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
                this.userInput.questionType.value = null;
                this.userInput.choiceText = "";
                this.userInput.questionChoices = [];
            }
        }
    }
</script>

<style scoped>

</style>
