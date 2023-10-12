import React, { useEffect, useState } from "react";
import { Button, Form, Input } from 'antd';
import { message } from 'antd';

import { ThemNCCService } from '../../../../services/Nhacungcap/themNCC'


const ThemNCC = ({ setToggle, getAllNccRefetch }) => {

    const { themNCCResponse, themNCCError, callThemNCC } = ThemNCCService();
    useEffect(() => {
        if (themNCCResponse) {
            setToggle(false);
            getAllNccRefetch();
        } else if (themNCCError) {
            error();
        }
    }, [themNCCResponse, themNCCError]);

    const [messageApi, contextHolder] = message.useMessage();
    const [formData, setFormData] = useState({
        email: '',
        address: '',
        sdt: '',
        tenNCC: ''
    });


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


    const handleAddKho = (e) => {
        e.preventDefault();
        callThemNCC(formData);
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
            <h5>Thêm Nhà Cung Cấp</h5>
            <Form.Item
                label="Tên nhà cung cấp"
                name="tenNCC"
                rules={[{ required: true, message: 'Nhập Tên Nhà Cung Cấp!' }]}
            >
                <Input name="tenNCC" onChange={handleChange} />
            </Form.Item>
            <Form.Item
                label="email"
                name="email"
                rules={[{ required: true, message: 'Nhập email!' }]}
            >
                <Input name="email" onChange={handleChange} />
            </Form.Item>
            <Form.Item
                label="address"
                name="address"
                rules={[{ required: true, message: 'Nhập Địa NCC!' }]}
            >
                <Input name="address" onChange={handleChange} />
            </Form.Item>
            <Form.Item
                label="sdt"
                name="sdt"
                rules={[{ required: true, message: 'Nhập Số đt!' }]}
            >
                <Input name="sdt" onChange={handleChange} />
            </Form.Item>



            <div className="btn_Cancel_Submit">

                <Button onClick={() => { setToggle(false) }} danger >
                    Hủy
                </Button>
                <Button onClick={handleAddKho} type="primary" >
                    Xác nhận
                </Button>
            </div>
        </Form >
    </>
}

export default ThemNCC;