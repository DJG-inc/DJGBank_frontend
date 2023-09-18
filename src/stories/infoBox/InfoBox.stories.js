import { InfoBox } from './InfoBox';

export default {
    title: "Components/InfoBox",
    component: InfoBox,
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
        title: "Bank easy, bank DJG",
        message: "A client-centered bank offering comprehensive financial solutions for all your monetary goals.",
    },
}
