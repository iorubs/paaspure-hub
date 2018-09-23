<template>
  <b-row class="justify-content-md-center">
    <b-col cols="11">
      <b-row>
        <b-col cols="4">
          <b-alert :show="alert.dismissCountDown"
             dismissible
             v-bind:variant="alert.variant"
             @dismissed="alert.dismissCountDown=0"
             @dismiss-count-down="countDownChanged">
            {{ alert.msg }}
          </b-alert>
          <b-card header="Options and user info"
                  border-variant="dark"
                  header-bg-variant="dark"
                  header-text-variant="white"
                  align="center">
                  <createobject :auth="auth" :userObjects="objects" :alert="alert"></createobject>
          </b-card>
        </b-col>

        <b-col cols="8">
          <b-card header="Created by you"
                  border-variant="dark"
                  header-bg-variant="dark"
                  header-text-variant="white"
                  align="center">
            <b-card no-body v-for="item in objects" class="mb-1" v-bind:key="item._id">
              <b-card-header header-tag="header" class="p-1" role="tab">
                <b-btn block href="#" v-b-toggle="item._id" variant="secondary">{{item.name}}</b-btn>
              </b-card-header>
              <b-collapse v-bind:id="item._id" accordion="my-accordion" role="tabpanel">
                <b-card-body>
                  <b-row>
                    <b-col>
                      {{ item.description }}
                    </b-col>
                    <b-col>
                      <b-button variant="info" size="sm" @click="details(item)">View</b-button>
                      <releaseversion :auth="auth" :object="item" :alert="alert"></releaseversion>
                      <updateobject :auth="auth" :object="item" :alert="alert"></updateobject>
                      <b-button variant="danger" size="sm" @click="remove(item._id)">Remove</b-button>
                    </b-col>
                  </b-row>
                </b-card-body>
              </b-collapse>
            </b-card>
          </b-card>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script src="./user-hub.js" />

<style scoped>
.table {
  margin-bottom: 0;
}
</style>
