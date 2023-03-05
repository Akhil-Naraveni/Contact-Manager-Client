import React,{ useState, useEffect} from "react";
import Header from "./Header";
import Contacts from "./Contacts";
import "./HomePage.css"
import ImportCard from "./Import";
import DeleteCard from "./Delete";
import axios from "axios";
import SideBar from "./SideBar";
import ImportSuccessCard from "./ImportSuccess";
import DeleteSuccessCard from "./DeleteSuccess";




export const GlobalContext = React.createContext()

const HomePage = () => {

    const [invokeImport, setInvokeImport] = useState(false)
    const [invokeDelete,setInvokeDelete] = useState(false)
    const [invokeDeleteSuccess,setInvokeDeleteSuccess] = useState(false)
    const [invSuc, setInvSuc] = useState(false)
    const [delSuc, setDelSuc] = useState(false)
    const [deleteArr, setDeleteArr] = useState([])
    const [contactsArr, setContactsArr] = useState([])
    
    console.log("importSuccess",invSuc)
    const token = JSON.parse(localStorage.getItem("token"));
    useEffect(() => {
        fetchContacts()
    }, [])
    function fetchContacts() {
        axios('https://contact-manager-enmu.onrender.com/api/v1/contacts', {
             method: 'GET',
            headers: {
                "Authorization": token
            }
        }).then((result) => {
            console.log("entered fetchdata")
            console.log(result)
            setContactsArr(result.data.contacts)
            setTimeout(() => {
                setInvSuc(false)
            }, 1500);
            setTimeout(() => {
                setDelSuc(false)
            }, 1500)
        }).catch((e) => {
            console.log(e)
            setTimeout(() => {
                setInvSuc(false)
            }, 1500);
            setTimeout(() => {
                setDelSuc(false)
            }, 1500)
        })
    }

    const handleDelete = (e) => {
        setInvokeDelete(true)
        setDeleteArr([e.target.id])
        console.log("deletARRAY",deleteArr)     
    }
    
    //handle delete multiple by checkbox
    const handleDeleteMany=()=>{
        
        const tempArr = contactsArr.filter((data)=>{return data.isChecked})
        .map(data=>data._id)
        console.log("tempArr",tempArr)
        if(tempArr.length > 0){
            setInvokeDelete(true)
        }
        setDeleteArr(tempArr)
    }
    

    console.log(invokeImport)
    return (
        <GlobalContext.Provider value={{ delSuc, setDelSuc,handleDelete,invokeDeleteSuccess,setInvokeDeleteSuccess,invSuc, setInvSuc,deleteArr, handleDeleteMany, setDeleteArr, setContactsArr, contactsArr, invokeImport, setInvokeImport, invokeDelete,setInvokeDelete, fetchContacts}} >
        <div className="mainContainer">
        

            <div className="aside">
                <SideBar />
            </div>
            <div className="bodycontainer">
                <div className="header">
                    
                    <Header />
                </div>
                <div className="contentbody">
                     
                    
                     <Contacts />
                </div>
                
            </div>
            {invokeImport ? <ImportCard /> : ""}
            {invokeDelete ? <DeleteCard  /> : ""}
            {invSuc ? <ImportSuccessCard /> : ""}
            {delSuc ? <DeleteSuccessCard /> : "" }

        </div>
        </GlobalContext.Provider>
    )
}


export default HomePage;