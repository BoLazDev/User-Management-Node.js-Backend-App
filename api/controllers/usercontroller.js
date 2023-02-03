var User = require('../models/model');

// Create and save new user
exports.create = (req, res) => {
    if(!req.body) {
        res.status(400).send({message: "Content can not be empty!"});
        return;
    }

    const user = new User({
        name:req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    });

    user.save(user).then(data => {
        //res.send(data);
        res.redirect('/add-user')
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while creating a create operation"
        });
    });
}

// find one or all users
exports.find = (req, res) => {
    if(req.query.id) {
        const {id} = req.query;
        User.findById(id).then(user => {
            if(!user) {
                return res.send(404).send({
                    massage: "Could not find user with that id!"
                });
            }
            return res.send(user);
        }).catch(err => {
            res.send(500).send({
                message:err.message || "Error occured while retriving user information!"
            })
        })
    }else {
        User.find().then(user => {
            return res.send(user);
        }).catch(err => {
            res.send(500).send({
                message:err.message || "Error occured while retriving user information!"
            })
        });
    }
}

// update user
exports.update = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const {id} = req.params;
    User.findByIdAndUpdate({id: id}, {useFindAndModify: false}).then(data => {
        if(!data) {
            return res.status(404).send({
                message: "Can not update user with that specified id!"
            })
        }else {
            res.send(data);
        }
    }).catch(err => {
        res.status(500).send({
            message: "Error update user information!"
        });
    })
}

// delete user
exports.delete = (req, res) => {
    const {id} = req.params;

    User.findByIdAndDelete(id).then(data => {
        if(!data) {
            res.status(404).send({
                massage: "Cannot delete with id!"
            });
        }else {
            res.send({
                massage: "User was deleted successfully!"
            });
        }
    }).catch(err => {
        res.status(500).send({
            massage: "Could not delete user with id!"
        });
    });
}
