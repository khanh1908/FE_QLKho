import React, { useEffect, useState } from "react";
import { Button, Form, Input } from 'antd';
import { message } from 'antd';
import { SuaKhoByID } from '../../../../services/Kho/SuaKho'
import { ChiTietKho } from "../../../../services/Kho/ChiTietKho";
import httpClient from "../../../../utils/axiosInstance";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SuaKho = ({ setToggle, getAllKhoRefetch,idKho }) => {
    const [datakho,setDataKho] = useState({})
    const { SuaKhoResponse, SuaKhoError, callSuaKho } = SuaKhoByID();
    useEffect(() => {
        if (SuaKhoResponse) {
            setToggle(false);
            getAllKhoRefetch();
        } else if (SuaKhoError) {
            error();
        }
    }, [SuaKhoResponse, SuaKhoError]);

    const [messageApi, contextHolder] = message.useMessage();
    const [formData, setFormData] = useState({
        tenKho: "",
        email: "",
        address: "",
        sdt: ""
    });

    useEffect(() => {
        
        async function getData(){
          const res = await httpClient.get(`/vitrikho/kho/${idKho}`)
          return res
        }
        getData().then((res) => {
            // console.log(res)
            setDataKho(res)
        })
        getData().catch((err) => {
          console.log(err)
        })
        console.log(1)
    },[])

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Thêm thành công',
        });
    };

    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'Thêm thất bại',
        });
    };


    const handleSuaKho = (e) => {
        e.preventDefault();
        if(formData.tenKho == '' || formData.address == ''|| formData.email == '' || formData.sdt == '') {
            toast.error('Vui lòng nhập đầy đủ thông tin', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        else{
            // callThemKho(formData);
            // success();
            callSuaKho(idKho,formData);
            success();
            // setTimeout(() => {
            //     window.location.reload();
            // }, 2000);
        }
    }

    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }
    console.log(datakho)
    return <>
        {contextHolder}
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            autoComplete="off"
            className="Form_ADD_NV"
            initialValues={datakho.data}
        >
            <h5>Sửa Kho</h5>
            <Form.Item
                label="Tên kho"
                name="tenKho"
                rules={[{ required: true, message: 'Nhập Tên Kho!' }]}
            >
                <Input name="tenKho" onChange={handleChange} />
            </Form.Item>
            <Form.Item
                label="email"
                name="email"
                rules={[{ required: true, message: 'Nhập email!' }]}
            >
                <Input name="email" onChange={handleChange} />
            </Form.Item>
            <Form.Item
                label="Địa chỉ"
                name="address"
                rules={[{ required: true, message: 'Nhập Địa chỉ kho!' }]}
            >
                <Input name="address" onChange={handleChange} />
            </Form.Item>
            <Form.Item
                label="Số điện thoại"
                name="sdt"
                rules={[{ required: true, message: 'Nhập Số đt!' }]}
            >
                <Input name="sdt" onChange={handleChange} />
            </Form.Item>



            <div className="btn_Cancel_Submit">

                <Button onClick={() => { setToggle(false) }} danger >
                    Hủy
                </Button>
                <Button onClick={handleSuaKho} type="primary" >
                    Xác nhận
                </Button>
            </div>
        </Form >
        <ToastContainer 
            position="top-right"
            autoClose={1500}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
    </>
}

export default SuaKho;