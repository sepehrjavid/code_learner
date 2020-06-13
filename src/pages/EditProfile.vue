<template>
  <q-card class="q-pa-lg bg-warning" style="max-width: 500px; margin: 10px auto; border-radius: 10%;">
    <q-form class="text-center" @submit="submitForm">
      <q-input
        rounded
        outlined
        v-model="userInput.firstName"
        label="First name *"
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <q-input
        rounded
        outlined
        v-model="userInput.lastName"
        label="Last name *"
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <q-btn :loading="buttonLoading" class="architects text-white text-weight-bold" label="Submit" type="submit"
             color="dark" style="width: 110px" rounded no-caps>
        <template v-slot:loading>
          <q-spinner-hourglass/>
        </template>
      </q-btn>
    </q-form>
  </q-card>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';

    export default {
        name: "EditProfile",
        computed: {
            ...mapGetters('auth', ['getUserData'])
        },
        data() {
            return {
                buttonLoading: false,
                userInput: {
                    firstName: "",
                    lastName: "",
                }
            }
        },
        methods: {
            ...mapActions('auth', ['editUser']),
            submitForm() {
                this.buttonLoading = true;
                this.editUser({
                    first_name: this.userInput.firstName,
                    last_name: this.userInput.lastName
                }).then(() => {
                    this.buttonLoading = false;
                    this.$router.replace({name: "DashboardHome"});
                }).catch(() => {
                    this.$q.notify({
                        message: "Cannot connect to the server",
                        type: "negative",
                    });
                    this.buttonLoading = false
                })
            }
        },
        mounted() {
            this.userInput.firstName = this.getUserData.first_name;
            this.userInput.lastName = this.getUserData.last_name;
        }
    }
</script>

<style scoped>

</style>
