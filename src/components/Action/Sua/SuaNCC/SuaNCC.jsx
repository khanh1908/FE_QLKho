import React, { useEffect, useState } from "react";
import { Button, Form, Input } from 'antd';
import { message } from 'antd';

import { SuaNCCByID } from "../../../../services/Nhacungcap/SuaNCC";


const SuaNCC = ({ setToggle, getAllNccRefetch,idKho }) => {

    const { SuaNCCResponse, SuaNCCError, callSuaNCC } = SuaNCCByID();
    useEffect(() => {
        if (SuaNCCResponse) {
            setToggle(false);
            getAllNccRefetch();
        } else if (SuaNCCError) {
            error();
        }
    }, [SuaNCCResponse, SuaNCCError]);

    const [messageApi, contextHolder] = message.useMessage();
    const [formData, setFormData] = useState({
        tenKho: "",
        email: "",
        address: "",
        sdt: ""
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


    const handleSuaKho = (e) => {
        e.preventDefault();
        callSuaNCC(idKho,formData);
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
            <h5>Sửa Nhà Cung Cấp</h5>
            <Form.Item
                label="Tên nhà cung cấp"
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
    </>
}

export default SuaNCC;