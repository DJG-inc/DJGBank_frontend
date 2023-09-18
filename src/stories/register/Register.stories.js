import { Register } from "./Register";

export default {
  title: "Components/Register",
  component: Register,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
};

export const Template = {
  args: {
    text: "Start your financial life with DJG",
  },
};
