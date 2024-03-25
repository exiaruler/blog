"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
var user = require('../model/user');
var passport = require('passport');
var bcrypt_1 = require("bcrypt");
var UserController = /** @class */ (function () {
    function UserController() {
        new user();
    }
    UserController.prototype.addUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userRole, find, hashPassword, addUser, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userRole = "user";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, user.findOne({ username: req.body.username }).exec()];
                    case 2:
                        find = _a.sent();
                        if (!!find) return [3 /*break*/, 5];
                        return [4 /*yield*/, bcrypt_1.default.hash(req.body.password, 10)];
                    case 3:
                        hashPassword = _a.sent();
                        addUser = new user({ name: req.body.name, username: req.body.username, password: hashPassword, role: req.body = userRole });
                        return [4 /*yield*/, addUser.save()];
                    case 4:
                        _a.sent();
                        if (addUser) {
                            res.status(200).send("user added " + req.body.username);
                        }
                        _a.label = 5;
                    case 5:
                        res.status(200).send("Username already exists");
                        return [3 /*break*/, 7];
                    case 6:
                        err_1 = _a.sent();
                        res.status(500).send(err_1.message);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.addAdminUser = function (username, password) {
        return __awaiter(this, void 0, void 0, function () {
            var userRole, find, hashPassword, addUser, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userRole = "admin";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, user.findOne({ username: username }).exec()];
                    case 2:
                        find = _a.sent();
                        if (!!find) return [3 /*break*/, 5];
                        return [4 /*yield*/, bcrypt_1.default.hash(password, 10)];
                    case 3:
                        hashPassword = _a.sent();
                        addUser = new user({ name: "admin", username: username, password: hashPassword, role: userRole });
                        return [4 /*yield*/, addUser.save()];
                    case 4:
                        _a.sent();
                        console.log("admin added");
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        err_2 = _a.sent();
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.login = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var error;
            return __generator(this, function (_a) {
                error = {
                    loginError: ""
                };
                try {
                    passport.authenticate("local", function (err, user) {
                        if (err)
                            throw err;
                        if (!user) {
                            error.loginError = "Invalid credentials";
                            res.status(200).json(error);
                        }
                        else {
                            req.logIn(user, function (err) {
                                if (err)
                                    throw err;
                                res.status(200).send("Successfully Authenticated");
                            });
                        }
                    })(req, res);
                }
                catch (err) {
                    res.status(200).send(err.message);
                }
                return [2 /*return*/];
            });
        });
    };
    UserController.prototype.checkAuth = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!req.isAuthenticated()) {
                    res.status(401).send("unauthorised access");
                }
                else
                    res.status(200).send("Success");
                return [2 /*return*/];
            });
        });
    };
    return UserController;
}());
exports.UserController = UserController;
