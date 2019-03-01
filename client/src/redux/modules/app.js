const initialState = {
  requestQuantity: 0 // 当前应用中正在进行的API请求数
};
  
// action types
export const types = {
  START_REQUEST: "APP/START_REQUEST",   // 开始发送请求
  FINISH_REQUEST: "APP/FINISH_REQUEST" // 请求结束
};
  
// action creators
export const actions = {
  startRequest: () => ({
    type: types.START_REQUEST
  }),
  finishRequest: () => ({
    type: types.FINISH_REQUEST
  })
};  
  
// reducers
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.START_REQUEST:
      // 每接收一个API请求开始的action，requestQuantity加1
      return { ...state, requestQuantity: state.requestQuantity + 1 };
    case types.FINISH_REQUEST:
      // 每接收一个API请求结束的action，requestQuantity减1
      return { ...state, requestQuantity: state.requestQuantity - 1 };
    default:
      return state;
  }
};

export default reducer;

// selectors

export const getRequestQuantity = state => {
  return state.app.requestQuantity;
};
  