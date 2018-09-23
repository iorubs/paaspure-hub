<template>
  <b-jumbotron header="Welcome">
    <b-row>
      <b-col>
        <p>
          We assume PureObjects will continuously change just like any other piece of software; hence backwards compatibility across all objects cannot be assured. To help avoid breaking changes we developed a versioning mechanism that provides users with the means for locking PureObjects to specific code versions.

          The authors of PureObjects decide when to release new versions through their Hub accounts. The Hub maps each release to the hash value of git commits. It is good practice to lock every object to a specific version (see the infra module in the sample config); if no tag is selected it defaults to latest (GitHub's master branch). Users can bypass the tagging system by providing the hash for a specific commit (see the orchestrator module in the sample config), this allows the user to lock code versions in cases where there are no releases. Assuming there is a config file called "pure.yml" and that the CLI tool has been installed (using pip install paaspure or python install setup.py to install from source code).
        </p>
        <p>
          The steps for executing the tool are as follows:
        </p>

        <ul>
          <li>
            <p>
              <strong>paaspure pull:</strong>
              This command finds and downloads the code for each PureObject defined in the config file.
            </p>
          </li>
          <li>
            <p>
              <strong>paaspure build:</strong>
              Execute PureObjects in the order defined in the config file.
            </p>
          </li>
          <li>
            <p>
              <strong>paaspure destroy:</strong>
              Remove resources created during the build phase in the reverse order.
            </p>
          </li>
        </ul>
        <p>
          The CLI's argument parser was designed to be easily extended; every PaaSPure module should implement their argument parser that imports and extends the default. This feature allows the CLI tool to adapt to each user based on their config file because it does not need to know all the options in advance.
        </p>
        <p>
          Self-sufficient Pure modules can be executed individually (E.g. <strong>paaspure MODULE_NAME build</strong>), this allows for the extension of existing platforms without the need for being taken down. However, extending live platforms might not always be possible, in some cases platforms will have to be taken down to add new components.
        </p>
      </b-col>
      <b-col>
        <pre>
          <code>
            version: 1

            hub: 'Overwrite default HUB'

            credentials:
              private_key: /path/to/key.pem
              aws_access_key: access
              aws_secret_key: secret

            modules:
              infra:
                tag: 0.1
                components:
                  terraform_aws: (See available args in the documentation.)

              orchestrator:
                repo: repo_url
                commit: commit_hash
                components:
                  swarm_aws: (See available args in the documentation.)

              networking:
                orchestrator: orchestrator
                components:
                  traefik:

              logging:
                ...
                  elk_stack:

              monitoring:
                ...
                  pom_stack:

              deployer:
                ...
                  registry:
                  portainer:
                  jenkins:
          </code>
        </pre>
      </b-col>
    </b-row>
  </b-jumbotron>
</template>

<style scoped>
p, pre {
  text-align: justify;
}

pre {
  font-size: 0.8em;
}
</style>
