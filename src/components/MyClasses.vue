<template>
  <div>
    <div class="row justify-center full-width q-ma-xl">
      <div class="col-12 text-center full-width architects text-dark text-h2 text-weight-bold q-my-lg">
        My classes
      </div>
      <div class="col-12 row justify-center q-my-md full-width">
        <div style="width: 60%">
          <q-separator style="width: 100%; height: 2px;" color="dark"/>
        </div>
      </div>
      <div class="row justify-center full-width">
        <q-card class="q-ma-sm my-card bg-primary text-center">
          <q-icon name="add_circle" class="full-height full-width cursor-pointer" color="warning"
                  @click="showDialog = true" size="xl">
            <q-tooltip>
              Add classroom
            </q-tooltip>
          </q-icon>
        </q-card>
        <MyClassItem class="q-ma-sm" v-for="classroom in classes" :key="classroom.id" :classroom="classroom"/>
      </div>
    </div>
    <q-dialog v-model="showDialog" transition-show="scale" transition-hide="scale">
      <q-card class="full-width bg-warning">
        <div class="row justify-center q-pa-lg q-ma-md text-h4 text-weight-bold text-dark architects">Create Class</div>
        <q-form class="text-center" @submit="submitCreateForm">
          <q-input
            rounded
            outlined
            v-model="userInput.name"
            class="q-ma-lg"
            label="Class name *"
            hint="Class name should be unique"
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
          <q-input
            rounded
            outlined
            v-model="userInput.description"
            class="q-ma-lg"
            type="textarea"
            label="Class description"
            hint="Can be black but we strongly recommend to describe your class"
          />

          <q-select
            v-model="userInput.owners"
            use-input
            rounded
            outlined
            class="q-ma-lg"
            input-debounce="1000"
            label="Select owners"
            option-value="id"
            option-label="email"
            @filter="searchUser"
            hint="Enter the email of the users you want to set as owners for your class.
            You can skip this part if you want no one to own this class other than you."
            multiple
            :options="options"
            use-chips
            behavior="menu"
          >
            <template v-slot:option="scope">
              <q-item
                v-bind="scope.itemProps"
                v-on="scope.itemEvents"
                class="architects bg-dark text-white text-weight-bold"
              >
                <q-item-section avatar>
                  <q-icon name="person" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ scope.opt.email }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>

            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  No results
                </q-item-section>
              </q-item>
            </template>
          </q-select>

          <q-btn type="submit" color="dark" class="architects text-white q-ma-lg text-weight-bold"
                 :loading="createClassLoading" rounded style="width: 110px">
            Create
            <template v-slot:loading>
              <q-spinner-hourglass class="on-left"/>
              Loading...
            </template>
          </q-btn>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
    import MyClassItem from "./MyClassItem";
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: "MyClasses",
        props: ['classes'],
        components: {MyClassItem},
        data() {
            return {
                showDialog: false,
                createClassLoading: false,
                userInput: {
                    name: "",
                    description: "",
                    owners: []
                },
                options: []
            }
        },
        computed: {
            ...mapGetters('classroom', ['getSearchedUsers']),
        },
        methods: {
            ...mapActions('classroom', ['searchForUser', 'createClass']),
            searchUser(val, update) {
                if (val === '') {
                    update(() => {
                        this.options = this.getSearchedUsers
                    });
                    return
                }

                update(() => {
                    this.searchForUser(val).then(() => {
                        this.options = this.getSearchedUsers
                    })
                })
            },
            submitCreateForm() {
                let owners = [];
                this.userInput.owners.forEach(((value) => {
                    owners.push(value.id)
                }));
                this.createClass({
                    name: this.userInput.name,
                    description: this.userInput.description,
                    other_owners: owners
                }).catch((e) => {
                    this.$q.notify({
                        message: e,
                        type: "negative",
                    })
                }).then(() => {
                    this.showDialog = false;
                    this.userInput.name = "";
                    this.userInput.description = "";
                    this.userInput.owners = [];
                })
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
