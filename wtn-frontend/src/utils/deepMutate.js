const deepMutate = (baseState, callback) => {
  const draftState = JSON.parse(JSON.stringify(baseState));
  callback(draftState);
  return draftState;
};

export default deepMutate;
