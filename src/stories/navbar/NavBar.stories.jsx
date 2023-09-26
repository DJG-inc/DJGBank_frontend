// stories/Navbar.stories.js
import { NavBar } from "./NavBar";
 
export default {
  title: "Components/Navbar",
  component: NavBar,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

export const Template = {
  args: {
    routes: [
      { url: "/home", label: "Home" },  
      { url: "/servies", label: "Servies" },
      { url: "/features", label: "Features" },
      { url: "/about_us", label: "About Us" },
    ],
  },
};
