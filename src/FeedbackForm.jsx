import { useState } from 'react'
import { submitFeedback } from './analytics'

function FeedbackForm({ publicKey, onClose }) {
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [whatWorkedWell, setWhatWorkedWell] = useState('')
  const [whatNeedsImprovement, setWhatNeedsImprovement] = useState('')
  const [featureSuggestions, setFeatureSuggestions] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (rating === 0) {
      alert('Please select a rating')
      return
    }
    
    submitFeedback(publicKey, rating, feedback, {
      whatWorkedWell,
      whatNeedsImprovement,
      featureSuggestions
    })
    
    setSubmitted(true)
    
    // Close after 2 seconds
    setTimeout(() => {
      if (onClose) onClose()
    }, 2000)
  }

  if (submitted) {
    return (
      <div style={styles.overlay}>
        <div style={styles.modal}>
          <div style={styles.successMessage}>
            <h2 style={styles.successTitle}>✅ Thank You!</h2>
            <p style={styles.successText}>Your feedback has been submitted successfully.</p>
            <p style={styles.successSubtext}>We appreciate your input!</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <h2 style={styles.title}>📝 Share Your Feedback</h2>
          <button style={styles.closeButton} onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Rating */}
          <div style={styles.formGroup}>
            <label style={styles.label}>
              Overall Rating <span style={styles.required}>*</span>
            </label>
            <div style={styles.starContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  style={{
                    ...styles.star,
                    ...(rating >= star ? styles.starFilled : {})
                  }}
                  onClick={() => setRating(star)}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  {rating >= star ? '★' : '☆'}
                </button>
              ))}
              <span style={styles.ratingText}>
                {rating > 0 && (
                  rating === 5 ? 'Excellent!' :
                  rating === 4 ? 'Good!' :
                  rating === 3 ? 'Okay' :
                  rating === 2 ? 'Needs Work' :
                  'Poor'
                )}
              </span>
            </div>
          </div>

          {/* General Feedback */}
          <div style={styles.formGroup}>
            <label style={styles.label}>
              General Feedback
            </label>
            <textarea
              style={styles.textarea}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Tell us about your experience..."
              rows={3}
            />
          </div>

          {/* What Worked Well */}
          <div style={styles.formGroup}>
            <label style={styles.label}>
              What worked well?
            </label>
            <textarea
              style={styles.textarea}
              value={whatWorkedWell}
              onChange={(e) => setWhatWorkedWell(e.target.value)}
              placeholder="What did you like about the app?"
              rows={2}
            />
          </div>

          {/* What Needs Improvement */}
          <div style={styles.formGroup}>
            <label style={styles.label}>
              What needs improvement?
            </label>
            <textarea
              style={styles.textarea}
              value={whatNeedsImprovement}
              onChange={(e) => setWhatNeedsImprovement(e.target.value)}
              placeholder="What could be better?"
              rows={2}
            />
          </div>

          {/* Feature Suggestions */}
          <div style={styles.formGroup}>
            <label style={styles.label}>
              Feature Suggestions
            </label>
            <textarea
              style={styles.textarea}
              value={featureSuggestions}
              onChange={(e) => setFeatureSuggestions(e.target.value)}
              placeholder="What features would you like to see?"
              rows={2}
            />
          </div>

          {/* Submit Button */}
          <div style={styles.buttonGroup}>
            <button
              type="button"
              style={styles.cancelButton}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={styles.submitButton}
              disabled={rating === 0}
            >
              Submit Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px'
  },
  modal: {
    backgroundColor: '#1a1a2e',
    borderRadius: '12px',
    width: '100%',
    maxWidth: '600px',
    maxHeight: '90vh',
    overflow: 'auto',
    border: '2px solid #00d4ff',
    boxShadow: '0 10px 50px rgba(0, 212, 255, 0.3)'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    borderBottom: '1px solid #00d4ff'
  },
  title: {
    margin: 0,
    color: '#00d4ff',
    fontSize: '1.5rem'
  },
  closeButton: {
    background: 'none',
    border: 'none',
    color: '#00d4ff',
    fontSize: '2rem',
    cursor: 'pointer',
    padding: '0',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    transition: 'background-color 0.3s'
  },
  form: {
    padding: '20px'
  },
  formGroup: {
    marginBottom: '20px'
  },
  label: {
    display: 'block',
    color: '#e0e0e0',
    marginBottom: '8px',
    fontSize: '0.95rem',
    fontWeight: '500'
  },
  required: {
    color: '#ff4444'
  },
  starContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px'
  },
  star: {
    background: 'none',
    border: 'none',
    fontSize: '2.5rem',
    cursor: 'pointer',
    color: '#666',
    transition: 'all 0.2s',
    padding: '0',
    lineHeight: '1'
  },
  starFilled: {
    color: '#ffd700'
  },
  ratingText: {
    marginLeft: '15px',
    color: '#00d4ff',
    fontSize: '1.1rem',
    fontWeight: '500'
  },
  textarea: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#0f0f1e',
    border: '1px solid #00d4ff',
    borderRadius: '8px',
    color: '#e0e0e0',
    fontSize: '0.95rem',
    fontFamily: 'inherit',
    resize: 'vertical',
    boxSizing: 'border-box'
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'flex-end',
    marginTop: '25px'
  },
  cancelButton: {
    padding: '12px 24px',
    backgroundColor: 'transparent',
    color: '#00d4ff',
    border: '1px solid #00d4ff',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'all 0.3s'
  },
  submitButton: {
    padding: '12px 24px',
    backgroundColor: '#00d4ff',
    color: '#0f0f1e',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'all 0.3s'
  },
  successMessage: {
    padding: '40px',
    textAlign: 'center'
  },
  successTitle: {
    color: '#4caf50',
    fontSize: '2rem',
    marginBottom: '15px'
  },
  successText: {
    color: '#e0e0e0',
    fontSize: '1.2rem',
    marginBottom: '10px'
  },
  successSubtext: {
    color: '#00d4ff',
    fontSize: '1rem'
  }
}

export default FeedbackForm
