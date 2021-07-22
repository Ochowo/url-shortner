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

  static async signin(req, res) {
    const newUser = {
      email: req.body.email,
      password: req.body.password,
    };
    const validPassword = await bcrypt.compare(newUser.password, req.body.oldPassoword);
    if (!validPassword) {
      response.setError(400, 'User Authentication Failed');
    } else {
      const token = Authenticate.generateToken(
        req.body.id, newUser.email, req.body.firstName, req.body.lastName,
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
