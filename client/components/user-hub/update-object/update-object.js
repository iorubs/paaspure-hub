import axios from 'axios'

export default {
  props: ['auth', 'object', 'alert'],
  data () {
    return {
      show: false,
      form: {
        name: this.object.name.split(this.auth.getProfile().nickname + '_').pop(),
        description: this.object.description,
        type: this.object.type === 'component'
      }
    }
  },
  computed: {
    type () {
      return this.form.type ? 'component' : 'module'
    },
    profile () {
      return this.auth.isLoggedIn() ? this.auth.getProfile() : {}
    }
  },
  methods: {
    clear () {
      this.form = {
        name: this.object.name.split(this.auth.getProfile().nickname + '_').pop(),
        description: this.object.description,
        type: this.object.type === 'component'
      }
    },
    onSubmit (evt) {
      evt.preventDefault()

      this.show = false
      this.form.type = this.type
      this.form.name = this.profile.nickname + '_' + this.form.name

      axios.put(`api/user-objects/` + this.object._id, this.form, {
        headers: { Authorization: `Bearer ${this.auth.getAccessToken()}` }
      })
        .then(res => {
          this.object.name = this.form.name
          this.object.description = this.form.description
          this.object.type = this.form.type
          this.alert.variant = 'success'
          this.alert.msg = 'Updated ' + this.object.name + '.'
          this.alert.dismissCountDown = this.alert.dismissSecs
          this.clear()
        })
        .catch(e => { console.log(e) })
    }
  }
}
