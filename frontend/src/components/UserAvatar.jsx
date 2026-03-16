import React from 'react'
import { useShoe } from '../context/ShoeStore'

const UserAvatar = ({ size = 'medium', showUpload = false, isClickable = false }) => {
    const { state } = useShoe()

    const profileImage = state.auth.profileImage
    const userName = state.auth.user?.name || 'Usuario'

    const getInitials = () => {
        if (!userName) return 'U'
        return userName
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2)
    }

    const sizes = {
        small: { width: 30, height: 30, fontSize: 14 },
        medium: { width: 48, height: 48, fontSize: 18 },
        large: { width: 80, height: 80, fontSize: 24 }
    }

    const currentSize = sizes[size] || sizes.medium

    const avatarStyle = {
        width: currentSize.width,
        height: currentSize.height,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: currentSize.fontSize,
        fontWeight: '600',
        color: 'white',
        overflow: 'hidden',
        flexShrink: 0,
        background: !profileImage ? 'linear-gradient(135deg, #A67B5B 0%, #8B5A2B 100%)' : 'none',
        cursor: isClickable ? 'pointer' : 'default'
    }

    const Component = isClickable ? 'button' : 'div';

    if (profileImage) {
        return (
            <Component style={avatarStyle} className="user-avatar">
                <img
                    src={profileImage}
                    alt={userName}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                />
            </Component>
        )
    }

    return (
        <Component style={avatarStyle} className="user-avatar">
            {getInitials()}
        </Component>
    )
}

export default UserAvatar