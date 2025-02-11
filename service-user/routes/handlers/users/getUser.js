const db = require('../../../models');
const Users = db.Users;

module.exports = async (req, res) => {
    const id = req.params.id;

    const user = await Users.findByPk(id, {
        attributes: ['id', 'name', 'email', 'roles', 'profession', 'avatar']
    });

    if (!user) {
        return res.status(404).json({
            status: 'error',
            message: 'user not found',
        });
    }

    return res.json({
        status: 'success',
        data: user
    });
}