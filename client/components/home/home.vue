<template>
  <b-jumbotron v-bind:header="title" v-bind:lead="subtile">
    <hr class="my-4"/>
    <b-row>
      <b-col>
        <p class=lead>Our Goal</p>
        <p>
          A framework for creating and sharing full platform specifications, source code and the tests required for setting up all kinds of platforms.
        </p>
        <p>
          By breaking down platforms into smaller reusable pieces known as PureObjects:
        </p>
        <ul>
          <li>
            <p>
              We hope to help reduce the impact of the lack of process and tool standardisation involved in setting up platforms.
            </p>
          </li>
          <li>
            <p>
              Lower the entry level barrier for anyone trying to adopt container technologies.
            </p>
          </li>
          <li>
            <p>
              And leverage the power of an open source community for building better platforms for everyone.
            </p>
          </li>
        </ul>
        <hr class="my-4"/>
        <p class=lead>PureObjects</p>
        <p>
          Two companies may decide to use the same tools for a given task, for example, the provisioning of some resources on AWS using Terraform. The Terraform scripts may or may not be company specific, but the work required for running Terraform in the first place is still the same; at present both would end-up writing somewhat similar code for running the desired approach. PaaSPure allows users to pull that code and reuse it to run their own Terraform scripts.
        </p>
        <p>
          The tool breaks platform into two types of objects:
        </p>

      </b-col>
      <b-col>
        <img src="@/assets/logo-512.png" height="500px"><br />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <ul>
          <li>
            <p>
              <strong>Modules:</strong>
              General overview and requirements for things such as infrastructure, logging and monitoring. The application knows how to run modules and modules offer a layer of abstraction on top of components.
            </p>
          </li>
        </ul>
      </b-col>
      <b-col>
        <ul>
          <li>
            <p>
              <strong>Components:</strong>
              Are implementation specific, for example, a component for provisioning a platform’s infrastructure on AWS would consist of some Terraform or CloudFormation scripts and the code for running and testing these scripts.
            </p>
          </li>
        </ul>
      </b-col>
    </b-row>
  </b-jumbotron>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      title: 'PaaSPure',
      subtile: 'Building the PaaS of the future together.'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-weight: normal;
}

p {
  text-align: justify;
}
</style>
