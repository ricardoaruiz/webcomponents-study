const props = {
    opened: 'opened'
}

class Modal extends HTMLElement {
    constructor() {
        super()
        this._init()

        this._isOpen = false
        this._backdrop = this.shadowRoot.querySelector('.backdrop')
        this._modal = this.shadowRoot.querySelector('.modal')
        this._confirmButton = this.shadowRoot.querySelector('#confirm')
        this._cancelButton = this.shadowRoot.querySelector('#cancel')

        this._modal.addEventListener('keydown', this._closeOnEsc.bind(this))
        this._modal.addEventListener('click', this._modalClick.bind(this))
        this._backdrop.addEventListener('click', this._cancel.bind(this))
        this._confirmButton.addEventListener('click', this._confirm.bind(this))
        this._cancelButton.addEventListener('click', this._cancel.bind(this))

        // Listening slot changes
        // const slots = this.shadowRoot.querySelectorAll('slot')
        // slots[1].addEventListener('slotchange', (event) => {
        //     console.dir(slots[1].assignedNodes()[0].childNodes[1].textContent)
        // })
    }

    open() {
        this.setAttribute(props.opened, '')
        this._modal.focus()
    }

    close() {
        this._isOpen = false
        this.removeAttribute(props.opened)
    }

    _modalClick(event) {
        event.stopPropagation()
    }

    _closeOnEsc(event) {
        event.key === 'Escape' && this.close()
    }

    _cancel(event) {
        this.close()

        // This is a way to dispath an event from root element to external
        // this.dispatchEvent(new Event('cancel'))

        // This is a way to dispatch an event from an internal element of shadow dom to external
        event.target.dispatchEvent(new Event('cancel', { bubbles: true, composed: true }))
    }

    _confirm() {
        this.close()

        // This is a way to dispath an event from root element to external
        this.dispatchEvent(new Event('confirm'))
    }

    connectedCallback() {
        this._isOpen = this.hasAttribute(props.opened)
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return

        if (name === props.opened) {
            this._isOpen = this.hasAttribute(props.opened)           
        }
    }

    static get observedAttributes() {
        return [props.opened]
    }

    disconnectedCallback() {
        this._modal.removeEventListener('keydown', this._closeOnEsc)
        this._modal.removeEventListener('click', this._modalClick)
        this._backdrop.removeEventListener('click', this._cancel)
        this._confirmButton.removeEventListener('click', this._confirm)
        this._cancelButton.removeEventListener('click', this._cancel)
    }

    _init() {
        this.attachShadow({ mode: 'open' })

        this.shadowRoot.innerHTML = `
            ${this._getStylesTemplate()}
            ${this._getModalTemplate()}
        `
    }

    _getStylesTemplate() {
        return `
            <style>
                :host([opened]) .backdrop {
                    opacity: 1;
                    pointer-events: all;
                }

                :host([opened]) .modal {
                    top: 0;
                    opacity: 1;
                    pointer-events: all;
                }

                .backdrop {
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    position: fixed;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    background-color: rgba(0,0,0,0.4);
                    z-index: 10;
                    opacity: 0;
                    pointer-events: none;
                    transition: all 0.5s ease-in-out;
                }
                .modal {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;

                    outline: none;
                    border-radius: 0.5rem;
                    background-color: #fff;
                    box-shadow: 2px 4px 8px rgba(0,0,0,0.4);
                    min-width: 25rem;
                    z-index: 100;
                    position: relative;
                    top: -150px;
                    opacity: 0;
                    pointer-events: none;                    
                    transition: all 0.5s ease-in-out;
                }
                .opened {
                    opacity: 1;
                    pointer-events: all;
                }
                header {
                    padding: 1rem;
                    border-bottom: 1px solid lightgray;
                }

                ::slotted(h1), header h1 {
                    font-size: 1.25rem;
                    margin: 0;
                }

                .content {
                    padding: 1rem;
                }

                .actions {
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    gap: 0.5rem;

                    border-top: 1px solid lightgray;
                    padding: 1rem;
                }
                button {
                    padding: 0.5rem 1rem;
                    border: 0;
                    border-radius: 0.25rem;
                    font-size: 1rem;
                    font-weight: 600;
                    color: #333;
                    cursor: pointer;
                }
                #confirm {
                    background-color: #050;
                    color: #fff;
                }
                #confirm:hover {
                    background-color: #070;
                }
                #confirm:active {
                    background-color: #090;
                }
                #cancel {
                    background-color: #511;
                    color: #fff;
                }
                #cancel:hover {
                    background-color: #711;
                }
                #cancel:active {
                    background-color: #911;
                }
            </style>
        `
    }

    _getModalTemplate() {
        return `
            <div class="backdrop" tabindex="0">
                <div class="modal" tabindex="1">
                    <header>
                        <slot name="title">
                            <h1>Please Confirm!</h1>
                        </slot>
                    </header>
                    
                    <section class="content">
                        <slot name="content">
                            <p>Put your content here</p>
                        </slot>
                    </section>

                    <footer>
                        <slot name="actions">
                            <div class="actions">
                                <button type="button" id="cancel">Cancel</button>
                                <button type="button" id="confirm">Confirm</button>
                            </div>
                        </slot>
                    </footer>
                </div>
            </div>
        `
    }
}

customElements.define('rar-modal', Modal)