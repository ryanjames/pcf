class Observer {
  constructor() {
    this.subscribers = {}
  }
  subscribe(event, fn) {
    if (!this.subscribers[event]) {
      this.subscribers[event] = []
    }
    this.subscribers[event].push(fn)
  }
  publish(event, data) {
    console.log(event);
    if (this.subscribers[event]) {
      this.subscribers[event].forEach(method => method(data))
    }
  }
}

const observer = new Observer()

export default observer