// backend/utils/auth.js
const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User } = require('../db/models');


const { secret, expiresIn } = jwtConfig;

// Sends a JWT Cookie
const setTokenCookie = (res, user) => {
    // Create the token.
    const safeUser = {
      id: user.id,
      email: user.email,
      username: user.username,
    };
    const token = jwt.sign(
      { data: safeUser },
      secret,
      { expiresIn: parseInt(expiresIn) } 
    );
  
    const isProduction = process.env.NODE_ENV === "production";
  
    // Set the token cookie
    res.cookie('token', token, {
      maxAge: expiresIn * 1000, // milliseconds
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction && "Lax"
    });
  
    return token;
  };



const restoreUser = (req, res, next) => {
    try {
        // token parsed from cookies
        const { token } = req.cookies;
        req.user = null;

        if (!token) {
            return next();
        }

        jwt.verify(token, secret, null, async (err, jwtPayload) => {
            if (err) {
                console.error('JWT verification failed:', err);
                return next();
            }

            try {
                const { id } = jwtPayload.data;
                const user = await User.findByPk(id, {
                    attributes: {
                        include: ['email', 'createdAt', 'updatedAt']
                    }
                });

                if (user) {
                    req.user = user;
                }
                next();
            } catch (error) {
                console.error('Database error in restoreUser:', error);
                next();
            }
        });
    } catch (error) {
        console.error('Error in restoreUser middleware:', error);
        next();
    }
};



// If there is no current user, return an error
const requireAuth = function (req, _res, next) {
    if (req.user) return next();
  
    const err = new Error('Authentication required');
    err.title = 'Authentication required';
    err.errors = { message: 'Authentication required' };
    err.status = 401;
    return next(err);
  }



module.exports = { setTokenCookie, restoreUser, requireAuth };
