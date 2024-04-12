
import Swal from 'sweetalert2'
export const successAdd = (item) => {
    Swal.fire({
        icon: 'success',
        title: item,
        showConfirmButton: false,
        timer: 2000,
        background: '#242424', // Change to the color you want
        color: '#fff',
    })
}
export const errorAdd = (item) => {
    Swal.fire({
        icon: 'error',
        title: item,
        showConfirmButton: false,
        timer: 2000,
        background: '#242424', // Change to the color you want
        color: '#fff',
    })
}
export const warring = (item) => {
    Swal.fire({
        icon: 'warning',
        text: item,
        showConfirmButton: false,
        timer: 2000,
        zIndex:999999
    })
}

 const errorCass = (item) => {
    return item == 'PRODUCT_NOT_STOCK' ? "ຈຳນວນສິນຄ້າບໍ່ພຽງພໍ" 
    : item == 'THIS_ACCOUNT_NUMBER_IS_READY' ? "ເລກບັນຊື່ນີ້ມີຢູ່ແລ້ວ"
    : item == 'INVALID_ID_BANK' ? "ບໍ່ມີເລກບັນຊື່ນີ້" : ""
  }