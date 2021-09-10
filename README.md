❗️BETA

This project is a minimal Vue wrapper of [Checkout.com Frames](https://docs.checkout.com/integrate/frames). This version only supports the [multiple iframes](https://docs.checkout.com/integrate/frames/frames-customization-guide#Framescustomizationguide-Multipleiframes) configuration.

# :rocket: Install

```bash
npm install frames-vue
```

# :globe_with_meridians: Load the CDN script

Make sure that you load the Checkout&#46;com CDN script before you mount any Frames components. You can add this, for example, in your _index.html_ file.

```html
<script src="https://cdn.checkout.com/js/framesv2.min.js"></script>
```

If you use server-side rendering, such as with _Nuxt.js_, you can add this inside your `head` object `script` array:

```js
head: {
    script: [
      {
        src: "https://cdn.checkout.com/js/framesv2.min.js",
      },
    ],
  }
```

# :sparkles: Import the components

```js
import { Frames, CardNumber, ExpiryDate, Cvv } from "frames-vue";
```

# :book: Example Usage

To tokenize the payment card, this wrapper includes method `submitCard()`. In the below example, we call this when the "Pay Now" button is clicked.

```js
<template>
  <div id="payment-form">
    <Frames
      :config="config"
      @ready="ready"
      @frameFocus="frameFocus"
      @cardTokenized="cardTokenized"
    />
    <CardNumber />
    <ExpiryDate />
    <Cvv />
    <button id="pay-button" @click="submitCard">Pay Now</button>
  </div>
</template>

<script>
import { Frames, CardNumber, ExpiryDate, Cvv } from "frames-vue";

export default {
  name: "App",
  components: {
    Frames,
    CardNumber,
    ExpiryDate,
    Cvv,
  },
  data() {
    return {
      config: {
        debug: true,
        publicKey: "pk_test_42e79f8e-28ad-4eed-8586-2764b1cc78e2",
        localization: {
          cardNumberPlaceholder: "Card number",
          expiryMonthPlaceholder: "MM",
          expiryYearPlaceholder: "YY",
          cvvPlaceholder: "CVV",
        },
        style: {
          base: {
            fontSize: "17px",
          },
        },
      },
    };
  },
  methods: {
    cardTokenized(e) { console.log(`Card token: ${e.token}`) },
    ready(e) { console.log("ready", e) },
    frameFocus(e) { console.log("frameFocus", e) },
    submitCard() { Frames.submitCard() },
  },
};
</script>
```

# :credit_card: Cardholder

For cases where you render the payment form at the same time as the billing and cardholder name input, you can use method `setCardholder()` to update Frames with this data before submitting.

```js
<template>
...
<input
  id="cardholder-name"
  placeholder="Cardholder Name"
  v-model="config.cardholder.name"
/>
<input
  id="cardholder-phone"
  placeholder="Phone Number"
  v-model="config.cardholder.phone"
/>
<input
  id="cardholder-address-one"
  placeholder="Address 1"
  v-model="config.cardholder.billingAddress.addressLine1"
/>
...
<Frames :config="config" />
...
</template>

<script>
...
  data() {
    return {
      config: {
        cardholder: {
          name: "",
          billingAddress: {
            addressLine1: "",
            addressLine2: "",
            zip: "",
            city: "",
            state: "",
            country: "GB"
          },
          phone: "",
        },
        ...
      },
    };
  },
  methods: {
    submitCard() {
      Frames.setCardholder(this.config.cardholder);
      Frames.submitCard();
    },
  },
  ...
</script>
```

## Props

| prop                   | description                                                                                                                                              |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| config                 | The config is an object following [Checkout.com Frames reference](https://docs.checkout.com/integrate/frames/frames-reference#Framesreference-Configurationoptions). |
| ready                  | Triggered when Frames is registered on the global namespace and safe to use.                                                                             |
| frameActivated         | Triggered when the form is rendered.                                                                                                                     |
| frameFocus             | Triggered when an input field receives focus. Use it to check the validation status and apply the wanted UI changes.                                     |
| frameBlur              | Triggered after an input field loses focus. Use it to check the validation status and apply the wanted UI changes.                                       |
| frameValidationChanged | Triggered when a field's validation status has changed. Use it to show error messages or update the UI.                                                  |
| paymentMethodChanged   | Triggered when a valid payment method is detected based on the card number being entered. Use this event to change the card icon.                        |
| cardValidationChanged  | Triggered when the state of the card validation changes.                                                                                                 |
| cardSubmitted          | Triggered when the card form has been submitted.                                                                                                         |
| cardTokenized          | Triggered after a card is tokenized.                                                                                                                     |
| cardTokenizationFailed | Triggered if the card tokenization fails.                                                                                                                |

## Functions

| function               | description                                                                                                          |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------- |
| init                   | Initializes (or re-initializes) Frames.                                                                              |
| isCardValid            | Returns the state of the card form validation.                                                                       |
| submitCard             | Submits the card form if all form values are valid.                                                                  |
| addEventHandler        | Adds a handler that is called when the specified event is triggered.                                                 |
| removeEventHandler     | Removes a previously added handler from an event by providing the event name and handler as arguments in the method. |
| removeAllEventHandlers | Removes all handlers added to the event specified.                                                                   |
| enableSubmitForm       | Retains the entered card details and allows you to resubmit the payment form.                                        |