import React from 'react';
import Modal from 'react-modal';
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

/********************** MODAL ****************************/
const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor:'#54a3f7',
      borderRadius:'31px 30px 30px 30px',
    },
  };
Modal.setAppElement('#root');
/********************** MODAL ****************************/
const UserForm = ({sweetAlert, UserSelected, setUserSelected, modalIsOpen, setIsOpen}) => {
    /********************** MODAL ****************************/
  function openModal() { setIsOpen(true); }
  function closeModal() { setIsOpen(false); reset({email:'',password:'',first_name:'',last_name:'',birthday:''}); setHiddenPass(true); setUserSelected({});}
    /********************** MODAL ****************************/
   const { register, handleSubmit, reset } = useForm();
   const [HiddenPass, setHiddenPass] = useState(true);

   const onSubmit = async (data) => {
        if( Object.keys(UserSelected).length===0){
            let parameters = { method: 'POST',headers: {"Content-Type": "application/json"}, body: JSON.stringify(data) };
            let dat = await fetch(`https://users-crud1.herokuapp.com/users/`,parameters);
            sweetAlert('Insert','Insert USER OK','success');
        }else{
            let parameters = { method: 'PUT',headers: {"Content-Type": "application/json"}, body: JSON.stringify(data) };
            let dat = await fetch(`https://users-crud1.herokuapp.com/users/${UserSelected.id}/`,parameters);
            sweetAlert('Update','Update USER OK','success');
        }       
        reset({email:'',password:'',first_name:'',last_name:'',birthday:''});
        closeModal();
    }

    useEffect(() => {
        reset(UserSelected);
    }, [UserSelected]);

    return (
        <>
            <div className='header'>
                <h1>USERS</h1>
                <button onClick={openModal} className='myButton'>CREATE USER</button>
            </div>
                {/* <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="User Modal"> */}
                <Modal isOpen={modalIsOpen} style={customStyles} contentLabel="User Modal">
                    <div className='content-modal'>
                        <h2>{ Object.keys(UserSelected).length!==0?'EDIT USER':'CREATE NEW USER'}</h2>
                        <button onClick={closeModal} className="btn-modal">close</button>                      
                            <form onSubmit={handleSubmit(onSubmit)} className="form-user">
                                <div className="campo">
                                    <label htmlFor="">Email</label>
                                    <input placeholder='Email' autoComplete="off" type="email" {...register("email", { required: true, maxLength: 150,  minLength:2 })} />
                                </div>
                                <div className="campo">
                                    <label htmlFor="">Password</label>
                                    <button type='button' onClick={()=>{setHiddenPass(!HiddenPass)}}>{HiddenPass?'See':'Hidden'}</button>
                                    <input placeholder='Password' autoComplete="off" type={HiddenPass?'password':'text'} {...register("password", { required: true, maxLength: 125,  minLength:2 })} />    
                                </div>
                                <div className="campo">
                                    <label htmlFor="">Fisrt Name</label>
                                    <input placeholder='First Name' autoComplete="off" type="text" {...register("first_name", { required: true, maxLength: 25,  minLength:2})} />
                                </div>
                                <div className="campo">
                                    <label htmlFor="">Last Name</label>
                                    <input placeholder='Last Name' autoComplete="off" type="text" {...register("last_name", { required: true, maxLength: 25,  minLength:2 })} />
                                </div>
                                <div className="campo">
                                    <label htmlFor="">Birthday</label>
                                    <input autoComplete="off" type="date" {...register("birthday", { required: true })} />
                                </div>
                                {                                 
                                    Object.keys(UserSelected).length!==0 ? 
                                    (
                                    <div className='buttons-form'>
                                        <button>Update</button>
                                        <button type='button' onClick={closeModal}>Cancel</button>
                                    </div>
                                    )
                                    : 
                                    (<button>Submit</button>)
                                }
                                
                        </form>
                    </div>
                </Modal>
        </>
    );
};

export default UserForm;