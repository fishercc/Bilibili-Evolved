import { allMutations, childListSubtree } from './observer'
import { addStyle } from './style'
import { deleteValue, getRandomId } from './utils'

enum ShadowRootEvents {
  Added = 'shadowRootAdded',
  Removed = 'shadowRootRemoved',
  Updated = 'shadowRootUpdated',
}
interface ShadowRootEntry {
  shadowRoot: ShadowRoot
  observer: MutationObserver
}
export class ShadowDomObserver extends EventTarget {
  static enforceOpenRoot() {
    const originalAttachShadow = Element.prototype.attachShadow
    Element.prototype.attachShadow = function attachShadow(options: ShadowRootInit) {
      return originalAttachShadow.call(this, {
        ...options,
        mode: 'open',
      })
    }
  }

  entries: ShadowRootEntry[] = []

  constructor() {
    super()
    this.observe()
  }

  protected queryAllShadowRoots(
    root: DocumentFragment | Element = document.body,
    deep = false,
  ): ShadowRoot[] {
    return [root, ...root.querySelectorAll('*')]
      .filter((e): e is Element => e instanceof Element && e.shadowRoot !== null)
      .flatMap(e => {
        if (deep) {
          return [e.shadowRoot, ...this.queryAllShadowRoots(e.shadowRoot)]
        }
        return [e.shadowRoot]
      })
  }

  protected mutationHandler(records: MutationRecord[]) {
    records.forEach(record => {
      record.removedNodes.forEach(node => {
        if (node instanceof Element && node.shadowRoot !== null) {
          this.removeEntry(node.shadowRoot)
        }
      })
      record.addedNodes.forEach(node => {
        if (node instanceof Element) {
          this.queryAllShadowRoots(node).forEach(shadowRoot => {
            this.addEntry(shadowRoot)
          })
        }
      })
    })
  }

  protected addEntry(shadowRoot: ShadowRoot) {
    if (this.shadowRoots.includes(shadowRoot)) {
      return
    }
    const shadowRootChildren = this.queryAllShadowRoots(shadowRoot)
    shadowRootChildren.forEach(child => this.addEntry(child))

    const [observer] = childListSubtree(shadowRoot, records => this.mutationHandler(records))
    this.entries.push({
      shadowRoot,
      observer,
    })
    this.dispatchEvent(new CustomEvent('shadowRootAdded', { detail: shadowRoot }))
  }

  protected removeEntry(shadowRoot: ShadowRoot) {
    const children = this.shadowRoots.filter(it => shadowRoot.contains(it.host))
    children.forEach(child => this.removeEntry(child))

    const entry = this.entries.find(it => it.shadowRoot === shadowRoot)
    if (entry !== undefined) {
      entry.observer.disconnect()
      deleteValue(this.entries, it => it === entry)
    }
  }

  get shadowRoots() {
    return this.entries.map(entry => entry.shadowRoot)
  }

  addEventListener(
    type: `${ShadowRootEvents}`,
    callback: EventListenerOrEventListenerObject | null,
    options?: AddEventListenerOptions | boolean,
  ): void {
    super.addEventListener(type, callback, options)
  }

  removeEventListener(
    type: `${ShadowRootEvents}`,
    callback: EventListenerOrEventListenerObject | null,
    options?: EventListenerOptions | boolean,
  ): void {
    super.removeEventListener(type, callback, options)
  }

  forEachShadowRoot(callbacks: {
    added?: (shadowRoot: ShadowRoot) => void
    removed?: (shadowRoot: ShadowRoot) => void
  }) {
    this.shadowRoots.forEach(it => callbacks.added?.(it))
    const addedListener = (e: CustomEvent<ShadowRoot>) => callbacks?.added(e.detail)
    const removedListener = (e: CustomEvent<ShadowRoot>) => callbacks?.removed(e.detail)
    this.addEventListener(ShadowRootEvents.Added, addedListener)
    this.addEventListener(ShadowRootEvents.Removed, removedListener)
    return () => {
      this.removeEventListener(ShadowRootEvents.Added, addedListener)
      this.removeEventListener(ShadowRootEvents.Removed, removedListener)
    }
  }

  observe() {
    const existingRoots = this.queryAllShadowRoots()
    existingRoots.forEach(root => this.addEntry(root))
    allMutations(records => this.mutationHandler(records))
  }

  disconnect() {
    this.entries.forEach(entry => entry.observer.disconnect())
    this.entries = []
  }
}

export class ShadowDomStyles {
  constructor(public observer: ShadowDomObserver) {}

  entries: ShadowRootEntry[] = []

  get shadowRoots() {
    return this.entries.map(entry => entry.shadowRoot)
  }

  protected addEntry(shadowRoot: ShadowRoot, callback: (records: MutationRecord[]) => void) {
    const [observer] = childListSubtree(shadowRoot, records => {
      callback(records)
    })
    this.entries.push({
      shadowRoot,
      observer,
    })
  }

  protected removeEntry(shadowRoot: ShadowRoot) {
    const entry = this.entries.find(it => it.shadowRoot === shadowRoot)
    if (entry !== undefined) {
      entry.observer.disconnect()
      deleteValue(this.entries, it => it === entry)
    }
  }

  addStyle(text: string) {
    const id = `shadow-dom-style-${getRandomId()}`
    const element = addStyle(text, id)
    return this.observer.forEachShadowRoot({
      added: shadowRoot => {
        if (this.shadowRoots.includes(shadowRoot)) {
          return
        }
        const tryAddStyle = () => {
          if (shadowRoot.getElementById(id) !== null) {
            return
          }
          shadowRoot.appendChild(element.cloneNode(true))
        }
        tryAddStyle()
        this.addEntry(shadowRoot, () => tryAddStyle())
      },
      removed: shadowRoot => {
        this.removeEntry(shadowRoot)
      },
    })
  }
}
