const db = require('../../../models');
const Users = db.Users;
const RefreshTokens = db.RefreshTokens;

module.exports = async (req, res) => {
    const userId = req.body.user_id;
    const user = await Users.findByPk(userId);

    if (!user) {
        return res.status(404).json({
            status: 'error',
            message: 'user not found'
        });
    }

    await RefreshTokens.destroy({
        where: { user_id: userId }
    });

    return res.json({
        status: 'success',
        message: 'refresh token deleted'
    });
}