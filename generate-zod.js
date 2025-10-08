// generate-zod.js
const { jsonSchemaToZod } = require("json-schema-to-zod");
const fs = require("fs");
const path = require("path");

const INPUT_PATH = path.resolve(__dirname, "schema.txt"); // หรือ "schema.json"
const OUTPUT_PATH = path.resolve(__dirname, "schema.zod.js");

const rawSchema = fs.readFileSync(INPUT_PATH, "utf-8");
let schemaObj;
try {
    schemaObj = JSON.parse(rawSchema);
} catch (err) {
    console.error("❌ Schema ไม่ใช่ JSON ที่ถูกต้อง");
    process.exit(1);
}

const zodSchema = jsonSchemaToZod(schemaObj, { module: "esm" });

fs.writeFileSync(OUTPUT_PATH, zodSchema);

console.log(`✅ Generate Zod schema เรียบร้อย → ${OUTPUT_PATH}`);
