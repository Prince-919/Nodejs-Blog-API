# Blog API Application Project

## Tech Stack

__server:__Node, Express, MongoDB, Mongoose, JWT

# API FEATURES

- Authentication & Authorization
- Post CRUD Operations
- Comments functionality
- System blocking user it inactive for 30 days
- Admin can block differnt users
- A user can block another user cannot see his/her posts
- Last date a post was created
- Chack if a user is active or not
- Check last date a user was active
- Changing user award baseonnumber of posts created by ther user
- A user can follow and unfollow another user
- Get following and followers count
- Get total profile viewers count
- Get posts created count
- Get blocked count
- Get all users who views someone's profile
- Admin can unblock a blocked user
- update password
- Profile photo uploaded
- A user can close his/her account

# ENDPOINTS

- [API Authentication](#API-Authentication)
    - [Register a new Api client](https://www.github.com/octokatherine)
    - [Login](https://www.github.com/octokatherine)
- [Users](https://www.github.com/octokatherine)
    - [Get my profile](https://www.github.com/octokatherine)
    - [Get all users](https://www.github.com/octokatherine)
    - [view a user profile count](https://www.github.com/octokatherine)
    - [Following a user](https://www.github.com/octokatherine)
    - [#UnFollowing-a-user](https://www.github.com/octokatherine)
    - [Update user password](https://www.github.com/octokatherine)
    - [Update your profile](https://www.github.com/octokatherine)
    - [Block your profile](https://www.github.com/octokatherine)
    - [Unblock another user](https://www.github.com/octokatherine)
    - [Admin blocking a user](https://www.github.com/octokatherine)

# API Authentication

Some endpoints may require authentication for example. To create a create/delete/update post, you need to register your API client and obtain an access token

The endpoints that reqrure authentication expect a bearer token send in the `Authorization header` 

__Example__:

`Authorzation: Bearer YOUR TOKEN`

## Register a new APi client
```http
POST /api/v1/users/register
```
The request body to be in JSON format.

# API Reference
##__User Login__

```http
POST /api/v1/users/login
```

| Parameter | Type    | Description                    |Required|
| :-------- | :------ | :----------------------------- |:-------|
|`authentication`|`string` | Your token                | no     |
|`email`|`string` | Your email                         | no     |
|`password`|`string` | Your password                   | no     |

## 🔗 Links
[![portfolio](https://img.shields.io/badge/github-Code?style=for-the-badge&logo=ko-fi&logoColor=white)](https://katherineoelsner.com/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/)












