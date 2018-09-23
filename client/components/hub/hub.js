import axios from 'axios'
import _ from 'lodash'

export default {
  name: 'Hub',
  data () {
    return {
      fields: {
        name: { label: 'Name', sortable: true },
        description: { label: 'Description', sortable: true },
        actions: { label: '', 'class': 'text-center' }
      },
      objects: [],
      currentPage: 1,
      objectsPerPage: 10,
      search: '',
      objectType: false,
      filteredCount: 0
    }
  },
  created () {
    axios.get(`/api/hub`)
      .then(response => {
        this.objects = response.data
      })
      .catch(e => { console.log(e) })
  },
  computed: {
    type () {
      return this.objectType ? 'component' : 'module'
    },
    visibleObjects () {
      var filtered = this.objects
      var upperbound = this.currentPage * this.objectsPerPage
      var lowerbound = upperbound - this.objectsPerPage

      var search = this.search
      var selectedType = this.type

      filtered = _.filter(filtered, function (obj, index) {
        return _.includes(obj.name, search) && obj.type === selectedType
      })

      this.filteredCount = filtered.length

      return _.filter(filtered, function (obj, index) {
        return _.inRange(index, lowerbound, upperbound)
      })
    }
  },
  methods: {
    details (obj) {
      this.$router.push({
        name: 'Details',
        params: { id: obj._id }
      })
    }
  }
}
