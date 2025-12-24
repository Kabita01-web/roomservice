import AdminWrapper from '@/AdminWrapper/AdminWrapper'
import React from 'react'
import { useState } from 'react'

const Settings = () => {
  const [isEditingPersonal, setIsEditingPersonal] = useState(false)
  const [isEditingAddress, setIsEditingAddress] = useState(false)
  
  const [profileData, setProfileData] = useState({
    fullName: 'Rafiqur Rahman',
    email: 'rafiqurrahman951@gmail.com',
    phone: '+09 345 366 66',
    country: 'United Kingdom',
    city: 'Leeds, East London',
    streetCode: 'E8T 2356',
    
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div>
      <AdminWrapper>
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="p-8">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8">My Profile</h2>

          {/* Profile Header */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img 
                  src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg" 
                  alt="Profile" 
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {profileData.fullName}
                  </h3>
                  <p className="text-sm text-gray-500">Property owner</p>
                  <p className="text-xs text-gray-400">Leeds, United Kingdom</p>
                </div>
              </div>
              
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Personal Information</h3>
              {!isEditingPersonal ? (
                <button 
                  onClick={() => setIsEditingPersonal(true)}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                >
                  Edit <span className="text-lg">✎</span>
                </button>
              ) : (
                <div className="flex gap-3">
                  <button 
                    onClick={() => setIsEditingPersonal(false)}
                    className="text-gray-600 hover:text-gray-700 text-sm font-medium"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => setIsEditingPersonal(false)}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Save
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-xs text-gray-500 mb-2">Full Name</label>
                <input 
                  type="text"
                  name="fullName"
                  value={profileData.fullName}
                  onChange={handleInputChange}
                  disabled={!isEditingPersonal}
                  className={`w-full text-sm text-gray-700 ${
                    isEditingPersonal 
                      ? 'border-b border-gray-300 focus:border-blue-500 outline-none pb-1' 
                      : 'border-none'
                  }`}
                />
              </div>
              
             

              <div>
                <label className="block text-xs text-gray-500 mb-2">Email address</label>
                <input 
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  disabled={!isEditingPersonal}
                  className={`w-full text-sm text-gray-700 ${
                    isEditingPersonal 
                      ? 'border-b border-gray-300 focus:border-blue-500 outline-none pb-1' 
                      : 'border-none'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-2">Phone</label>
                <input 
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditingPersonal}
                  className={`w-full text-sm text-gray-700 ${
                    isEditingPersonal 
                      ? 'border-b border-gray-300 focus:border-blue-500 outline-none pb-1' 
                      : 'border-none'
                  }`}
                />
              </div>

              <div className="col-span-2">
                <label className="block text-xs text-gray-500 mb-2">Bio</label>
                <input 
                  type="text"
                  name="bio"
                  value={profileData.bio}
                  onChange={handleInputChange}
                  disabled={!isEditingPersonal}
                  className={`w-full text-sm text-gray-700 ${
                    isEditingPersonal 
                      ? 'border-b border-gray-300 focus:border-blue-500 outline-none pb-1' 
                      : 'border-none'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Address</h3>
              {!isEditingAddress ? (
                <button 
                  onClick={() => setIsEditingAddress(true)}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                >
                  Edit <span className="text-lg">✎</span>
                </button>
              ) : (
                <div className="flex gap-3">
                  <button 
                    onClick={() => setIsEditingAddress(false)}
                    className="text-gray-600 hover:text-gray-700 text-sm font-medium"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => setIsEditingAddress(false)}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Save
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-xs text-gray-500 mb-2">Country</label>
                <input 
                  type="text"
                  name="country"
                  value={profileData.country}
                  onChange={handleInputChange}
                  disabled={!isEditingAddress}
                  className={`w-full text-sm text-gray-700 ${
                    isEditingAddress 
                      ? 'border-b border-gray-300 focus:border-blue-500 outline-none pb-1' 
                      : 'border-none'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-2">City, State</label>
                <input 
                  type="text"
                  name="city"
                  value={profileData.city}
                  onChange={handleInputChange}
                  disabled={!isEditingAddress}
                  className={`w-full text-sm text-gray-700 ${
                    isEditingAddress 
                      ? 'border-b border-gray-300 focus:border-blue-500 outline-none pb-1' 
                      : 'border-none'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-2">street Code</label>
                <input 
                  type="text"
                  name="postalCode"
                  value={profileData.postalCode}
                  onChange={handleInputChange}
                  disabled={!isEditingAddress}
                  className={`w-full text-sm text-gray-700 ${
                    isEditingAddress 
                      ? 'border-b border-gray-300 focus:border-blue-500 outline-none pb-1' 
                      : 'border-none'
                  }`}
                />
              </div>

             
            </div>
          </div>
        </div>
      </div>
    </div>
  <div className="p-8">
    <button className='rounded-md p-2 hover:bg-red-600 bg-red-500 text-white'>Delete Account</button>
  </div>

      </AdminWrapper>
    </div>
  )
}

export default Settings
