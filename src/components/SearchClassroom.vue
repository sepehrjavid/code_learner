<template>
  <div class="q-pa-md" style="max-width: 50%; margin: auto;">
    <q-form @submit="searchClassroom">
      <q-input dark dense outlined rounded v-model="query" class="q-pa-md text-weight-bold"
               placeholder="Search Classroom" @input="searchClassroom" debounce="500">
        <template v-slot:append>
          <q-icon v-if="query !== ''" name="clear" class="cursor-pointer" @click="query = ''"/>
          <q-icon name="search" class="cursor-pointer" @click="searchClassroom"/>
        </template>
        <q-menu class="full-width bg-dark" dark fit v-model="showMenu" no-focus no-refocus>
          <q-list class="architects text-weight-bold">
            <q-item v-if="getSearchedClasses.length === 0" dense>
              <q-item-section>No results</q-item-section>
            </q-item>
            <q-item v-for="classroom in getSearchedClasses" :key="classroom.id" clickable dense
                    @click="selectClassroom(classroom.id)" v-close-popup class="row justify-evenly">
              <q-item-section>{{classroom.name}}</q-item-section>
              <q-item-section class="text-center">{{classroom.description.substring(0,20)}}...</q-item-section>
              <q-item-section class="text-center">by {{classroom.creator.name}}</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-input>
    </q-form>
    <q-dialog v-model="showDialog" transition-show="scale" transition-hide="scale">
      <q-card class="full-width bg-warning" flat bordered>
        <q-img
          src="../assets/classroom.jpg"
        />
        <q-card-section class="q-pa-md text-dark architects">
          <div class="text-h4 text-center text-weight-bold">
            {{selectedClassroom.name}}
          </div>
          <div class="text-subtitle1 text-center text-weight-bold">
            by {{selectedClassroom.creator.name}}
          </div>
        </q-card-section>
        <q-card-section class="architects text-weight-bold text-dark text-h6 text-center">
          {{selectedClassroom.description}}
        </q-card-section>
        <q-card-actions class="row justify-center q-ma-sm" v-if="!isOwnerOrCreator">
          <q-btn v-if="!hasEnrolled" rounded flat class="bg-dark text-white text-weight-bold architects"
                 style="width: 130px" no-caps :loading="buttonLoading" @click="EnrollOrDisenroll">
            Enroll
            <template v-slot:loading>
              <q-spinner-hourglass class="on-left"/>
              Loading...
            </template>
          </q-btn>
          <q-btn v-else rounded flat class="bg-negative text-white text-weight-bold architects" style="width: 130px"
                 no-caps :loading="buttonLoading" @click="EnrollOrDisenroll">
            Disenroll
            <template v-slot:loading>
              <q-spinner-hourglass class="on-left"/>
              Loading...
            </template>
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: "SearchClassroom",
        data() {
            return {
                showMenu: false,
                buttonLoading: false,
                query: '',
                loading: false,
                showDialog: false,
                selectedClassroom: {
                    id: null,
                    name: "",
                    description: "",
                    creator: {
                        name: ""
                    }
                }
            }
        },
        computed: {
            ...mapGetters('classroom', ['getSearchedClasses']),
            ...mapGetters('profile', ['getUserData']),
            hasEnrolled() {
                let flag = false;
                let joined = this.getUserData.joined_classes;
                joined.forEach((value) => {
                    if (value.id === this.selectedClassroom.id) {
                        flag = true;
                    }
                });
                return flag;
            },
            isOwnerOrCreator() {
                let flag = false;
                let user = this.getUserData;
                user.created_classes.forEach((value) => {
                    if (value.id === this.selectedClassroom.id) {
                        flag = true;
                    }
                });
                user.owned_classes.forEach((value) => {
                    if (value.id === this.selectedClassroom.id) {
                        flag = true;
                    }
                });
                return flag;
            }
        },
        methods: {
            ...mapActions('classroom', ['searchForClassrooms', 'toggleEnrolled']),
            searchClassroom() {
                if (this.query === '') {
                    return
                }
                this.showMenu = true;
                this.loading = true;
                this.searchForClassrooms(this.query).then(() => {
                    this.loading = false;
                })
            },
            selectClassroom(id) {
                this.getSearchedClasses.forEach((element) => {
                    if (element.id === id) {
                        this.selectedClassroom = element
                    }
                });
                this.showDialog = true;
            },
            EnrollOrDisenroll() {
                this.buttonLoading = true;
                this.toggleEnrolled(this.selectedClassroom.id).then(() => {
                    this.buttonLoading = false;
                })
            },
        },
    }
</script>

<style scoped>

</style>
