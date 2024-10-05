"use client"

import { useState } from 'react';

const HomePage = () => {
  const [ownerData, setOwnerData] = useState({ name: '', email: '', password: '', phone: '' });
  const [siteData, setSiteData] = useState({ name: '', color: '', icon: '', tags: '', ownerId: '' });
  const [productData, setProductData] = useState({ name: '', description: '', location: '', tags: '', siteId: '' });
  
  const [responseMessage, setResponseMessage] = useState('');

  const handleOwnerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOwnerData({ ...ownerData, [e.target.name]: e.target.value });
  };

  const handleSiteChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSiteData({ ...siteData, [e.target.name]: e.target.value });
  };

  const handleProductChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleSubmitOwner = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/owners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ownerData),
      });
      const result = await response.json();
      setResponseMessage(JSON.stringify(result));
    } catch (error: unknown) {
      if (error instanceof Error) {
        setResponseMessage(`Error creating owner: ${error.message}`);
      } else {
        setResponseMessage('Error creating owner');
      }
    }
  };

  const handleSubmitSite = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/sites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...siteData,
          tags: siteData.tags.split(',').map(tag => tag.trim()),
        }),
      });
      const result = await response.json();
      setResponseMessage(JSON.stringify(result));
    } catch (error: unknown) {
      if (error instanceof Error) {
        setResponseMessage(`Error creating site: ${error.message}`);
      } else {
        setResponseMessage('Error creating site');
      }
    }
  };

  const handleSubmitProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...productData,
          tags: productData.tags.split(',').map(tag => tag.trim()),
        }),
      });
      const result = await response.json();
      setResponseMessage(JSON.stringify(result));
    } catch (error: unknown) {
      if (error instanceof Error) {
        setResponseMessage(`Error creating product: ${error.message}`);
      } else {
        setResponseMessage('Error creating product');
      }
    }
  };

  return (
    <div className="flex flex-col items-center p-5 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Test API</h1>

      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Create Owner</h2>
        <form onSubmit={handleSubmitOwner} className="space-y-4">
          <input type="text" name="name" placeholder="Name" onChange={handleOwnerChange} required className="w-full p-2 border border-gray-300 rounded" />
          <input type="email" name="email" placeholder="Email" onChange={handleOwnerChange} required className="w-full p-2 border border-gray-300 rounded" />
          <input type="password" name="password" placeholder="Password" onChange={handleOwnerChange} required className="w-full p-2 border border-gray-300 rounded" />
          <input type="text" name="phone" placeholder="Phone" onChange={handleOwnerChange} className="w-full p-2 border border-gray-300 rounded" />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Create Owner</button>
        </form>
      </div>

      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md mt-6">
        <h2 className="text-2xl font-semibold mb-4">Create Site</h2>
        <form onSubmit={handleSubmitSite} className="space-y-4">
          <input type="text" name="name" placeholder="Name" onChange={handleSiteChange} required className="w-full p-2 border border-gray-300 rounded" />
          <input type="text" name="color" placeholder="Color" onChange={handleSiteChange} required className="w-full p-2 border border-gray-300 rounded" />
          <input type="text" name="icon" placeholder="Icon" onChange={handleSiteChange} required className="w-full p-2 border border-gray-300 rounded" />
          <textarea name="tags" placeholder="Tags (comma separated)" onChange={handleSiteChange} className="w-full p-2 border border-gray-300 rounded"></textarea>
          <input type="text" name="ownerId" placeholder="Owner ID" onChange={handleSiteChange} required className="w-full p-2 border border-gray-300 rounded" />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Create Site</button>
        </form>
      </div>

      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md mt-6">
        <h2 className="text-2xl font-semibold mb-4">Create Product</h2>
        <form onSubmit={handleSubmitProduct} className="space-y-4">
          <input type="text" name="name" placeholder="Name" onChange={handleProductChange} required className="w-full p-2 border border-gray-300 rounded" />
          <input type="text" name="description" placeholder="Description" onChange={handleProductChange} required className="w-full p-2 border border-gray-300 rounded" />
          <input type="text" name="location" placeholder="Location" onChange={handleProductChange} required className="w-full p-2 border border-gray-300 rounded" />
          <textarea name="tags" placeholder="Tags (comma separated)" onChange={handleProductChange} className="w-full p-2 border border-gray-300 rounded"></textarea>
          <input type="text" name="siteId" placeholder="Site ID" onChange={handleProductChange} required className="w-full p-2 border border-gray-300 rounded" />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Create Product</button>
        </form>
      </div>

      <h2 className="text-2xl font-semibold mt-6">Response</h2>
      <pre className="bg-gray-200 p-4 rounded">{responseMessage}</pre>
    </div>
  );
};

export default HomePage;
