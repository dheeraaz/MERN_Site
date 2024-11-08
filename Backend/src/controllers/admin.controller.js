import { asyncHandler } from '../utils/asyncHandler.js'
import { apiError } from '../utils/apiError.js'
import { apiResponse } from '../utils/apiResponse.js'

import { User } from '../models/user.model.js'
import { Contact } from '../models/contact.model.js'

import { ObjectId } from 'mongodb';

// get all users details
const getAllUsers = asyncHandler(async (req, res) => {
    // this req.user is authenticated + admin
    // const user = req.user;

    const allUsers = await User.find({ isAdmin: false }).select("-password")

    if (!allUsers) {
        throw new apiError(501, "Internal Server Error, Users Not Found")
    }

    return res
        .status(200)
        .json(new apiResponse(201, allUsers, "Fetched Users Details"));
})

// get single user based on id provided
const getUserById = asyncHandler(async (req, res) => {
    const userID_ = req.params.userId;
    const admin = req.user;

    // converting into ObjectId: requested User's Id
    const reqUserID = ObjectId.createFromHexString(userID_);

    // not allowing admin to request his/her own data
    if (admin._id.equals(reqUserID)) {
        throw new apiError(401, "Bad Request - You cannot edit yourself")
    }

    const reqUser = await User.findById(reqUserID).select("-password");

    if (!reqUser) {
        throw new apiError(401, "Couldn't find the requested user.")
    }

    return res
        .status(200)
        .json(new apiResponse(201, reqUser, "Successfully fetched the details of requested user"))

})

// update user based on id provided

const editUser = asyncHandler(async (req, res) => {
    const userID_ = req.params.userId;
    const admin = req.user;

    // getting userdata sent by frontend
    const { username, email, phone } = req.body;
    // converting into ObjectId: requested User's Id
    const reqUserID = ObjectId.createFromHexString(userID_);

    // not allowing admin to edit his/her own data
    if (admin._id.equals(reqUserID)) {
        throw new apiError(401, "Bad Request - You cannot edit yourself")
    }

    // Fetch the existing user data
    const existingUser = await User.findById(reqUserID).select("username email phone");

    if (!existingUser) {
        throw new apiError(404, "User not found");
    }

    // Check if any changes were made
    if (
        existingUser.username === username &&
        existingUser.email === email &&
        existingUser.phone === phone
    ) {
        throw new apiError(400, "No changes made");  //idempotency
    }


    const updatedUser = await User.findByIdAndUpdate(reqUserID, {
        $set: {
            username,
            email,
            phone,
        }
    }).select("-password")

    if (!updatedUser) {
        throw new apiError(501, "Error in updating user")
    }

    return res
        .status(200)
        .json(new apiResponse(201, updatedUser, "Successfully updated the user"))
})

//delete user - only admin can delete user
const deleteUser = asyncHandler(async (req, res) => {
    const admin = req.user;
    const userID_ = req.params.userId; //this is String data type
    const userToBeDeletedID = ObjectId.createFromHexString(userID_); //converting string into object

    if (admin._id.equals(userToBeDeletedID)) {
        throw new apiError(401, "Bad request - You cannot delete yourself");
    }

    const deleteUser = await User.findByIdAndDelete(userToBeDeletedID).select("-password");

    if (!deleteUser) {
        throw new apiError(500, "User to be deleted not found");
    }

    return res
        .status(200)
        .json(new apiResponse(201, deleteUser, "Successfully Deleted The User"))

})


//get all
const getAllContacts = asyncHandler(async (req, res) => {
    // const user = req.user;
    
    const contacts = await Contact.find();
    
    if (!contacts) {
        throw new apiError(501, "Internal Server - Contacts Not Fetched")
    }
    
    return res
    .status(200)
    .json(new apiResponse(201, contacts, "All Contacts Fetched Successfully"))
})

//delete user - only admin can delete user
const deleteContact = asyncHandler(async (req, res) => {
    const contactID_ = req.params.contactId; //this is String data type
    const contactToBeDeletedID = ObjectId.createFromHexString(contactID_); //converting string into object

    const deletedContact = await Contact.findByIdAndDelete(contactToBeDeletedID);

    if (!deletedContact) {
        throw new apiError(500, "Contact to be deleted not found");
    }

    return res
        .status(200)
        .json(new apiResponse(201, deletedContact, "Successfully Deleted The Contact"))

})


export {
    getAllUsers,
    getUserById,
    editUser,
    deleteUser,
    getAllContacts,
    deleteContact,
}