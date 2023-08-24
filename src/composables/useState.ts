import { shallowRef } from 'vue';

export const useState = <T>(initialValue: T) => {
  const value = shallowRef<T>(initialValue);

  const updateValue = (updatedValue: T) => {
    value.value = updatedValue;
  };

  return [value, updateValue] as const;
};
