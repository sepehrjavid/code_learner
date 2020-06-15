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
                    @click="selectClassroom(classroom.id)" v-close-popup>
              <q-item-section>{{classroom.name}}</q-item-section>
              <q-item-section>{{classroom.description.substring(0,70)}}</q-item-section>
              <q-item-section>by {{classroom.creator.name}}</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-input>
    </q-form>
  </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: "SearchClassroom",
        data() {
            return {
                showMenu: false,
                query: '',
                loading: false,
                showDialog: true,
                options: [
                    "sds",
                    "sdsd",
                    "sdosd"
                ]
            }
        },
        computed: {
            ...mapGetters('classroom', ['getSearchedClasses'])
        },
        methods: {
            ...mapActions('classroom', ['searchForClassrooms']),
            searchClassroom() {
                if (this.query === ''){
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
                })
            }
        }
    }
</script>

<style scoped>

</style>
