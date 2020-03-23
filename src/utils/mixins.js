export const asyncComponentLoaded = {
  mounted () {
    this.$store.dispatch('changeLoadingStatus', true)
  }
}

export const showWarning = {
  methods: {
    _changeSelection (name) {
      return new Promise((resolve) => {
        const isVisited = this.$store.state.step.stepHistory.includes(name)

        if (isVisited) {
          this.$bus.$emit('show-warning', () => {
            resolve()
          })
        } else {
          resolve()
        }
      })
    }
  }
}
