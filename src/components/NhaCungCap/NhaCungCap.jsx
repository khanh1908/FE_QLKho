import React, { useEffect, useState } from 'react';
import { Button, message } from 'antd';

import { GetAllNccService } from '../../services/Nhacungcap/getAllNhaCungCap';

import { XoaNCCByID } from '../../services/Nhacungcap/XoaNCC';
import ThemNCC from '../Action/Them/ThemNCC/ThemNCC';
import SuaNCC from '../Action/Sua/SuaNCC/SuaNCC';
import { FormXacNhan } from '../FormXacNhan/FormXacNhan';

const NhaCungCap = () => {
  const [toggle, setToggle] = useState(false);
  const [toggleSua, setToggleSua] = useState(false);
  const [idKho, setIdKho] = useState();
  const [toggleXoa, setToggleXoa] = useState(false);
  const [idXoa, setIdXoa] = useState();


  //Call API Lấy danh sách Kho
  const { getAllNccResponse, getAllNccRefetch } = GetAllNccService();

  //Call API Xóa Kho
  const { XoaNCCResponse, xoaKhoError, xoaKhoLoading, callXoaNCC } = XoaNCCByID();

  useEffect(() => {
    if (XoaNCCResponse) {
      // Gọi lại danh sách Kho sau khi xóa
      success('Xóa Nhà Cung Cấp thành công')

      getAllNccRefetch();
    }
  }, [ XoaNCCResponse])

  const handleSua = (id) => {
    setIdKho(id)
    setToggleSua(true)
  }

  const handleXoa = (id) => {
    setIdXoa(id);
    setToggleXoa(true);

  }

  const actionXoa = () => {
    //Xóa Kho By ID
    callXoaNCC(idXoa);
    setToggleXoa(false);
  }

  // Message thông báo
  const [messageApi, contextHolder] = message.useMessage();
  const success = (mes) => {
    messageApi.open({
      type: 'success',
      content: mes,
    });
  };

  return <>
    <h4 className='title__table'>Quản Lý Nhà Cung Cấp</h4>
    {contextHolder}
    <div className="add_NV_btn">
      <Button onClick={() => setToggle(true)} type="primary" className='btn_add_NV'>Thêm nhà cung cấp</Button>
    </div>
    <table className="table table__Kho">
      <thead>
        <tr>
          <th scope="col">STT</th>
          <th scope="col">Tên Nhà Cung Cấp</th>
          <th scope="col">Email</th>
          <th scope="col">Địa chỉ</th>
          <th scope="col">SĐT</th>

        </tr>
      </thead>
      <tbody>
        {getAllNccResponse ? getAllNccResponse.data.map((value, index) => {
          return <tr key={value.id}>
            <th scope="row">{index + 1}</th>
            <td>{value.tenNCC}</td>
            <td>{value.email}</td>
            <td>{value.address}</td>
            <td>{value.sdt}</td>
            <td>
              <Button onClick={() => handleXoa(value.id)} danger style={{ marginRight: "5px" }}>
                Xóa
              </Button>
              <Button onClick={() => handleSua(value.id)} type="primary" >
                Sửa
              </Button>
            </td>
          </tr>
        }) : '...'}

      </tbody>
    </table>
    {toggle ?
      <div className="container_FormThemTK">
        <ThemNCC getAllNccRefetch={getAllNccRefetch} setToggle={setToggle} />
      </div> : ''
    }
    {toggleSua ?
      <div className="container_FormThemTK">
        <SuaNCC idKho={idKho} getAllNccRefetch={getAllNccRefetch} setToggle={setToggleSua} />
      </div> : ''
    }
    {toggleXoa ?
      <div className="container_FormThemTK">
        <FormXacNhan message={'Bạn có chắc chắn xóa không?'} setToggle={setToggleXoa} action={actionXoa} />
      </div> : ''
    }
  </>
}
export default NhaCungCap;