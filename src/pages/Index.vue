<template>
  <div class="row q-pa-md">
    <div class="q-pa-sm col-md-6 col-12 text-center">
      <div class="text-white lobster q-ma-lg">
        <div class="text-h4 q-ma-xs">Let's connect and get the most out of it</div>
        <div class="text-h6 q-ma-xs">Create your own classes or conference rooms to teach others</div>
        <div class="text-h6 q-ma-xs">Join classes and dive into the ocean of science</div>
        <div class="text-h6 q-ma-xs"> You're just a click away</div>
      </div>
      <div>
        <img src="../assets/logo-scaled.png" style="margin: auto">
      </div>
    </div>
    <q-card class="q-pa-sm col-12 col-md-6 bg-warning" style="margin: auto;border-radius: 5%; max-width: 600px">
      <q-form @submit="submitForm" class="q-gutter-md" style="max-width: 400px; margin: auto">

        <q-input
          rounded
          outlined
          v-model="userInput.email"
          label="Email *"
          type="email"
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />

        <q-input
          v-if="!alreadyHaveAnAccount"
          rounded
          outlined
          v-model="userInput.firstName"
          label="First name *"
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />

        <q-input
          v-if="!alreadyHaveAnAccount"
          rounded
          outlined
          v-model="userInput.lastName"
          label="Last name *"
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />


        <q-input
          v-if="!alreadyHaveAnAccount"
          rounded
          outlined
          v-model="userInput.age"
          type="number"
          label="Age *"
          :rules="[
          val => val !== null && val !== '' || 'Please type your age',
          val => val > 4 && val < 100 || 'Please type a valid age']"
        />

        <q-input
          rounded
          outlined
          v-model="userInput.password"
          type="password"
          label="Password *"
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />
        <!--    TODO add more validation for the password and email later-->
        <q-toggle v-if="!alreadyHaveAnAccount" v-model="userInput.agreeWithTerms"
                  label="I accept the license and terms"/>
        <div class="row">
          <q-btn class="col-3 q-ma-md architects text-weight-bold text-white" v-if="!alreadyHaveAnAccount"
                 :loading="signupLoading" label="Sign up" type="submit" color="dark" rounded no-caps>
            <template v-slot:loading>
              <q-spinner-hourglass/>
            </template>
          </q-btn>
          <q-btn class="col-3 q-ma-md architects text-white text-weight-bold" v-else label="Login"
                 :loading="loginLoading" type="submit" color="dark" rounded no-caps>
            <template v-slot:loading>
              <q-spinner-hourglass/>
            </template>
          </q-btn>
          <q-btn v-if="!alreadyHaveAnAccount" class="col-7 q-ma-md architects text-weight-bold text-white"
                 label="Already have an account" @click="alreadyHaveAnAccount=!alreadyHaveAnAccount" color="dark"
                 rounded no-caps/>
          <q-btn v-else class="col-7 q-ma-md architects text-white text-weight-bold" label="Don't have an account"
                 @click="alreadyHaveAnAccount=!alreadyHaveAnAccount" color="dark" rounded no-caps/>
        </div>
      </q-form>
    </q-card>
  </div>
</template>

<script>
    import {mapActions} from 'vuex'

    export default {
        name: "Index",
        data() {
            return {
                loginLoading: false,
                signupLoading: false,
                alreadyHaveAnAccount: false,
                userInput: {
                    firstName: "",
                    lastName: "",
                    age: "",
                    email: "",
                    password: "",
                    agreeWithTerms: false
                }
            }
        },
        methods: {
            ...mapActions('auth', ['login', 'signup']),
            submitForm() {
                if (!this.alreadyHaveAnAccount && !this.userInput.agreeWithTerms) {
                    this.$q.notify({
                        message: "Please agree to our licence and terms",
                        type: "negative",
                    })
                }
                if (this.alreadyHaveAnAccount) {
                    this.loginLoading = true;
                    this.login({
                        username: this.userInput.email,
                        password: this.userInput.password
                    }).then(() => {
                        this.loginLoading = false;
                        this.$router.replace({name: "DashboardHome"})
                    }).catch((e) => {
                        this.loginLoading = false;
                        this.$q.notify({
                            message: e,
                            type: "negative",
                        })
                    })

                } else {
                    this.signupLoading = true;
                    this.signup({
                        first_name: this.userInput.firstName,
                        last_name: this.userInput.lastName,
                        email: this.userInput.email,
                        password: this.userInput.password,
                        age: this.userInput.age
                    }).then(() => {
                        this.signupLoading = false;
                        this.$router.replace({name: "DashboardHome"})
                    })
                }
            }
        }
    }
</script>

<style scoped>

</style>
