const getURLParams = (key) => {
  const sp = new URLSearchParams(window.location.search);
  return sp.get(key);
};

const setURLParams = (obj) => {
  const sp = new URLSearchParams(window.location.search);
  for (const [key, value] of Object.entries(obj)) {
    sp.set(key, value as string);
  }
  return sp;
};

export { getURLParams, setURLParams };
