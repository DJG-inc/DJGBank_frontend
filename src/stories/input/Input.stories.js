import { Input } from './Input'; // Asegúrate de tener la ruta correcta al componente Input en tu proyecto

export default {
  title: 'Components/Input',
  component: Input,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

export const TextInput = {
    arg: {
        type: 'text',
        placeholder: 'Write something',
    },
}

export const NumberInput = {
    arg: {
        type: 'number',
        placeholder: 'Write a number',
    },
}

export const PasswordInput = {
    arg: {
        type: 'password',
        placeholder: 'Write a password',
    },
}

export const EmailInput = {
    arg: {
        type: 'email',
        placeholder: 'Write an email',
    },
}

export const DateInput = {
    arg: {
        type: 'date',
        placeholder: 'Choose a date',
    },
}