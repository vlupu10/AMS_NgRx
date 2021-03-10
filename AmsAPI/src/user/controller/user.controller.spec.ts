import { Injectable } from '@nestjs/common';
//import { async } from '@nestjs/';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { UserController } from './user.controller';
import { UserService } from '../service/user.service';
import { AuthService } from '../../auth/service/auth.service';
describe('UserController', () => {
  let obj;

@Injectable()
class MockUserService {}

@Injectable()
class MockAuthService {}

  beforeEach(() => {
    obj = new UserController({}, {});
  });

  it('should run #create()', async () => {
    obj.userService = obj.userService || {};
    obj.userService.create = jest.fn();
    obj.create({});
    // expect(obj.userService.create).toHaveBeenCalled();
  });

  it('should run #login()', async () => {
    obj.authService = obj.authService || {};
    obj.authService.generateJWT = jest.fn().mockReturnValue({
      then: function() {
        return {
          catch: function() {
            return [
              null
            ];
          }
        };
      }
    });
    obj.userService = obj.userService || {};
    obj.userService.login = jest.fn();
    obj.login();
    // expect(obj.authService.generateJWT).toHaveBeenCalled();
    // expect(obj.userService.login).toHaveBeenCalled();
  });

  it('should run #findOne()', async () => {
    obj.userService = obj.userService || {};
    obj.userService.findOne = jest.fn();
    obj.findOne({
      id: {}
    });
    // expect(obj.userService.findOne).toHaveBeenCalled();
  });

  it('should run #findAll()', async () => {
    obj.userService = obj.userService || {};
    obj.userService.findAll = jest.fn();
    obj.findAll();
    // expect(obj.userService.findAll).toHaveBeenCalled();
  });

  it('should run #delete()', async () => {
    obj.userService = obj.userService || {};
    obj.userService.delete = jest.fn();
    obj.delete({});
    // expect(obj.userService.delete).toHaveBeenCalled();
  });

  it('should run #update()', async () => {
    obj.userService = obj.userService || {};
    obj.userService.update = jest.fn();
    obj.update({}, {});
    // expect(obj.userService.update).toHaveBeenCalled();
  });

});
