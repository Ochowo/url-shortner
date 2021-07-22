const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const { v4: uuidv4 } = require('uuid');
const Response = require('../helpers/utils');
const Authenticate = require('../middleware/auth/authenticate');

const response = new Response();
dotenv.config();
/**
 *
 *
 * @class User
 */
class User {
  /**
     * Signup
     *
     * @static
     * @param {object} req
     * @param {object} res
     * @returns
     *
     * @memberOf User
     */
  static async signup(req, res) {
    const {
      password,
      email,
      lastName,
      phoneNumber,
      firstName,
    } = req.body;
    const saltRounds = 10;
    const encryptedPassword = bcrypt.hashSync(password, saltRounds);
    const user = {
      id: uuidv4(),
      email,
      firstName,
      lastName,
      phoneNumber,
      encryptedPassword,
    };
    const token = Authenticate.generateToken(
      user.id, email, firstName, lastName,
    );
    const data = {
      user,
      token,
    };
    response.setSuccess(201, 'User created successfully', data);
    return response.send(res);
  }
  // const result = users.data.map((userInfo) => userInfo.email === email);
  // if (result.includes(email) === true) {
  //   response.setError(409, 'User already exist');
  // } else {
  //   console.log('happy', req.body);

  // console.log(users, req.body);
  // users.data.push(user);
  // let userDetails;
  // for (let i = 0; i < users.data.length; i += 1) {
  //   if (users.data[i].email === email) {
  //     userDetails = users.data[i];
  //   }
  // if (userDetails !== null || userDetails !== undefined) {
  // const token = Authenticate.generateToken(
  //   userDetails.id, userDetails.email, userDetails.firstName, userDetails.lastName,
  // );
  // const userId = userDetails.id;
  //       const data = {
  //         user,
  //         token,
  //       };
  //       response.setSuccess(201, 'User created successfully', data);
  //     //}
  //   }
  // }

  static async signin(req, res) {
    console.log('goof');
    const newUser = {
      email: req.body.email,
      password: req.body.password,
    };
    console.log(newUser.password, req.body.oldPassoword, 'puy');
    const validPassword = await bcrypt.compare(newUser.password, req.body.oldPassoword);
    if (validPassword) {
      console.log('yaaaaa');
    }
    if (!validPassword) {
      response.setError(400, 'User Authentication Failed');
    } else {
      const token = Authenticate.generateToken(
        req.body.id, newUser.email, newUser.firstName, newUser.lastName,
      );
      const data = {
        token,
      };
      response.setSuccess(200, 'Login successful', data);
    }

    return response.send(res);
  }
}
module.exports = User;
