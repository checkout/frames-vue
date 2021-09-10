import { mount } from "@vue/test-utils";
import CardNumber from "@/lib-components/CardNumber.vue";

describe("CardNumber.vue", () => {
  it("renders the card number placeholder with injected class name", () => {
    const WrapperComp = {
      template: `
      <div>
        <CardNumber :class="test" />
      </div>
      `,
      components: {
        CardNumber,
      },
      data() {
        return {
          test: "example",
        };
      },
    };

    const wrapper = mount(WrapperComp).findComponent(CardNumber);
    expect(wrapper.html()).toBe(
      `<div class="card-number-frame example"></div>`
    );
    expect(wrapper.classes()).toContain("card-number-frame");
    expect(wrapper.classes()).toContain("example");
  });
});
