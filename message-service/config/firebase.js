const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc } = require('firebase/firestore');

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const COLLECTION = 'tellme-messages';

const BATCH_STATUS = {
    INIT: 'init',
    SENDING: 'sending',
    WAITING: 'waiting',
    COMPLETED: 'completed',
    ERROR: 'error'
};

async function updateBatchStatus(userId, status, percentage, error = null) {
    try {
        const batchRef = doc(db, COLLECTION, userId);
        const now = new Date();

        const updateData = {
            userId,
            status,
            percentage,
            lastUpdate: now
        };

        if (status === BATCH_STATUS.INIT) {
            updateData.createdAt = now;
        }

        if (error) {
            updateData.error = {
                message: error.message,
                timestamp: now
            };
        }

        await setDoc(batchRef, updateData, { merge: true });
    } catch (error) {
        console.error('Error actualizando estado del batch:', error.message);
        throw error;
    }
}

module.exports = {
    db,
    BATCH_STATUS,
    updateBatchStatus
}; 