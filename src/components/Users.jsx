import { useState, useEffect } from "react";
import UserForm from "./UserForm";
import UserList from "./UserList";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const Users = () => {
    const [UserSelected, setUserSelected] = useState({});
    const [modalIsOpen, setIsOpen] = useState(false);

    function sweetAlert(title,msj,icono){
        const MySwal = withReactContent(Swal)
        Swal.fire({
            icon: icono,
            title: title,
            text: msj
          })
    }
    return (
        <div>
            <UserForm  sweetAlert={sweetAlert} UserSelected={UserSelected} setUserSelected={setUserSelected} modalIsOpen={modalIsOpen} setIsOpen={setIsOpen}/>
            <hr />
            <div className="user-list">
                <UserList sweetAlert={sweetAlert} UserSelected={UserSelected} setUserSelected={setUserSelected} setIsOpen={setIsOpen}/>
            </div>
        </div>
    );
}

export default Users;
