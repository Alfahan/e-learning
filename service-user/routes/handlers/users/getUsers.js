const db = require('../../../models');
const Users = db.Users;

module.exports = async (req, res) => {

    const userIds = req.params.user_ids || [];

    const sqlOptions = {
        attributes: ['id', 'name', 'email', 'roles', 'profession', 'avatar']
    }

    if (userIds.length) {
        sqlOptions.where = {
            id: userIds
        }
    }

    const users = await Users.findAll();

    return res.json({
        status: 'success',
        data: users
    });
}