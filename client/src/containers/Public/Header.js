import React, { useCallback, useEffect, useState } from 'react';
import { Button } from '../../components';
import logo from '../../asests/logowithoutbg.png';
import icons from '../../ultils/icons';
import { Link, useNavigate } from 'react-router-dom';
import { path } from '../../ultils/constants';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions';
import avatardefault from '../../asests/avatar_default.png';
import menuManage from '../../ultils/menuManage';

const { BsBell, FiSearch, AiOutlineLogout } = icons;

const Header = (props) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { userCurentProfile } = useSelector(state => state.user)
    const { isLoggedIn } = useSelector(state => state.auth);
    const [isShowMenu, setIsShowMenu] = useState(false)
    const goLogin = useCallback((flag) => {
        navigate(path.LOGIN, { state: { flag } })
    }, [navigate])

    return (
        <div className='w-full p-2 flex items-center justify-between bg-primary'>
            <Link to={"/"} >
                <img src={logo} alt='logo' className='w-[140px] h-70 object-fit'></img>
            </Link>

            <form className="flex items-center max-w-sm mx-auto">
                <label htmlFor="simple-search" className="sr-only">Search</label>
                <div className="relative w-full">
                    <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." required />
                </div>
                <button type="submit" className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <FiSearch />
                    <span className="sr-only">Search</span>
                </button>
            </form>

            {
                isLoggedIn ?
                    <>
                        <div className='flex justify-center items-center gap-5'>
                            <Link
                                to={'/he-thong/thong-bao'}
                                className='cursor-pointer'  
                            >
                                <BsBell />
                            </Link>
                            <div className='flex'>
                                <img
                                    src={userCurentProfile.avatar || avatardefault}
                                    alt='avatar'
                                    className='w-10 object-cover rounded-full h-10 border-2 shadow-md border-white bg-gray-500 cursor-pointer '
                                    onClick={() => setIsShowMenu(!isShowMenu)}
                                ></img>

                                {isShowMenu && <div className='absolute  min-w-200 bg-white top-14 shadow-md rounded-md p-4 right-0 flex flex-col'>
                                    {
                                        menuManage.map((item, _) => {
                                            return (
                                                <Link
                                                    className='hover:text-orange-500 flex items-center gap-2 text-blue-600 border-b border-gray-200 py-2'
                                                    key={item.id}
                                                    to={item.path}
                                                >
                                                    {item.icon}
                                                    {item.text}
                                                </Link>
                                            )
                                        })
                                    }
                                    <div
                                        className='hover:text-orange-500 cursor-pointer flex items-center gap-2 text-blue-600 border-gray-200 py-2'
                                        onClick={() => {
                                            setIsShowMenu(false)
                                            dispatch(actions.logout())
                                        }}
                                    >
                                        <AiOutlineLogout />
                                        <div>Đăng xuất</div>
                                    </div>
                                </div>}
                            </div>
                        </div>
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