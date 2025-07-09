import React, {useState} from 'react';
import swal from 'sweetalert';
import axios from 'axios';

export const TicketTrackerForm = () => {
    const [formData, setFormData] = useState({
        // ticket_id:'',
        // tenant_id:'',
        tenant_name:'',
        // property_id:'',
        issue_type:'',
        description:'',
        status:'',
        employee_name:'',
        // created_date:'',
        closed_date:'',
        ticket_title:'',
        follow_up_required:'',

    });
     const [errors, setErrors] = useState({});

    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

   const validate = (e) => {
    e.preventDefault()
    const newErrors = {};
    // if (!formData.ticket_id || parseInt(formData.ticket_id) <= 1) {
    //   newErrors.property_id = 'ticket id must be a positive number';
    // }
    // if(!formData.tenant_id || parseInt(formData.tenant_id) <=0) {
    //   newErrors.tenant_id = 'tenant id must be a positive number';
    // }
    if(!formData.tenant_name) {
      newErrors.tenant_name = 'tenant name is required';
    }
    // if(!formData.property_id) {
    //   newErrors.property_id = 'property is required';
    // }
    if(!formData.issue_type) {
      newErrors.issue_type = 'issue type is required';
    }
    if(!formData.description > 1) {
      newErrors.description = 'Description is required';
    }
    if(!formData.status) {
      newErrors.status= 'choose your status';
    }
    if(!formData.employee_name) {
      newErrors.employee_name = 'employee name is required';
    }
    if(!formData.closed_date) {
      newErrors.closed_date = 'closed date is required';
    }
    if(!formData.ticket_title) {
      newErrors.ticket_title = 'ticket title is required';
    }
    if(!formData.follow_up_required) {
      newErrors.follow_up_= 'follow up  is required';
    }
    setErrors(newErrors);
    // return Object.keys(newErrors).length === 0;
      if(Object.keys(newErrors).length === 0){

      axios.post("http://localhost:9000/submit", formData)
      .then((res) =>{
        console.log(res)
      }).catch((err) =>{
        console.log(err)
      })
     }
  }

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if(validate()){
//     console.log('Submitted:', formData);
//       swal({
//         title: "Good job!",
//         text: "Form submitted successfully!",
//         icon: "success",
//         button: "ok",
//       });
//     }else{
//         swal({
//         title: "Enter all fields",
//         icon: "error",
//         button: "ok",
//       });
//   };
// }


  return (
    <div className='ticket-form-container'>
        <form className='ticket-form-card' onSubmit={validate}>
            <h1>Ticket Tracker</h1>

            {/* <label>Ticket ID:</label>
            <input type="number" name="tikcet_id" placeholder="Enter Ticket ID" value={formData.ticket_id} onChange={handleChange} />
            {errors.ticket_id && <p className='error'>{errors.ticket_id}</p>}   */}

            {/* <label>Tenant Id<span style={{color:'red'}}> * </span></label>
            <input type="number" name="tenant_id" placeholder="Enter Tenant ID" value={formData.tenant_id} onChange={handleChange} />
            {errors.tenant_id && <p className='error'>{errors.tenant_id}</p>} */}

            <label>Tenant Name<span style={{color:'red'}}> * </span></label>
            <input type="text" name="tenant_name" placeholder="Enter Tenant Name" value={formData.tenant_name} onChange={handleChange} />
            {errors.tenant_name && <p className='error'>{errors.tenant_name}</p>}

            {/* <label>Property Id<span style={{color :'red'}}> * </span></label>
            <input type="number" name="property_id" placeholder="Enter Property ID" value={formData.property_id} onChange={handleChange} />
            {errors.property_id && <p className='error'>{errors.property_id}</p>} */}

            <label>Issue Type<span style={{color : 'red'}}> * </span></label>
              <select
                name="issue_type"
                value={formData.issue_type}
                onChange={handleChange} class='issue'
              >
                <option value="">-- Select Issue Type --</option>
                <option value="plumbing">Plumbing</option>
                <option value="electrical">Electrical</option>
                <option value="internet">Internet</option>
                <option value="cleaning">Cleaning</option>
                <option value="other">Other</option>
              </select>
            {errors.issue_type && <p className='error'>{errors.issue_type}</p>}


            <label>Status<span style={{color : 'red'}}> * </span></label>
             <select
                name="status"
                value={formData.status}
                onChange={handleChange} class='status'
              >
                <option value="">-- Select Status --</option>
                <option value="raised">Open</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            {errors.status && <p className='error'>{errors.status}</p>}
            
            <label>Tikcet Title<span style={{color : 'red'}}> * </span></label>
            <input type="text" name="ticket_title" placeholder="Enter Tikcet title" value={formData.ticket_title} onChange={handleChange} />
            {errors.ticket_title && <p className='error'>{errors.ticket_title}</p>}


            <label>Employee name<span style={{color : 'red'}}> * </span></label>
            <input type="text" name="employee_name" placeholder="Enter Employee name" value={formData. employee_name} onChange={handleChange} />
            {errors.employee_name && <p className='error'>{errors.employee_name}</p>}

            <label>Closed Date<span style={{color:'red'}}> * </span></label>
            <input type="date" name="closed_date" placeholder="Enter closed date" value={formData.closed_date} onChange={handleChange} />
            {errors.closed_date && <p className='error'>{errors.closed_date}</p>}


            <label>Follow Up Required<span style={{color : 'red'}}> * </span></label>
            <input type="text" name="follow_up_required" placeholder="Enter follow up" value={formData.follow_up_required} onChange={handleChange} />
            {errors.follow_up_&& <p className='error'>{errors.follow_up_required}</p>}

            <label>Description:</label>
            <textarea type="text" name="description" placeholder="Enter description" value={formData.description} onChange={handleChange} />
            {errors.description && <p className='error'>{errors.description}</p>}

            <button type='submit'>Submit</button>
        </form>
    </div>
  );
};
export default TicketTrackerForm;
