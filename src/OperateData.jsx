import axios from 'axios'
import { baseurl } from "ApiBase.jsx";

function operateData(url,operation,update_result,component,filters){
    var bodyFormData = new FormData();
    bodyFormData.set('operation', operation);
    console.log(filters)
    for (var i = 0; i < filters.length; i++) {             
      bodyFormData.set(filters[i][0],filters[i][1]);  
    }
    
    axios({
      method: 'post',
      baseURL:{baseurl}.baseurl,
      url: url,
      data: bodyFormData,
      config: { headers: {'Content-Type': 'multipart/form-data' }}
      })
      .then((response) => {
          const valuemessage = response.data.message;
          if(update_result){
            component.setState({message:valuemessage, 
              snackopen:true,
              data:response.data.result
            });
          }else{
            component.setState({message:valuemessage, 
              snackopen:true,
            })
          }
          setTimeout(() => {
            component.setState({
              message:'',
              snackopen:false
             });
           }, 5000);
      
        })
      .catch((response) => {
        component.setState({message:'Something Went Wrong', 
          snackopen:true,
        })
      });
  }
  
export {
    operateData
};