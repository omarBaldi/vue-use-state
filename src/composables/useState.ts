import { Ref, shallowRef } from 'vue';

function isStateFunction<T>(s: T | ((prevValue: T) => T)): s is (prevValue: T) => T {
  return typeof s === 'function';
}

export const useState = <T>(state: T) => {
  const value = shallowRef<T>(state);

  const updateValue = (updatedValue: T | ((prevValue: T) => T)) => {
    if (isStateFunction(updatedValue)) {
      value.value = (updatedValue as (prevValue: T) => T)(value.value);
    } else {
      value.value = updatedValue;
    }
  };

  return [value as Readonly<Ref<T>>, updateValue] as const;
};
