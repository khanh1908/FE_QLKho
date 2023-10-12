import React, { useEffect, useState } from "react";
import { Button, Form, Input } from 'antd';
import { message } from 'antd';

import { SuaKhoByID } from '../../../../services/Kho/SuaKho'
import axios from "axios";
import httpClient from "../../../../utils/axiosInstance";

const SuaKho = ({ setToggle, getAllKhoRefetch,idKho }) => {
    const [detailkho, setDetailkho] = useState({})
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
    console.log(idKho)

    const getDetailKho = async() => {
        const res = await httpClient.get(`kho/${idKho}`)
        return res
    }
    useEffect(() => {
      
        getDetailKho().then((res) => {
        //   console.log(res.data.data)
          setDetailkho(res.data.data)
        })
        getDetailKho().catch((err) => {
          console.log(err)
        })
    },[])
    console.log(detailkho)
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
        callSuaKho(idKho,formData);
        success();
    }

    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }

    return <>
        {contextHolder}
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            autoComplete="off"
            className="Form_ADD_NV"
        >
            <h5>Sửa Kho</h5>
            <Form.Item
                label="Tên kho"
                name="tenKho"
                rules={[{ required: true, message: 'Nhập Tên Kho!' }]}
            >
                <Input name="tenKho" onChange={handleChange} value={detailkho.tenKho}/>
            </Form.Item>
            <Form.Item
                label="email"
                name="email"
                rules={[{ required: true, message: 'Nhập email!' }]}
                value = {detailkho.email}
            >
                <Input name="email" onChange={handleChange} />
            </Form.Item>
            <Form.Item
                label="Địa chỉ"
                name="address"
                rules={[{ required: true, message: 'Nhập Địa chỉ kho!' }]}
                value = {detailkho.address}
            >
                <Input name="address" onChange={handleChange} />
            </Form.Item>
            <Form.Item
                label="Số điện thoại"
                name="sdt"
                rules={[{ required: true, message: 'Nhập Số đt!' }]}
                value = {detailkho.sdt}
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
    </>
}

export default SuaKho;