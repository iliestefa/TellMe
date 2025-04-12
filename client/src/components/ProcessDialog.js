import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    LinearProgress,
    Typography,
    Box,
    CircularProgress,
    DialogActions,
    Button
} from '@mui/material';
import { doc, onSnapshot, deleteDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

const ProcessDialog = ({ userId }) => {
    const [process, setProcess] = useState(null);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);

    const handleClose = async () => {
        if (process?.id) {
            try {
                await deleteDoc(doc(db, 'tellme-messages', process.id));
            } catch (error) {
                console.error('Error al eliminar el proceso:', error);
            }
        }
    };

    useEffect(() => {
        if (!userId) return;
        const processRef = doc(db, 'tellme-messages', userId);
        const unsubscribe = onSnapshot(processRef, (doc) => {

            if (doc.exists()) {
                const data = doc.data();
                const lastUpdate = data.lastUpdate?.toDate();
                const isCompleted = data.status === 'COMPLETED';
                const isOld = lastUpdate && (Date.now() - lastUpdate.getTime() > 30 * 60 * 1000);

                if (!isCompleted || !isOld) {
                    setOpen(true);
                    setProcess({
                        id: doc.id,
                        ...data
                    });
                } else {
                    setOpen(false);
                    setProcess(null);
                }
            } else {    
                setOpen(false);
                setProcess(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [userId]);

    const getStatusText = (status) => {
        switch (status) {
            case 'init':
                return 'Iniciando proceso...';
            case 'sending':
                return 'Enviando mensajes...';
            case 'waiting':
                return 'En espera...';
            case 'completed':
                return 'Proceso completado';
            case 'error':
                return 'Error en el proceso';
            default:
                return 'Estado desconocido';
        }
    };

    return (
        <Dialog 
            open={open} 
            onClose={process?.status === 'completed' || process?.status === 'error' ? handleClose : undefined} 
            maxWidth="sm" 
            fullWidth
        >
            <DialogTitle>Envío de mensajes</DialogTitle>
            <DialogContent>
                {loading ? (
                    <Box display="flex" justifyContent="center" p={3}>
                        <CircularProgress />
                    </Box>
                ) : process ? (
                    <Box>
                        <Typography variant="subtitle1" gutterBottom>
                            {getStatusText(process.status)}
                        </Typography>
                        <Box mt={2}>
                            <LinearProgress 
                                variant="determinate" 
                                value={process.percentage || 0} 
                            />
                            <Typography variant="body2" color="textSecondary" align="center" mt={1}>
                                {process.percentage || 0}%
                            </Typography>
                        </Box>
                        {process.error && (
                            <Typography variant="body2" color="error" mt={2}>
                                Error: {process.error.message}
                            </Typography>
                        )}
                    </Box>
                ) : (
                    <Typography variant="body1" align="center">
                        No hay procesos activos
                    </Typography>
                )}
            </DialogContent>
            {(process?.status === 'completed' || process?.status === 'error') && (
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cerrar
                    </Button>
                </DialogActions>
            )}
        </Dialog>
    );
};

export default ProcessDialog; 