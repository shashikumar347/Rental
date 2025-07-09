// import React, { useState } from 'react';


// const Responsive = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     message: '',
//   });
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Form submitted:', formData);
//   };

//   return (
//     <form className="responsive-form" onSubmit={handleSubmit}>
//       <h2>Contact Us</h2>

//       <label htmlFor="name">Name</label>
//       <input
//         id="name"
//         name="name"
//         type="text"
//         placeholder="Enter your name"
//         value={formData.name}
//         onChange={handleChange}
//         required
//       />

//       <label htmlFor="email">Email</label>
//       <input
//         id="email"
//         name="email"
//         type="email"
//         placeholder="Enter your email"
//         value={formData.email}
//         onChange={handleChange}
//         required
//       />

//       <label htmlFor="message">Message</label>
//       <textarea
//         id="message"
//         name="message"
//         placeholder="Your message"
//         value={formData.message}
//         onChange={handleChange}
//         required
//       />

//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default Responsive;


import React, { useState } from 'react';

const Responsive = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Optional: Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="form-container">
      <form className="form-card" onSubmit={handleSubmit}>
        <label>First name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          placeholder="Your name"
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="Your email"
          onChange={handleChange}
          required
        />

        <label>Message</label>
        <textarea
          name="message"
          value={formData.message}
          placeholder="Your message"
          onChange={handleChange}
          rows="4"
          required
        ></textarea>

        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Responsive;

