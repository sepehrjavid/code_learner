<template>
  <div class="row q-pa-md">
    <div class="q-pa-sm col-md-6 col-12 lobster text-white flex-center">
      <div class="text-h4">Let's connect and get the most out of it</div>
      <div class="text-h6">Create your own classes or conference rooms to teach others</div>
      <div class="text-h6">Join classes and dive into the ocean of science. You're just a click away</div>
      <img src="../assets/logo.png">
    </div>
    <q-card class="q-pa-sm col-12 col-md-6 bg-info" style="margin: auto;">
      <q-form onsubmit="submitForm" class="q-gutter-md" style="max-width: 400px; margin: auto">

        <q-input
          rounded
          outlined
          v-model="userInput.email"
          label="email *"
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />

        <q-input
          v-if="!alreadyHaveAnAccount"
          rounded
          outlined
          v-model="userInput.fullName"
          label="full name *"
          hint="Name and surname"
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />

        <q-input
          v-if="!alreadyHaveAnAccount"
          rounded
          outlined
          v-model="userInput.age"
          type="number"
          label="age *"
          :rules="[
          val => val !== null && val !== '' || 'Please type your age',
          val => val > 0 && val < 100 || 'Please type a real age']"
        />

        <q-input
          rounded
          outlined
          v-model="userInput.password"
          type="password"
          label="password *"
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />
        <!--    TODO add more validation for the password and email later-->
        <q-toggle v-if="!alreadyHaveAnAccount" v-model="userInput.agreeWithTerms"
                  label="I accept the license and terms"/>
        <div class="row">
          <q-btn class="col-3 q-ma-md" label="Submit" type="submit" color="primary" rounded no-caps/>
          <q-btn v-if="!alreadyHaveAnAccount" class="col-7 q-ma-md" label="Already have an account"
                 @click="alreadyHaveAnAccount=!alreadyHaveAnAccount" color="primary" rounded no-caps/>
          <q-btn v-else class="col-7 q-ma-md" label="Don't have an account"
                 @click="alreadyHaveAnAccount=!alreadyHaveAnAccount"
                 color="primary" rounded no-caps/>
        </div>
      </q-form>
    </q-card>
  </div>
</template>

<script>
    export default {
        name: "Index",
        data() {
            return {
                alreadyHaveAnAccount: false,
                userInput: {
                    fullName: "",
                    age: "",
                    email: "",
                    password: "",
                    agreeWithTerms: false
                }
            }
        },
        methods: {
            submitForm() {
                console.log(this.userInput)
            }
        }
    }
</script>

<style scoped>

</style>
