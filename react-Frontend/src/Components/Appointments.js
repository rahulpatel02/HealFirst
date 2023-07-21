import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Appointments() {
  const userid=localStorage.getItem("userid");
  const token=localStorage.getItem("token");
  console.log(token);
    const uri=`http://localhost:8080/appointment${userid}`;
    const [post, setPost] = useState([]);
    useEffect(() => {
        const getApiData = async () => {
          try {
            const res = await axios.get(uri,{ 
              headers: {
                'Authorization' : `Bearer ${token}`,
                'Accept' : 'application/json',
             'Content-Type': 'application/json'
              } 
            })
            setPost(res.data);
           // console.log(JSON.stringify(res));
            
          } catch (error) {
            console.log(error.message);
          }
        };
        getApiData();
    
    
      }, [])
  return (
   <>


<div className="container">
		<div className="card-header my-3">Appointments</div>
		<table className="table table-light">
			<thead>
				<tr>
					<th scope="col">Doctor Name</th>
					<th scope="col">Disease Name</th>
					<th scope="col">Date</th>
					<th scope="col">Time</th>
					<th scope="col">Location</th>
					<th scope="col">Cancel</th>
  				</tr>
			</thead>

   {post.map((item,index)=>{
    return(


			<tbody key={index}>
				
            <tr > 
					
						<td>{item.doctorName}</td>
						<td>{item.diseaseName}</td>
						<td>{item.date}</td>
						<td>{item.time}</td>
            <td>{item.location}</td>
						<td><a className="btn btn-sm btn-danger" href="cancel-order?id=<%=o.getOrderId()%>">Cancel Order</a></td>
					</tr>

			</tbody>
      )
   })}
		</table>
	</div>
   </>
  )
}

export default Appointments