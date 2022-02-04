// export const localStorageMock = () => {
//   let store = {};

//   return {
//     getItem: ((key) => store[key] || null),
//     setItem: ((key, value) => {
//       store[key] = value.toString();
//       return null;
//     }),
//     removeItem: ((key) => delete store[key]),
//     clear: (() => {
//       store = {};
//       return null;
//     }),
//   };
// };

// export function saveToStorage(key, value) {
//   window.localStorage.setItem([key], value);
// }
