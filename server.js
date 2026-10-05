import { createReadStream } from "node:fs";
import { createServer } from "node:http";
import { extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));
const files = new Map([
	["/", "public/index.html"],
	["/index.html", "public/index.html"],
	["/style.css", "public/style.css"],
	["/app.js", "public/app.js"],
	["/validation.js", "src/validation.js"],
]);
const contentTypes = {
	".css": "text/css; charset=utf-8",
	".html": "text/html; charset=utf-8",
	".js": "text/javascript; charset=utf-8",
};

const server = createServer((request, response) => {
	const pathname = new URL(request.url, "http://localhost").pathname;
	const relativePath = files.get(pathname);

	if (!relativePath || !["GET", "HEAD"].includes(request.method)) {
		response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
		response.end("Not found");
		return;
	}

	const filePath = resolve(projectRoot, relativePath);
	response.writeHead(200, { "Content-Type": contentTypes[extname(filePath)] });
	if (request.method === "HEAD") {
		response.end();
		return;
	}

	createReadStream(filePath).pipe(response);
});

const port = Number(process.env.PORT) || 3000;
server.listen(port, "0.0.0.0", () => {
	console.log(`Guest registration app running at http://localhost:${port}`);
});
