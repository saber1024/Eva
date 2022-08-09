class Environment {
  constructor(record = {}, parent = null) {
    this._record = record;
    this.parent = parent
  }

  define(name, value) {
    this._record[name] = value;
    return value;
  }

  lookup(name) {
    return this.resolve(name)._record[name]
  }

  hasOwnProperty(name) {
    return this._record[name] !== undefined;
  }

  assign(name, value) {
    this.resolve(name)._record[name] = value
  }

  addition(name, value) {
    this.resolve(name)._record[name] += value
  }

  compare(op, name, value) {

    const left = this.resolve(name)._record[name]
    let right;
    if (typeof value === 'string') {
      right = this.resolve(value)._record[value]
    } else {
      right = value;
    }

    function com(left, right, op) {
      switch (op) {
        case '>':
          return left > right
        case '<':
          return left < right
        case '==':
          return left > right
      }
    }

    return com(left, right, op)
  }

  resolve(name) {
    if (this.hasOwnProperty(name)) {
      return this
    }

    if (this.parent == null) {
      throw new ReferenceError(`${name} is Not defined!!`)
    }

    return this.parent.resolve(name)
  }
}

export default Environment;
