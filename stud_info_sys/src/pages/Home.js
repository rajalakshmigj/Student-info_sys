import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "./Home.css";
import { toast } from "react-toastify";
import axios from 'axios';
import { FiSearch } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaUserEdit } from "react-icons/fa";
import swal from 'sweetalert';
import Moment from 'react-moment';



function Home() {
    const [data, setData] = useState([]);


    const loadData = async () => {
        const response = await axios.get(`http://localhost:5000/api/get`);
        setData(response.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    const deleteStd = (id) => {
        axios.delete(`http://localhost:5000/api/remove/${id}`);
        swal({
           
            text: "Are you sure you want to Delete", 
            buttons: ["Cancel", "Yes"],
    });

        
        // if (window.confirm("Are you sure you want to Delete")) {
        //     axios.delete(`http://localhost:5000/api/remove/${id}`);
        //     // alert("Deleted Successfully");
        //     swal("Deleted Successfully");
        //     setTimeout(() => loadData(), 500);
        // }
    }
    return (

        <div className='container'>
            <div className='student-mgnt'>
                <h3 className='heading'>Student Management System</h3>
                <div className='search-bar'>
                    <div className='search'>
                        <input type="text" placeholder='Search' /><i><FiSearch /></i>
                    </div>
                    <Link to={"/addstd"}>
                        <button className='btn btn-add'>ADD</button>
                    </Link>
                </div>


                <table className="styled-table">
                    <thead>
                        <tr>
                            <th style={{ textAlign: "center" }}> ID</th>
                            <th style={{ textAlign: "center" }}> First Name </th>
                            <th style={{ textAlign: "center" }}> Last Name</th>
                            <th style={{ textAlign: "center" }}> Location</th>
                            <th style={{ textAlign: "center" }}> Email </th>
                            <th style={{ textAlign: "center" }}> DOB </th>
                            <th style={{ textAlign: "center" }}> Education</th>
                            <th style={{ textAlign: "center" }}> Action</th>
                            <th style={{ textAlign: "center" }}> Delete </th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((item, index) => {
                            return (
                                <tr key={item.id}>
                                    <th scope="row"> {index + 1}</th>
                                    <td>{item.firstname}</td>
                                    <td>{item.lastname}</td>
                                    <td>{item.Location}</td>
                                    <td>{item.Email}</td>
                                    <td><Moment format="DD/MM/YYYY">
                                    {item.DOB}
                                    </Moment></td>
                                    <td>{item.Education}</td>
                                    <td>
                                        <Link to={`/update/${item.id}`}>
                                            <button className="btn btn-edit"><FaUserEdit /> Edit </button>
                                        </Link>
                                    </td>
                                    <td>
                                        <button className="btn btn-delete" onClick={() => deleteStd(item.id)}> <RiDeleteBin5Line />Delete </button>
                                    </td>


                                </tr>
                            );
                        })}
                    </tbody>

                </table>


            </div>

        </div>
    );
}

export default Home;