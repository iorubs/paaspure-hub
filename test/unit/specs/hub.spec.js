import Vue from 'vue'
import Hub from '@/components/hub/hub'
import router from '@/router'

describe('Hub.vue', () => {
  it('should render pure object list', () => {
    const vm = new Vue(Hub).$mount()

    vm.objects = [{
      _id: 'spoof1',
      name: 'module',
      description: 'ModDescription',
      type: 'module'
    }, {
      _id: 'spoof2',
      name: 'component',
      description: 'CompDescription',
      type: 'component'
    }]

    Vue.nextTick(() => {
      expect(vm.$el.textContent)
        .to.contain('module')
        .to.contain('ModDescription')
        .to.contain('components')
        .to.contain('CompDescription')
    })
  })

  it('should try open pure object details', done => {
    const dummy = {
      _id: 'spoof1',
      name: 'module',
      description: 'ModDescription',
      type: 'module'
    }

    const Constructor = Vue.extend(Hub)
    const vm = new Constructor({router}).$mount()

    vm.details(dummy)

    Vue.nextTick(() => {
      done()

      expect(vm.$el.textContent)
        .to.contain('README')
    })
  })
})
