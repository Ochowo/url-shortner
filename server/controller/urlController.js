const dotenv = require('dotenv');
const { v4: uuidv4 } = require('uuid');
const { nanoid } = require('nanoid');
const Response = require('../helpers/utils');

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
  static async createUrl(req, res) {
    const baseUrl = 'http:localhost:5000';
    const {
      url,
      userId,
    } = req.body;
    const urlCode = nanoid(10);
    const shortUrl = `${baseUrl}/${urlCode}`;
    const urlObj = {
      id: uuidv4(),
      url,
      userId,
      shortUrl,
      clicks: 0,
    };
    const data = {
      url: urlObj,
    };
    response.setSuccess(201, 'success', data);
    return response.send(res);
  }
}
module.exports = User;
