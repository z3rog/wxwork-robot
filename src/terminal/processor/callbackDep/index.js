class CallbackDep {
  constructor() {
    this.deps = []
  }

  async callAll() {
    for (let i = 0; i < this.deps.length; i++) {
      try {
        await this.deps[i]()
      } catch (e) {
        // console.log(e)
        throw new Error(e)
      } finally {
        this.deps.splice(i, 1)
        i--
      }
    }
  }

  addDep(dep) {
    this.deps.push(dep)
  }

  clearDep() {
    this.deps = []
  }
}

export default new CallbackDep()
