# Project Guidelines

## Architecture and Technologies
- The server is written in JavaScript using ES modules (`"type": "module"`) and uses Express 5, Mongoose, and Joi.
- The entry point is `app.js`. The MongoDB connection is configured in `config/db.js`; API routes are in `routes/`; request logic is in `controllers/`; Mongoose schemas are in `models/`; Joi validations are in `validations/`; and shared middleware is in `middlewares/`.
- Preserve the existing separation of concerns: routers connect routes, validations, and controllers; controllers perform API operations through the models and send responses.
- Product routes are mounted under `/products`, and user routes under `/users`. Inspect the existing code before extending orders or users: some code in these areas is only a scaffold or example.

## Code Conventions
- Use `import`/`export` and include `.js` extensions in local import paths, consistent with the project files.
- Keep naming and formatting consistent with nearby files. Use `async`/`await` for asynchronous Mongoose operations.
- Pass HTTP errors using `throw new AppError(message, status, type)` from `utils/AppError.js`; do not create a separate error response format. `middlewares/errors.middleware.js` is responsible for converting errors into JSON responses.
- Add server-side validation with Joi for new or modified routes, using `validateBody` from `middlewares/validateJoi.middleware.js`. Define the corresponding schema under `validations/`.
- Keep every Joi schema aligned with its corresponding Mongoose schema: use matching field names, data types, and nested object/array shapes, and preserve Mongoose-required semantics. Document and validate any stricter, endpoint-specific requirements separately.
- Preserve response shapes and status codes used by the existing code (for example, `201` for creation and `404` when a resource is not found). Validate IDs before ID-based operations, and also check whether the document exists.

## Running and Testing
- Install dependencies: `npm install`.
- Start the development server with `.env` loading and file watching: `npm run dev`.
- Start the server normally: `npm start`.
- The server uses `PORT` (defaults to `4000`) and `MONGO_URI` (the default is configured in `config/db.js`).
- There is currently no test infrastructure; the `npm test` script is a placeholder that intentionally fails. Do not report it as a successful test, and add or update tests when test infrastructure is introduced.