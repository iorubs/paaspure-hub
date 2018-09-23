<template>
  <div class="release-btn">
    <b-btn @click="show=true" size="sm" variant="success">Release</b-btn>
    <b-modal v-model="show"
             title="Release"
             hide-footer>
      <b-container fluid>
        <b-form @submit="onSubmit" v-if="show">
          <div v-if="selectedCommit === 'Select Commit'">
            <br />
          </div>
          <b-row v-if="selectedCommit !== 'Select Commit'">
            <b-col>
              Author: {{ selectedCommit.author.login }}
            </b-col>
            <b-col>
              Date: {{ selectedCommit.commit.author.date.split('T')[0] }}
            </b-col>
          </b-row>

          <b-form-group label="Commits">
            <b-form-select required v-model="selectedCommit">
              <option disabled default>Select Commit</option>

              <option v-for="commit in commits"
                      v-bind:key="commit.sha"
                      v-bind:value="commit">
                      {{ commit.sha.substring(0, 7) }}
              </option>
            </b-form-select>
            <p class="warning-txt" >
              Only shows the most recented not yet released commits.
            </p>
          </b-form-group>
          <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>
       </b-container>
    </b-modal>
  </div >
</template>

<script src="./release-version.js"/>

<style scoped>
.release-btn {
  display: inline-block;
}

.warning-txt {
  color: #ffa000
}
</style>
