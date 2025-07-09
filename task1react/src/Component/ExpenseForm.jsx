import React, { useState } from 'react';
import swal from 'sweetalert';
import axios from 'axios';


const ExpenseForm = () => {
  const [formData, setFormData] = useState({
    expenses_type: '',
    expenses_amount: '',
    expenses_date: '',
    expenses_status: '',
    description: '',
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
    if (!formData.expenses_type.trim()) {
      newErrors.expenses_type = 'choose your expenses type';
    }
    if (!formData.expenses_amount || parseFloat(formData.expenses_amount) <= 0) {
      newErrors.expenses_amount = 'Amount must be  a positive number';
    }
    if (!formData.expenses_date) {
      newErrors.expenses_date = 'date is required';
    }
    if (!formData.expenses_status.trim()) {
      newErrors.expenses_status = 'status is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    setErrors(newErrors);
    // return 
    
    if(Object.keys(newErrors).length === 0){

      axios.post("http://localhost:11000/submit", formData)
      .then((res) =>{
        console.log(res)
      }).catch((err) =>{
        console.log(err)
      })
     }
  }

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validate()) {
//       console.log('Submitted:', formData);
//       swal({
//         title: "Good job!",
//         text: "Form submitted successfully!",
//         icon: "success",
//         button: "ok",
//       });
//     } else{
//         swal({
//         title: "Enter all fields",
//         icon: "error",
//         button: "ok",
//       });
//   }
// }

  return (
    <div className="expense-form-container">
      <form className="expense-form-card" onSubmit={validate}>
        <h1>Expense Form</h1>

        <label>Expenses Type<span style={{color:'red'}}> * </span></label>
        <select name="expenses_type" value={formData.expenses_type} onChange={handleChange} class="expenses">
          <option value="">-- Select Expense Type --</option>
          <option value="Maintenance">Maintenance</option>
          <option value="Utilities">Utilities</option>
          <option value="Supplies">Supplies</option>
          <option value="Travel">Travel</option>
          <option value="Other">Other</option>
        </select>
        {errors.expenses_type && <p className='error'>{errors.expenses_type}</p>}


        <label>Amount<span style={{color : 'red'}}> * </span></label>
        <input type="number" name="expenses_amount" placeholder="Expense Amount" value={formData.expenses_amount} onChange={handleChange} />
        {errors.expenses_amount && <p className='error'>{errors.expenses_amount}</p>}

        <label>Date<span style={{color:'red'}}> * </span></label>
        <input type="date" name="expenses_date" value={formData.expenses_date} onChange={handleChange} />
        {errors.expenses_date && <p className='error'>{errors.expenses_date}</p>}

        <label>Status<span style={{color:'red'}}> * </span></label>
        <input type="text" name="expenses_status" placeholder="Status" value={formData.expenses_status} onChange={handleChange} />
        {errors.expenses_status && <p className='error'>{errors.expenses_status}</p>}

        <label>Description</label>
        <textarea name="description" placeholder="Write a description" value={formData.description} onChange={handleChange} rows="3" />
        {errors.description && <p className='error'>{errors.description}</p>}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ExpenseForm;
