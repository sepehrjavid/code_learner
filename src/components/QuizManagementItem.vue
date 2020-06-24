<template>
  <div class="my-card q-ma-md">
    <q-card class="bg-dark">
      <q-card-section class="text-white q-pa-sm">
        <div class="text-center text-h5 q-pa-sm text-weight-bold">{{answer.user.name}}</div>
        <div class="text-center text-subtitle1">Current score: {{answer.score}}</div>
        <div class="bg-negative text-weight-bold text-center q-ma-xs text-body1" v-if="isOverdue">
          {{answer.sent_date}}
          <q-tooltip>
            Overdue
          </q-tooltip>
        </div>
        <div class="bg-warning text-dark text-weight-bold text-center q-ma-xs text-body1" v-else>
          {{answer.sent_date}}
          <q-tooltip>
            In Time
          </q-tooltip>
        </div>
      </q-card-section>
      <q-card-actions>
        <div class="text-center full-width">
          <q-btn class="bg-warning text-dark text-weight-bold" style="width: 100px" rounded flat>Answers</q-btn>
        </div>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
    import moment from 'moment';

    export default {
        name: "QuizManagementItem",
        props: ['answer', 'deadline'],
        computed: {
            isOverdue() {
                return moment(this.answer.sent_date, 'MMMM D YYYY, HH:mm').isAfter(moment(this.deadline, 'MMMM D YYYY, HH:mm'));
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
