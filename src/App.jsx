import { useState } from 'react';
import './App.css';
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    attendingWithGuest: 'No',
    guestName: ''
  });
  const [isSubmit, setIsSubmit] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    setErrors({ ...errors, [name]: undefined });
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.age) newErrors.age = "Age is required";
    else if (isNaN(formData.age) || formData.age <= 0) newErrors.age = "Age must be a number greater than 0";
    if (formData.attendingWithGuest === 'Yes' && !formData.guestName) newErrors.guestName = "Guest name is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      setIsSubmit(true);
    } else {
      setErrors(newErrors);
    }
    console.log(formData)
  };

  return (
    <div>
      {!isSubmit ? (
        <div className="container">
        <form onSubmit={handleSubmit}>
           <h1>Event Registration Form</h1>
          <div>
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
            {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
          </div>
          <div>
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
            {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
          </div>
          <div>
            <label>Age:</label>
            <input type="number" name="age" value={formData.age} onChange={handleChange} />
            {errors.age && <p style={{ color: 'red' }}>{errors.age}</p>}
          </div>
          <div>
            <label>Are you attending with a guest?</label>
            <select name="attendingWithGuest" value={formData.attendingWithGuest} onChange={handleChange}>
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>
          {formData.attendingWithGuest === 'Yes' && (
            <div>
              <label>Guest Name:</label>
              <input type="text" name="guestName" value={formData.guestName} onChange={handleChange} />
              {errors.guestName && <p style={{ color: 'red' }}>{errors.guestName}</p>}
            </div>
          )}
          <button className="submit btn" type="submit">Submit</button>
        </form>
        </div>
      ) : (
        <div className="summary">
          <h2>Registration Summary</h2>
          <p><strong>Name:</strong> {formData.name}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Age:</strong> {formData.age}</p>
          {formData.attendingWithGuest === 'Yes' || formData.attendingWithGuest === '' ? (
            <p><strong>Attending with Guest:</strong> {formData.attendingWithGuest}</p>
           ) : 
           (
            <p><strong>Attending with Guest:</strong> No</p>
           )}
          {formData.attendingWithGuest === 'Yes' && (
            <p><strong>Guest Name:</strong> {formData.guestName}</p>
          )}
          <button className="btn" onClick={() => setIsSubmit(false)}>Edit</button>
          <button className="btn" onClick={() => {
            toast.success("Submitted Successfully")
            setIsSubmit(false)
            setFormData("")
          }}> Save</button>
        </div>
      )}
    </div>
  );
}

export default App;
