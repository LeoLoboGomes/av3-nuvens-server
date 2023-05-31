import express from 'express';
import cors from 'cors'
import { createClient } from '@supabase/supabase-js'
import bodyParser from 'body-parser';

const app = express();
app.use(cors());

const supabaseUrl = "https://zvssxiypdyllbaelpfrt.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2c3N4aXlwZHlsbGJhZWxwZnJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU0MTE3NzIsImV4cCI6MjAwMDk4Nzc3Mn0.sYlTmQwcjfbD687XPaKjT_ngwP2HOukaAgsYJIUurlU";

const supabase = createClient(supabaseUrl, supabaseKey)

app.get('/produtos', async (req, res) => {
  const response = await supabase
    .from('products')
    .select();

  if (response.status == 200) {
    res.status(200).send(response.data);
  }
  else {
    res.status(500).send({ error: "Algo deu errado" });
  }
});

app.get('/produtos/:id', async (req, res) => {
  const productId = req.params.id;
  
  const response = await supabase
    .from('products')
    .select()
    .eq('id', productId);

  if (response.status == 200) {
    res.status(200).send(response.data);
  }
  else {
    res.status(500).send({ error: "Algo deu errado" });
  }
});

app.post('/produtos', bodyParser.json(), async (req, res) => {
  const productName = req.body.name;
  const productPrice = parseFloat(req.body.price);

  const response = await supabase
    .from('products')
    .insert({ name: productName, price: productPrice });

  if (response.status == 201) {
    res.status(201).send({ message: "Produto Cadastrado!" });
  }
  else {
    res.status(500).send({ error: "Algo deu errado" });
  }
});

app.put('/produtos', bodyParser.json(), async (req, res) => {
  console.log(req.body);
  const productId = parseInt(req.body.id);
  const productName = req.body.name;
  const productPrice = parseFloat(req.body.price);

  const response = await supabase
    .from('products')
    .update({ name: productName, price: productPrice })
    .eq('id', productId);

  console.log(response);

  if (response.status == 204) {
    res.status(204).send({ message: "Produto Atualizado!" });
  }
  else {
    res.status(500).send({ error: "Algo deu errado" });
  }
});

app.delete('/produtos/:id', async (req, res) => {
  const productId = req.params.id;
  
  const response = await supabase
    .from('products')
    .delete()
    .eq('id', productId);

  if (response.status == 204) {
    res.status(204).send({ message: "Produto Deletado!" });
  }
  else {
    res.status(500).send({ error: "Algo deu errado" });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});