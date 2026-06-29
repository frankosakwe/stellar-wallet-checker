/**
 * Analytics and User Tracking System
 * 
 * Tracks user interactions, wallet connections, and contract calls
 * Stores data in localStorage for proof of usage
 */

// Analytics event types
export const AnalyticsEvents = {
  WALLET_CONNECTED: 'wallet_connected',
  WALLET_DISCONNECTED: 'wallet_disconnected',
  BALANCE_FETCHED: 'balance_fetched',
  TRANSACTION_SENT: 'transaction_sent',
  TRANSACTION_SUCCESS: 'transaction_success',
  TRANSACTION_FAILED: 'transaction_failed',
  CONTRACT_CALLED: 'contract_called',
  CONTRACT_SUCCESS: 'contract_success',
  CONTRACT_FAILED: 'contract_failed',
  PAGE_VIEW: 'page_view',
  ERROR_OCCURRED: 'error_occurred',
  FEEDBACK_SUBMITTED: 'feedback_submitted'
}

// Storage keys
const STORAGE_KEYS = {
  USERS: 'stellar_app_users',
  EVENTS: 'stellar_app_events',
  FEEDBACK: 'stellar_app_feedback',
  SESSION: 'stellar_app_session'
}

/**
 * Initialize analytics system
 */
export const initAnalytics = () => {
  // Initialize storage if not exists
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([]))
  }
  if (!localStorage.getItem(STORAGE_KEYS.EVENTS)) {
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify([]))
  }
  if (!localStorage.getItem(STORAGE_KEYS.FEEDBACK)) {
    localStorage.setItem(STORAGE_KEYS.FEEDBACK, JSON.stringify([]))
  }
  
  // Track page view
  trackEvent(AnalyticsEvents.PAGE_VIEW, {
    path: window.location.pathname,
    timestamp: new Date().toISOString()
  })
  
  console.log('📊 Analytics initialized')
}

/**
 * Track an analytics event
 * @param {string} eventName - Name of the event
 * @param {object} data - Additional data for the event
 */
export const trackEvent = (eventName, data = {}) => {
  try {
    const event = {
      id: generateId(),
      name: eventName,
      data: data,
      timestamp: new Date().toISOString(),
      sessionId: getSessionId()
    }
    
    // Store event
    const events = getEvents()
    events.push(event)
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events))
    
    // Log to console in development
    if (import.meta.env.DEV) {
      console.log('📊 Event tracked:', eventName, data)
    }
    
    return event
  } catch (error) {
    console.error('Failed to track event:', error)
  }
}

/**
 * Track wallet connection
 * @param {string} publicKey - User's wallet public key
 * @param {string} walletType - Type of wallet (freighter, xbull)
 */
export const trackWalletConnection = (publicKey, walletType) => {
  // Add user to users list
  const users = getUsers()
  const existingUser = users.find(u => u.publicKey === publicKey)
  
  if (!existingUser) {
    const newUser = {
      id: generateId(),
      publicKey: publicKey,
      walletType: walletType,
      firstSeen: new Date().toISOString(),
      lastSeen: new Date().toISOString(),
      interactionCount: 1
    }
    users.push(newUser)
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users))
  } else {
    // Update existing user
    existingUser.lastSeen = new Date().toISOString()
    existingUser.interactionCount = (existingUser.interactionCount || 0) + 1
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users))
  }
  
  // Track event
  trackEvent(AnalyticsEvents.WALLET_CONNECTED, {
    publicKey: maskPublicKey(publicKey),
    walletType: walletType
  })
}

/**
 * Track transaction
 * @param {string} publicKey - User's wallet public key
 * @param {string} txHash - Transaction hash
 * @param {string} type - Transaction type
 * @param {boolean} success - Whether transaction succeeded
 */
export const trackTransaction = (publicKey, txHash, type, success = true) => {
  const eventName = success ? AnalyticsEvents.TRANSACTION_SUCCESS : AnalyticsEvents.TRANSACTION_FAILED
  
  trackEvent(eventName, {
    publicKey: maskPublicKey(publicKey),
    txHash: txHash,
    type: type,
    success: success
  })
}

/**
 * Track contract interaction
 * @param {string} publicKey - User's wallet public key
 * @param {string} functionName - Contract function called
 * @param {string} txHash - Transaction hash (if available)
 * @param {boolean} success - Whether call succeeded
 */
export const trackContractInteraction = (publicKey, functionName, txHash = null, success = true) => {
  const eventName = success ? AnalyticsEvents.CONTRACT_SUCCESS : AnalyticsEvents.CONTRACT_FAILED
  
  trackEvent(eventName, {
    publicKey: maskPublicKey(publicKey),
    functionName: functionName,
    txHash: txHash,
    success: success
  })
}

/**
 * Track error
 * @param {string} errorMessage - Error message
 * @param {string} context - Context where error occurred
 */
export const trackError = (errorMessage, context) => {
  trackEvent(AnalyticsEvents.ERROR_OCCURRED, {
    message: errorMessage,
    context: context
  })
}

/**
 * Submit user feedback
 * @param {string} publicKey - User's wallet public key
 * @param {number} rating - Rating (1-5)
 * @param {string} feedback - Feedback text
 * @param {object} additionalData - Additional feedback data
 */
export const submitFeedback = (publicKey, rating, feedback, additionalData = {}) => {
  const feedbackEntry = {
    id: generateId(),
    publicKey: maskPublicKey(publicKey),
    rating: rating,
    feedback: feedback,
    ...additionalData,
    timestamp: new Date().toISOString()
  }
  
  const feedbacks = getFeedback()
  feedbacks.push(feedbackEntry)
  localStorage.setItem(STORAGE_KEYS.FEEDBACK, JSON.stringify(feedbacks))
  
  trackEvent(AnalyticsEvents.FEEDBACK_SUBMITTED, {
    rating: rating,
    hasText: feedback.length > 0
  })
  
  return feedbackEntry
}

