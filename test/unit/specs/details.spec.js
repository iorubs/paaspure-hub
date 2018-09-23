import Vue from 'vue'
import Details from '@/components/details/details'

describe('Details.vue', () => {
  it('should render pure object details', () => {
    const dummyVersion = {
      pureObject: 'spoof',
      tag: 'latest',
      commit: 'master',
      readme: 'dummy data'
    }

    const data = {
      obj: {
        _id: 'spoof',
        name: 'name',
        description: 'Description',
        type: 'module',
        gitUrl: 'https://github.com/iorubs/pro1oh1.git',
        owner: 'iorubs'
      },
      versions: [dummyVersion],
      selectedVersion: dummyVersion
    }

    const Constructor = Vue.extend(Details)
    const vm = new Constructor({ data: data }).$mount()

    Vue.nextTick(() => {
      expect(vm.$el.textContent)
        .to.contain('name')
        .to.contain('Description')
        .to.contain('module')
        .to.contain('iorubs')
        .to.contain('https://github.com/iorubs/pro1oh1.git')
        .to.contain('latest')
        .to.contain('master')
        .to.contain('latdummy dataest')
    })
  })

  it('should try fetch html version of readme', () => {
    const vm = new Vue(Details).$mount()

    return vm.fetchHtmlReadme('https://github.com/iorubs/pro1oh1.git')
      .then(readme => {
        expect(readme)
          .to.contain('</a>Pro1oh1 ODE.</h1>')
      })
  }).timeout(5000)

  it('should verify update version string', () => {

  })
})
