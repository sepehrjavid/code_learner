<template>
  <div class="my-card">
    <q-card>
      <q-card-section class="bg-primary">
        <div class="text-white text-h5 architects text-center">{{classroom.name}}</div>
      </q-card-section>
      <q-separator/>
      <q-card-actions>
        <div class="row full-width">
          <div class="col text-center q-pa-xs">
            <q-btn class="full-height architects text-weight-bold" text-color="primary" color="warning">
              Start class
            </q-btn>
          </div>
          <div class="col">
            <div class="row justify-center">
              <div class="row q-pa-xs">
                <q-btn color="negative" icon="delete" :loading="deleteLoading" @click="deactivateClassroom">
                  <q-tooltip>
                    Delete class
                  </q-tooltip>
                </q-btn>
              </div>
              <div class="row q-pa-xs">
                <q-btn color="dark" icon="edit" @click="editDialog = true">
                  <q-tooltip>
                    Edit name
                  </q-tooltip>
                </q-btn>
              </div>
            </div>
            <div class="row justify-center">
              <div class="row q-pa-xs">
                <q-btn color="accent" icon="description" @click="routeToQuizManagement">
                  <q-tooltip>
                    Quizzes
                  </q-tooltip>
                </q-btn>
              </div>
              <div class="row q-pa-xs">
                <q-btn color="primary" icon="person" @click="ownersDialog = true">
                  <q-tooltip>
                    Owners
                  </q-tooltip>
                </q-btn>
              </div>
            </div>
          </div>
        </div>
      </q-card-actions>
    </q-card>
    <q-dialog v-model="ownersDialog" transition-show="scale" transition-hide="scale">
      <q-card class="full-width bg-warning">
        <div class="row justify-center q-pa-lg q-ma-md text-h4 text-weight-bold text-dark architects">Add Owners</div>
        <q-form class="text-center" @submit="addOwner">
          <q-select
            v-model="userInput.owners"
            use-input
            rounded
            outlined
            class="q-ma-lg"
            input-debounce="1000"
            label="Select owners"
            option-value="id"
            option-label="name"
            @filter="searchUser"
            hint="Enter the email of the users you want to set as owners for your class.
            You can clear it if you want no one to own this class other than you."
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
                  <q-icon name="person"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ scope.opt.name }}</q-item-label>
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ scope.opt.email }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>

            <template v-slot:no-option>
              <q-item class="architects bg-dark text-white text-weight-bold">
                <q-item-section>
                  No results
                </q-item-section>
              </q-item>
            </template>
          </q-select>

          <q-btn type="submit" color="dark" class="architects text-white q-ma-lg text-weight-bold"
                 :loading="addOwnerLoading" rounded style="width: 110px">
            Add
            <template v-slot:loading>
              <q-spinner-hourglass class="on-left"/>
              Loading...
            </template>
          </q-btn>
        </q-form>
      </q-card>
    </q-dialog>
    <q-dialog v-model="editDialog" transition-show="scale" transition-hide="scale">
      <q-card class="full-width bg-warning">
        <div class="row justify-center q-pa-lg q-ma-md text-h4 text-weight-bold text-dark architects">Create Class</div>
        <q-form class="text-center" @submit="edit">
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
            hint="Describe your class. This section cannot be blank"
          />

          <q-btn type="submit" color="dark" class="architects text-white q-ma-lg text-weight-bold"
                 :loading="editClassLoading" rounded style="width: 110px">
            Edit
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
    import {mapActions, mapGetters, mapMutations} from 'vuex'

    export default {
        name: "MyClassItem",
        props: ['classroom'],
        data() {
            return {
                deleteLoading: false,
                editClassLoading: false,
                addOwnerLoading: false,
                ownersDialog: false,
                editDialog: false,
                userInput: {
                    description: "",
                    name: "",
                    owners: []
                },
                options: []
            }
        },
        computed: {
            ...mapGetters('classroom', ['getSearchedUsers']),
        },
        methods: {
            ...mapActions('classroom', ['deactivate', 'searchForUser', 'addOwnerToClass', 'editClass']),
            ...mapMutations('quiz', ['setClassroomIdToFetchQuizzes']),
            deactivateClassroom() {
                this.deleteLoading = true;
                this.deactivate(this.classroom.id).then(() => {
                    this.deleteLoading = false;
                })
            },
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
            addOwner() {
                this.addOwnerLoading = true;
                let owners = [];
                this.userInput.owners.forEach(((value) => {
                    owners.push(value.id)
                }));
                this.addOwnerToClass({id: this.classroom.id, body: {other_owners: owners}}).then(() => {
                    this.addOwnerLoading = false;
                    this.$q.notify({
                        message: "owners successfully updated",
                        type: "dark",
                        classes: 'architects text-weight-bold',
                    });
                }).catch((e) => {
                    this.addOwnerLoading = false;
                    let currentOwners = this.classroom.other_owners;
                    this.userInput.owners = [];
                    currentOwners.forEach((value) => {
                        this.userInput.owners.push({
                            email: value.email,
                            name: value.name,
                            id: value.id
                        })
                    });
                    this.$q.notify({
                        message: e,
                        type: "negative",
                    });
                })
            },
            edit() {
                this.editClassLoading = true;
                this.editClass({
                    id: this.classroom.id,
                    body: {
                        name: this.userInput.name,
                        description: this.userInput.description
                    }
                }).then(() => {
                    this.editClassLoading = false;
                    this.$q.notify({
                        message: "classroom successfully updated",
                        type: "dark",
                        classes: 'architects text-weight-bold',
                    });
                }).catch((e) => {
                    this.editClassLoading = false;
                    this.userInput.name = this.classroom.name;
                    this.userInput.description = this.classroom.description;
                    this.$q.notify({
                        message: e,
                        type: "negative",
                    });
                })
            },
            routeToQuizManagement() {
                this.setClassroomIdToFetchQuizzes(this.classroom.id);
                this.$router.replace({name: "ManageQuiz"});
            }
        },
        mounted() {
            let currentOwners = this.classroom.other_owners;
            this.userInput.name = this.classroom.name;
            this.userInput.description = this.classroom.description;
            currentOwners.forEach((value) => {
                this.userInput.owners.push({
                    email: value.email,
                    name: value.name,
                    id: value.id
                })
            })
        }
    }
</script>

<style scoped>
  .my-card {
    width: 100%;
    max-width: 280px;
  }
</style>
