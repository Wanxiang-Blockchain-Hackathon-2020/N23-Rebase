import {Schema} from 'mongoose'
import {CommentSchema} from './CommentSchema'
import {SubscriberSchema} from './SubscriberSchema'

export const Region = {
    country: String,
    state: String,
    city: String
}

export const Contact = {
    type : Map,
    of : String
}

export const Profile = {
    firstName : String,
    lastName: String,
    avatar : String,
    avatarFilename: String,
    avatarFileType: String,
    banner : String,
    bannerFilename: String,
    bannerFileType: String,
    gender : String,
    birth : Date,
    timezone: String,
    region: Region,
    country : String,
    state : String,
    city : String,
    profession: String,

    telegram: String,
    reddit: String,
    wechat: String,
    twitter: String,
    facebook: String,
    github: String,
    linkedin: String,

    portfolio: String,
    skillset: [String],
    bio: String,
    motto: String,
    beOrganizer : Boolean,
    isDeveloper : Boolean,
    source : String,
    walletAddress : String
}

export const User = {
    username : {
        type : String,
        required: true,
        index : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    salt: {
        type: String,
        required: true
    },

    // let's keep this on the root object
    email: String,
    profile : Profile,
    defaultLanguage: String,

    // resetToken, ensure this is never returned
    resetToken: String,

    // constants.USER_ROLE
    role : String,

    notes: String, // private internal notes visible only to admin/council

    active : {
        type : Boolean,
        default : false
    },
    logins: [Date],
    comments: [[CommentSchema]],
    subscribers: [SubscriberSchema],
    popupUpdate: {
        type: Boolean,
        default: false
    }
}
