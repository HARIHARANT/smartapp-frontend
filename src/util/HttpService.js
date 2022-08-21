import React, { useState } from "react";
import axios from "axios";

const HttpService = async (queryParam, method, request,type) => {
    console.log(queryParam + " " + method + " " + request);
    let response = {};
    let BASEURL = "";
    if(type=='demo'){
        BASEURL=  `https://dummyjson.com/products/category/${queryParam}`;
    } else{
        BASEURL=  `https://s-martapp-backend.herokuapp.com/${queryParam}`;
        
    }
    
    console.log(`url:${BASEURL}`);  
    
    try {
       //axios.defaults.headers.common['Content-type'] = 'application/json';
      
    //    request.headers = {
    //       'Authorization': "Bearer "+localStorage.getItem("_token")
    //     };
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("_token")}`;

       if(method == "POST"){
        response = await axios.post(BASEURL, request);
       }else if(method == "GET"){
        response = await axios.get(BASEURL, request);
       }else if(method == "PUT"){
        response = await axios.put(BASEURL, request);
       }else{
        response = await axios.delete(BASEURL, request);
       }
       
    } catch (e) {
        response.status = e.status;
        response.message = e.error;
        console.error(e);
    }
  
    return response;
}

export default HttpService;
