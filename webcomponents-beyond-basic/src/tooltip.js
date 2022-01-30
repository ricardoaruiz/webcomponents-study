class Tooltip extends HTMLElement {
    
    constructor() {
        super()

        // Add template to Shadow DOM
        this._addTemplateToShadowDOM()
        
        // Props
        this._tooltipText = undefined
        this._tooltipIcon = this.shadowRoot.querySelector('span')
        this._tooltipContainer = this.shadowRoot.querySelector('.tooltip_container')
    }
    
    /**
     * Lifecycle Webcomponents Method
     * This method is called when the component is mounted
     * The best method to initialize listeners, get attributes from light DOM and etc
     */
    connectedCallback() {
        this._tooltipText = this.getAttribute('text') || 'Default tooltip text'
        this._tooltipContainer.textContent = this._tooltipText

        this._tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this))
        this._tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this))
    }

    /**
     * Lifecycle Webcomponents Method
     * This method is called when component is removed from DOM
     * The best method to remove listeners from component
     */
     disconnectedCallback() {
        this._tooltipIcon.removeEventListener('mouseenter', this._showTooltip)
        this._tooltipIcon.removeEventListener('mouseleave', this._hideTooltip)
    }

    /**
     * Lifecycle Webcomponents Method
     * This method is called when an attribute is changed, but we want return the name
     * of attributes on array at 'observedAttributes' static method below
     * @param {*} name 
     * @param {*} oldValue 
     * @param {*} newValue 
     */
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) {
            return
        }
        if (name === 'text') {
            this._tooltipText = newValue
            this._tooltipContainer.textContent = this._tooltipText
        }
    }

    /**
     * Needed to Lifecycle Webcomponents Method "attributeChangedCallback"
     * This method indicate what attributes are listening by changes
     * Thie method return an array with all attributes we want to listen changes
     */
    static get observedAttributes() {
        return ['text']
    }

    /**
     * 
     */
    _showTooltip() {
        this._tooltipContainer.classList.add('tooltip_container--show')
    }

    /**
     * 
     */
    _hideTooltip() {
        this._tooltipContainer.classList.remove('tooltip_container--show')
    }

    /**
     * 
     */
    _addTemplateToShadowDOM() {
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.innerHTML = `
            ${this._getStyles()}
            ${this._getHTML()}
        `
    }

    /**
     * 
     * @returns styles
     */
    _getStyles() {
        return `
            <style>
                :host {
                    font-size: 1.2rem;
                    background-color: var(--color-secondary, #ccc);
                    font-family: var(--font-family, 'Courier New', Courier, monospace)
                }
                :host(.tooltip) {
                    color: #fff;
                }
                :host-context(p) {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color:red;
                }
                ::slotted(*) {
                    font-weight: 700;
                }
                
                .tooltip_icon {
                    position: relative;
                    cursor: pointer;
                    background-color: var(--color-primary, #333);
                    color: white;
                    text-align: center;
                    border-radius: 50%;
                    display: inline-block;
                    width: 24px;
                    height: 24px;
                }

                .tooltip_container {
                    background-color: var(--color-primary, #333);
                    top: 1.6rem;
                    left: 0.5rem;
                    color: white;
                    position: absolute;
                    z-index: 10;
                    padding: 1rem;
                    border-radius: 0.5rem;
                    font-size: 1rem;
                    box-shadow: 1px 1px 6px rgba(0,0,0,0.26);
                    display: none;
                    text-align: left;
                }
                .tooltip_container--show {
                    display: block;
                }
            </style>
        `
    }

    /**
     * 
     * @returns HTML
     */
    _getHTML() {
        return `
            <slot>
                Some default
            </slot>

            <span class="tooltip_icon">?
                <div class="tooltip_container"></div>
            </span>       
        `
    }
}

/**
 * Registering a WebComponent with tag 'rar-tooltip'
 */
customElements.define(
    'rar-tooltip', 
    Tooltip
)