import { Request, Response, Router } from 'express';
import { asyncHandler } from '../middlewares/asyncHandler';
import { JWTVerify } from '../middlewares/jwt.middleware';
import SchemaValidator from '../middlewares/schema.middleware';
import schemas from '../services/schemas';
import UserRouter from './user.router';

export const router = Router();

const userRouter = new UserRouter();

const validator = new SchemaValidator(schemas);

//TO-DO: fix captured params
const uuidRegex = '(([A-z0-9]+-){4}[A-z0-9]+)';

router.get('/ping/', (request: Request, response: Response) => {
	return response.json({
		pong: {
			params: request.params,
			body: request.body
		}
	});
});

router.post('/login',
	validator.validate({schema: 'loginSchema', data: 'body'}),
	asyncHandler(userRouter.auth)
);

router.post('/signup',
	// validator.validate({schema: 'userSchema', data: 'body'}),
	asyncHandler(userRouter.create)
);

router.get('/users',
	asyncHandler(userRouter.getAll)
);
router.get(`/users/:cpf`, 
	asyncHandler(userRouter.getOneByCPF)
);
router.put(`/users/:id(${uuidRegex})`,
	JWTVerify,
	// validator.validate({schema: 'userSchema', data: 'body', strictRequiredChecks: false}),
	asyncHandler(userRouter.updateAll)
);
router.delete(`/users/:id(${uuidRegex})`, 
	JWTVerify,
	asyncHandler(userRouter.delete)
);

