'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {

  // POST /signup
  signup: {
    body: {
      params: {
        email: _joi2.default.string().email({ minDomainAtoms: 2 }).required(),
        name: _joi2.default.string().required()
      }
    }
  },
  login: {
    body: {
      params: {
        email: _joi2.default.string().email({ minDomainAtoms: 2 }).required(),
        password: _joi2.default.string().required()
      }
    }
  },
  forgotPassword: {
    body: {
      params: {
        email: _joi2.default.string().email({ minDomainAtoms: 2 }).required()
      }
    }
  },
  resetPassword: {
    body: {
      params: {
        password: _joi2.default.string().required(),
        token: _joi2.default.string().required()
      }
    }
  },
  verify: {
    body: {
      params: {
        token: _joi2.default.string().required(),
        password: _joi2.default.string().required()
      }
    }
  },
  create: {
    body: {
      params: {
        email: _joi2.default.string().required(),
        name: _joi2.default.string().required()
      }
    }
  },
  deleteUser: {
    body: {
      params: {
        id: _joi2.default.string().required()
      }
    }
  },
  add: {
    body: {
      params: {
        email: _joi2.default.string().email({ minDomainAtoms: 2 }).required(),
        name: _joi2.default.string().required()
      }
    }
  }
};