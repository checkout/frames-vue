import { mount } from "@vue/test-utils";
import ExpiryDate from "@/lib-components/ExpiryDate.vue";

describe("ExpiryDate.vue", () => {
  it("renders expiry date placeholder with injected class name", () => {
    const WrapperComp = {
      template: `
      <div>
        <ExpiryDate :class="test" />
      </div>
      `,
      components: {
        ExpiryDate,
      },
      data() {
        return {
          test: "example",
        };
      },
    };

    const wrapper = mount(WrapperComp).findComponent(ExpiryDate);
    expect(wrapper.html()).toBe(
      `<div class="expiry-date-frame example"></div>`
    );
    expect(wrapper.classes()).toContain("expiry-date-frame");
    expect(wrapper.classes()).toContain("example");
  });
});
