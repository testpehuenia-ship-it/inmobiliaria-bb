const Database = require('better-sqlite3');
const path = require('path');

const db = new Database('c:/Users/gus16/Desktop/Antigravity/Proyectos/webBilbao/inmobiliaria-bb/prisma/dev.db');

// Leer datos
const users = db.prepare('SELECT * FROM User').all();
const properties = db.prepare('SELECT * FROM Property').all();
const images = db.prepare('SELECT * FROM Image').all();
const inquiries = db.prepare('SELECT * FROM Inquiry').all();

console.log('=== DATOS ENCONTRADOS ===');
console.log(`Users: ${users.length}`);
console.log(`Properties: ${properties.length}`);
console.log(`Images: ${images.length}`);
console.log(`Inquiries: ${inquiries.length}`);

// Generar SQL
let sql = '-- MIGRACIÓN DE DATOS DESDE SQLITE A NEON POSTGRESQL\n\n';

// Users (skip admin since already exists in Neon)
for (const u of users) {
  if (u.email === 'admin@inmobiliariabb.com') continue; // skip, ya existe
  const vals = [u.id, u.name, u.email, u.password, u.role, u.phone || null, u.avatarUrl || null, u.createdAt, u.updatedAt];
  sql += `INSERT INTO "User" ("id","name","email","password","role","phone","avatarUrl","createdAt","updatedAt") VALUES ('${u.id}','${u.name.replace(/'/g,"''")}','${u.email}','${u.password}','${u.role}',${u.phone ? "'"+u.phone+"'" : 'NULL'},${u.avatarUrl ? "'"+u.avatarUrl+"'" : 'NULL'},'${u.createdAt}','${u.updatedAt}');\n`;
}

// Get admin ID for properties that reference it
const adminUser = users.find(u => u.role === 'ADMIN');
const adminId = adminUser ? adminUser.id : 'admin-001';

// Properties
for (const p of properties) {
  sql += `INSERT INTO "Property" ("id","title","description","price","currency","operationType","propertyType","status","bedrooms","bathrooms","totalArea","coveredArea","city","neighborhood","address","isFeatured","agentId","createdAt","updatedAt") VALUES ('${p.id}','${p.title.replace(/'/g,"''")}','${p.description.replace(/'/g,"''")}',${p.price},'${p.currency}','${p.operationType}','${p.propertyType}','${p.status}',${p.bedrooms},${p.bathrooms},${p.totalArea},${p.coveredArea},'${p.city.replace(/'/g,"''")}',${p.neighborhood ? "'"+p.neighborhood.replace(/'/g,"''")+"'" : 'NULL'},${p.address ? "'"+p.address.replace(/'/g,"''")+"'" : 'NULL'},${p.isFeatured ? 'true' : 'false'},'${p.agentId}','${p.createdAt}','${p.updatedAt}');\n`;
}

// Images
for (const img of images) {
  sql += `INSERT INTO "Image" ("id","url","isMain","propertyId") VALUES ('${img.id}','${img.url}',${img.isMain ? 'true' : 'false'},'${img.propertyId}');\n`;
}

// Inquiries
for (const inq of inquiries) {
  sql += `INSERT INTO "Inquiry" ("id","nombre","email","telefono","mensaje","propertyId","propertyTitle","isRead","type","propertyType","bedrooms","bathrooms","area","address","createdAt") VALUES ('${inq.id}','${inq.nombre.replace(/'/g,"''")}','${inq.email}','${inq.telefono}',${inq.mensaje ? "'"+inq.mensaje.replace(/'/g,"''")+"'" : "''"}, ${inq.propertyId ? "'"+inq.propertyId+"'" : 'NULL'},${inq.propertyTitle ? "'"+inq.propertyTitle.replace(/'/g,"''")+"'" : 'NULL'},${inq.isRead ? 'true' : 'false'},'${inq.type || 'CONSULTA'}',${inq.propertyType ? "'"+inq.propertyType+"'" : 'NULL'},${inq.bedrooms !== null && inq.bedrooms !== undefined ? inq.bedrooms : 'NULL'},${inq.bathrooms !== null && inq.bathrooms !== undefined ? inq.bathrooms : 'NULL'},${inq.area !== null && inq.area !== undefined ? inq.area : 'NULL'},${inq.address ? "'"+inq.address.replace(/'/g,"''")+"'" : 'NULL'},'${inq.createdAt}');\n`;
}

console.log('\n=== SQL PARA NEON ===\n');
console.log(sql);

db.close();
