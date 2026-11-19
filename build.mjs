import { rm, mkdir, cp, copyFile } from "node:fs/promises";

console.log("Preparando publicacao do Clean Car...");

await rm("dist", { recursive: true, force: true });

await mkdir("dist/admin", { recursive: true });

await copyFile("index.html", "dist/index.html");

await cp("src", "dist/src", {
    recursive: true,
    filter: (caminho) => {
        return !/(\.bak\d*|\.bak-.*|\.env.*|\.dev\.vars.*)$/i.test(caminho);
    }
});

await copyFile("admin/index.html", "dist/admin/index.html");
await copyFile("admin/admin.js", "dist/admin/admin.js");

console.log("Publicacao preparada com sucesso!");
