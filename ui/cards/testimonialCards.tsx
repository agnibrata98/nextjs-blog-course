import React from 'react'

const TestimonialCards = ({name, position, talk}:{name:string, position:string, talk:string}) => {
  return (
    <div>
        <div
      className="testimonial-card"
      style={{
        background: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        width: '100%',
        maxWidth: '400px',
        margin: '0 auto',
        padding: '20px',
        textAlign: 'center',
        height:"auto"
      }}
    //   initial={{ opacity: 0, y: 50 }}
    //   animate={{ opacity: 1, y: 0 }}
    //   transition={{ duration: 0.6 }}
    >
      <img
        src={`https://avatar.iran.liara.run/public/boy?username=${name}`}
        alt={name}
        style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          objectFit: 'cover',
          marginBottom: '15px',
        }}
      />
      <h3 style={{ fontSize: '18px', marginBottom: '5px', fontWeight: 'bold' }}>{name}</h3>
      <p style={{ color: '#777', marginBottom: '10px' }}>{position}</p>

      {/* <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '15px' }}>
        {starRating.map((filled, index) => (
          <FaStar
            key={index}
            color={filled ? '#FFD700' : '#dcdcdc'}
            size={20}
            style={{ margin: '0 2px' }}
          />
        ))}
      </div> */}

      <p style={{ fontStyle: 'italic', color: '#555', fontSize: '16px' }}>"{talk.substring(0, 100)}"{talk.length > 100 && '...'}</p>
        </div>
    </div>
  )
}

export default TestimonialCards