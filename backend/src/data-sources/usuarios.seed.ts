import { DataSource } from 'typeorm';
import { Funcionario } from 'src/funcionarios/entities/funcionario.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';

import * as bcrypt from 'bcrypt';

export async function seedFuncionarioAdmin(dataSource: DataSource) {
  const repo = dataSource.getRepository(Funcionario);
  const repoadmin = dataSource.getRepository(Usuario);

  const exists_func = await repo.findOne({
    where: { cargo: 'Administrador' },
  });
  const exists_user = await repoadmin.findOne({
    where: {email:"admin@clinic.com"}
  })
  if (exists_func && exists_user) {
    return;
  }

  const admin = repo.create({
    cpf: '000.000.000-00',
    nome: 'Administrador BASE',
    telefone: '000000000000',
    cargo: 'Administrador',
    data_desativacao: null,
  });

  const funcionario_salvo = await repo.save(admin);

  console.log('Funcionário Administrador criado');
  const repousuario = repoadmin.create({
    email:"admin@clinic.com",
    senha: await bcrypt.hash("admin123",10),
    funcionario: funcionario_salvo,
  })
  await repoadmin.save(repousuario);
  console.log("Funcionário e Usuário criados");
}
