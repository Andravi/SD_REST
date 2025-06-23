import app from "./app";

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`🐶 Servidor de cachorros rodando em http://localhost:${PORT}`);
  console.log("Rotas disponíveis:");
  console.log(`- GET /dogs/breeds - Lista raças disponíveis`);
  console.log(`- POST /dogs - Adiciona novo cachorro`);
  console.log(`- GET /dogs - Lista todos os cachorros`);
  console.log(`- GET /dogs/:name - Busca por nome`);
  console.log(`- DELETE /dogs/:id - Remove um cachorro`);
});
