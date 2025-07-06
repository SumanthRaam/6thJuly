import React, { useState, useEffect } from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { API, graphqlOperation } from 'aws-amplify';
import { createContribution, listContributions } from './graphql/mutations';
import { listContributions as listContributionsQuery } from './graphql/queries';
import { format } from 'date-fns';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    relation: '',
    address: '',
    phoneNumber: '',
    amount: '',
    date: format(new Date(), 'yyyy-MM-dd')
  });
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchContributions();
  }, []);

  const fetchContributions = async () => {
    try {
      setLoading(true);
      const result = await API.graphql(graphqlOperation(listContributionsQuery));
      const sortedContributions = result.data.listContributions.items.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setContributions(sortedContributions);
    } catch (error) {
      console.error('Error fetching contributions:', error);
      toast.error('Failed to load contributions');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error('Name is required');
      return false;
    }
    if (!formData.relation.trim()) {
      toast.error('S/O or D/O is required');
      return false;
    }
    if (!formData.address.trim()) {
      toast.error('Address is required');
      return false;
    }
    if (!formData.phoneNumber.trim()) {
      toast.error('Phone number is required');
      return false;
    }
    if (!/^[0-9]{10}$/.test(formData.phoneNumber)) {
      toast.error('Phone number must be 10 digits');
      return false;
    }
    if (!formData.amount || formData.amount <= 0) {
      toast.error('Amount must be greater than 0');
      return false;
    }
    if (!formData.date) {
      toast.error('Date is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Check if phone number already exists
    const phoneExists = contributions.some(
      contrib => contrib.phoneNumber === formData.phoneNumber
    );
    
    if (phoneExists) {
      toast.error('Phone number already exists in our records');
      return;
    }

    try {
      setSubmitting(true);
      
      const contributionInput = {
        name: formData.name.trim(),
        relation: formData.relation.trim(),
        address: formData.address.trim(),
        phoneNumber: formData.phoneNumber.trim(),
        amount: parseInt(formData.amount),
        date: formData.date
      };

      await API.graphql(
        graphqlOperation(createContribution, { input: contributionInput })
      );

      toast.success('Contribution submitted successfully!');
      
      // Reset form
      setFormData({
        name: '',
        relation: '',
        address: '',
        phoneNumber: '',
        amount: '',
        date: format(new Date(), 'yyyy-MM-dd')
      });

      // Refresh contributions list
      await fetchContributions();
      
    } catch (error) {
      console.error('Error creating contribution:', error);
      if (error.errors && error.errors[0].message.includes('phoneNumber')) {
        toast.error('Phone number already exists in our records');
      } else {
        toast.error('Failed to submit contribution. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const totalAmount = contributions.reduce((sum, contrib) => sum + contrib.amount, 0);

  return (
    <div className="App">
      <div className="container">
        <div className="header">
          <h1>🕉️ Ganesh Utsav Contributions</h1>
          <p>Manage and track contributions for Ganesh Utsav celebrations</p>
        </div>

        <div className="card">
          <h2>Submit New Contribution</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter full name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="relation">S/O or D/O *</label>
              <input
                type="text"
                id="relation"
                name="relation"
                value={formData.relation}
                onChange={handleInputChange}
                placeholder="Son of / Daughter of"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Address *</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter complete address"
                rows="3"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number *</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="10 digit mobile number"
                pattern="[0-9]{10}"
                maxLength="10"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="amount">Amount (INR) *</label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                placeholder="Enter amount in INR"
                min="1"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="date">Date *</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </div>

            <button 
              type="submit" 
              className="btn" 
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : 'Submit Contribution'}
            </button>
          </form>
        </div>

        <div className="card">
          <h2>Contributions Summary</h2>
          <div style={{ marginBottom: '20px' }}>
            <strong>Total Contributions: {contributions.length}</strong>
            <br />
            <strong>Total Amount: ₹{totalAmount.toLocaleString()}</strong>
          </div>

          {loading ? (
            <div className="loading">Loading contributions...</div>
          ) : (
            <div className="contributions-list">
              {contributions.length === 0 ? (
                <p>No contributions found.</p>
              ) : (
                contributions.map((contribution) => (
                  <div key={contribution.id} className="contribution-item">
                    <h3>{contribution.name}</h3>
                    <div className="contribution-details">
                      <div><span>Relation:</span> {contribution.relation}</div>
                      <div><span>Phone:</span> {contribution.phoneNumber}</div>
                      <div><span>Amount:</span> ₹{contribution.amount.toLocaleString()}</div>
                      <div><span>Date:</span> {format(new Date(contribution.date), 'dd/MM/yyyy')}</div>
                    </div>
                    <div style={{ marginTop: '10px' }}>
                      <span>Address:</span> {contribution.address}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
      
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default withAuthenticator(App, {
  signUpAttributes: ['email'],
  socialProviders: [],
  variation: 'default'
}); 