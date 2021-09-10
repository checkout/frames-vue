<template>
  <div class="frames">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    config: {
      type: Object,
      default: () => ({}),
      required: true,
    },
    init: Function,
    isCardValid: Function,
    submitCard: Function,
    enableSubmitForm: Function,
    addEventHandler: Function,
    removeEventHandler: Function,
    removeAllEventHandlers: Function,
  },
  methods: {
    initializeFrames: function () {
      let config = {
        publicKey: this.config.publicKey,
        debug: this.config.debug,
        style: this.config.style
          ? JSON.parse(JSON.stringify(this.config.style))
          : undefined,
        cardholder: this.config.cardholder
          ? JSON.parse(JSON.stringify(this.config.cardholder))
          : undefined,
        localization: this.config.localization
          ? JSON.parse(JSON.stringify(this.config.localization))
          : undefined,
        ready: () => {
          this.$emit("ready");
        },
        frameActivated: (e) => {
          this.$emit("frameActivated", e);
        },
        frameFocus: (e) => {
          this.$emit("frameFocus", e);
        },
        frameBlur: (e) => {
          this.$emit("frameBlur", e);
        },
        frameValidationChanged: (e) => {
          this.$emit("frameValidationChanged", e);
        },
        paymentMethodChanged: (e) => {
          this.$emit("paymentMethodChanged", e);
        },
        cardValidationChanged: () => {
          this.$emit("cardValidationChanged");
        },
        cardSubmitted: () => {
          this.$emit("cardSubmitted");
        },
        cardTokenized: (e) => {
          this.$emit("cardTokenized", e);
        },
        cardTokenizationFailed: (e) => {
          this.$emit("cardTokenizationFailed", e);
        },
      };

      // Frames throws an error if the cardholder object is mentioned but not defined
      // To avoid this we remove the property completely if not set as a prop.
      if (!this.config.cardholder) {
        delete config.cardholder;
      }

      // Frames throws an error if the localization object is mentioned but not defined
      // To avoid this we remove the property completely if not set as a prop.
      if (!this.config.localization) {
        delete this.config.localization;
      }

      if (window.Frames) {
        window.Frames.init(config);
      } else {
        console.error(
          `Frames was used before the script (from the CDN) was loaded completely`
        );
      }
    },
    clearEventHandlers: function () {
      // Remove event handlers to avoid event duplication
      window.Frames.removeAllEventHandlers(window.Frames.Events.CARD_SUBMITTED);
      window.Frames.removeAllEventHandlers(window.Frames.Events.CARD_TOKENIZATION_FAILED);
      window.Frames.removeAllEventHandlers(window.Frames.Events.CARD_TOKENIZED);
      window.Frames.removeAllEventHandlers(window.Frames.Events.CARD_VALIDATION_CHANGED);
      window.Frames.removeAllEventHandlers(window.Frames.Events.FRAME_ACTIVATED);
      window.Frames.removeAllEventHandlers(window.Frames.Events.FRAME_BLUR);
      window.Frames.removeAllEventHandlers(window.Frames.Events.FRAME_FOCUS);
      window.Frames.removeAllEventHandlers(window.Frames.Events.FRAME_VALIDATION_CHANGED);
      window.Frames.removeAllEventHandlers(window.Frames.Events.PAYMENT_METHOD_CHANGED);
      window.Frames.removeAllEventHandlers(window.Frames.Events.READY);
    },
  },
  mounted() {
    const existingScript = document.querySelector(
      `script[src$="https://cdn.checkout.com/js/framesv2.min.js"]`
    );
    if (!existingScript) {
      console.error(
        `Checkout.com CDN script not found. Perhaps you forgot to add the CDN script to your index.html file.`
      );
    } else {
      this.initializeFrames();
    }
  },
  beforeDestroy() {
    if (window.Frames) {
      this.clearEventHandlers();
    }
  },
  /* Initialize or reinitialize Frames */
  init: function (config) {
    this.clearEventHandlers();
    config ? window.Frames.init(config) : window.Frames.init();
  },
  /* Returns the state of the card form validation */
  isCardValid: function () {
    return window.Frames.isCardValid();
  },
  /* Submits the card form if all form values are valid */
  submitCard: function () {
    window.Frames.submitCard();
  },
  /* Retains the entered card details and allows you to resubmit the payment form */
  enableSubmitForm: function () {
    window.Frames.enableSubmitForm();
  },
  /* Adds a handler that is called when the specified event is triggered */
  addEventHandler: function (event, handler) {
    window.Frames.addEventHandler(event, handler);
  },
  /* Removes a previously added handler from an event by providing the event name and handler as arguments in the method */
  removeEventHandler: function (event, handler) {
    window.Frames.removeEventHandler(event, handler);
  },
  /* Removes all handlers added to the event specified */
  removeAllEventHandlers: function (event) {
    window.Frames.removeAllEventHandlers(event);
  },
  /* Allows you to set the Frames cardholder details after initialization */
  setCardholder: function (cardholder) {
    let ch = JSON.parse(JSON.stringify(cardholder));
    window.Frames.cardholder = ch;
  },
};
</script>
