import React, { useEffect } from 'react';
import { Form, Button } from 'react-bootstrap'
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { message } from 'antd';

import { LoginService } from '../../services/AuthService/loginService';

import QuenMK from '../../components/Action/quenMK/QuenMK';
import './Login.css'
import Header from '../../components/Header/Header';

const Login = () => {

    const [messageApi, contextHolder] = message.useMessage();

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Mật khẩu đã được gửi đến email. Vui lòng kiểm tra lại!',
        });
    };


    const error = (message) => {
        messageApi.open({
            type: 'error',
            content: message,
        });
    };


    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [toggle, setToggle] = useState(false);

    const navigate = useNavigate();

    //Call API Login 
    const { loginResponse, callLoginRefetch } = LoginService();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/');
        }
    });

    useEffect(() => {
        if (loginResponse) {
            if (loginResponse.success === true) {
                localStorage.setItem('token', loginResponse.data.password);
                localStorage.setItem('ho', loginResponse.data.ho);
                localStorage.setItem('ten', loginResponse.data.ten);
                localStorage.setItem('idUser', loginResponse.data.id);
                localStorage.setItem('role', loginResponse.data.role);
                localStorage.setItem('userName', loginResponse.data.userName);


                navigate('/');
            }
            else {
                error(loginResponse.message);
            }
        }
    }, [loginResponse])

    const handleQuenMK = () => {
        setToggle(true);
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        callLoginRefetch(formData);

    }
    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    return (
        <>
            {/* <Header /> */}
            {contextHolder}

            <div className='background-Login'>
                <div className='signin-layout'>
                    <Form onSubmit={handleOnSubmit}>
                        <h3>Đăng nhập</h3>
                        <Form.Group style={{ textAlign: 'left' }} className="mb-3" >
                            <Form.Label >Username</Form.Label>
                            <Form.Control onChange={handleChange} name='username' type="text" placeholder="Nhập Username" />
                        </Form.Group>
                        <Form.Group style={{ textAlign: 'left' }} className="mb-3">
                            <Form.Label >Mật khẩu</Form.Label>
                            <Form.Control onChange={handleChange} name='password' type="password" placeholder="Mật khẩu" />
                        </Form.Group>
                        <Form.Group style={{ textAlign: 'left' }} className="mb-3">
                            <a style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => handleQuenMK()}>Quên mật khẩu</a>
                        </Form.Group>
                        <Button type='submit' variant='success' className='SignIn--btn' size='md' block='true'>Đăng nhập</Button>
                    </Form>
                </div>
            </div>
            {toggle ?
                <div className="container_FormThemTK">
                    <QuenMK success={success} setToggle={setToggle} />
                </div> : ''
            }
        </>
    )
}

export default Login;