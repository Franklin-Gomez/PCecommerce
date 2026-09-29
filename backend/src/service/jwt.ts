import jwt from 'jsonwebtoken';

interface TokenPayload {
  id: number;
  email: string;
}   

export const generateToken = (payload: object) => {
    
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET no definido');
    }
 
    // payload , secret , options
    const token = jwt.sign( payload , process.env.JWT_SECRET , { 
        expiresIn: '1h',
        algorithm: "HS256"
    } );

    return token;
};

export const verifyToken = (token: string) => {
    
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET no definido");
    }

    return jwt.verify(token, process.env.JWT_SECRET) as TokenPayload;
};


