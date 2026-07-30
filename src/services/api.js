import axios from 'axios';
import { getToken, removeToken } from '../utils/cookies';

const BASE = import.meta.env.VITE_APP_ENVIRONMENT === 'production'
  ? import.meta.env.VITE_APP_PRODUCTION_API_URL
  : import.meta.env.VITE_APP_LOCAL_API_URL;
const API_URL = `${BASE}/api`;

const api = axios.create({
  baseURL: API_URL,
});

// Add auth token from cookie (90-day session)
api.interceptors.request.use((config) => {
  const token = getToken() || localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors: clear cookie/session only on 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear stale tokens and notify AuthContext via storage event
      const hadToken = !!localStorage.getItem('token');
      removeToken();
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (error.response?.data?.forceLogout) {
        localStorage.setItem('logoutReason', 'You have been logged out because your account was logged in from another device.');
      }
      // Dispatch a custom event so AuthContext can react without a full page reload
      if (hadToken) {
        window.dispatchEvent(new Event('auth:logout'));
      }
    }
    // Force logout blocked users on any API call — must hard redirect since
    // no React state management handles blocked status
    if (error.response?.status === 403 && error.response?.data?.blocked) {
      removeToken();
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// This frontend belongs to the 101dream site — sent with every login call so the
// backend keeps 101dream users in their own account space (separate from the ludo site)
export const SITE_TYPE = '101dream';

// Auth API
export const authAPI = {
  sendOTP: (email) => api.post('/auth/send-otp', { email: String(email || '').trim(), type: SITE_TYPE }),
  sendOTPByPhone: (phone) => api.post('/auth/send-otp', {
    phone: String(phone || '').trim(),
    loginMode: 'mobile',
    type: SITE_TYPE,
  }),
  verifyOTP: (email, otp) => api.post('/auth/verify-otp', {
    email: String(email || '').trim(),
    otp: String(otp || '').trim(),
    type: SITE_TYPE,
  }),
  verifyOTPByPhone: (phone, otp) => api.post('/auth/verify-otp', {
    phone: String(phone || '').trim(),
    otp: String(otp || '').trim(),
    loginMode: 'mobile',
    type: SITE_TYPE,
  }),
  setUsername: (name, referralCode) => api.put('/auth/set-username', { name, ...(referralCode ? { referralCode } : {}) }),
  updateProfile: (data) => api.put('/auth/profile', data),
  getMe: () => api.get('/auth/me'),
  findEmail: (phone) => api.post('/auth/find-email', { phone: String(phone || '').trim(), type: SITE_TYPE }),
  submitKyc: (formData) => api.post('/auth/kyc', formData),
  getKycStatus: () => api.get('/auth/kyc'),
};

// Admin Auth API (dedicated admin login endpoints)
export const adminAuthAPI = {
  sendOTP: (phone) => api.post('/auth/admin/send-otp', {
    phone: String(phone || '').trim(),
  }),
  verifyOTP: (phone, otp) => api.post('/auth/admin/verify-otp', {
    phone: String(phone || '').trim(),
    otp: String(otp || '').trim(),
  }),
  passwordLogin: (phone, password) => api.post('/auth/admin/password-login', {
    phone: String(phone || '').trim(),
    password,
  }),
  forgotPasswordSendOTP: (phone) => api.post('/auth/admin/forgot-password/send-otp', {
    phone: String(phone || '').trim(),
  }),
  forgotPasswordVerifyOTP: (phone, otp) => api.post('/auth/admin/forgot-password/verify-otp', {
    phone: String(phone || '').trim(),
    otp: String(otp || '').trim(),
  }),
  resetPassword: (resetToken, newPassword, confirmPassword) => api.post('/auth/admin/reset-password', {
    resetToken,
    newPassword,
    confirmPassword,
  }),
};

// Wallet API
export const walletAPI = {
  getPaymentInfo: () => api.get('/wallet/payment-info', { params: { type: SITE_TYPE } }),
  getBalance: () => api.get('/wallet/balance'),
  deposit: (formData) => api.post('/wallet/deposit', formData),
  withdraw: (amount) => api.post('/wallet/withdraw', { amount }),
  getWithdrawalInfo: () => api.get('/wallet/withdrawal-info'),
  getHistory: (params) => api.get('/wallet/history', { params }),
  getTransactions: (params) => api.get('/wallet/transactions', { params }),
  cancelRequest: (id) => api.post(`/wallet/cancel/${id}`),
};

// Game API
export const gameAPI = {
  getState: () => api.get('/game/state'),
  placeBet: (amount) => api.post('/game/bet', { amount }),
  cashOut: () => api.post('/game/cashout'),
  getHistory: (params) => api.get('/game/history', { params }),
  getRounds: () => api.get('/game/rounds'),
  getCurrentBets: () => api.get('/game/current-bets'),
};

// Spinner API
export const spinnerAPI = {
  play: (spinCost = 50) => api.post('/spinner/play', { spinCost, type: 'paid' }),
  playReferral: () => api.post('/spinner/play', { type: 'free' }),
  getReferralStatus: () => api.get('/spinner/referral-status'),
  getHistory: (params) => api.get('/spinner/history', { params }),
};

// Notification API
export const notificationAPI = {
  getAll: (params) => api.get('/notifications', { params }),
  getUnreadCount: () => api.get('/notifications/unread-count'),
  markAsRead: (id) => api.put(`/notifications/${id}/read`),
  markAllAsRead: () => api.put('/notifications/read-all'),
  saveFcmToken: (token) => api.post('/notifications/fcm-token', { token }),
  removeFcmToken: (token) => api.delete('/notifications/fcm-token', { data: { token } }),
};

// Bonus API
export const bonusAPI = {
  getStatus: () => api.get('/bonus/status'),
  claim: () => api.post('/bonus/claim'),
};

// Public settings API (no auth)
export const settingsAPI = {
  getSupport: () => api.get('/settings/support', { params: { type: SITE_TYPE } }),
  getTerms: () => api.get('/settings/terms', { params: { type: SITE_TYPE } }),
  getLayout: () => api.get('/settings/layout', { params: { type: SITE_TYPE } }),
  getUserWarning: () => api.get('/settings/user-warning', { params: { type: SITE_TYPE } }),
  getLandingStats: () => api.get('/settings/landing-stats', { params: { type: SITE_TYPE } }),
  getLogo: () => api.get('/settings/logo', { params: { type: SITE_TYPE } }),
};

// Admin API
export const adminAPI = {
  getDashboard: (params) => api.get('/admin/dashboard', { params: { ...params, siteType: SITE_TYPE } }),
  getPendingCounts: (params) => api.get('/admin/pending-counts', { params: { ...params, siteType: SITE_TYPE } }),
  getUsers: (params) => api.get('/admin/users', { params: { ...params, siteType: SITE_TYPE } }),
  getActiveUsers: () => api.get('/admin/active-users'),
  createUser: (data) => api.post('/admin/users', data),
  updateUser: (id, data) => api.put(`/admin/users/${id}`, data),
  updateUserBalance: (id, amount, operation) =>
    api.put(`/admin/users/${id}/balance`, { amount, operation }),
  updateUserEarnings: (id, earnings) =>
    api.put(`/admin/users/${id}/earnings`, { earnings }),
  updateUserStatus: (id, status) =>
    api.put(`/admin/users/${id}/status`, { status }),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
  getUserDetail: (id) => api.get(`/admin/users/${id}/detail`),
  getWalletRequests: (params) => api.get('/admin/wallet-requests', { params: { ...params, siteType: SITE_TYPE } }),
  processWalletRequest: (id, action, editedAmount) =>
    api.put(`/admin/wallet-requests/${id}`, { action, ...(editedAmount !== undefined && { editedAmount }) }),
  bulkDeleteWalletRequests: (ids) => api.post('/admin/wallet-requests/bulk-delete', { ids }),
  getBets: (params) => api.get('/admin/bets', { params }),
  deleteBets: (ids) => api.post('/admin/bets/delete', { ids }),
  bulkClearBets: (from, to, status) => api.post('/admin/bets/bulk-clear', { from, to, status }),
  getLiveBets: () => api.get('/admin/bets/live'),
  forceCrashBet: (id) => api.post(`/admin/bets/${id}/force-crash`),
  getCurrentRoundWithBets: () => api.get('/admin/game/current-round'),
  forceCrashRound: () => api.post('/admin/game/force-crash-round'),
  setNextCrash: (crashAt) => api.post('/admin/game/set-next-crash', { crashAt }),
  clearNextCrash: () => api.post('/admin/game/clear-next-crash'),
  setBulkCrash: (data) => api.post('/admin/game/set-bulk-crash', data),
  clearBulkCrash: () => api.post('/admin/game/clear-bulk-crash'),
  setSequentialCrashes: (values) => api.post('/admin/game/set-sequential-crashes', { values }),
  clearSequentialCrashes: () => api.post('/admin/game/clear-sequential-crashes'),
  getCrashQueue: () => api.get('/admin/game/crash-queue'),
  getWinningBets: (params) => api.get('/admin/wins-bets', { params }),
  getNotifications: () => api.get('/admin/notifications'),
  getSpinnerRecords: (params) => api.get('/admin/spinner-records', { params }),
  getSettings: () => api.get('/admin/settings', { params: { siteType: SITE_TYPE } }),
  updateSettings: (data) => api.put('/admin/settings', { ...data, siteType: SITE_TYPE }),
  uploadQrCode: (formData) => api.post(`/admin/settings/qr?siteType=${SITE_TYPE}`, formData),
  uploadLogo: (formData) => api.post(`/admin/settings/logo?siteType=${SITE_TYPE}`, formData),
  getBonusRecords: (params) => api.get('/admin/bonus-records', { params }),
  getUserTransactions: (id, params) => api.get(`/admin/users/${id}/transactions`, { params }),
  // Profit
  getAviatorProfit: (params) => api.get('/admin/profit/aviator', { params }),
  // Database cleanup
  getCleanupPreview: (params) => api.get('/admin/cleanup/preview', { params }),
  cleanupPhotos: (data) => api.post('/admin/cleanup/photos', data),
  // Export
  exportUsers: () => api.get('/admin/export/users'),
  getCreditLog: (params) => api.get('/admin/credit-log', { params: { ...params, siteType: SITE_TYPE } }),
  // KYC
  getKycRequests: (params) => api.get('/admin/kyc', { params }),
  approveKyc: (id) => api.put(`/admin/kyc/${id}/approve`),
  rejectKyc: (id, reason) => api.put(`/admin/kyc/${id}/reject`, { reason }),
  deleteKyc: (id) => api.delete(`/admin/kyc/${id}`),
  sendNotification: (formData) => api.post('/admin/notifications/send', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  getNotificationReach: () => api.get('/admin/notifications/reach'),
};

export const referralAPI = {
  getMyReferral: () => api.get('/referral/my'),
  redeemCommission: () => api.post('/referral/redeem'),
  getAdminReferrals: (params) => api.get('/admin/referrals', { params }),
  getAllReferredUsers: (params) => api.get('/admin/referrals/all-referred', { params }),
  getCommissionHistory: (params) => api.get('/admin/referrals/history', { params }),
  adjustCommission: (id, data) => api.put(`/admin/referrals/${id}/adjust`, data),
};

export default api;
