import { useState, useEffect } from 'react'
import { getAnalyticsSummary, exportAnalyticsData, exportAnalyticsCSV } from './analytics'

function AnalyticsDashboard({ onClose }) {
  const [summary, setSummary] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    loadSummary()
  }, [])

  const loadSummary = () => {
    const data = getAnalyticsSummary()
    setSummary(data)
  }

  const handleExportJSON = () => {
    const data = exportAnalyticsData()
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `stellar-analytics-${Date.now()}.json`
    a.click()
  }

  const handleExportCSV = () => {
    const csv = exportAnalyticsCSV()
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `stellar-analytics-${Date.now()}.csv`
    a.click()
  }

  if (!summary) {
    return <div style={styles.loading}>Loading analytics...</div>
  }

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <h2 style={styles.title}>📊 Analytics Dashboard</h2>
          <button style={styles.closeButton} onClick={onClose}>×</button>
        </div>

        {/* Tabs */}
        <div style={styles.tabs}>
          <button
            style={{...styles.tab, ...(activeTab === 'overview' ? styles.tabActive : {})}}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            style={{...styles.tab, ...(activeTab === 'users' ? styles.tabActive : {})}}
            onClick={() => setActiveTab('users')}
          >
            Users ({summary.users.total})
          </button>
          <button
            style={{...styles.tab, ...(activeTab === 'feedback' ? styles.tabActive : {})}}
            onClick={() => setActiveTab('feedback')}
          >
            Feedback ({summary.feedback.total})
          </button>
        </div>

        <div style={styles.content}>
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div>
              <div style={styles.metricsGrid}>
                <div style={styles.metricCard}>
                  <div style={styles.metricValue}>{summary.users.total}</div>
                  <div style={styles.metricLabel}>Total Users</div>
                </div>
                <div style={styles.metricCard}>
                  <div style={styles.metricValue}>{summary.interactions.walletConnections}</div>
                  <div style={styles.metricLabel}>Wallet Connections</div>
                </div>
                <div style={styles.metricCard}>
                  <div style={styles.metricValue}>{summary.interactions.transactionsSent}</div>
                  <div style={styles.metricLabel}>Transactions Sent</div>
                </div>
                <div style={styles.metricCard}>
                  <div style={styles.metricValue}>{summary.interactions.contractCalls}</div>
                  <div style={styles.metricLabel}>Contract Calls</div>
                </div>
              </div>

              <div style={styles.metricsGrid}>
                <div style={styles.metricCard}>
                  <div style={styles.metricValue}>{summary.feedback.averageRating}/5.0</div>
                  <div style={styles.metricLabel}>Average Rating</div>
                  <div style={styles.stars}>
                    {[1, 2, 3, 4, 5].map(star => (
                      <span key={star} style={{color: star <= summary.feedback.averageRating ? '#ffd700' : '#666'}}>
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <div style={styles.metricCard}>
                  <div style={styles.metricValue}>{summary.successRates.transactions}</div>
                  <div style={styles.metricLabel}>Transaction Success Rate</div>
                </div>
                <div style={styles.metricCard}>
                  <div style={styles.metricValue}>{summary.successRates.contractCalls}</div>
                  <div style={styles.metricLabel}>Contract Success Rate</div>
                </div>
                <div style={styles.metricCard}>
                  <div style={styles.metricValue}>{summary.interactions.errors}</div>
                  <div style={styles.metricLabel}>Errors Occurred</div>
                </div>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div>
              <h3 style={styles.sectionTitle}>Registered Users ({summary.users.total})</h3>
              {summary.users.list.length === 0 ? (
                <div style={styles.emptyState}>
                  <p>No users registered yet</p>
                  <p style={styles.emptySubtext}>Connect a wallet to start tracking</p>
                </div>
              ) : (
                <div style={styles.usersList}>
                  {summary.users.list.map((user, index) => (
                    <div key={index} style={styles.userCard}>
                      <div style={styles.userHeader}>
                        <span style={styles.userBadge}>User #{index + 1}</span>
                        <span style={styles.interactionBadge}>
                          {user.interactions} interaction{user.interactions !== 1 ? 's' : ''}
                        </span>
                      </div>
                      <div style={styles.userInfo}>
                        <strong>Public Key:</strong> {user.publicKey}
                      </div>
                      <div style={styles.userInfo}>
                        <strong>First Seen:</strong> {new Date(user.firstSeen).toLocaleString()}
                      </div>
                      <div style={styles.userInfo}>
                        <strong>Last Seen:</strong> {new Date(user.lastSeen).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Feedback Tab */}
          {activeTab === 'feedback' && (
            <div>
              <h3 style={styles.sectionTitle}>User Feedback ({summary.feedback.total})</h3>
              {summary.feedback.comments.length === 0 ? (
                <div style={styles.emptyState}>
                  <p>No feedback submitted yet</p>
                  <p style={styles.emptySubtext}>Be the first to share your thoughts!</p>
                </div>
              ) : (
                <div style={styles.feedbackList}>
                  {summary.feedback.comments.map((fb, index) => (
                    <div key={index} style={styles.feedbackCard}>
                      <div style={styles.feedbackHeader}>
                        <div style={styles.stars}>
                          {[1, 2, 3, 4, 5].map(star => (
                            <span key={star} style={{color: star <= fb.rating ? '#ffd700' : '#666', fontSize: '1.2rem'}}>
                              ★
                            </span>
                          ))}
                        </div>
                        <span style={styles.feedbackDate}>
                          {new Date(fb.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      {fb.feedback && (
                        <div style={styles.feedbackText}>{fb.feedback}</div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Export Buttons */}
          <div style={styles.exportSection}>
            <h3 style={styles.sectionTitle}>Export Data</h3>
            <div style={styles.exportButtons}>
              <button style={styles.exportButton} onClick={handleExportJSON}>
                📥 Export JSON
              </button>
              <button style={styles.exportButton} onClick={handleExportCSV}>
                📥 Export CSV
              </button>
            </div>
            <p style={styles.exportNote}>
              Export analytics data for proof of user interactions and feedback
            </p>
          </div>
        </div>
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
    maxWidth: '900px',
    maxHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
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
    height: '40px'
  },
  tabs: {
    display: 'flex',
    borderBottom: '1px solid #333',
    padding: '0 20px'
  },
  tab: {
    padding: '15px 25px',
    background: 'none',
    border: 'none',
    color: '#888',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.3s',
    borderBottom: '2px solid transparent'
  },
  tabActive: {
    color: '#00d4ff',
    borderBottom: '2px solid #00d4ff'
  },
  content: {
    padding: '20px',
    overflowY: 'auto',
    flex: 1
  },
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '15px',
    marginBottom: '25px'
  },
  metricCard: {
    backgroundColor: '#0f0f1e',
    border: '1px solid #00d4ff',
    borderRadius: '8px',
    padding: '20px',
    textAlign: 'center'
  },
  metricValue: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#00d4ff',
    marginBottom: '8px'
  },
  metricLabel: {
    color: '#e0e0e0',
    fontSize: '0.9rem'
  },
  stars: {
    marginTop: '8px',
    fontSize: '1.2rem'
  },
  sectionTitle: {
    color: '#00d4ff',
    marginBottom: '15px'
  },
  usersList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  userCard: {
    backgroundColor: '#0f0f1e',
    border: '1px solid #00d4ff',
    borderRadius: '8px',
    padding: '15px'
  },
  userHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px'
  },
  userBadge: {
    backgroundColor: '#00d4ff',
    color: '#0f0f1e',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '0.85rem',
    fontWeight: '600'
  },
  interactionBadge: {
    backgroundColor: '#4caf50',
    color: 'white',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '0.85rem'
  },
  userInfo: {
    color: '#e0e0e0',
    fontSize: '0.9rem',
    marginBottom: '5px'
  },
  feedbackList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  feedbackCard: {
    backgroundColor: '#0f0f1e',
    border: '1px solid #00d4ff',
    borderRadius: '8px',
    padding: '15px'
  },
  feedbackHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px'
  },
  feedbackDate: {
    color: '#888',
    fontSize: '0.85rem'
  },
  feedbackText: {
    color: '#e0e0e0',
    fontSize: '0.95rem',
    lineHeight: '1.5'
  },
  emptyState: {
    textAlign: 'center',
    padding: '40px',
    color: '#888'
  },
  emptySubtext: {
    fontSize: '0.9rem',
    marginTop: '10px'
  },
  exportSection: {
    marginTop: '30px',
    paddingTop: '20px',
    borderTop: '1px solid #333'
  },
  exportButtons: {
    display: 'flex',
    gap: '10px',
    marginBottom: '10px'
  },
  exportButton: {
    padding: '12px 24px',
    backgroundColor: '#00d4ff',
    color: '#0f0f1e',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500'
  },
  exportNote: {
    color: '#888',
    fontSize: '0.85rem',
    fontStyle: 'italic'
  },
  loading: {
    color: '#00d4ff',
    textAlign: 'center',
    padding: '40px',
    fontSize: '1.2rem'
  }
}

export default AnalyticsDashboard
