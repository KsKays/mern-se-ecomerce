import React from 'react';

const UserProfile = ({ user }) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg p-4 bg-white">
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{user.name}</div>
                <p className="text-gray-700 text-base">
                    Email: {user.email}
                </p>
                <p className="text-gray-700 text-base">
                    Phone: {user.phone}
                </p>
            </div>
        </div>
    );
};

export default UserProfile;
