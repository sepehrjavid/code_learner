<template>
  <q-layout view="lHh Lpr lFf" class="gradient">
    <q-header class="bg-dark">
      <q-toolbar class="justify-between">
        <div class="row">
          <q-avatar @click="routeTo({name: 'Home'})" class="cursor-pointer" size="xl">
            <img src="../assets/logo.png">
          </q-avatar>
          <div class="text-h6 cursor-pointer q-pa-sm q-ml-lg" style="flex: auto; margin-right: 15px"
               @click="routeTo({name: 'Home'})">
            Code Learners
          </div>
        </div>
        <div class="cursor-pointer q-pa-sm" v-if="isUserFetched">
          <q-btn flat rounded icon="person" :label="getFullName" no-caps>
            <q-menu transition-show="flip-right" transition-hide="flip-left">
              <q-list class="bg-dark">
                <q-item clickable v-close-popup @click="routeTo({name: 'Home'})">
                  <q-item-section avatar>
                    <q-avatar text-color="white" icon="home"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-white">Home</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable v-close-popup @click="routeTo({name: 'EditProfile'})">
                  <q-item-section avatar>
                    <q-avatar text-color="white" icon="edit"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-white">Edit Profile</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable v-close-popup @click="routeTo({name: 'ChangePassword'})">
                  <q-item-section avatar>
                    <q-avatar text-color="white" icon="lock"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-white">Change Password</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable v-close-popup @click="logout">
                  <q-item-section avatar>
                    <q-avatar text-color="white" icon="logout"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-white">Logout</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: 'MainLayout',
        computed: {
            ...mapGetters('auth', ['isAuthenticated']),
            ...mapGetters('profile', ['isUserFetched', 'getUserData']),
            getFullName() {
                return this.getUserData.first_name + " " + this.getUserData.last_name
            }
        },
        methods: {
            ...mapActions('auth', ['logout']),
            routeTo(path) {
                if (this.$router.currentRoute.name === path.name) {
                    return;
                }
                this.$router.push(path);
            },
        }
    }
</script>
