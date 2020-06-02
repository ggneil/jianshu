import React, {Component} from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { actionCreators } from './store';

import {HeaderWrapper, Logo, Nav, NavItem, NavSearch, Addition,Button,SearchWrapper, SearchInfo, SearchInfoTitle,
  SearchInfoSwitch,SearchInfoItem,SearchInfoList
} from './style'


class Header extends Component{

  getListArea(){
    const { focused,list,page,mouseIn,totalPage,handleMouseEnter, handleMouseLeave,handleChangePage} = this.props;
    const jsList = list.toJS();
    const pageList = []
    if(jsList.length){
      for (let i = (page-1) * 5; i <page*5; i++) {
        pageList.push(
          <SearchInfoItem key={jsList[i]}>{jsList[i]}</SearchInfoItem>
        )
      }
    }
    if (focused || mouseIn) {
      return (
        <SearchInfo onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <SearchInfoTitle>
            热门搜索
            <SearchInfoSwitch onClick={()=>handleChangePage(page,totalPage)}>换一批</SearchInfoSwitch>
          </SearchInfoTitle>
          <SearchInfoList>
            {pageList}
          </SearchInfoList>
        </SearchInfo>
      )
    }else {
      return null
    }
  }
  render() {
    const {focused, handleInputFocus, handleInputBlur} = this.props;
    return(
    <HeaderWrapper>
      <Logo/>
      <Nav>
        <NavItem className='left active'>首页</NavItem>
        <NavItem className='left'>下载APP</NavItem>
        <NavItem className='right'>登录</NavItem>
        <NavItem className='right'>
          <i className='iconfont'>&#xe655;</i>
        </NavItem>
        <SearchWrapper>
          <CSSTransition timeout={200} in={focused} classNames='slide'>
            <NavSearch className={focused ? 'focused' : ''} onFocus={handleInputFocus} onBlur={handleInputBlur}></NavSearch>
          </CSSTransition>
          <i className={focused ? 'focused iconfont' : 'iconfont'}>&#xe660;</i>
          {this.getListArea(focused)}
        </SearchWrapper>
      </Nav>
      <Addition>
        <Button className='writing'><i className='iconfont'>&#xe600;</i>写文章</Button>
        <Button className='reg'>注册</Button>
      </Addition>
    </HeaderWrapper>
    )
  }
}

// const getListArea = (show) => {
//   if (show) {
//     return (
//       <SearchInfo>
//         <SearchInfoTitle>
//           热门搜索
//           <SearchInfoSwitch>换一批</SearchInfoSwitch>
//         </SearchInfoTitle>
//         <SearchInfoList>
//           <SearchInfoItem>教育</SearchInfoItem>
//           <SearchInfoItem>教育</SearchInfoItem>
//           <SearchInfoItem>教育</SearchInfoItem>
//           <SearchInfoItem>教育</SearchInfoItem>
//           <SearchInfoItem>教育</SearchInfoItem>
//           <SearchInfoItem>教育</SearchInfoItem>
//         </SearchInfoList>
//       </SearchInfo>
//     )
//   }
// }


// const Header = (props) => {
//   return(
//     <HeaderWrapper>
//       <Logo/>
//       <Nav>
//         <NavItem className='left active'>首页</NavItem>
//         <NavItem className='left'>下载APP</NavItem>
//         <NavItem className='right'>登录</NavItem>
//         <NavItem className='right'>
//           <i className='iconfont'>&#xe655;</i>
//         </NavItem>
//         <SearchWrapper>
//           <CSSTransition timeout={200} in={props.focused} classNames='slide'>
//             <NavSearch className={props.focused ? 'focused' : ''} onFocus={props.handleInputFocus} onBlur={props.handleInputBlur}></NavSearch>
//           </CSSTransition>
//           <i className={props.focused ? 'focused iconfont' : 'iconfont'}>&#xe660;</i>
//           {getListArea(props.focused)}
//         </SearchWrapper>
//       </Nav>
//       <Addition>
//         <Button className='writing'><i className='iconfont'>&#xe600;</i>写文章</Button>
//         <Button className='reg'>注册</Button>
//       </Addition>
//     </HeaderWrapper>
//   )
//
// }

const mapStateToProps = (state) =>{
  return {
    focused:state.getIn(['header','focused']),
    list:state.getIn(['header','list']),
    page:state.getIn(['header','page']),
    totalPage:state.getIn(['header','totalPage']),
    mouseIn:state.getIn(['header','mouseIn']),
  }
}
const mapDispatchToProps = (dispatch) =>{
  return{
    handleInputFocus(){
      dispatch(actionCreators.getList());
      dispatch(actionCreators.searchFocue());
    },
    handleInputBlur(){
      dispatch(actionCreators.searchBlur());
    },
    handleMouseEnter(){
      dispatch(actionCreators.mouseEnter())
    },
    handleMouseLeave(){
      dispatch(actionCreators.mouseLeave())
    },
    handleChangePage(page,handleChangePage){
      if (page<handleChangePage){
        page+=1
      }else {
        page = 1
      }
      dispatch(actionCreators.changePage(page))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);
