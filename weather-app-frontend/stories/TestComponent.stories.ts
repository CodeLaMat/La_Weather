import type { Meta, StoryObj } from "@storybook/react";
import { TestComponent } from "./TestComponent";

const meta: Meta<typeof TestComponent> = {
  component: TestComponent,
};

export default meta;
type Story = StoryObj<typeof TestComponent>;

export const TestFigma: Story = {
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/rskfK3xl9MY6F3zdvg7Bu2/Weather-Forecast-Dashboard-(Community)?node-id=0%3A1",
    },
  },
};
