import express from 'express';
import cors from 'cors';
import { PORT } from '../config';
import { handleError } from '../middlewares/errors-handlers/errorHandler.middleware';
import { router } from '../routers';

export const app = express();

app.use(express.json());

app.use(cors());

app.use(router);

app.use(handleError);

export const startServer = () => app.listen(PORT, ()=> {
		console.log(`Server is on! localhost:${PORT}`);
	}
);