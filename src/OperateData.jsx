import axios from 'axios';

// const baseurl = "http://localhost:8000/";
const baseurl = "http://careeranna.shashwatyadav.com/api/";
function operateData(url,update_result,snackbar_show,getfilters,modaldata,component,filters){
    var bodyFormData = new FormData();
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
          // output = response
          const valuemessage = response.data.message;
          if(update_result){
            component.setState({
              data:response.data.result,
              total_records: response.data.total_records
            });
          }
          
          
          if(snackbar_show){
            component.setState({
              message:valuemessage, 
              snackopen:true,
            });
          }
          
          if(getfilters){
            component.setState({
              filterdata:response.data.filter
            });
          }
          if(modaldata){
            component.setState({
              modaldata:response.data.result[0]
            });
          }
          
          setTimeout(() => {
            component.setState({
              message:'',
              snackopen:false
             });
           }, 5000);

           return response;            
        })
      .catch((response) => {
        component.setState({message:'Something Went Wrong! Please check your internet or contact system administrator.', 
          snackopen:true,
        })

        setTimeout(() => {
          component.setState({
            message:'',
            snackopen:false
           });
         }, 5000);
      });

    }


export {
    operateData
};