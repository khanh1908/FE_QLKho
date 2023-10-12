import React, { useEffect, useState } from "react";
import { Button, message } from "antd";

import './QuanLySanPham.css';

import { GetAllSanPhamService } from "../../services/SanPham/getAllSanPham";
import ThemSP from "../Action/Them/ThemSP/ThemSP";
import SuaSP from "../Action/Sua/SuaSP/SuaSP";
import { GetChiTietSanPham } from "../../services/SanPham/getCTSanPham";
import CTSanPham from "../Action/ChiTiet/CTSanPham";

const QuanLySanPham = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [toggleSua, setToggleSua] = useState(false);
    const [toggleCT, setToggleCT] = useState(false);
    const [idSP, setIdSP] = useState();
    const success = (mess) => {
        messageApi.open({
            type: 'success',
            content: mess,
        });
    };
    const handleXoa = (id) => {
        //Xóa Kho By ID
        // callXoaNCC(id);
        // success('Xóa Nhà Cung Cấp thành công')

    }

    const handleSua = (id) => {
        setIdSP(id);
        setToggleSua(true);
    };

    const handleCT = (id) => {
        setToggleCT(true);
        ChiTietSanPhamCall(id);
    };

    const [toggle, setToggle] = useState(false);

    const { getAllSanPhamResponse, getAllSanPhamIsLoading, getAllSanPhamError, getAllSanPhamRefetch } = GetAllSanPhamService();

    const { ChiTietSanPhamResponse, ChiTietSanPhamIsLoading, ChiTietSanPhamError, ChiTietSanPhamCall } = GetChiTietSanPham();

    return <>
        {contextHolder}
        <h4 className="title__table">Quản lý sản phẩm</h4>
        <div className="add_SP_btn">
            <Button onClick={() => { setToggle(true) }} className='btn_add_NV' type="primary">Thêm sản phẩm</Button>
        </div>
        <table className="table table__Kho">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Tên sản phẩm</th>
                    <th scope="col">Ngày sản xuất</th>
                    <th scope="col">Hạn sử dụng</th>
                    <th scope="col">Danh mục</th>
                    <th scope="col">Trạng thái</th>
                    <th scope="col">Mã Code</th>
                    <th scope="col">Tác vụ</th>
                </tr>
            </thead>
            <tbody>
                {
                    getAllSanPhamResponse ? getAllSanPhamResponse.data.map((value, index) => {
                        function removeDiacritics(text) {
                            return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                        }
                        const barCode = removeDiacritics(value.tenSanPham + value.trangThai + value.soLuong);
                        const imageUrl = `http://localhost:3003/Sanpham/barcode/${barCode}`;
                        return (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{value.tenSanPham}</td>
                                <td>{value.ngaySanXuat}</td>
                                <td>{value.hanSuDung}</td>
                                <td>{value.danhmuc.tenDM}</td>
                                <td>{value.trangThai}</td>
                                <td>
                                    <img style={{ width: "300px", height: "100%" }}
                                        src={imageUrl}
                                    />
                                </td>
                                <td>
                                    <Button style={{ marginRight: "5px" }} type="primary" onClick={() => handleCT(value.id)}>
                                        Chi tiết
                                    </Button>
                                    <Button onClick={() => handleXoa(value.id)} danger style={{ marginRight: "5px" }}>
                                        Xóa
                                    </Button>
                                    <Button onClick={() => handleSua(value.id)} type="primary" >
                                        Sửa
                                    </Button>
                                </td>
                            </tr>
                        );
                    }) : 'Chưa có sản phẩm'
                }
            </tbody>
        </table>
        {toggle ?
            <div className="container_FormThemTK">
                <ThemSP getAllSanPhamRefetch={getAllSanPhamRefetch} setToggle={setToggle} />
            </div> : ''
        }

        {toggleSua ?
            <div className="container_FormThemTK">
                <SuaSP idSP={idSP} getAllSanPhamRefetch={getAllSanPhamRefetch} setToggle={setToggleSua} />
            </div> : ''
        }

        {toggleCT ?
            <div className="container_FormThemTK">
                <CTSanPham ChiTietSanPhamResponse={ChiTietSanPhamResponse}  setToggle = {setToggleCT}/>
            </div> : ''
        }
    </>
};

export default QuanLySanPham;