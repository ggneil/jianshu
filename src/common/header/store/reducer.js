import * as contants from './contants';
import { fromJS } from 'immutable';

const defaultState = fromJS({
  focused:false,
  mouseIn:false,
  list:[],
  page:1,
  totalPage:1
});

export default (state = defaultState,action) => {
  switch (action.type) {
    case contants.SEARCH_FOCUS:
      return state.set('focused',true);
    case contants.SEARCH_BLUR:
      return state.set('focused',false);
    case contants.CHANGE_LIST:
      return state.merge({
        list:action.data,
        totalPage:action.totalPage
      })
      // state.set('list',action.data).set('totalPage',action.totalPage);
    case contants.MOUSE_ENTER:
      return state.set('mouseIn',true);
    case contants.MOUSE_LEAVE:
      return state.set('mouseIn',false);
    case contants.CHANGE_PAGE:
      return state.set('page',action.page);
    default:
      return state;
  }
  // if(action.type === contants.SEARCH_FOCUS){
  //   return state.set('focused',true)
  // }
  // if(action.type === contants.SEARCH_BLUR){
  //   return state.set('focused',false)
  // }
  // if(action.type === contants.CHANGE_LIST){
  //   return state.set('list',action.data);
  // }
  return state;
}
