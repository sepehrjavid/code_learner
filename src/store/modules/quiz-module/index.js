import axios from 'axios';
import moment from 'moment';

const state = {
  allQuizzes: [],
  selectedQuiz: {},
};

const mutations = {
  setAllQuizzes(state, payload) {
    state.allQuizzes = payload;
  },
  setSelectedQuiz(state, payload) {
    state.allQuizzes.forEach((quiz) => {
      if (quiz.id === payload) {
        state.selectedQuiz = quiz;
      }
    });
  },
};


const actions = {
  fetchAllQuizzes(context, id) {
    return axios.get("http://127.0.0.1:8000/api/quizzes/retrieve/" + id.toString()).then((response) => {
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
};


const getters = {
  getAllQuizzes: (state) => {
    return state.allQuizzes;
  },
  getSelectedQuiz: (state) => {
    return state.selectedQuiz
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
