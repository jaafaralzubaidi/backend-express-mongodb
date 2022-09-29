import express from 'express';
import controller from '../controller/user';

import { body } from 'express-validator';


const router = express.Router();

/**
 * @path: http://localhost:5000/users
 * method: GET
 */
router.post('/',
    [
        body('fName').not().isEmpty().withMessage('fName is required'),
        body('lName').not().isEmpty().withMessage('Once again lName is required'),
        body('city').not().isEmpty().withMessage('I thought I told you city is required'),
        body('state').not().isEmpty().withMessage('Now you are just being rude ... Go back to school!')
    ]
    , controller.createUser);


/**
 * @path: http://localhost:5000/users
 * method: POST
 * @fields: fName, lName, city, state
 */
router.get('/', controller.getAllUsers);


/**
 * @path: http://localhost:5000/users/:id
 * @method: GET
 * @fields: id
 */
router.get('/:id', controller.getUser);


/**
* @path: http://localhost:5000/users/:id
* @method: DELETE
* @fields: id
*/
router.delete('/:id', controller.deleteUser);

/**
* @path: http://localhost:5000/users/:id
* @method: PATCH
* @fields: id
*/
router.patch('/:id', controller.updateUser);



// export the router
export = router;