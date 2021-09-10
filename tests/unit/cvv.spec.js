import { mount } from "@vue/test-utils";
import Cvv from "@/lib-components/Cvv.vue";

describe("Cvv.vue", () => {
  it("renders expiry date placeholder with injected class name", () => {
    const WrapperComp = {
      template: `
      <div>
        <Cvv :class="test" />
      </div>
      `,
      components: {
        Cvv,
      },
      data() {
        return {
          test: "example",
        };
      },
    };

    const wrapper = mount(WrapperComp).findComponent(Cvv);
    expect(wrapper.html()).toBe(`<div class="cvv-frame example"></div>`);
    expect(wrapper.classes()).toContain("cvv-frame");
    expect(wrapper.classes()).toContain("example");
  });
});
