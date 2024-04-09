import React, { useCallback } from 'react';
import { Button } from '../../components';
import logo from '../../asests/logowithoutbg.png';
import icons from '../../ultils/icons';
import { Link, useNavigate } from 'react-router-dom';
import { path } from '../../ultils/constants';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions';

const { AiFillFacebook } = icons;

const Header = (props) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isLoggedIn } = useSelector(state => state.auth);

    const goLogin = useCallback((flag) => {
        navigate(path.LOGIN, { state: { flag } })
    }, [navigate])


    return (
        <div className='w-full p-2 flex items-center justify-between bg-primary'>
            <Link to={""} >
                <img src={logo} alt='logo' className='w-[140px] h-70 object-fit'></img>
            </Link>

            {
                isLoggedIn ?
                    <>
                        <Button
                            text={"Đăng xuất"}
                            textcolor={'text-white'}
                            bgcolor={'bg-secondary1'}
                            onClick={() => dispatch(actions.logout())}
                        />
                    </>
                    :
                    <>
                        <div className='flex items-center gap-2'>
                            <Button
                                text={"Đăng nhập"}
                                textcolor={'text-white'}
                                bgcolor={'bg-secondary1'}
                                onClick={() => goLogin(false)}
                            />
                            <Button
                                text={"Đăng ký"}
                                textcolor={'text-white'}
                                bgcolor={'bg-secondary1'}
                                onClick={() => goLogin(true)}
                            />
                        </div>
                    </>
            }


        </div>
    );
}

export default Header;