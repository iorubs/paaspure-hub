<template>
  <div>
    <b-row class="justify-content-md-center">
      <b-col cols="10">
        <b-row>
          <b-col>
            <b-nav-form>
              <b-form-input size="sm" class="mr-sm-2" type="text" v-model="search" placeholder="Search"/>
              <b-button size="sm" class="my-2 my-sm-0">Search</b-button>
            </b-nav-form>
          </b-col>
          <b-col></b-col>
          <b-col>
            <b-form-group>
              <b-row class="ml-auto">
                <b-col align="right">Module</b-col>
                <b-col align="right">
                  <label class="switch">
                    <input type="checkbox" v-model="objectType"/>
                    <span class="slider"></span>
                  </label>
                </b-col>
                <b-col align="right">Component</b-col>
              </b-row>
            </b-form-group>
          </b-col>
        </b-row>
      </b-col>
    </b-row>

    <b-row class="justify-content-md-center">
      <b-col cols="10">
          <b-card v-for="item in visibleObjects"
                  @click="details(item)"
                  bg-variant="dark"
                  text-variant="white"
                  border-variant="white"
                  :key="item._id">
            <b-row>
              <b-col cols="2" align="left">{{ item.name }}</b-col>
              <b-col cols="8">{{ item.description }}</b-col>
              <b-col align="right">
                <b-button variant="info">
                  Details
                </b-button>
              </b-col>
            </b-row>
          </b-card>
      </b-col>
    </b-row>

    <b-row class="justify-content-md-center pagination">
      <b-pagination align="center" :total-rows="filteredCount" v-model="currentPage" :per-page="objectsPerPage" />
    </b-row>
  </div>
</template>

<script src="./hub.js" />

<style scoped>
div.card-body:hover {
  color: black;
  background-color: #ffc107;
}

.pagination {
  margin-top: .5em;
}
</style>
