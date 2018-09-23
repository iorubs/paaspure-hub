<template>
  <b-row class="justify-content-md-center">
    <b-col cols="11">
      <b-card v-bind:header="obj.name"
              border-variant="dark"
              header-bg-variant="dark"
              header-text-variant="white"
              align="center">

      <b-row>
        <b-col align="left">
          <p class="card-text">
            Description: {{ obj.description }}
          </p>
        </b-col>
        <b-col class="card-text" align="right">
          <p class="card-text">
            Version:
            <b-dropdown right v-bind:text="versionString"
                              class="m-md-1">
              <b-dropdown-item v-for="version in versions"
                               :value="version"
                               :key="version._id"
                               @click="selectedVersion = version">
                {{ version.tag }}
              </b-dropdown-item>
            </b-dropdown>
          </p>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="8" align="left">
          <b-card header="README"
                  align="left">
            <p class="card-text">
              <span v-html="selectedVersion.readme"></span>
            </p>
          </b-card>
        </b-col>
        <b-col cols="4" align="right">
          <b-card header="Details"
                  align="left">
            <p align="left" class="card-text">
              Type: {{ obj.type }} <br />
              Repo: <a v-bind:href="obj.gitUrl"> {{obj.gitUrl}} </a> <br />
              Commit: {{ selectedVersion.commit }}
            </p>
          </b-card>
        </b-col>
      </b-row>
    </b-card>
    </b-col>
  </b-row>
</template>

<script src="./details.js"/>
