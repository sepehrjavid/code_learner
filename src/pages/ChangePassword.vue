<template>
  <q-card class="q-pa-lg bg-warning" style="max-width: 500px; margin: 10px auto; border-radius: 10%;">
    <q-form class="text-center" @submit="submitForm">
      <q-input
        rounded
        outlined
        type="password"
        v-model="userInput.currentPassword"
        label="Current password"
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <q-input
        rounded
        outlined
        type="password"
        v-model="userInput.newPassword"
        label="New password"
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <q-input
        rounded
        outlined
        type="password"
        v-model="userInput.newPasswordReEnter"
        label="Re-enter new password"
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <q-btn :loading="buttonLoading" label="Submit" type="submit" color="dark"
             class="architects text-weight-bold text-white" rounded no-caps style="width: 110px">
        <template v-slot:loading>
          <q-spinner-hourglass/>
        </template>
      </q-btn>
    </q-form>
  </q-card>
</template>

<script>
    import {mapActions} from 'vuex'

    export default {
        name: "ChangePassword",
        data() {
            return {
                buttonLoading: false,
                userInput: {
                    currentPassword: "",
                    newPassword: "",
                    newPasswordReEnter: "",
                }
            }
        },
        methods: {
            ...mapActions('auth', ['changePassword']),
            submitForm() {
                this.buttonLoading = true;
                if (this.userInput.newPasswordReEnter !== this.userInput.newPassword) {
                    this.$q.notify({
                        message: "Passwords do not match",
                        type: "negative",
                    });
                    this.buttonLoading = false
                }
                else{
                    this.changePassword({
                        current_password: this.userInput.currentPassword,
                        new_password: this.userInput.newPassword
                    }).then(() => {
                        this.buttonLoading = false;
                        this.$q.notify({
                            message: "Password changed successfully",
                            type: "positive",
                        });
                        this.userInput.newPassword = "";
                        this.userInput.currentPassword = "";
                        this.userInput.newPasswordReEnter = ""
                    }).catch((e) => {
                        this.buttonLoading = false;
                        this.$q.notify({
                            message: e,
                            type: "negative",
                        });
                    })
                }
            }
        }
    }
</script>

<style scoped>

</style>
