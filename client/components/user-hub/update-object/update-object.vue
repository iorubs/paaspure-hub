<template>
  <div class="update-btn">
    <b-btn @click="show=true" size="sm" variant="primary">Update</b-btn>
    <b-modal v-model="show"
             title="Update"
             hide-footer>
      <b-container fluid>
        <b-form @submit="onSubmit" v-if="show">
          <b-form-group label="Name">
            <b-row>
              <b-col cols="3">
                {{ profile.nickname }}_
              </b-col>
              <b-col>
                <b-form-input type="text"
                            v-model="form.name"
                            required
                            placeholder="Enter name">
                </b-form-input>
            </b-col>
            </b-row>
          </b-form-group>
          <b-form-group label="Description">
            <b-form-input type="text"
                        v-model="form.description"
                        required
                        placeholder="Enter description">
            </b-form-input>
          </b-form-group>

          <b-form-group label="Type">
            <b-row>
              <b-col>Module</b-col>
              <b-col>
                <label class="switch">
                  <input type="checkbox" :checked="form.type" @click="form.type=!form.type">
                  <span class="slider"></span>
                </label>
              </b-col>
              <b-col>Component</b-col>
            </b-row>
          </b-form-group>
          <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>
       </b-container>
    </b-modal>
  </div >
</template>

<script src="./update-object.js"/>

<style scoped>
.update-btn {
  display: inline-block;
}
</style>
