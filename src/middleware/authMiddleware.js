import jwt from 'jsonwebtoken';

function verifyToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token){
        return res.status(401).json({message: 'Acess Denied.'});
    }
    try {
        const decoded = jwt.verify(token, 'your-secret-key');
        req.doctorId = decoded.doctorId;
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        res.status(401).json({message:'Invalid token.'});
    }
};

export default verifyToken;