/**
 * Get all tracked users
 * @returns {Array} List of users
 */
export const getUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]')
  } catch {
    return []
  }
}

/**
 * Get all tracked events
 * @returns {Array} List of events
 */
export const getEvents = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.EVENTS) || '[]')
  } catch {
    return []
  }
}

/**
 * Get all feedback
 * @returns {Array} List of feedback entries
 */
export const getFeedback = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.FEEDBACK) || '[]')
  } catch {
    return []
  }
}

/**
 * Get analytics summary
 * @returns {object} Summary of analytics data
 */
export const getAnalyticsSummary = () => {
  const users = getUsers()
  const events = getEvents()
  const feedback = getFeedback()
  
  // Calculate metrics
  const totalUsers = users.length
  const totalInteractions = events.length
  const walletConnections = events.filter(e => e.name === AnalyticsEvents.WALLET_CONNECTED).length
  const transactionsSent = events.filter(e => e.name === AnalyticsEvents.TRANSACTION_SUCCESS).length
  const contractCalls = events.filter(e => e.name === AnalyticsEvents.CONTRACT_SUCCESS).length
  const errors = events.filter(e => e.name === AnalyticsEvents.ERROR_OCCURRED).length
  
  // Calculate average rating
  const avgRating = feedback.length > 0
    ? (feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length).toFixed(2)
    : 0
  
  // Calculate success rates
  const totalTransactions = events.filter(e => 
    e.name === AnalyticsEvents.TRANSACTION_SUCCESS || 
    e.name === AnalyticsEvents.TRANSACTION_FAILED
  ).length
  const transactionSuccessRate = totalTransactions > 0
    ? ((transactionsSent / totalTransactions) * 100).toFixed(1)
    : 100
  
  const totalContractCalls = events.filter(e => 
    e.name === AnalyticsEvents.CONTRACT_SUCCESS || 
    e.name === AnalyticsEvents.CONTRACT_FAILED
  ).length
  const contractSuccessRate = totalContractCalls > 0
    ? ((contractCalls / totalContractCalls) * 100).toFixed(1)
    : 100
  
  return {
    users: {
      total: totalUsers,
      unique: totalUsers,
      list: users.map(u => ({
        publicKey: u.publicKey,
        firstSeen: u.firstSeen,
        lastSeen: u.lastSeen,
        interactions: u.interactionCount
      }))
    },
    interactions: {
      total: totalInteractions,
      walletConnections: walletConnections,
      transactionsSent: transactionsSent,
      contractCalls: contractCalls,
      errors: errors
    },
    successRates: {
      transactions: `${transactionSuccessRate}%`,
      contractCalls: `${contractSuccessRate}%`
    },
    feedback: {
      total: feedback.length,
      averageRating: avgRating,
      ratings: feedback.map(f => f.rating),
      comments: feedback.map(f => ({
        rating: f.rating,
        feedback: f.feedback,
        timestamp: f.timestamp
      }))
    },
    timestamp: new Date().toISOString()
  }
}

/**
 * Export analytics data as JSON
 * @returns {object} Complete analytics data
 */
export const exportAnalyticsData = () => {
  return {
    users: getUsers(),
    events: getEvents(),
    feedback: getFeedback(),
    summary: getAnalyticsSummary()
  }
}

/**
 * Export analytics data as CSV string
 * @returns {string} CSV formatted data
 */
export const exportAnalyticsCSV = () => {
  const users = getUsers()
  const events = getEvents()
  const feedback = getFeedback()
  
  let csv = 'Analytics Export\n\n'
  
  // Users section
  csv += 'USERS\n'
  csv += 'Public Key,Wallet Type,First Seen,Last Seen,Interactions\n'
  users.forEach(u => {
    csv += `${u.publicKey},${u.walletType},${u.firstSeen},${u.lastSeen},${u.interactionCount}\n`
  })
  
  csv += '\n\nEVENTS\n'
  csv += 'Event,Timestamp,Data\n'
  events.forEach(e => {
    csv += `${e.name},${e.timestamp},"${JSON.stringify(e.data)}"\n`
  })
  
  csv += '\n\nFEEDBACK\n'
  csv += 'Rating,Feedback,Timestamp\n'
  feedback.forEach(f => {
    csv += `${f.rating},"${f.feedback}",${f.timestamp}\n`
  })
  
  return csv
}

/**
 * Clear all analytics data (for testing)
 */
export const clearAnalytics = () => {
  if (confirm('Are you sure you want to clear all analytics data? This cannot be undone.')) {
    localStorage.removeItem(STORAGE_KEYS.USERS)
    localStorage.removeItem(STORAGE_KEYS.EVENTS)
    localStorage.removeItem(STORAGE_KEYS.FEEDBACK)
    localStorage.removeItem(STORAGE_KEYS.SESSION)
    console.log('🗑️ Analytics data cleared')
  }
}

// Helper functions

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

function getSessionId() {
  let sessionId = sessionStorage.getItem(STORAGE_KEYS.SESSION)
  if (!sessionId) {
    sessionId = generateId()
    sessionStorage.setItem(STORAGE_KEYS.SESSION, sessionId)
  }
  return sessionId
}

function maskPublicKey(publicKey) {
  if (!publicKey || publicKey.length < 10) return publicKey
  return `${publicKey.substring(0, 4)}...${publicKey.substring(publicKey.length - 4)}`
}

// Initialize on module load
if (typeof window !== 'undefined') {
  window.addEventListener('load', initAnalytics)
}
