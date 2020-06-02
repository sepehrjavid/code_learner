<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-dark">
      <q-toolbar>
        <q-avatar @click="routeTo({name: 'Home'})" class="cursor-pointer" size="xl">
          <img src="../assets/logo.png">
        </q-avatar>
        <div class="text-h6 cursor-pointer q-pa-sm q-ml-lg" style="flex: auto; margin-right: 15px"
             @click="routeTo({name: 'Home'})">
          Code Learners
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: 'MainLayout',

        components: {},

        methods: {
            ...mapGetters('auth', ['isAuthenticated']),
            routeTo(path) {
                if (this.$router.currentRoute.name === path.name) {
                    return;
                }
                this.$router.push(path);
            }
        }
    }
</script>
