import axios from 'axios'
import _ from 'lodash'

export default {
  name: 'ShowObject',
  data () {
    return {
      obj: [],
      versions: [],
      selectedVersion: {
        pureObject: this.$route.params.id,
        tag: 'latest',
        commit: 'master',
        readme: 'readme'
      }
    }
  },
  computed: {
    versionString () {
      var version = this.selectedVersion.tag || 'latest'
      return version.toString()
    }
  },
  created () {
    this.versions = [this.selectedVersion]

    axios.get(`api/hub/` + this.$route.params.id)
      .then(response => {
        this.obj = response.data
        return this.fetchHtmlReadme(this.obj.gitUrl)
      })
      .then(readme => {
        this.selectedVersion.readme = readme
        this.versions[0] = this.selectedVersion
      })
      .catch(err => {
        if (err.response.status === 404) {
          this.selectedVersion.readme = 'Missing README file.'
        } else {
          this.selectedVersion.readme = 'GitHub API rate limit exceeded, try again in 60 minutes to see the latest REAME or checkout a released version.'
        }
      })

    axios.get(`api/version/` + this.$route.params.id)
      .then(response => {
        this.versions = _.concat(this.versions, _.reverse(response.data))
      })
  },
  methods: {
    fetchHtmlReadme (repoUrl) {
      var splitRepo = repoUrl.split(/[/.]+/)

      return axios.get(`https://raw.githubusercontent.com/${splitRepo[3]}/${splitRepo[4]}/master/README.md`)
        .then(reponse => {
          return axios.post('https://api.github.com/markdown', { text: reponse.data })
        })
        .then(reponse => {
          return reponse.data
        })
    }
  }
}
