import { mount } from "@vue/test-utils";
import Frames from "@/lib-components/Frames.vue";
import CardNumber from "@/lib-components/CardNumber.vue";
import ExpiryDate from "@/lib-components/ExpiryDate.vue";
import Cvv from "@/lib-components/Cvv.vue";

describe("Frames.vue", () => {
  it("throws error when the CDN is not included", () => {
    const WrapperComp = {
      template: `
      <div>
        <Frames :config="config"/>
        <CardNumber />
        <div class="date-and-code">
          <ExpiryDate />
          <Cvv />
        </div>
      </div>
      `,
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
            publicKey: "pk_test_7d8d24fc-ffdb-4efc-b945-a19847ce319a",
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
    };

    jest.spyOn(console, "error");
    const wrapper = mount(WrapperComp).findComponent(Frames);
    expect(wrapper.html()).toBe(`<div class="frames"></div>`);
    expect(console.error).toBeCalledTimes(1);
    expect(console.error).toHaveBeenLastCalledWith(
      "Checkout.com CDN script not found. Perhaps you forgot to add the CDN script to your index.html file."
    );
  });
});
