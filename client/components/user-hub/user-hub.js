import axios from 'axios'
import createobject from './create-object/create-object.vue'
import updateobject from './update-object/update-object.vue'
import releaseversion from './release-version/release-version.vue'

export default {
  name: 'UserHub',
  components: {
    createobject,
    updateobject,
    releaseversion
  },
  props: ['auth'],
  data () {
    return {
      fields: {
        name: { label: 'Name', sortable: true },
        type: { label: 'Type', sortable: true },
        description: { label: 'Description', sortable: true },
        actions: { label: '', 'class': 'text-center' }
      },
      objects: [],
      alert: {
        dismissSecs: 5,
        dismissCountDown: 0,
        msg: '',
        variant: 'success'
      }
    }
  },
  created () {
    axios.get(`/api/user-objects`, {
      headers: { Authorization: `Bearer ${this.auth.getAccessToken()}` }
    })
      .then(response => {
        this.objects = response.data
      })
      .catch(e => { console.log(e) })
  },
  methods: {
    details (obj) {
      this.$router.push({
        name: 'Details',
        params: { id: obj._id }
      })
    },
    remove (objId) {
      axios.delete(`/api/user-objects/` + objId, {
        headers: { Authorization: `Bearer ${this.auth.getAccessToken()}` }
      })
        .then(response => {
          this.objects = this.objects.filter(function (obj) {
            return obj._id !== objId
          })

          this.alert.variant = 'success'
          this.alert.msg = 'Removed object.'
          this.alert.dismissCountDown = this.alert.dismissSecs
        })
        .catch(e => { console.log(e) })
    },
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    }
  }
}
