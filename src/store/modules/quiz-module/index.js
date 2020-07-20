import axios from 'axios';
import moment from 'moment';

const state = {
  allQuizzes: [],
  selectedQuiz: {},
  myQuizzes: {
    not_answered: [],
    answered: []
  },
  quizSettings: {
    isPreview: null,
    isCorrecting: null,
    quiz: {},
    answer: {}
  },
  classroomIdToFetchQuizzes: null
};

const mutations = {
  setAllQuizzes(state, payload) {
    state.allQuizzes = payload;
  },
  setMyQuizzes(state, payload) {
    state.myQuizzes = payload;
  },
  setSelectedQuiz(state, payload) {
    state.allQuizzes.forEach((quiz) => {
      if (quiz.id === payload) {
        state.selectedQuiz = quiz;
      }
    });
  },
  addNewQuiz(state, payload) {
    state.allQuizzes.push(payload)
  },
  updateAnswerScore(state, payload) {
    state.selectedQuiz.answers.forEach((answer) => {
      if (answer.id === payload.id) {
        answer.score = payload.body.score
      }
    });
  },
  setQuizSettings(state, payload) {
    state.quizSettings = payload
  },
  setClassroomIdToFetchQuizzes(state, payload) {
    state.classroomIdToFetchQuizzes = payload
  }
};


const actions = {
  fetchAllQuizzes(context) {
    return axios.get("http://127.0.0.1:8000/api/quizzes/retrieve/" + context.state.classroomIdToFetchQuizzes.toString()).then((response) => {
      let quizzes = response.data;
      quizzes.forEach((quiz, index) => {
        quizzes[index].created_date = moment(quizzes[index].created_date).format('MMMM D YYYY, HH:mm');
        quizzes[index].deadline = moment(quizzes[index].deadline).format('MMMM D YYYY, HH:mm');
        quizzes[index].start_date = moment(quizzes[index].start_date).format('MMMM D YYYY, HH:mm');
        quiz.answers.forEach((answer, answerIndex) => {
          quiz.answers[answerIndex].sent_date = moment(quiz.answers[answerIndex].sent_date).format('MMMM D YYYY, HH:mm');
        })
      });
      context.commit('setAllQuizzes', quizzes)
    })
  },
  injectSelectedQuiz(context, QuizId) {
    return context.commit('setSelectedQuiz', QuizId)
  },
  createQuiz(context, payload) {
    return axios.post("http://127.0.0.1:8000/api/quizzes/create/" + payload.id.toString(), payload.body).then((response) => {
      let data = response.data;
      data.created_date = moment(data.created_date).format('MMMM D YYYY, HH:mm');
      data.deadline = moment(data.deadline).format('MMMM D YYYY, HH:mm');
      data.start_date = moment(data.start_date).format('MMMM D YYYY, HH:mm');
      context.commit('addNewQuiz', data);
    })
  },
  fetchMyQuizzesAndAnswers(context, id) {
    return axios.get("http://127.0.0.1:8000/api/quizzes/quiz_answers/" + id.toString()).then((response) => {
      let data = response.data;

      data.answered.forEach((answer) => {
        answer.sent_date = moment(answer.sent_date).format('MMMM D YYYY, HH:mm');
        answer.quiz.deadline = moment(answer.quiz.deadline).format('MMMM D YYYY, HH:mm');
        answer.quiz.start_date = moment(answer.quiz.start_date).format('MMMM D YYYY, HH:mm');
      });

      data.not_answered.forEach((quiz) => {
        quiz.deadline = moment(quiz.deadline).format('MMMM D YYYY, HH:mm');
        quiz.start_date = moment(quiz.start_date).format('MMMM D YYYY, HH:mm');
      });
      context.commit('setMyQuizzes', data)
    })
  },
  sendQuizAnswer(context, payload) {
    return axios.post("http://127.0.0.1:8000/api/quizzes/answer/" + payload.id.toString(), payload.body).then((response) => {

    })
  },
  gradeQuizAnswer(context, payload) {
    return axios.post("http://127.0.0.1:8000/api/quizzes/score/" + payload.id.toString(), payload.body).then((response) => {
      context.commit('updateAnswerScore', payload);
    })
  }
};


const getters = {
  getAllQuizzes: (state) => {
    return state.allQuizzes;
  },
  getSelectedQuiz: (state) => {
    return state.selectedQuiz
  },
  getMyQuizzes: (state) => {
    return state.myQuizzes
  },
  getQuizSettings: (state) => {
    return state.quizSettings
  },
  getClassroomId: (state) => {
    return state.classroomIdToFetchQuizzes
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
