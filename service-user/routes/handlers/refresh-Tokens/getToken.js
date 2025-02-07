const db = require('../../../models');
const RefreshTokens = db.RefreshTokens;

module.exports = async (req, res) => {
    const refreshToken = req.query.refresh_token;
    const token = await RefreshTokens.findOne({
        where: { token: refreshToken }
    });

    if (!token) {
        return res.status(400).json({
            status: 'error',
            message: 'invalid token'
        });
    }

    return res.json({
        status: 'success',
        token
    });
}