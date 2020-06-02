import * as contants from './contants';
import { fromJS } from 'immutable';
import axios from 'axios';

const changeList = (data) => ({
  type: contants.CHANGE_LIST,
  data:fromJS(data),
  totalPage:Math.ceil(data.length/5)
})

export const changePage = (page) =>({
  type:contants.CHANGE_PAGE,
  page
})

export const mouseEnter = () =>({
  type:contants.MOUSE_ENTER
})

export const mouseLeave = () =>({
  type:contants.MOUSE_LEAVE
})

export const searchFocue = () => ({
  type:contants.SEARCH_FOCUS
});
export const searchBlur = () => ({
  type:contants.SEARCH_BLUR
});

export const getList = () =>{
  return(dispatch) =>{
    axios.get('/api/app.json').then((res)=>{
      dispatch(changeList(res.data.data))
    })
  }
}
