import React,{ useState } from "react"
import swal from 'sweetalert';
import axios  from "axios";


const EmployeeForm = () => {
 
   const[formData,setFormData] = useState({
      employee_name:'',
      salary:'',
      designation:'',
      join_date:'',
      employee_phone_number:'',
      employee_mail:'',
   });

   const[submittedData,setSubmittedData] = useState([]);
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
    if(!formData.employee_name.trim()) {
      newErrors.employee_name = 'employee name is required ';
    }
    if(!formData.salary || parseFloat(formData.salary) <= 0) {
      newErrors.salary = 'Salary must be a positive number';
    }
    if(!formData.designation){
      newErrors.designation = 'choose the designation';
    }
    if(!formData.join_date) {
      newErrors.join_date = 'date of joining is required ';
    }
    if(!formData.employee_phone_number) {
      newErrors.employee_phone_number = 'employee phone number  is required ';
    } else if (!/^\d{10}$/.test(formData.employee_phone_number)) {
    newErrors.employee_phone_number = 'Phone number must be exactly 10 digits';
  }

    if(!formData.employee_mail) {
      newErrors.employee_mail = 'employee mail is required ';
    }
    setErrors(newErrors);
    // return Object.keys(newErrors).length === 0;
      if(Object.keys(newErrors).length === 0){

      axios.post("http://localhost:10000/top", formData)
      .then((res) =>{
        console.log(res)
      }).catch((err) =>{
        console.log(err)
      })
     }
  }

  //  const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if(validate()){
  //   setSubmittedData((prev) => [...prev,formData]);
  //   console.log('Submitted:', formData);
  //       swal({
  //       title: "Good job!",
  //       text: "Form submitted successfully!",
  //       icon: "success",
  //       button: "ok",
  //     });
  //   }else{
  //         swal({
  //       title: "Enter all fields",
  //       icon: "error",
  //       button: "ok",
  //     });
  //   }
  //   setFormData({
  //     employee_name:'',
  //     salary:'',
  //     employee_type:'',
  //     job_title:'',
  //     join_date:'',
  //     employee_phone_number:'',
  //     employee_mail:'',
  //   });
  // };


  return (
    <div className="employee-form-container">
        <form className="employee-form-card" onSubmit={validate}>
         <h1>Employee Add</h1>

        <label>Employee Name<span style={{color:'red'}}> * </span></label>
        <input type="text" name="employee_name" placeholder="Enter Employee Name" value={formData.employee_name} onChange={handleChange}  />
        {errors.employee_name && <p className='error'>{errors.employee_name}</p>}

        <label>Salary<span style={{color:'red'}}> * </span></label>
        <input type="text" name="salary" placeholder="Enter Salary" value={formData.salary} onChange={handleChange}  />
        {errors.salary && <p className='error'>{errors.salary}</p>}
    
        <label>Designation<span style={{color:'red'}}> * </span></label>
        <input type="text" name="designation" placeholder="Enter designation" value={formData.designation} onChange={handleChange}  />
        {errors.designation && <p className='error'>{errors.designation}</p>}


        <label>Date of joining<span style={{color:'red'}}> * </span></label>
        <input type="date" name="join_date" placeholder="Enter Join date" value={formData.join_date} onChange={handleChange}  />
        {errors.join_date && <p className='error'>{errors.join_date}</p>}

        <label>Employee Phone Number<span style={{color:'red'}}> * </span></label>
        <input type="number" name="employee_phone_number" placeholder="Enter Employee phone number" value={formData.employee_phone_number} onChange={handleChange}  />
        {errors.employee_phone_number && <p className='error'>{errors.employee_phone_number}</p>}

        <label>Employee Email<span style={{color:'red'}}> * </span></label>
        <input type="email" name="employee_mail" placeholder="Enter Employee Email" value={formData.employee_mail} onChange={handleChange}  />
        {errors.employee_mail && <p className='error'>{errors.employee_mail}</p>}

        <button type="submit">Submit</button>

        </form>
      {/*   <div className="submitted-entries">
        {submittedData.map((data, index) => (
          <div key={index} className="submitted-entry">
            <p><strong>ID:</strong> {data.employee_id}</p>
            <p><strong>Property:</strong> {data.name}</p>
            <p><strong>Type:</strong> {data.salary}</p>
            <p><strong>Amount:</strong> {data.expenses_amount}</p>
            <p><strong>Date:</strong> {data.employee_type}</p>
            <p><strong>Status:</strong> {data.job_title}</p>
            <p><strong>Description:</strong> {data.join_date}</p>
            <p><strong>Description:</strong> {data.employee_phone_number}</p>
            <p><strong>Description:</strong> {data.employee_mail}</p>
            <hr />
          </div>
        ))}
      </div> */}

    </div>
  );
};
export default EmployeeForm;
