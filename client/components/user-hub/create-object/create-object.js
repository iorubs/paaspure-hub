import axios from 'axios'
import _ from 'lodash'

export default {
  props: ['auth', 'userObjects', 'alert'],
  data () {
    return {
      show: false,
      form: {
        name: '',
        gitUrl: 'Select Repo',
        description: '',
        type: true
      },
      gitHubRepos: []
    }
  },
  created () {
    axios.get(`https://api.github.com/users/${this.profile.nickname}/repos`)
      .then(response => {
        this.gitHubRepos = _.concat(this.repos, response.data)
      })
      .catch(e => {
        this.alert.variant = 'warning'
        this.alert.msg = 'GitHub API rate limit exceeded, you will have to wait 60 minutes before some of the features are available again.'
        this.alert.dismissCountDown = 120
      })
  },
  computed: {
    repos () {
      var currentUserObjects = this.userObjects

      return _.filter(this.gitHubRepos, function (repo) {
        return !_.some(currentUserObjects, { gitUrl: repo.clone_url })
      })
    },
    type () {
      return this.form.type ? 'module' : 'component'
    },
    profile () {
      return this.auth.isLoggedIn() ? this.auth.getProfile() : {}
    }
  },
  methods: {
    clear () {
      this.form = {
        name: '',
        gitUrl: 'Select Repo',
        description: '',
        type: true
      }
    },
    onSubmit (evt) {
      evt.preventDefault()

      // TODO: Fix preventDefault bug for default selected
      if (this.form.gitUrl !== 'Select Repo') {
        this.show = false
        this.form.type = this.type
        this.form.name = this.profile.nickname + '_' + this.form.name

        axios.post(`/api/user-objects`, this.form, {
          headers: { Authorization: `Bearer ${this.auth.getAccessToken()}` }
        })
          .then(response => {
            this.userObjects.push(response.data)
            this.alert.variant = 'success'
            this.alert.msg = 'Released new version.'
            this.alert.dismissCountDown = this.alert.dismissSecs
            this.clear()
          })
          .catch(e => { console.log(e) })
      }
    }
  }
}
