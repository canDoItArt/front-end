let showModalFn;

export const setShowModalFunction = (fn) => {
  showModalFn = fn;
};

export const showModal = () => {
  if (showModalFn) {
    showModalFn();
  } else {
    console.warn("showModalFn is not set");
  }
};
