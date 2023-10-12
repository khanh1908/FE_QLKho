import React, { useEffect, useState } from "react";
import { Button, Form, Input } from 'antd';
import { message } from 'antd';
import { ThemVTKhoService } from "../../../../services/ViTriKho/ThemViTriKho";
import { ChiTietKho } from "../../../../services/Kho/ChiTietKho";

const ThemViTriKho = ({setToggle, idKho,handleCallRefetch }) => {
    const {ThemVTKhoResponse,ThemVTKhoError,ThemVTKhoLoading,callThemVTKho} = ThemVTKhoService();
    const { ChiTietKhoResponse, ChiTietKhoIsLoading, ChiTietKhoError, ChiTietKhoCall } = ChiTietKho();
    const [messageApi, contextHolder] = message.useMessage();
    console.log(ThemVTKhoResponse);
    useEffect(() => {
        if (ThemVTKhoResponse) {
            setToggle(false);
            handleCallRefetch();
            success();
        }
        else if (ThemVTKhoError) {
            error();
        }
    }, [ThemVTKhoResponse,ThemVTKhoError]);

    const [formData, setFormData] = useState({
        hang:'',
        cot:'',
        ke:'',
        kho:{
            id: idKho,
        }
    });

    const handleChange = (name, value) => {
        setFormData((prevState) => ({
            ...prevState,
            [name] : value
        }));
    }

    const handleThemViTriKho = (e) => {
        e.preventDefault();
        callThemVTKho(formData);
        ChiTietKhoCall(idKho);
    };

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Thêm vị trí kho thành công',
        });
    };

    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'Thêm thất bại',
        });
    };

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
            <Form.Item
                label="Cột"
                name="cot"
                rules={[{ required: true, message: '' }]}
            >
                <Input name="cot" onChange={(e) => handleChange('cot', e.target.value)}  value={formData.cot}/>
            </Form.Item>

            <Form.Item
                label="Hàng"
                name="hang"
                rules={[{ required: true, message: 'Nhập Tên DM!' }]}
            >
                <Input name="hang" onChange={(e) => handleChange('hang', e.target.value)}  value={formData.hang} />
            </Form.Item>

            <Form.Item
                label="Kệ"
                name="ke"
                rules={[{ required: true, message: 'Nhập Tên DM!' }]}
            >
                <Input name="ke" onChange={(e) => handleChange('ke', e.target.value)}  value={formData.ke}/>
            </Form.Item>

            <div className="btn_Cancel_Submit">

                <Button onClick={() => { setToggle(false) }} danger >
                    Hủy
                </Button>
                <Button  type="primary" onClick={handleThemViTriKho} >
                    Xác nhận
                </Button>
            </div>
        </Form >
    </>
}
export default ThemViTriKho;