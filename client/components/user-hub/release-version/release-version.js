import axios from 'axios'
import _ from 'lodash'

export default {
  props: ['auth', 'object', 'alert'],
  data () {
    return {
      show: false,
      selectedCommit: 'Select Commit',
      commits: []
    }
  },
  created () {
    var repoUrl = this.object.gitUrl.split(/[/.]+/)
    var repoName = repoUrl[repoUrl.length - 2]
    axios.get(`https://api.github.com/repos/${this.profile.nickname}/${repoName}/commits`)
      .then(response => {
        this.commits = response.data.slice(0, 5)
        return axios.get(`api/version/` + this.object._id)
      })
      .then(response => {
        this.commits = _.filter(this.commits, function (commit) {
          return !_.some(response.data, { commit: commit.sha })
        })
      })
      .catch(e => { console.log(e) })
  },
  computed: {
    type () {
      return this.form.type ? 'component' : 'module'
    },
    profile () {
      return this.auth.isLoggedIn() ? this.auth.getProfile() : {}
    },
    unreleased () {

    }
  },
  methods: {
    clear (commitSha) {
      this.selectedCommit = 'Select Commit'
      this.commits = _.filter(this.commits, function (commit) {
        return commitSha !== commit.sha
      })
    },
    onSubmit (evt) {
      evt.preventDefault()

      // TODO: Fix preventDefault bug for default selected
      if (this.selectedCommit !== 'Select Commit') {
        this.show = false
        this.fetchHtmlReadme(this.object.gitUrl)
          .then(htmlReadme => {
            return axios.post(`/api/user-objects/` + this.object._id, {
              pureObject: this.object._id,
              commit: this.selectedCommit.sha,
              readme: htmlReadme,
              date: this.selectedCommit.commit.author.date.split('T')[0]
            }, {
              headers: { Authorization: `Bearer ${this.auth.getAccessToken()}` }
            })
          })
          .then(response => {
            this.alert.variant = 'success'
            this.alert.msg = 'Released new version.'
            this.alert.dismissCountDown = this.alert.dismissSecs
            this.clear(response.data.commit)
          })
          .catch(e => { console.log(e) })
      }
    },
    fetchHtmlReadme (repoUrl) {
      // TODO: move this to util file to avoid code repetition
      var splitRepo = repoUrl.split(/[/.]+/)

      return axios.get(`https://raw.githubusercontent.com/${splitRepo[3]}/${splitRepo[4]}/${this.selectedCommit.sha}/README.md`)
        .then(reponse => {
          return axios.post('https://api.github.com/markdown', { text: reponse.data })
        })
        .then(reponse => {
          return reponse.data
        })
    }
  }
}
