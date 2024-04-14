const get = require('./index')

class EmployeesService {
  async getAllEmployees(req, res) {
    const result = get();
    result.then((result) => res.json(result));
  }
}


module.exports = new EmployeesService()