import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import {auth} from '../_actions/user_action'

export default function(SpecificComponent, option, adminRoute=null){
    // option에 따라
    // null => 아무나 출입 가능 페이지
    // true => 로그인 유저만 출입가능 페이지
    // false => 로그인 유저는 출입 불가능 페이지
    function AuthenticationCheck(props){
        const dispatch=useDispatch();
        useEffect(()=>{
            dispatch(auth())
            .then(res=>{
                console.log(res);
            })
        }, [])
        return (
            <SpecificComponent/>
        )
    }

    return AuthenticationCheck
}