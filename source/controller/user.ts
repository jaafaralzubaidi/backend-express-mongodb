import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import mongoose from "mongoose";
import User from '../models/user';



// Creates a new user in DB
const createUser = (req: Request, res: Response, next: NextFunction) => {

    const errors = validationResult(req);
    // if errors are empty => validated your form
    // if errors are not empty => means there are errors in the form
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

    let { fName, lName, city, state } = req.body;

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        fName,
        lName,
        city,
        state,
    });

    return user.save()
        .then(result => {
            return res.status(201).json({ user: result });
        }).catch(error => {
            return res.status(500).json({ message: error.message, error });
        });

}

// Returns all users in DB
const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
    User.find()
        .exec()
        .then(results => {
            return res.status(200).json({ users: results, count: results.length });
        })
        .catch(error => {
            return res.status(500).json({ message: error.message, error });
        });
}



// Returns single user from DB
const getUser = (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    User.findById(id)
        .then(userFound => {
            if (!userFound)
                return res.status(400).end();
            return res.status(200).json({ user: userFound });
        })
        .catch(error => {
            return res.status(500).json({ message: error.message, error });
        });
}


// Deletes a single user from DB
const deleteUser = (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    User.findByIdAndRemove(id)
        .exec()
        .then(userFound => {
            if (!userFound)
                return res.status(400).end();
            return res.status(204).json({ message: "User has been deleted" });
        })
        .catch(error => {
            return res.status(500).json({ message: error.message, error });
        });
}



// Update a user from DB
const updateUser = (req: Request, res: Response, next: NextFunction) => {
    const condition = { _id: req.params.id };
    const newData = req.body;

    User.updateOne(condition, newData)
        .then(userFound => {
            if (!userFound)
                return res.status(400).end();
            return res.status(204).json({ user: userFound });
        })
        .catch(error => {
            return res.status(500).json({ message: error.message, error });
        });
}







export default { getAllUsers, getUser, createUser, deleteUser, updateUser };