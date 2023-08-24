import { Ref, shallowRef } from 'vue';

type CallbackStateFunction<T> = (prevValue: T) => T;

function isStateFunction<T>(
  s: T | CallbackStateFunction<T>
): s is CallbackStateFunction<T> {
  return typeof s === 'function';
}

export const useState = <T>(state: T) => {
  const value = shallowRef<T>(state);

  const updateValue = (updatedValue: T | CallbackStateFunction<T>) => {
    if (isStateFunction(updatedValue)) {
      value.value = (updatedValue as (prevValue: T) => T)(value.value);
    } else {
      value.value = updatedValue;
    }
  };

  return [value as Readonly<Ref<T>>, updateValue] as const;
};
