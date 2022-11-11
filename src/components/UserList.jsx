import { useState, useEffect } from "react";

const UserList = ({sweetAlert, UserSelected,setUserSelected,setIsOpen}) => {
    const [UserList, setUserList] = useState([]);
    const fetchUsersApi = async () =>{
        let parameters = { method: 'GET',headers: {"Content-Type": "application/json"}};
        let data = await fetch(`https://users-crud1.herokuapp.com/users/`,parameters);
        data = await data.json();
        setUserList(data);
    }
    const getUser= async(iduser) =>{
        let parameters = { method: 'GET',headers: {"Content-Type": "application/json"}};
        let data = await fetch(`https://users-crud1.herokuapp.com/users/${iduser}/`,parameters);
        data = await data.json();
        setUserSelected(data);
        setIsOpen(true);
    }

    const deletetUser = async(iduser) =>{
        if(confirm("Sure to delete user?")){
            let parameters = { method: 'DELETE',headers: {"Content-Type": "application/json"}};
            let data = await fetch(`https://users-crud1.herokuapp.com/users/${iduser}/`,parameters);
            fetchUsersApi();
            sweetAlert('Delete','Delete USER OK','success');
        }
    }    

    useEffect(() => {
        fetchUsersApi();
    }, [UserSelected]);

    return (
        
        UserList.map((ele)=>{
                return (
                    <div key={ele.id} className="card-user">
                        <h2>{ele.first_name+' '+ele.last_name}</h2>
                        <p>{ele.email}</p>
                        <p>{ele.birthday}</p>
                        <div className="buttons-card-user">
                            <button className="btn-select" onClick={()=>getUser(ele.id)}>Select</button>
                            <button className="btn-delete" onClick={()=>deletetUser(ele.id)}>Delete</button>
                        </div>
                    </div>
                )
            })
        
    
    );
};

export default UserList;