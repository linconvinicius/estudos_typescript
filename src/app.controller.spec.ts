import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});

describe('UserService', () => {
  let service: UserService;
  let createUserMock: CreateUser;

  beforeEach(async () => {
    createUserMock = { execute: jest.fn() } as any;
    
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: CreateUser, useValue: createUserMock }
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should register a user successfully', async () => {
    const user = new User('1', 'Test User', 'test@example.com');
    createUserMock.execute.mockResolvedValue(user);
    
    const result = await service.register('Test User', 'test@example.com');
    
    expect(createUserMock.execute).toHaveBeenCalledWith('Test User', 'test@example.com');
    expect(result).toEqual(user);
  });
});